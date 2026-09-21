"use client";

import * as React from "react";
import { Cookie } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "realm_cookie_consent";
const COOKIE_NAME = "realm_cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if user has already responded
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Delay entrance slightly for polished presentation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      document.cookie = `${COOKIE_NAME}=${choice}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
    } catch {
      // Fallback for private browsing restrictions
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Cookie consent banner"
          className={cn(
            "fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-990",
            "max-w-none sm:max-w-[380px] w-auto sm:w-full",
            "p-5 sm:p-5.5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-2xl",
            "flex flex-col gap-3 text-foreground",
          )}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
              We use cookies
            </h3>
            <Cookie className="size-4.5 text-foreground/80 shrink-0" aria-hidden="true" />
          </div>

          <p className="text-xs sm:text-[13px] leading-relaxed text-muted-foreground">
            We use cookies to ensure you get the best experience on our website. For more information on how we use cookies, please see our cookie policy.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => handleChoice("declined")}
              className="w-full py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer text-center"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="w-full py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer text-center shadow-xs"
            >
              Accept
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
