export const GET_USER_CONTRIBUTIONS_QUERY = /* GraphQL */ `
  query getUserContributions($username: String!, $from: DateTime, $to: DateTime) {
    viewer {
      name
      login
      avatarUrl
      contributionsCollection(from: $from, to: $to) {
        startedAt
        endedAt
        restrictedContributionsCount
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          colors
          months {
            name
            year
            firstDay
            totalWeeks
          }
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
              color
            }
          }
        }
      }
    }
    user(login: $username) {
      name
      login
      avatarUrl
      contributionsCollection(from: $from, to: $to) {
        startedAt
        endedAt
        restrictedContributionsCount
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          colors
          months {
            name
            year
            firstDay
            totalWeeks
          }
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
              color
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_PROFILE_QUERY = /* GraphQL */ `
  query getUserProfile($username: String!) {
    user(login: $username) {
      login
      name
      bio
      avatarUrl
      url
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(
        first: 6
        orderBy: { field: STARGAZERS, direction: DESC }
        isFork: false
        privacy: PUBLIC
      ) {
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

export interface GetUserContributionsVariables {
  username: string;
  from?: string;
  to?: string;
  [key: string]: unknown;
}

export interface GetUserProfileVariables {
  username: string;
  [key: string]: unknown;
}
