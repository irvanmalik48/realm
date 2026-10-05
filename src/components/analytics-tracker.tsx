"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const SESSION_STORAGE_KEY = "realm_session_id";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sid) {
      sid =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
    }
    return sid;
  } catch {
    return "";
  }
}

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const queryString = searchParams?.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

    // Deduplicate consecutive identical dispatches
    if (lastTrackedPathRef.current === fullPath) {
      return;
    }
    lastTrackedPathRef.current = fullPath;

    const hqBaseUrl =
      process.env.NEXT_PUBLIC_HQ_URL || "http://localhost:3000";

    // Extract post_slug if this is an article page under /blog/
    let postSlug: string | undefined;
    if (pathname.startsWith("/blog/")) {
      const parts = pathname.slice("/blog/".length).split("/");
      if (parts[0] && parts[0].trim().length > 0) {
        postSlug = decodeURIComponent(parts[0].trim());
      }
    }

    const payload = {
      path: fullPath,
      title: typeof document !== "undefined" ? document.title : "",
      post_slug: postSlug || undefined,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      screen_resolution:
        typeof window !== "undefined" && window.screen
          ? `${window.screen.width}x${window.screen.height}`
          : undefined,
      session_id: getOrCreateSessionId(),
    };

    try {
      fetch(`${hqBaseUrl}/api/analytics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "cors",
        keepalive: true,
      }).catch(() => {
        // Silently swallow network anomalies so UX is unaffected
      });
    } catch {
      // Ignore background analytics dispatch failure
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerInner />
    </Suspense>
  );
}
