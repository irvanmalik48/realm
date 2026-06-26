"use client";

import { useEffect, useState, useRef } from "react";
import { useAtomValue } from "jotai";
import { cursorEnabledAtom, cursorSpeedAtom, cursorHoverScaleAtom, cursorSizeAtom } from "@/lib/atoms/cursor";

export function CustomCursor() {
  const isEnabled = useAtomValue(cursorEnabledAtom);
  const speed = useAtomValue(cursorSpeedAtom);
  const hoverScale = useAtomValue(cursorHoverScaleAtom);
  const baseSize = useAtomValue(cursorSizeAtom);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isEnabled, isVisible]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest("a, button, [role='button'], input, select, label, [data-state]");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      document.documentElement.style.cursor = "";
      document.getElementById("custom-cursor-style")?.remove();
      return;
    }

    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.innerHTML = "* { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.cursor = "";
      document.getElementById("custom-cursor-style")?.remove();
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    let rafId: number;

    const updatePosition = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      cursorPos.current.x += (targetX - cursorPos.current.x) * speed;
      cursorPos.current.y += (targetY - cursorPos.current.y) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isEnabled, speed]);

  if (!isEnabled) return null;

  const currentScale = isHovering ? hoverScale : 1;
  const currentSize = baseSize;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        marginLeft: `-${currentSize / 2}px`,
        marginTop: `-${currentSize / 2}px`,
        borderRadius: "50%",
        backgroundColor: "var(--primary)",
        opacity: isVisible ? 0.35 : 0,
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "difference",
        transform: "translate3d(0, 0, 0)",
        transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease, opacity 0.2s ease, scale 0.2s ease",
        scale: currentScale,
        boxShadow: "0 0 12px var(--primary)",
      }}
      className="hidden md:block"
    />
  );
}
