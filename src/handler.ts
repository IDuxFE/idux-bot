import type { Context } from 'probot'
import type { Config } from './config'

import translate from '@vitalets/google-translate-api'
import axios from 'axios'
import { upperFirst } from 'lodash'
import { format, getConfig, isMember } from './utils'

export async function onIssuesOpened(context: Context): Promise<void> {
  const config = await getConfig(context)
  if (!config) return

  const isValid = await validIssue(context, config)
  if (isValid) {
    await addIssueLabels(context)
    await translateIssue(context, config)
  }
}

export async function onIssuesLabeled(context: Context): Promise<void> {
  const config = await getConfig(context)
  if (!config) return

  await replyLabeled(context, config)
  await assignOwner(context, config)
}

export async function onPullRequestOpened(context: Context): Promise<void> {
  const config = await getConfig(context)
  if (!config) return

  await commentPreview(context, config)
}

export async function onPullRequestLabeled(context: Context): Promise<void> {
  const config = await getConfig(context)
  if (!config) return

  await assignOwner(context, config)
}

export async function onReleasePublished(context: Context): Promise<void> {
  await sendReleaseInfo(context)
}

async function validIssue(context: Context, config: Config) {
  let { mark, labels, replay } = config.issue.invalid
  labels = Array.isArray(labels) ? labels : [labels]

  const member = await isMember(context)
  const { body, number, user } = context.payload.issue

  if (!body.includes(mark) && !member) {
    context.log.trace({ number }, 'replying Invalid issue...')
    try {
      const comment = context.issue({ body: format(replay, { user: user.login }) })
      await context.octokit.issues.createComment(comment)
      await context.octokit.issues.update(context.issue({ state: 'closed' }))
      await context.octokit.issues.addLabels(context.issue({ labels: labels }))

      context.log.info({ number }, 'replied invalid issue...')
    } catch (e) {
      context.log.error({ number, error: new Error(e) }, 'reply invalid issue error!')
    }
    return false
  }

  return true
}

async function addIssueLabels(context: Context) {
  const { title, number } = context.payload.issue
  const titleMathResult = title.match(/\[(.*)\]/)

  if (titleMathResult) {
    const title = titleMathResult[1] as string
    const [module, name = ''] = title.split(':').map(item => item.trim())
    const labels = name.split(',').map(item => upperFirst(module) + ':' + upperFirst(item))

    context.log.trace({ number, labels }, 'adding issue label...')
    try {
      await context.octokit.issues.addLabels(context.issue({ labels }))

      context.log.info({ number, labels }, 'added issue label.')
    } catch (e) {
      context.log.error({ number, labels, error: new Error(e) }, 'add issue error!')
    }
  }
}

async function translateIssue(context: Context, config: Config) {
  const { mark, replay } = config.issue.translate
  const { body, title, number } = context.payload.issue
  if (body.includes(mark)) {
    const translateOptions = { from: 'zh-CN', to: 'en' }
    const translatedTitle = await translate(title, translateOptions)
    const translatedBody = await translate(body.replace(/<!--(.*?)-->/g, ''), translateOptions)

    if (translatedTitle.text && translatedBody.text) {
      const content = format(replay, { title: translatedTitle.text, body: translatedBody.text })
      const comment = context.issue({ body: content })

      context.log.trace({ number, comment }, 'translating issue...')
      try {
        await context.octokit.issues.createComment(comment)

        context.log.info({ number, comment }, 'translated issue.')
      } catch (e) {
        context.log.error({ number, comment, error: new Error(e) }, 'translate issue error!')
      }
    }
  }
}

async function replyLabeled(context: Context, config: Config) {
  const { number, user } = context.payload.issue
  const labelName = context.payload.label.name

  const targetConfig = config.issue.labeled.find(item => item.labels.includes(labelName))

  if (targetConfig) {
    context.log.trace({ number, labelName }, 'replying labeled...')
    const { replay, extraLabel } = targetConfig
    const comment = context.issue({ body: format(replay, { user: user.login }) })

    try {
      await context.octokit.issues.createComment(comment)
      if (extraLabel) {
        await context.octokit.issues.addLabels(context.issue({ labels: [extraLabel] }))
      }
      context.log.info({ number, labelName, comment }, 'replied by label.')
    } catch (e) {
      context.log.error({ number, labelName, comment, error: new Error(e) }, 'reply labeled error!')
    }
  }
}

async function assignOwner(context: Context, config: Config) {
  const { cdk, comp, pro, def } = config.issue.owner
  const label = context.payload.label.name as string

  const [packageName, componentName = ''] = label.split(':')

  let targetPackage: Record<string, string> = { def }

  if (packageName === 'Cdk') {
    targetPackage = cdk
  } else if (packageName === 'Comp') {
    targetPackage = comp
  } else if (packageName === 'pro') {
    targetPackage = pro
  }

  const assigner = targetPackage[componentName] || targetPackage.def

  const number = context.payload.issue?.number || context.payload.number
  context.log.trace({ number, label }, 'assigning owner...')

  try {
    await context.octokit.issues.addAssignees(context.issue({ assignees: [assigner] }))
    context.log.info({ number, assigner }, 'assigned owner.')
  } catch (e) {
    context.log.error({ number, assigner, error: new Error(e) }, 'assign owner error!')
  }
}

async function commentPreview(context: Context, config: Config) {
  const replay = config.pullRequest.preview.replay
  const { number } = context.payload
  const comment = context.issue({ body: format(replay, { number }) })
  try {
    await context.octokit.issues.createComment(comment)

    context.log.trace({ number }, 'Comment preview url...')
  } catch (e) {
    context.log.error({ number, error: new Error(e) }, 'Comment preview error!')
  }
}

async function sendReleaseInfo(context: Context) {
  const release = context.payload.release
  axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${process.env.DINGTALK_TOKEN}`, {
    msgtype: 'markdown',
    markdown: {
      title: `${release.name} 发布`,
      text: `# ${release.name} 发布日志 \n\n ${release.body}`,
    },
  })
}
