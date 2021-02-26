export interface Config {
  pullRequest: PullRequestConfig
  issue: IssueConfig
}

export interface PullRequestConfig {
  preview: {
    replay: string
  }
}

export interface IssueConfig {
  invalid: {
    mark: string
    labels: string | string[]
    replay: string
  }
  translate: {
    mark: string
    replay: string
  }
  labeled: {
    labels: string[]
    extraLabel: string
    replay: string
  }[]
  owner: {
    cdk: Record<string, string>
    comp: Record<string, string>
    pro: Record<string, string>
    def: string
  }
}
