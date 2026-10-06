"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogContext } from "@/components/blog-context";
import { cn } from "@/lib/utils";

export function BlogPagination() {
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    filteredPosts,
  } = useBlogContext();

  if (filteredPosts.length === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, filteredPosts.length);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    const container = document.getElementById("blog-posts-card");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Generate pagination buttons
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Blog post pagination"
      className="w-full px-3.5 sm:px-5 py-3 border-t border-border bg-secondary/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4"
    >
      <p className="text-2xs sm:text-xs font-mono text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
        Showing <span className="text-foreground font-medium">{startItem}</span>
        –<span className="text-foreground font-medium">{endItem}</span> of{" "}
        <span className="text-foreground font-medium">{filteredPosts.length}</span>{" "}
        {filteredPosts.length === 1 ? "post" : "posts"}
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-1 sm:gap-1.5 order-1 sm:order-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className="h-8 px-2 sm:px-2.5 text-xs font-mono border-border bg-background/80 hover:bg-secondary/60 transition-colors disabled:opacity-40"
          >
            <ChevronLeft className="size-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </Button>

          <div className="flex items-center gap-1">
            {pages.map((p, idx) => {
              if (p === "ellipsis") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-1 text-xs font-mono text-muted-foreground select-none"
                  >
                    …
                  </span>
                );
              }

              const isSelected = p === currentPage;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePageChange(p)}
                  aria-current={isSelected ? "page" : undefined}
                  className={cn(
                    "min-w-8 h-8 px-2 rounded text-xs font-mono transition-all cursor-pointer border flex items-center justify-center",
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold border-primary shadow-xs"
                      : "bg-background/80 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
            className="h-8 px-2 sm:px-2.5 text-xs font-mono border-border bg-background/80 hover:bg-secondary/60 transition-colors disabled:opacity-40"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      )}
    </nav>
  );
}
