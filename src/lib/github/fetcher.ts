import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { executeGitHubGraphQL, GitHubApiError } from "./client";
import {
  GET_USER_CONTRIBUTIONS_QUERY,
  GET_USER_PROFILE_QUERY,
  GetUserContributionsVariables,
  GetUserProfileVariables,
} from "./queries";
import {
  transformContributionsResponse,
  generateMockContributions,
} from "./transformers";
import type {
  GitHubUserContributionsResponse,
  GitHubUserProfileResponse,
  GitHubUserProfileData,
  TransformedContributionsResult,
} from "./types";
import { env } from "@/env";

const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export interface FetchContributionsResult extends TransformedContributionsResult {
  isFallback: boolean;
  error?: string | null;
}

export interface FetchUserProfileResult {
  user: GitHubUserProfileData | null;
  isFallback: boolean;
  error?: string | null;
}

/**
 * Fetches user contributions from GitHub GraphQL API.
 * Uses Next.js 16 "use cache" with hourly revalidation to protect rate limits.
 */
export async function getGitHubContributions(
  username: string,
  from?: string,
  to?: string
): Promise<FetchContributionsResult> {
  "use cache";
  cacheLife("hours");
  cacheTag(`github-contributions-${username}`);

  if (!username || !GITHUB_USERNAME_REGEX.test(username)) {
    const fallback = generateMockContributions("irvanmalik48");
    return {
      ...fallback,
      isFallback: true,
      error: "Invalid GitHub username provided.",
    };
  }

  const token = env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) {
    const fallback = generateMockContributions(username);
    return {
      ...fallback,
      isFallback: true,
      error: "GITHUB_TOKEN is not configured on the server. Showing demo data.",
    };
  }

  try {
    const variables: GetUserContributionsVariables = {
      username,
      ...(from ? { from } : {}),
      ...(to ? { to } : {}),
    };

    const data = await executeGitHubGraphQL<GitHubUserContributionsResponse>(
      GET_USER_CONTRIBUTIONS_QUERY,
      variables
    );

    if (!data.user) {
      const fallback = generateMockContributions(username);
      return {
        ...fallback,
        isFallback: true,
        error: `GitHub user "${username}" was not found.`,
      };
    }

    const transformed = transformContributionsResponse(data.user);
    return {
      ...transformed,
      isFallback: false,
      error: null,
    };
  } catch (err) {
    const errorMessage =
      err instanceof GitHubApiError
        ? err.message
        : "Failed to fetch GitHub contributions.";
    console.warn(`[GitHub GraphQL Warning]: ${errorMessage}`);

    const fallback = generateMockContributions(username);
    return {
      ...fallback,
      isFallback: true,
      error: errorMessage,
    };
  }
}

/**
 * Fetches user profile from GitHub GraphQL API.
 * Uses Next.js 16 "use cache" with hourly revalidation.
 */
export async function getGitHubUserProfile(
  username: string
): Promise<FetchUserProfileResult> {
  "use cache";
  cacheLife("hours");
  cacheTag(`github-user-${username}`);

  if (!username || !GITHUB_USERNAME_REGEX.test(username)) {
    return {
      user: null,
      isFallback: true,
      error: "Invalid GitHub username provided.",
    };
  }

  const token = env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) {
    return {
      user: {
        login: username,
        name: "Irvan Malik Azantha",
        bio: "Software Engineer & Builder",
        avatarUrl: `https://github.com/${username}.png`,
        url: `https://github.com/${username}`,
        followers: { totalCount: 42 },
        following: { totalCount: 24 },
        repositories: { nodes: [] },
      },
      isFallback: true,
      error: "GITHUB_TOKEN is not configured on the server. Showing demo profile.",
    };
  }

  try {
    const variables: GetUserProfileVariables = { username };
    const data = await executeGitHubGraphQL<GitHubUserProfileResponse>(
      GET_USER_PROFILE_QUERY,
      variables
    );

    if (!data.user) {
      return {
        user: null,
        isFallback: true,
        error: `GitHub user "${username}" was not found.`,
      };
    }

    return {
      user: data.user,
      isFallback: false,
      error: null,
    };
  } catch (err) {
    const errorMessage =
      err instanceof GitHubApiError
        ? err.message
        : "Failed to fetch GitHub user profile.";
    console.warn(`[GitHub GraphQL Warning]: ${errorMessage}`);

    return {
      user: null,
      isFallback: true,
      error: errorMessage,
    };
  }
}
