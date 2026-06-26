"use client";

import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import Lenis from "lenis";
import { smoothScrollAtom, scrollLerpAtom, scrollDurationAtom } from "@/lib/atoms/scroll";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const isEnabled = useAtomValue(smoothScrollAtom);
  const lerp = useAtomValue(scrollLerpAtom);
  const duration = useAtomValue(scrollDurationAtom);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!isEnabled) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: duration,
      lerp: lerp,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

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
    };
  }, [isEnabled, lerp, duration]);

  return <>{children}</>;
}
