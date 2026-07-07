"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ mouseStart: 0, scrollStart: 0, maxScroll: 0, scrollableTrack: 0 });
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const isHoveredRef = useRef(isHovered);
  const isDraggingRef = useRef(isDragging);

  useEffect(() => {
    isHoveredRef.current = isHovered;
    isDraggingRef.current = isDragging;
  }, [isHovered, isDragging]);

  const updateScrollbar = () => {
    if (typeof window === "undefined") return;

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    if (scrollHeight <= clientHeight) {
      setThumbHeight(0);
      return;
    }

    const visibleRatio = clientHeight / scrollHeight;
    const calculatedHeight = Math.max(visibleRatio * clientHeight, 40);
    setThumbHeight(calculatedHeight);

    const maxScroll = scrollHeight - clientHeight;
    const scrollProgress = scrollTop / maxScroll;
    const calculatedTop = scrollProgress * (clientHeight - calculatedHeight);
    setThumbTop(calculatedTop);

    setIsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (!isHoveredRef.current && !isDraggingRef.current) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }
  };

  const updateScrollbarRef = useRef(updateScrollbar);
  useEffect(() => {
    updateScrollbarRef.current = updateScrollbar;
  }, [updateScrollbar]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isEnabled && thumbHeight > 0) {
      document.documentElement.classList.add("custom-scrollbar-active");
    } else {
      document.documentElement.classList.remove("custom-scrollbar-active");
    }

    return () => {
      document.documentElement.classList.remove("custom-scrollbar-active");
    };
  }, [isEnabled, thumbHeight]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          updateScrollbarRef.current();
          rafRef.current = null;
        });
      }
    };

    updateScrollbar();
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
  }, [isEnabled]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    dragStartRef.current = {
      mouseStart: e.clientY,
      scrollStart: window.scrollY,
      maxScroll: scrollHeight - clientHeight,
      scrollableTrack: clientHeight - thumbHeight,
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
  }, [isDragging, thumbHeight]);



  if (!isEnabled || thumbHeight === 0) return null;

  return (
    <div
      ref={scrollbarRef}
      className={`fixed top-0 right-0 h-full z-99999 transition-all duration-200 ${
        isHovered || isDragging ? "w-3 bg-secondary/20" : "w-1.5 bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTrackClick}
    >
      <div
        className={`w-full transition-opacity duration-200 cursor-grab active:cursor-grabbing bg-secondary ${
          isVisible || isHovered || isDragging ? "opacity-100" : "opacity-0"
        }`}
        style={{
          position: "absolute",
          height: `${thumbHeight}px`,
          top: `${thumbTop}px`,
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
