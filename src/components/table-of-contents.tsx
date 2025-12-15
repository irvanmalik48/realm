"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeIds, setActiveIds] = useState<string[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    const mapped: Heading[] = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.substring(1)),
    }));
    setHeadings(mapped);

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

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

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
              document.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: "smooth",
              });
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
