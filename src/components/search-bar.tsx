"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBlogContext } from "@/components/blog-context";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useBlogContext();

  return (
    <div className="md:ml-auto relative w-full md:w-72">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 h-9 bg-secondary/50 border-transparent focus-visible:border-ring focus-visible:bg-background transition-all"
      />
    </div>
  );
}
