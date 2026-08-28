"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings?: Heading[];
}

export function TableOfContents({ headings = [] }: TableOfContentsProps) {
  const [activeIds, setActiveIds] = useState<string[]>([]);

  useEffect(() => {
    // Reset scroll to 0 when entering the post page
    if (!window.location.hash) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveIds((prev) => {
          const newSet = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              newSet.add(entry.target.id);
            } else {
              newSet.delete(entry.target.id);
            }
          });
          return Array.from(newSet);
        });
      },
      { rootMargin: "0px 0px -40% 0px" },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="w-64 flex flex-col gap-2">
      <p className="font-semibold mb-2 text-sm text-foreground/80">
        On this page
      </p>
      <div className="flex flex-col text-sm border-r border-border/50">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "relative pr-4 py-1.5 transition-colors hover:text-foreground",
              activeIds.includes(heading.id)
                ? "text-foreground font-medium"
                : "text-muted-foreground",
            )}
            style={{
              paddingLeft: heading.level === 3 ? "2rem" : "1rem",
            }}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById(heading.id);
              if (target) {
                if ((window as any).__lenis) {
                  (window as any).__lenis.scrollTo(target);
                } else {
                  target.scrollIntoView({
                    behavior: "smooth",
                  });
                }
                window.history.pushState(null, "", `#${heading.id}`);
              }
            }}
          >
            {activeIds.includes(heading.id) && (
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-0.5 bg-foreground rounded-l-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
