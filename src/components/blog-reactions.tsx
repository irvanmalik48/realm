"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp,
  Heart,
  Flame,
  Rocket,
  Sparkles,
  PartyPopper,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReactionConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
  activeBgClass: string;
  activeBorderClass: string;
  activeTextClass: string;
}

const REACTION_CONFIGS: ReactionConfig[] = [
  {
    id: "like",
    label: "Like",
    icon: ThumbsUp,
    colorClass: "hover:text-blue-500",
    activeBgClass: "bg-blue-500/10 dark:bg-blue-500/15",
    activeBorderClass: "border-blue-500/40 dark:border-blue-500/50",
    activeTextClass: "text-blue-500 dark:text-blue-400",
  },
  {
    id: "love",
    label: "Love",
    icon: Heart,
    colorClass: "hover:text-rose-500",
    activeBgClass: "bg-rose-500/10 dark:bg-rose-500/15",
    activeBorderClass: "border-rose-500/40 dark:border-rose-500/50",
    activeTextClass: "text-rose-500 dark:text-rose-400",
  },
  {
    id: "fire",
    label: "Awesome",
    icon: Flame,
    colorClass: "hover:text-orange-500",
    activeBgClass: "bg-orange-500/10 dark:bg-orange-500/15",
    activeBorderClass: "border-orange-500/40 dark:border-orange-500/50",
    activeTextClass: "text-orange-500 dark:text-orange-400",
  },
  {
    id: "rocket",
    label: "Inspiring",
    icon: Rocket,
    colorClass: "hover:text-indigo-500",
    activeBgClass: "bg-indigo-500/10 dark:bg-indigo-500/15",
    activeBorderClass: "border-indigo-500/40 dark:border-indigo-500/50",
    activeTextClass: "text-indigo-500 dark:text-indigo-400",
  },
  {
    id: "mindblown",
    label: "Mind Blown",
    icon: Sparkles,
    colorClass: "hover:text-emerald-500",
    activeBgClass: "bg-emerald-500/10 dark:bg-emerald-500/15",
    activeBorderClass: "border-emerald-500/40 dark:border-emerald-500/50",
    activeTextClass: "text-emerald-500 dark:text-emerald-400",
  },
  {
    id: "party",
    label: "Cheers",
    icon: PartyPopper,
    colorClass: "hover:text-amber-500",
    activeBgClass: "bg-amber-500/10 dark:bg-amber-500/15",
    activeBorderClass: "border-amber-500/40 dark:border-amber-500/50",
    activeTextClass: "text-amber-500 dark:text-amber-400",
  },
];

function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("realm_reaction_client_id");
  if (!id) {
    id = "client_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem("realm_reaction_client_id", id);
  }
  return id;
}

export function BlogReactions({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<Record<string, number>>({
    like: 0,
    love: 0,
    fire: 0,
    rocket: 0,
    mindblown: 0,
    party: 0,
  });
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchReactions = useCallback(async () => {
    try {
      const clientId = getOrCreateClientId();
      const res = await fetch(`/api/reactions/${encodeURIComponent(slug)}`, {
        headers: {
          "X-Client-ID": clientId,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reactions) {
          setCounts((prev) => ({ ...prev, ...data.reactions }));
        }
        if (Array.isArray(data.user_reactions)) {
          setUserReactions(data.user_reactions);
        }
        if (typeof data.total_count === "number") {
          setTotalCount(data.total_count);
        }
      }
    } catch {
      // Ignore network errors on fetch
    }
  }, [slug]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const handleToggle = async (reactionId: string) => {
    const isCurrentlyActive = userReactions.includes(reactionId);
    const clientId = getOrCreateClientId();

    // Optimistic UI Update
    setAnimatingId(reactionId);
    setTimeout(() => setAnimatingId(null), 700);

    setUserReactions((prev) =>
      isCurrentlyActive ? prev.filter((id) => id !== reactionId) : [...prev, reactionId],
    );

    setCounts((prev) => ({
      ...prev,
      [reactionId]: Math.max(0, (prev[reactionId] || 0) + (isCurrentlyActive ? -1 : 1)),
    }));

    setTotalCount((prev) => Math.max(0, prev + (isCurrentlyActive ? -1 : 1)));

    try {
      const res = await fetch(`/api/reactions/${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client-ID": clientId,
        },
        body: JSON.stringify({ reaction: reactionId }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reactions) {
          setCounts(data.reactions);
        }
        if (Array.isArray(data.user_reactions)) {
          setUserReactions(data.user_reactions);
        }
        if (typeof data.total_count === "number") {
          setTotalCount(data.total_count);
        }
      }
    } catch {
      // Revert on failure
      fetchReactions();
    }
  };

  return (
    <div className="w-full my-8 p-5 sm:p-6 rounded-xl border border-border/70 bg-card/50 backdrop-blur-xs flex flex-col items-center gap-4 text-center">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">What did you think?</p>
        <p className="text-xs text-muted-foreground">
          Leave a reaction to let the author know how you liked this post!
          {totalCount > 0 && ` (${totalCount} reaction${totalCount === 1 ? "" : "s"})`}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
        {REACTION_CONFIGS.map((config) => {
          const Icon = config.icon;
          const isActive = userReactions.includes(config.id);
          const count = counts[config.id] || 0;
          const isAnimating = animatingId === config.id;

          return (
            <motion.button
              key={config.id}
              onClick={() => handleToggle(config.id)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              title={config.label}
              className={cn(
                "relative group flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer select-none",
                isActive
                  ? cn(
                      config.activeBgClass,
                      config.activeBorderClass,
                      config.activeTextClass,
                      "shadow-xs",
                    )
                  : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
              )}
            >
              {/* Floating +1 / Sparkle Particle Effect */}
              <AnimatePresence>
                {isAnimating && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -24, scale: 1.2 }}
                    exit={{ opacity: 0, y: -32 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn(
                      "pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 font-bold text-xs",
                      config.activeTextClass,
                    )}
                  >
                    +1
                  </motion.div>
                )}
              </AnimatePresence>

              <Icon
                className={cn(
                  "size-4 transition-transform duration-200 group-hover:scale-110",
                  isActive && "fill-current",
                )}
              />

              <span className="font-mono text-xs">{count > 0 ? count : 0}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
