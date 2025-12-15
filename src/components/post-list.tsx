"use client";

import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PostCard } from "@/components/post-card";
import { useBlogContext } from "@/components/blog-context";

export function PostList() {
  const { filteredPosts, searchQuery } = useBlogContext();

  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <AnimatePresence mode="popLayout">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              {...post}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          ))
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-40 flex flex-col items-center justify-center text-muted-foreground gap-2"
          >
            <Search className="size-8 opacity-20" />
            <p className="text-sm">
              No posts found matching &quot;{searchQuery}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
