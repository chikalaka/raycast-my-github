import { List } from "@raycast/api"
import Item from "./components/Item"
import { usePrs } from "./hooks/hooks"
import { PullRequest } from "./types/types"
import { withGitHub } from "./api/api"

type SectionProps = {
  title: string
  prs?: PullRequest[]
}

function MyPullRequests() {
  const {
    requestedPrs,
    myOpenPrs,
    mentionedPrs,
    isLoading,
    prsDetails,
    prsReviews,
  } = usePrs()

  const Section = ({ title, prs }: SectionProps) => {
    return (
      <List.Section title={title}>
        {prs?.map((pr) => {
          return (
            <Item
              key={pr.url}
              {...pr}
              details={prsDetails?.[pr.id]}
              reviews={prsReviews?.[pr.id]}
            />
          )
        })}
      </List.Section>
    )
  }

  return (
    <List isLoading={isLoading}>
      <Section title={"Opened by me"} prs={myOpenPrs} />
      <Section title={"Requested"} prs={requestedPrs} />
      <Section title={"Mentioned in"} prs={mentionedPrs} />
      <List.EmptyView title="No pull requests found" />
    </List>
  )
}

export default withGitHub(MyPullRequests)
