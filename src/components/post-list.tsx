"use client";

import { Search } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { useBlogContext } from "@/components/blog-context";

export function PostList() {
  const { filteredPosts, searchQuery } = useBlogContext();

  return (
    <div className="w-full p-5 flex flex-col gap-5">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.slug} {...post} />)
      ) : (
        <div className="w-full h-40 flex flex-col items-center justify-center text-muted-foreground gap-2">
          <Search className="size-8 opacity-20" />
          <p className="text-sm">
            No posts found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
