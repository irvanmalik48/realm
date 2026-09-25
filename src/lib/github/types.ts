import type { Activity } from "@/components/kibo-ui/contribution-graph";

export type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel;
  weekday: number;
  color?: string;
}

export interface GitHubContributionWeek {
  firstDay: string;
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionMonth {
  name: string;
  year: number;
  firstDay: string;
  totalWeeks: number;
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
  months?: GitHubContributionMonth[];
  colors?: string[];
}

export interface GitHubContributionsCollection {
  startedAt?: string;
  endedAt?: string;
  restrictedContributionsCount?: number;
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  contributionCalendar: GitHubContributionCalendar;
}

export interface GitHubUserContributionsData {
  name: string | null;
  login: string;
  avatarUrl: string;
  contributionsCollection: GitHubContributionsCollection;
}

export interface GitHubUserContributionsResponse {
  viewer?: GitHubUserContributionsData | null;
  user: GitHubUserContributionsData | null;
}

export interface GitHubRepositoryNode {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export interface GitHubUserProfileData {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  url: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  repositories: {
    nodes: GitHubRepositoryNode[];
  };
}

export interface GitHubUserProfileResponse {
  user: GitHubUserProfileData | null;
}

export interface GitHubContributionStats {
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
  totalPrivate: number;
  currentStreak: number;
  longestStreak: number;
}

export interface TransformedContributionsResult {
  username: string;
  name: string | null;
  avatarUrl: string;
  activities: Activity[];
  stats: GitHubContributionStats;
  year?: number;
}
