"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import Lenis from "lenis";
import { smoothScrollAtom, scrollLerpAtom, scrollDurationAtom } from "@/lib/atoms/scroll";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const isEnabled = useAtomValue(smoothScrollAtom);
  const lerp = useAtomValue(scrollLerpAtom);
  const duration = useAtomValue(scrollDurationAtom);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isEnabled) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        if (typeof window !== "undefined") {
          (window as any).__lenis = null;
        }
      }
      return;
    }

    const lenis = new Lenis({
      duration: duration,
      lerp: lerp,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as any).__lenis = lenis;
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        (window as any).__lenis = null;
      }
    };
  }, [isEnabled, lerp, duration]);

  useEffect(() => {
    if (!window.location.hash) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return <>{children}</>;
}
