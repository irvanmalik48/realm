"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAtomValue } from "jotai";
import { customScrollbarEnabledAtom } from "@/lib/atoms/scroll";

const handleTrackClick = (e: React.MouseEvent) => {
  if (e.target === e.currentTarget) {
    const clickY = e.clientY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const clickRatio = clickY / clientHeight;

    window.scrollTo({
      top: clickRatio * scrollHeight - clientHeight / 2,
      behavior: "smooth",
    });
  }
};

export function CustomScrollbar() {
  const isEnabled = useAtomValue(customScrollbarEnabledAtom);
  const [hasThumb, setHasThumb] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const thumbHeightRef = useRef(0);
  const dragStartRef = useRef({ mouseStart: 0, scrollStart: 0, maxScroll: 0, scrollableTrack: 0 });
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const isHoveredRef = useRef(isHovered);
  const isDraggingRef = useRef(isDragging);

  useEffect(() => {
    isHoveredRef.current = isHovered;
    isDraggingRef.current = isDragging;
    if (thumbRef.current && (isHovered || isDragging)) {
      thumbRef.current.style.opacity = "1";
    }
  }, [isHovered, isDragging]);

  const updateScrollbar = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    if (scrollHeight <= clientHeight) {
      if (hasThumb) setHasThumb(false);
      return;
    }

    if (!hasThumb) setHasThumb(true);

    const visibleRatio = clientHeight / scrollHeight;
    const calculatedHeight = Math.max(visibleRatio * clientHeight, 40);
    const maxScroll = scrollHeight - clientHeight;
    const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    const calculatedTop = scrollProgress * (clientHeight - calculatedHeight);

    thumbHeightRef.current = calculatedHeight;

    if (thumbRef.current) {
      thumbRef.current.style.height = `${calculatedHeight}px`;
      thumbRef.current.style.transform = `translate3d(0, ${calculatedTop}px, 0)`;
      thumbRef.current.style.opacity = "1";
    }

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (!isHoveredRef.current && !isDraggingRef.current) {
      hideTimeoutRef.current = setTimeout(() => {
        if (thumbRef.current && !isHoveredRef.current && !isDraggingRef.current) {
          thumbRef.current.style.opacity = "0";
        }
      }, 1500);
    }
  }, [hasThumb]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isEnabled && hasThumb) {
      document.documentElement.classList.add("custom-scrollbar-active");
    } else {
      document.documentElement.classList.remove("custom-scrollbar-active");
    }

    return () => {
      document.documentElement.classList.remove("custom-scrollbar-active");
    };
  }, [isEnabled, hasThumb]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          updateScrollbar();
          rafRef.current = null;
        });
      }
    };

    requestAnimationFrame(() => {
      updateScrollbar();
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isEnabled, updateScrollbar]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const currentThumbHeight = thumbHeightRef.current || 40;
    dragStartRef.current = {
      mouseStart: e.clientY,
      scrollStart: window.scrollY,
      maxScroll: scrollHeight - clientHeight,
      scrollableTrack: clientHeight - currentThumbHeight,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { mouseStart, scrollStart, maxScroll, scrollableTrack } = dragStartRef.current;

      if (scrollableTrack <= 0) return;

      const deltaY = e.clientY - mouseStart;
      const progressDelta = deltaY / scrollableTrack;
      const newScrollY = Math.min(
        Math.max(scrollStart + progressDelta * maxScroll, 0),
        maxScroll
      );

      window.scrollTo(0, newScrollY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isEnabled || !hasThumb) return null;

  return (
    <div
      ref={scrollbarRef}
      className={`fixed top-0 right-0 h-full z-99999 transition-all duration-200 ${
        isHovered || isDragging ? "w-3 bg-secondary/20" : "w-1.5 bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTrackClick}
      role="button"
      tabIndex={-1}
      aria-label="Custom scrollbar track"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleTrackClick(e as any);
        }
      }}
    >
      <div
        ref={thumbRef}
        className="w-full transition-opacity duration-200 cursor-grab active:cursor-grabbing bg-secondary absolute top-0 left-0 opacity-0 will-change-transform"
        onMouseDown={handleMouseDown}
        role="button"
        tabIndex={-1}
        aria-label="Custom scrollbar thumb"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            window.scrollBy({ top: 40 });
          } else if (e.key === "ArrowUp") {
            window.scrollBy({ top: -40 });
          }
        }}
      />
    </div>
  );
}
