"use client";

import { useMemo, useRef } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { useGitHubContributions } from "@/hooks/use-github";
import type { TransformedContributionsResult } from "@/lib/github/types";
import { GitHub } from "@/components/logos/github";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Trophy, RefreshCcw, GitCommit, GitPullRequest, AlertCircle, Lock } from "lucide-react";
import { ContributionScrollbar } from "@/components/github/contribution-scrollbar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function formatContributionDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export interface GitHubContributionGraphProps {
  username?: string;
  from?: string;
  to?: string;
  className?: string;
  blockSize?: number;
  blockMargin?: number;
  showStats?: boolean;
  showStreaks?: boolean;
  showLegend?: boolean;
  showFooter?: boolean;
  showRefresh?: boolean;
  initialData?: TransformedContributionsResult;
}

export function GitHubContributionGraph({
  username = "irvanmalik48",
  from,
  to,
  className,
  blockSize = 11,
  blockMargin = 3,
  showStats = true,
  showStreaks = true,
  showLegend = true,
  showFooter = true,
  showRefresh = true,
  initialData,
}: GitHubContributionGraphProps) {
  const { data, status, isFetching, forceRefresh } = useGitHubContributions(username, {
    from,
    to,
    enabled: !initialData,
  });

  const calendarRef = useRef<HTMLDivElement>(null);

  const activeData: TransformedContributionsResult | undefined = initialData || data;

  const activities = useMemo(() => {
    return activeData?.activities || [];
  }, [activeData]);

  const stats = activeData?.stats;
  const isFallback = (data as any)?.isFallback ?? false;
  const errorMessage = (data as any)?.error ?? null;

  if (status === "pending" && !initialData) {
    return (
      <div className={cn("w-full border border-border rounded-lg p-5 space-y-4 bg-background", className)}>
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-28 w-full rounded-md" />
        </div>
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full border border-border rounded-lg bg-background overflow-clip",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-border bg-muted/10">
        <div className="flex items-center gap-2.5">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm font-semibold hover:underline"
          >
            <GitHub className="size-4" />
            <span>@{username}</span>
          </a>

          {isFallback && (
            <Badge variant="outline" className="text-xs font-normal border-amber-500/40 text-amber-500 dark:text-amber-400 gap-1">
              <AlertCircle className="size-3" />
              <span>Demo Mode</span>
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showStreaks && stats && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted border border-border"
                title="Current active streak"
              >
                <Flame className="size-3.5 text-orange-500 fill-orange-500/20" />
                <span className="font-semibold">{stats.currentStreak}d</span>
                <span className="text-muted-foreground hidden sm:inline">streak</span>
              </div>
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted border border-border"
                title="Longest streak"
              >
                <Trophy className="size-3.5 text-amber-500 fill-amber-500/20" />
                <span className="font-semibold">{stats.longestStreak}d</span>
                <span className="text-muted-foreground hidden sm:inline">longest</span>
              </div>
            </div>
          )}

          {showRefresh && !initialData && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer"
              onClick={() => forceRefresh()}
              disabled={isFetching}
              title="Refresh GitHub contributions (bypasses cache)"
            >
              <RefreshCcw className={cn("size-3.5", isFetching && "animate-spin")} />
              <span className="sr-only">Refresh contributions</span>
            </Button>
          )}
        </div>
      </div>

      {/* Optional Stats Highlights */}
      {showStats && stats && (
        <div
          className={cn(
            "grid gap-2 px-5 py-3 border-b border-border bg-muted/5 text-xs font-mono",
            stats.totalPrivate > 0
              ? "grid-cols-2 sm:grid-cols-5"
              : "grid-cols-2 sm:grid-cols-4"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-semibold">{stats.totalContributions.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <GitCommit className="size-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Commits:</span>
            <span className="font-semibold">{stats.totalCommits.toLocaleString()}</span>
          </div>
          {stats.totalPrivate > 0 && (
            <div className="flex items-center gap-2" title="Contributions in private repositories">
              <Lock className="size-3 text-muted-foreground" />
              <span className="text-muted-foreground">Private:</span>
              <span className="font-semibold">{stats.totalPrivate.toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <GitPullRequest className="size-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">PRs:</span>
            <span className="font-semibold">{stats.totalPRs.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Issues:</span>
            <span className="font-semibold">{stats.totalIssues.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Main Contribution Graph */}
      <div className="p-5 space-y-2">
        {activities.length > 0 ? (
          <ContributionGraph
            blockMargin={blockMargin}
            blockSize={blockSize}
            className="w-full"
            data={activities}
            labels={{ totalCount: "{{count}} contributions in the past year" }}
          >
            <ContributionGraphCalendar ref={calendarRef}>
              {({ activity, dayIndex, weekIndex }) => (
                <Tooltip key={activity.date} delayDuration={50}>
                  <TooltipTrigger asChild>
                    <ContributionGraphBlock
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                      className="transition-colors hover:stroke-foreground hover:stroke-[1.5px]"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={6} className="text-xs font-mono py-1.5 px-2.5">
                    <span className="font-semibold">
                      {activity.count === 0
                        ? "No contributions"
                        : `${activity.count.toLocaleString()} contribution${activity.count === 1 ? "" : "s"}`}
                    </span>{" "}
                    <span className="opacity-80">
                      on {formatContributionDate(activity.date)}
                    </span>
                  </TooltipContent>
                </Tooltip>
              )}
            </ContributionGraphCalendar>

            {/* Unique Custom Scrollbar / Timeline Scrubber */}
            <ContributionScrollbar containerRef={calendarRef} />

            {showFooter && (
              <ContributionGraphFooter className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <ContributionGraphTotalCount className="text-xs font-mono" />
                {showLegend && <ContributionGraphLegend className="text-xs" />}
              </ContributionGraphFooter>
            )}
          </ContributionGraph>
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No contribution activity recorded for this period.
          </div>
        )}
      </div>

      {isFallback && errorMessage && (
        <div className="px-5 py-2 border-t border-border bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs">
          Notice: {errorMessage}
        </div>
      )}
    </div>
  );
}

export default GitHubContributionGraph;
