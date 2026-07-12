import { Octokit } from "@octokit/rest"
import { OAuthService, withAccessToken } from "@raycast/utils"

export let githubClient: Octokit

export const github = OAuthService.github({
  scope: "repo read:user",
  onAuthorize({ token }) {
    githubClient = new Octokit({ auth: token })
  },
})

export function withGitHub<T>(Component: React.ComponentType<T>) {
  return withAccessToken<T>(github)(Component)
}
