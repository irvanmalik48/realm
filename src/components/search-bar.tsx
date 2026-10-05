"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBlogContext } from "@/components/blog-context";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useBlogContext();

  return (
    <div className="relative w-full sm:w-64 md:w-72">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <Input
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 pr-8 h-9 text-xs bg-secondary/40 border-border/50 focus-visible:border-ring focus-visible:bg-background transition-colors"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          title="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}
