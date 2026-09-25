"use client";

import { useRef } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { useGitHubContributions } from "@/hooks/use-github";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { ContributionScrollbar, useGrabToPan } from "@/components/github/contribution-scrollbar";
import { cn } from "@/lib/utils";

export const title = "Full-year contribution graph";

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/** Deterministic PRNG so the graph stays stable across SSR/hydration. */
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

const DAYS = 365;

const buildData = () => {
  const rand = mulberry32(0x2026_cafe);
  const data: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  let streakLeft = 0;
  let streakLevel: 0 | 1 | 2 | 3 | 4 = 0;

  for (let i = 0; i < DAYS; i++) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (DAYS - 1 - i));

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

    data.push({
      date: formatDate(date),
      count: level === 0 ? 0 : level + Math.floor(rand() * 4),
      level,
    });
  }

  return data;
};

const fallbackData = buildData();

export interface ContributionGraphStandardProps {
  username?: string;
  className?: string;
}

const Example = ({ username = "irvanmalik48", className }: ContributionGraphStandardProps) => {
  const { data: githubData, isFetching, forceRefresh } = useGitHubContributions(username);
  const calendarRef = useRef<HTMLDivElement>(null);
  useGrabToPan(calendarRef);

  const activities = githubData?.activities && githubData.activities.length > 0
    ? githubData.activities
    : fallbackData;

  return (
    <div className={cn("space-y-3 w-full max-w-5xl", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">
          {githubData?.name ? `${githubData.name} (@${username})` : `@${username}`}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 cursor-pointer"
          onClick={() => forceRefresh()}
          disabled={isFetching}
          title="Refresh contributions (bypasses cache)"
        >
          <RefreshCcw className={cn("size-3.5", isFetching && "animate-spin")} />
          <span className="sr-only">Refresh contributions</span>
        </Button>
      </div>

      <ContributionGraph
        blockMargin={3}
        blockSize={11}
        className="w-full"
        data={activities}
        labels={{ totalCount: "{{count}} contributions in the last year" }}
      >
        <ContributionGraphCalendar
          ref={calendarRef}
          className="cursor-grab active:cursor-grabbing"
        >
          {({ activity, dayIndex, weekIndex }) => (
            <ContributionGraphBlock
              activity={activity}
              dayIndex={dayIndex}
              weekIndex={weekIndex}
              className="transition-colors hover:stroke-foreground hover:stroke-[1.5px]"
            >
              <title>
                {`${activity.count === 0 ? "No" : activity.count} contribution${activity.count === 1 ? "" : "s"} on ${activity.date}`}
              </title>
            </ContributionGraphBlock>
          )}
        </ContributionGraphCalendar>

        {/* Custom Interactive Scrollbar */}
        <ContributionScrollbar containerRef={calendarRef} />

        <ContributionGraphFooter className="flex items-center justify-between pt-2 border-t border-border">
          <ContributionGraphTotalCount />
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
};

export default Example;
