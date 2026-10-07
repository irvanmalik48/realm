"use client";

import { createContext, use, useState, useMemo, ReactNode } from "react";
import Fuse from "fuse.js";
import { PostWithScope } from "@/lib/types/posts";
import { useDebounce } from "@/hooks/use-debounce";

export type SortOption =
  | "most-recent"
  | "oldest"
  | "alpha-asc"
  | "alpha-desc"
  | "longest-read"
  | "shortest-read";

export interface BlogContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  allTags: string[];
  filteredPosts: PostWithScope[];
  paginatedPosts: PostWithScope[];
  totalPosts: number;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
}

const BlogContext = createContext<BlogContextType | null>(null);

export function useBlogContext() {
  const context = use(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
}

interface BlogProviderProps {
  initialPosts: PostWithScope[];
  children: ReactNode;
}

function parseReadingMinutes(readingTime: string): number {
  const match = readingTime.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function getPostLastEditedTime(post: PostWithScope): number {
  const updated = post.updatedAt ? new Date(post.updatedAt).getTime() : 0;
  const created = post.createdAt ? new Date(post.createdAt).getTime() : 0;
  return Math.max(updated, created);
}

function comparePosts(
  a: PostWithScope,
  b: PostWithScope,
  sort: SortOption
): number {
  switch (sort) {
    case "most-recent": {
      return getPostLastEditedTime(b) - getPostLastEditedTime(a);
    }
    case "oldest": {
      const timeA = new Date(a.createdAt || a.updatedAt).getTime();
      const timeB = new Date(b.createdAt || b.updatedAt).getTime();
      return timeA - timeB;
    }
    case "alpha-asc": {
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    }
    case "alpha-desc": {
      return b.title.localeCompare(a.title, undefined, { sensitivity: "base" });
    }
    case "longest-read": {
      const readA = parseReadingMinutes(a.readingTime);
      const readB = parseReadingMinutes(b.readingTime);
      if (readB !== readA) return readB - readA;
      return getPostLastEditedTime(b) - getPostLastEditedTime(a);
    }
    case "shortest-read": {
      const readA = parseReadingMinutes(a.readingTime);
      const readB = parseReadingMinutes(b.readingTime);
      if (readA !== readB) return readA - readB;
      return getPostLastEditedTime(b) - getPostLastEditedTime(a);
    }
    default:
      return 0;
  }
}

export function BlogContextWrapper({
  initialPosts,
  children,
}: BlogProviderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("most-recent");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Extract unique sorted list of tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const post of initialPosts) {
      if (Array.isArray(post.tags)) {
        for (const tag of post.tags) {
          if (tag) tagSet.add(tag);
        }
      }
    }
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [initialPosts]);

  // Pre-configured Fuse.js instance
  const fuse = useMemo(() => {
    return new Fuse(initialPosts, {
      keys: [
        { name: "title", weight: 0.6 },
        { name: "description", weight: 0.3 },
        { name: "tags", weight: 0.4 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    });
  }, [initialPosts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let pool = debouncedQuery.trim()
      ? fuse.search(debouncedQuery.trim()).map((res) => res.item)
      : initialPosts;

    if (selectedTag) {
      pool = pool.filter((p) => p.tags && p.tags.includes(selectedTag));
    }

    return [...pool].sort((a, b) => comparePosts(a, b, sortOption));
  }, [debouncedQuery, selectedTag, sortOption, fuse, initialPosts]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [prevFilterKey, setPrevFilterKey] = useState("");

  const filterKey = `${debouncedQuery}_${selectedTag}_${sortOption}_${pageSize}`;
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  // Compute pagination bounds
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, safePage, pageSize]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedTag || sortOption !== "most-recent"
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
    setSortOption("most-recent");
    setCurrentPage(1);
  };

  return (
    <BlogContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        selectedTag,
        setSelectedTag,
        allTags,
        filteredPosts,
        paginatedPosts,
        totalPosts: initialPosts.length,
        resetFilters,
        hasActiveFilters,
        currentPage: safePage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
