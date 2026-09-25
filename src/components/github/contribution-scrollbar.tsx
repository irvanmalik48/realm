"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  type PointerEvent,
} from "react";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    // If clicking directly on thumb, thumb's handler handles it
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

  // Nav buttons
  const scrollStep = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const delta = (el.clientWidth * 0.45) * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const scrollToLatest = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  };

  if (!canScroll) return null;

  return (
    <div
      className={cn(
        "w-full flex items-center gap-2 pt-2 pb-1 select-none",
        className
      )}
    >
      {/* Scroll Left Button */}
      <Button
        variant="ghost"
        size="icon"
        className="size-6 shrink-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 cursor-pointer"
        onClick={() => scrollStep("left")}
        title="Scroll earlier"
      >
        <ChevronLeft className="size-3.5" />
        <span className="sr-only">Scroll earlier</span>
      </Button>

      {/* Track & Draggable Thumb */}
      <div
        ref={trackRef}
        onPointerDown={handleTrackPointerDown}
        className={cn(
          "relative flex-1 h-2 rounded-full cursor-pointer transition-colors",
          "bg-muted/40 hover:bg-muted/60 border border-border/40",
          isDragging && "bg-muted/70"
        )}
        title="Drag or click to jump"
      >
        {/* Subtle quarter markers along track */}
        <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none opacity-20">
          <span className="size-1 rounded-full bg-foreground" />
          <span className="size-1 rounded-full bg-foreground" />
          <span className="size-1 rounded-full bg-foreground" />
          <span className="size-1 rounded-full bg-foreground" />
        </div>

        {/* Thumb */}
        <div
          data-thumb
          onPointerDown={handleThumbPointerDown}
          style={{
            width: `${thumbRatio * 100}%`,
            left: `${scrollProgress * (1 - thumbRatio) * 100}%`,
          }}
          className={cn(
            "absolute top-0 bottom-0 rounded-full touch-none",
            "bg-muted-foreground/40 hover:bg-muted-foreground/70 active:bg-primary",
            "transition-[background-color,transform] duration-75 ease-out",
            "cursor-grab active:cursor-grabbing",
            isDragging && "bg-primary shadow-sm shadow-primary/20 cursor-grabbing scale-y-125"
          )}
        >
          {/* Center Grip Lines */}
          <div className="absolute inset-0 flex items-center justify-center gap-0.5 pointer-events-none opacity-40">
            <span className="w-0.5 h-1.5 bg-background rounded-full" />
            <span className="w-0.5 h-1.5 bg-background rounded-full" />
          </div>
        </div>
      </div>

      {/* Scroll Right Button */}
      <Button
        variant="ghost"
        size="icon"
        className="size-6 shrink-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 cursor-pointer"
        onClick={() => scrollStep("right")}
        title="Scroll later"
      >
        <ChevronRight className="size-3.5" />
        <span className="sr-only">Scroll later</span>
      </Button>

      {/* Jump to Latest Chip */}
      {scrollProgress < 0.95 && (
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-[10px] font-mono shrink-0 rounded-full text-muted-foreground hover:text-foreground border-border/60 hover:bg-muted/60 gap-1 cursor-pointer transition-all"
          onClick={scrollToLatest}
          title="Jump to latest contributions"
        >
          <span>Latest</span>
          <ChevronsRight className="size-2.5" />
        </Button>
      )}
    </div>
  );
}

/**
 * Hook to enable click-and-drag panning on the calendar grid.
 */
export function useGrabToPan(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;
    let hasMoved = false;

    const onMouseDown = (e: MouseEvent) => {
      // Only react to left mouse button
      if (e.button !== 0) return;

      isDown = true;
      hasMoved = false;
      startX = e.pageX - el.offsetLeft;
      scrollLeftStart = el.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;

      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2; // scroll speed multiplier

      if (Math.abs(walk) > 4) {
        hasMoved = true;
        el.style.cursor = "grabbing";
        el.style.userSelect = "none";
        el.scrollLeft = scrollLeftStart - walk;
      }
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = "";
      el.style.removeProperty("user-select");
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [containerRef]);
}
