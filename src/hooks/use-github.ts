"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import {
  getGitHubContributionsAction,
  getGitHubUserAction,
} from "@/actions/github";
import type {
  FetchContributionsResult,
  FetchUserProfileResult,
} from "@/lib/github/fetcher";

export interface UseGitHubContributionsOptions {
  from?: string;
  to?: string;
  enabled?: boolean;
  refetchInterval?: number | false;
}

/**
 * React Query hook to fetch GitHub contribution calendar and activity stats.
 * Uses Server Action under the hood, ensuring secrets remain secure.
 */
export function useGitHubContributions(
  username: string = "irvanmalik48",
  options?: UseGitHubContributionsOptions
) {
  const { from, to, enabled = true, refetchInterval = false } = options || {};

  return useQuery<FetchContributionsResult>({
    queryKey: ["github-contributions", username, from, to],
    queryFn: () => getGitHubContributionsAction(username, from, to),
    enabled: enabled && !!username,
    staleTime: 1000 * 60 * 30, // 30 minutes client cache
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    refetchOnWindowFocus: false,
    refetchInterval,
  });
}

/**
 * React Query hook to fetch GitHub user profile and public repos.
 */
export function useGitHubUserProfile(
  username: string = "irvanmalik48",
  options?: { enabled?: boolean }
) {
  const { enabled = true } = options || {};

  return useQuery<FetchUserProfileResult>({
    queryKey: ["github-user-profile", username],
    queryFn: () => getGitHubUserAction(username),
    enabled: enabled && !!username,
    staleTime: 1000 * 60 * 60, // 1 hour client cache
    gcTime: 1000 * 60 * 60 * 4,
    refetchOnWindowFocus: false,
  });
}
