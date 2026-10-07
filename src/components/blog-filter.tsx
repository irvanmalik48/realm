"use client";

import * as React from "react";
import {
  ArrowDownAZ,
  ArrowUpZA,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Hourglass,
  RotateCcw,
  Tag,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SortOption,
  useBlogContext,
} from "@/components/blog-context";
import { cn } from "@/lib/utils";

interface SortItemConfig {
  value: SortOption;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const SORT_OPTIONS: SortItemConfig[] = [
  {
    value: "most-recent",
    label: "Most Recent",
    shortLabel: "Recent",
    icon: Clock,
    description: "Most recently edited or published first",
  },
  {
    value: "oldest",
    label: "Oldest First",
    shortLabel: "Oldest",
    icon: Hourglass,
    description: "Chronological earliest first",
  },
  {
    value: "alpha-asc",
    label: "Alphabetical (A → Z)",
    shortLabel: "A → Z",
    icon: ArrowDownAZ,
    description: "Title alphabetical ascending",
  },
  {
    value: "alpha-desc",
    label: "Alphabetical (Z → A)",
    shortLabel: "Z → A",
    icon: ArrowUpZA,
    description: "Title alphabetical descending",
  },
  {
    value: "longest-read",
    label: "Longest Read",
    shortLabel: "Longest",
    icon: BookOpen,
    description: "Highest reading duration first",
  },
  {
    value: "shortest-read",
    label: "Shortest Read",
    shortLabel: "Shortest",
    icon: Zap,
    description: "Quickest reads first",
  },
];

export function BlogSortDropdown() {
  const { sortOption, setSortOption } = useBlogContext();

  const currentOption =
    SORT_OPTIONS.find((opt) => opt.value === sortOption) || SORT_OPTIONS[0];
  const ActiveIcon = currentOption.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-2.5 sm:px-3 gap-1.5 sm:gap-2 text-xs font-mono border-border bg-secondary/30 hover:bg-secondary/60 transition-colors shrink-0"
        >
          <ActiveIcon className="size-3.5 text-muted-foreground shrink-0" />
          <span className="hidden sm:inline truncate max-w-36 md:max-w-none">
            {currentOption.label}
          </span>
          <span className="inline sm:hidden">{currentOption.shortLabel}</span>
          <ChevronDown className="size-3.5 opacity-50 ml-0.5 sm:ml-1 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1 bg-popover border border-border shadow-lg">
        <DropdownMenuLabel className="text-2xs font-mono text-muted-foreground uppercase tracking-wider px-2 py-1.5">
          Sort Articles
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {SORT_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = sortOption === opt.value;
          return (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => setSortOption(opt.value)}
              className={cn(
                "flex items-center justify-between text-xs py-2 px-2.5 rounded-sm cursor-pointer transition-colors",
                isSelected
                  ? "bg-accent text-accent-foreground font-medium"
                  : "hover:bg-accent/60"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("size-3.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                <span>{opt.label}</span>
              </div>
              {isSelected && <Check className="size-3.5 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function BlogCountBadge() {
  const { filteredPosts, totalPosts, hasActiveFilters, resetFilters } = useBlogContext();

  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-2xs font-mono px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/50 shrink-0">
        {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
        {hasActiveFilters && filteredPosts.length !== totalPosts && (
          <span className="text-muted-foreground ml-1">of {totalPosts}</span>
        )}
      </span>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetFilters}
          title="Reset all filters and sorting"
          className="text-2xs font-mono flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-secondary/60 shrink-0"
        >
          <RotateCcw className="size-3 shrink-0" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}

export function BlogTagFilters() {
  const { allTags, selectedTag, setSelectedTag } = useBlogContext();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  if (allTags.length === 0) return null;

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current && e.deltaY !== 0) {
      if (scrollRef.current.scrollWidth > scrollRef.current.clientWidth) {
        scrollRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      onWheel={handleWheel}
      className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1 text-xs"
    >
      <div className="flex items-center gap-1 text-muted-foreground shrink-0 mr-1 text-2xs font-mono uppercase tracking-wider">
        <Tag className="size-3 shrink-0" />
        <span>Tags:</span>
      </div>

      <button
        type="button"
        onClick={() => setSelectedTag(null)}
        className={cn(
          "px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer border",
          selectedTag === null
            ? "bg-foreground text-background font-semibold border-foreground"
            : "bg-secondary/40 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
        )}
      >
        All
      </button>

      {allTags.map((tag) => {
        const isSelected = selectedTag === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(isSelected ? null : tag)}
            className={cn(
              "px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer border",
              isSelected
                ? "bg-primary text-primary-foreground font-semibold border-primary shadow-xs"
                : "bg-secondary/40 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
