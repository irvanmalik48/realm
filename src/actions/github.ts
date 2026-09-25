"use server";

import {
  getGitHubContributions,
  getGitHubUserProfile,
  type FetchContributionsResult,
  type FetchUserProfileResult,
} from "@/lib/github/fetcher";

/**
 * Server Action to fetch GitHub contributions calendar and statistics.
 * Safe to call from client components.
 */
export async function getGitHubContributionsAction(
  username: string,
  from?: string,
  to?: string,
  forceRefresh: boolean = false
): Promise<FetchContributionsResult> {
  return getGitHubContributions(username, from, to, forceRefresh);
}

/**
 * Server Action to fetch GitHub user profile and repositories.
 * Safe to call from client components.
 */
export async function getGitHubUserAction(
  username: string
): Promise<FetchUserProfileResult> {
  return getGitHubUserProfile(username);
}
