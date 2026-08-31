"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp,
  Heart,
  Flame,
  ThumbsDown,
  Frown,
  Skull,
  type LucideIcon,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

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
  // 3 Positive Reactions
  {
    id: "like",
    label: "Like",
    icon: ThumbsUp,
    colorClass: "hover:text-blue-500",
    activeBgClass: "bg-blue-500/10 dark:bg-blue-500/20",
    activeBorderClass: "border-blue-500/50",
    activeTextClass: "text-blue-500 dark:text-blue-400",
  },
  {
    id: "love",
    label: "Love",
    icon: Heart,
    colorClass: "hover:text-rose-500",
    activeBgClass: "bg-rose-500/10 dark:bg-rose-500/20",
    activeBorderClass: "border-rose-500/50",
    activeTextClass: "text-rose-500 dark:text-rose-400",
  },
  {
    id: "fire",
    label: "Fire",
    icon: Flame,
    colorClass: "hover:text-orange-500",
    activeBgClass: "bg-orange-500/10 dark:bg-orange-500/20",
    activeBorderClass: "border-orange-500/50",
    activeTextClass: "text-orange-500 dark:text-orange-400",
  },
  // 3 Negative / Critical Reactions
  {
    id: "dislike",
    label: "Dislike",
    icon: ThumbsDown,
    colorClass: "hover:text-slate-400",
    activeBgClass: "bg-slate-500/10 dark:bg-slate-500/20",
    activeBorderClass: "border-slate-500/50",
    activeTextClass: "text-slate-400 dark:text-slate-300",
  },
  {
    id: "frown",
    label: "Meh",
    icon: Frown,
    colorClass: "hover:text-amber-500",
    activeBgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    activeBorderClass: "border-amber-500/50",
    activeTextClass: "text-amber-500 dark:text-amber-400",
  },
  {
    id: "skull",
    label: "Dead",
    icon: Skull,
    colorClass: "hover:text-purple-500",
    activeBgClass: "bg-purple-500/10 dark:bg-purple-500/20",
    activeBorderClass: "border-purple-500/50",
    activeTextClass: "text-purple-500 dark:text-purple-400",
  },
];

export function BlogReactions({ slug }: { slug: string }) {
  const { user } = useAuth();
  const [counts, setCounts] = useState<Record<string, number>>({
    like: 0,
    love: 0,
    fire: 0,
    dislike: 0,
    frown: 0,
    skull: 0,
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchReactions = useCallback(async () => {
    try {
      const res = await fetch(`/api/reactions/${encodeURIComponent(slug)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.reactions) {
          setCounts((prev) => ({ ...prev, ...data.reactions }));
        }
        if (typeof data.user_reaction !== "undefined") {
          setUserReaction(data.user_reaction);
        } else if (Array.isArray(data.user_reactions) && data.user_reactions.length > 0) {
          setUserReaction(data.user_reactions[0]);
        } else {
          setUserReaction(null);
        }
        if (typeof data.total_count === "number") {
          setTotalCount(data.total_count);
        }
      }
    } catch {
      // Ignore network errors on initial fetch
    }
  }, [slug]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions, user]);

  const handleToggle = async (reactionId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "You must be signed in to react to posts.",
      });
      return;
    }

    const previousReaction = userReaction;
    const isUnsetting = previousReaction === reactionId;

    // Optimistic UI Update (one reaction per account per post)
    setAnimatingId(reactionId);
    setTimeout(() => setAnimatingId(null), 700);

    if (isUnsetting) {
      // Toggle off current reaction
      setUserReaction(null);
      setCounts((prev) => ({
        ...prev,
        [reactionId]: Math.max(0, (prev[reactionId] || 0) - 1),
      }));
      setTotalCount((prev) => Math.max(0, prev - 1));
    } else {
      // Set or switch to new reaction
      setUserReaction(reactionId);
      setCounts((prev) => {
        const updated = { ...prev };
        if (previousReaction && updated[previousReaction] > 0) {
          updated[previousReaction] -= 1;
        }
        updated[reactionId] = (updated[reactionId] || 0) + 1;
        return updated;
      });
      if (!previousReaction) {
        setTotalCount((prev) => prev + 1);
      }
    }

    try {
      const res = await fetch(`/api/reactions/${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reaction: reactionId }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reactions) {
          setCounts(data.reactions);
        }
        if (typeof data.user_reaction !== "undefined") {
          setUserReaction(data.user_reaction);
        } else if (data.active) {
          setUserReaction(data.reaction);
        } else {
          setUserReaction(null);
        }
        if (typeof data.total_count === "number") {
          setTotalCount(data.total_count);
        }
      } else {
        const err = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Reaction failed",
          description: err.error || "Could not update reaction.",
        });
        fetchReactions();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Failed to connect to reaction service.",
      });
      fetchReactions();
    }
  };

  return (
    <div className="w-full my-8 p-5 sm:p-6 rounded-xl border border-border/70 bg-card/50 backdrop-blur-xs flex flex-col items-center gap-4 text-center">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">How did you find this article?</p>
        <p className="text-xs text-muted-foreground">
          {user
            ? "Leave a reaction below (1 reaction per account)"
            : "Sign in to leave a reaction on this post"}
          {totalCount > 0 && ` • ${totalCount} reaction${totalCount === 1 ? "" : "s"}`}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
        {REACTION_CONFIGS.map((config) => {
          const Icon = config.icon;
          const isActive = userReaction === config.id;
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
              {/* Floating +1 Particle Effect */}
              <AnimatePresence>
                {isAnimating && isActive && (
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
                  isActive && "fill-current/20",
                )}
              />

              <span className="font-mono text-xs">{count > 0 ? count : 0}</span>
            </motion.button>
          );
        })}
      </div>

      {!user && (
        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
          >
            <LogIn className="size-3.5" />
            <span>Sign in to react</span>
          </Link>
        </div>
      )}
    </div>
  );
}
