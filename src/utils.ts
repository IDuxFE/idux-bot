import type { Context } from 'probot'
import type { Config } from './config'

export const isDev = process.env.DEV === 'true'

export async function getConfig(context: Context): Promise<Config | null> {
  let config: Config | null = null
  const repo = context.repo()
  const file = process.env.CONFIG_FILENAME || 'idux-bot.yml'
  try {
    config = await context.config(file)
  } catch (e) {
    context.log.error({ error: new Error(e), repo, file }, 'Invalid config')
  }

  return config
}

export async function isMember(context: Context): Promise<boolean> {
  if (isDev) {
    return false
  }
  const members = await getMembers(context)
  const opener = context.payload.issue.user.login
  return members.includes(opener)
}

async function getMembers(context: Context): Promise<string[]> {
  const repo = context.repo()
  const response = await context.octokit.orgs.listMembers({ org: repo.owner })
  return (response?.data || []).map(m => m!.login)
}

const regExp = /\{([0-9a-zA-Z_]+)\}/g

export function format(template: string, options: Record<string, string>): string {
  return template.replace(regExp, (match, i, index) => {
    if (template[index - 1] === '{' && template[index + match.length] === '}') {
      return i
    } else {
      return options[i] || ''
    }
  })
}
