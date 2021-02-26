import { Probot } from 'probot'
import {
  onIssuesLabeled,
  onIssuesOpened,
  onPullRequestLabeled,
  onPullRequestOpened,
  onReleasePublished,
} from './handler'

export = (app: Probot) => {
  app.on('issues.opened', onIssuesOpened)

  app.on('issues.labeled', onIssuesLabeled)

  app.on('pull_request.opened', onPullRequestOpened)

  app.on('pull_request.labeled', onPullRequestLabeled)

  app.on('release.published', onReleasePublished)

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
