"use client";

import { createContext, use, useState, ReactNode } from "react";
import Fuse from "fuse.js";
import { PostWithScope } from "@/lib/types/posts";
import { useDebounce } from "@/hooks/use-debounce";

interface BlogContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPosts: PostWithScope[];
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

export function BlogContextWrapper({
  initialPosts,
  children,
}: BlogProviderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const sortedPosts = initialPosts.toSorted((a, b) => {
    const firstPostTime = new Date(a.updatedAt).getTime();
    const secondPostTime = new Date(b.updatedAt).getTime();
    return firstPostTime > secondPostTime ? -1 : 1;
  });

  const fuse = new Fuse(sortedPosts, {
    keys: ["title", "description", "tags"],
    threshold: 0.3,
    ignoreLocation: true,
  });

  const filteredPosts = debouncedQuery
    ? fuse.search(debouncedQuery).map((result) => result.item)
    : sortedPosts;

  return (
    <BlogContext.Provider
      value={{ searchQuery, setSearchQuery, filteredPosts }}
    >
      {children}
    </BlogContext.Provider>
  );
}
