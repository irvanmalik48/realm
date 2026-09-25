import type { Activity } from "@/components/kibo-ui/contribution-graph";
import type {
  GitHubContributionCalendar,
  GitHubContributionLevel,
  GitHubContributionStats,
  GitHubUserContributionsData,
  TransformedContributionsResult,
} from "./types";

/**
 * Maps GitHub GraphQL contribution level string to numeric 0..4
 * corresponding to kibo-ui contribution graph levels.
 */
export function mapContributionLevel(
  level: GitHubContributionLevel
): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case "FOURTH_QUARTILE":
      return 4;
    case "THIRD_QUARTILE":
      return 3;
    case "SECOND_QUARTILE":
      return 2;
    case "FIRST_QUARTILE":
      return 1;
    case "NONE":
    default:
      return 0;
  }
}

/**
 * Transforms GitHub GraphQL ContributionCalendar into flat Activity[]
 * sorted chronologically.
 */
export function transformCalendarToActivities(
  calendar: GitHubContributionCalendar
): Activity[] {
  if (!calendar?.weeks) return [];

  const activities: Activity[] = [];

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      const mappedLevel = mapContributionLevel(day.contributionLevel);
      // Guarantee that if there were any contributions on that day,
      // it is NEVER marked as level 0 (empty).
      const level =
        day.contributionCount > 0 && mappedLevel === 0 ? 1 : mappedLevel;

      activities.push({
        date: day.date,
        count: day.contributionCount,
        level,
      });
    }
  }

  // Sort by date ascending to ensure proper chronological order
  activities.sort((a, b) => a.date.localeCompare(b.date));
  return activities;
}

/**
 * Calculates current streak and longest streak from chronological activities.
 */
export function calculateStreaks(
  activities: Activity[]
): { currentStreak: number; longestStreak: number } {
  if (!activities || activities.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let longestStreak = 0;
  let tempStreak = 0;

  for (const act of activities) {
    if (act.count > 0) {
      tempStreak += 1;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak starting from latest day backwards
  let currentStreak = 0;
  const n = activities.length;
  let startIndex = n - 1;

  // If today (last entry) has 0 contributions, check yesterday before resetting
  if (startIndex >= 0 && activities[startIndex].count === 0) {
    startIndex -= 1;
  }

  while (startIndex >= 0 && activities[startIndex].count > 0) {
    currentStreak += 1;
    startIndex -= 1;
  }

  return { currentStreak, longestStreak };
}

/**
 * Transforms complete GitHub GraphQL user contributions payload
 * into UI-ready data format.
 */
export function transformContributionsResponse(
  userData: GitHubUserContributionsData
): TransformedContributionsResult {
  const collection = userData.contributionsCollection;
  const calendar = collection.contributionCalendar;
  const activities = transformCalendarToActivities(calendar);
  const { currentStreak, longestStreak } = calculateStreaks(activities);

  const stats: GitHubContributionStats = {
    totalContributions: calendar.totalContributions ?? 0,
    totalCommits: collection.totalCommitContributions ?? 0,
    totalPRs: collection.totalPullRequestContributions ?? 0,
    totalIssues: collection.totalIssueContributions ?? 0,
    totalReviews: collection.totalPullRequestReviewContributions ?? 0,
    totalPrivate: collection.restrictedContributionsCount ?? 0,
    currentStreak,
    longestStreak,
  };

  return {
    username: userData.login,
    name: userData.name,
    avatarUrl: userData.avatarUrl,
    activities,
    stats,
  };
}

/** Deterministic pseudo-random number generator for stable mock data */
const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const levelFromNoise = (n: number): 0 | 1 | 2 | 3 | 4 => {
  if (n < 0.42) return 0;
  if (n < 0.64) return 1;
  if (n < 0.82) return 2;
  if (n < 0.93) return 3;
  return 4;
};

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/**
 * Generates deterministic fallback contribution data when offline or token is absent.
 */
export function generateMockContributions(
  username = "irvanmalik48",
  days = 365
): TransformedContributionsResult {
  const rand = mulberry32(0x2026_cafe);
  const activities: Activity[] = [];
  let streakLeft = 0;
  let streakLevel: 0 | 1 | 2 | 3 | 4 = 0;
  let totalCount = 0;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (days - 1 - i));

    if (streakLeft === 0 && rand() < 0.1) {
      streakLeft = 2 + Math.floor(rand() * 4);
      streakLevel = (2 + Math.floor(rand() * 3)) as 2 | 3 | 4;
    }

    let level = levelFromNoise(rand());
    if (streakLeft > 0) {
      level = Math.max(level, streakLevel) as 0 | 1 | 2 | 3 | 4;
      streakLeft -= 1;
    }
    if (rand() < 0.1) level = 0;

    const count = level === 0 ? 0 : level + Math.floor(rand() * 4);
    totalCount += count;

    activities.push({
      date: formatDate(date),
      count,
      level,
    });
  }

  const { currentStreak, longestStreak } = calculateStreaks(activities);

  return {
    username,
    name: "Irvan Malik Azantha",
    avatarUrl: `https://github.com/${username}.png`,
    activities,
    stats: {
      totalContributions: totalCount,
      totalCommits: Math.round(totalCount * 0.82),
      totalPRs: Math.round(totalCount * 0.08),
      totalIssues: Math.round(totalCount * 0.05),
      totalReviews: Math.round(totalCount * 0.05),
      totalPrivate: 0,
      currentStreak,
      longestStreak,
    },
  };
}
