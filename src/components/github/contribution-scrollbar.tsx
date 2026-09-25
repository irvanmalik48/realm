"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  type PointerEvent,
} from "react";
import { cn } from "@/lib/utils";

export interface ContributionScrollbarProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function ContributionScrollbar({
  containerRef,
  className,
}: ContributionScrollbarProps) {
  const [canScroll, setCanScroll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [thumbRatio, setThumbRatio] = useState(0.2); // fraction of track
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    pointerX: number;
    initialScrollLeft: number;
  }>({ pointerX: 0, initialScrollLeft: 0 });

  // Update metrics based on container scroll/size
  const updateMetrics = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 1) {
      setCanScroll(false);
      setScrollProgress(0);
      setThumbRatio(1);
      return;
    }

    setCanScroll(true);
    setThumbRatio(Math.max(0.12, Math.min(1, clientWidth / scrollWidth)));
    setScrollProgress(Math.max(0, Math.min(1, scrollLeft / maxScroll)));
  }, [containerRef]);

  // Bind scroll & resize listeners
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateMetrics();

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateMetrics();
        rafId = null;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Initial check after hydration/render
    const timer = setTimeout(updateMetrics, 100);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [containerRef, updateMetrics]);

  // Handle pointer down on the draggable thumb
  const handleThumbPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const el = containerRef.current;
    if (!el) return;

    setIsDragging(true);
    dragStartRef.current = {
      pointerX: e.clientX,
      initialScrollLeft: el.scrollLeft,
    };

    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    const onPointerMove = (ev: globalThis.PointerEvent) => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const trackWidth = track.clientWidth;
      const thumbWidth = trackWidth * thumbRatio;
      const availableTrack = trackWidth - thumbWidth;
      if (availableTrack <= 0) return;

      const deltaX = ev.clientX - dragStartRef.current.pointerX;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const scrollDelta = (deltaX / availableTrack) * maxScroll;

      container.scrollLeft = Math.max(
        0,
        Math.min(maxScroll, dragStartRef.current.initialScrollLeft + scrollDelta)
      );
    };

    const onPointerUp = (ev: globalThis.PointerEvent) => {
      setIsDragging(false);
      try {
        target.releasePointerCapture(ev.pointerId);
      } catch {
        // Ignore if pointer capture was already released
      }
      target.removeEventListener("pointermove", onPointerMove);
      target.removeEventListener("pointerup", onPointerUp);
      target.removeEventListener("pointercancel", onPointerUp);
    };

    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerup", onPointerUp);
    target.addEventListener("pointercancel", onPointerUp);
  };

  // Click on track to jump directly
  const handleTrackPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget && (e.target as HTMLElement).closest("[data-thumb]")) {
      return;
    }

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackWidth = rect.width;
    const thumbWidth = trackWidth * thumbRatio;
    const targetCenter = clickX - thumbWidth / 2;
    const availableTrack = trackWidth - thumbWidth;

    if (availableTrack <= 0) return;

    const targetRatio = Math.max(0, Math.min(1, targetCenter / availableTrack));
    const maxScroll = container.scrollWidth - container.clientWidth;

    container.scrollTo({
      left: targetRatio * maxScroll,
      behavior: "smooth",
    });
  };

  if (!canScroll) return null;

  return (
    <div className={cn("w-full pt-2 pb-1 select-none", className)}>
      {/* Scrollbar Track & Draggable Thumb */}
      <div
        ref={trackRef}
        onPointerDown={handleTrackPointerDown}
        className={cn(
          "relative w-full h-1.5 rounded-full cursor-pointer transition-colors",
          "bg-muted/40 hover:bg-muted/60 border border-border/40",
          isDragging && "bg-muted/70"
        )}
        title="Drag or click to scroll timeline"
      >
        {/* Draggable Thumb */}
        <div
          data-thumb
          onPointerDown={handleThumbPointerDown}
          style={{
            width: `${thumbRatio * 100}%`,
            left: `${scrollProgress * (1 - thumbRatio) * 100}%`,
          }}
          className={cn(
            "absolute top-0 bottom-0 rounded-full touch-none",
            "bg-muted-foreground/40 hover:bg-muted-foreground/70 active:bg-muted-foreground/90",
            "transition-[background-color,transform] duration-75 ease-out",
            "cursor-grab active:cursor-grabbing",
            isDragging && "bg-muted-foreground/90 shadow-sm cursor-grabbing scale-y-125"
          )}
        />
      </div>
    </div>
  );
}
