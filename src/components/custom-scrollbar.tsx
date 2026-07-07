"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { customScrollbarEnabledAtom } from "@/lib/atoms/scroll";

export function CustomScrollbar() {
  const isEnabled = useAtomValue(customScrollbarEnabledAtom);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ mouseStart: 0, scrollStart: 0 });
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (!isHovered && !isDragging) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }
  };

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

    updateScrollbar();
    window.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isEnabled, isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStartRef.current = {
      mouseStart: e.clientY,
      scrollStart: window.scrollY,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - dragStartRef.current.mouseStart;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      const scrollableTrack = clientHeight - thumbHeight;

      if (scrollableTrack <= 0) return;

      const progressDelta = deltaY / scrollableTrack;
      const newScrollY = Math.min(
        Math.max(dragStartRef.current.scrollStart + progressDelta * maxScroll, 0),
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

  const handleTrackClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      const clickY = e.clientY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      const clickRatio = clickY / clientHeight;

      window.scrollTo({
        top: clickRatio * scrollHeight - clientHeight / 2,
        behavior: "smooth",
      });
    }
  };

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
