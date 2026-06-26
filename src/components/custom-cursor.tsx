"use client";

import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { cursorEnabledAtom, cursorSpeedAtom, cursorHoverScaleAtom, cursorSizeAtom } from "@/lib/atoms/cursor";

export function CustomCursor() {
  const isEnabled = useAtomValue(cursorEnabledAtom);
  const speed = useAtomValue(cursorSpeedAtom);
  const hoverScale = useAtomValue(cursorHoverScaleAtom);
  const baseSize = useAtomValue(cursorSizeAtom);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest("a, button, [role='button'], input, select, label, [data-state]");
      isHoveringRef.current = !!isInteractive;
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

      const targetScale = isHoveringRef.current ? hoverScale : 1;
      currentScale.current += (targetScale - currentScale.current) * 0.15;

      const targetOpacity = isVisibleRef.current ? 0.35 : 0;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) scale(${currentScale.current})`;
        cursorRef.current.style.opacity = String(targetOpacity);
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isEnabled, speed, hoverScale]);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        marginLeft: `-${baseSize / 2}px`,
        marginTop: `-${baseSize / 2}px`,
        borderRadius: "50%",
        backgroundColor: "var(--primary)",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "difference",
        boxShadow: "0 0 12px var(--primary)",
        transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease",
      }}
      className="hidden md:block"
    />
  );
}
