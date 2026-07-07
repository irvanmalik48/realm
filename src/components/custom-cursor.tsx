"use client";

import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { cursorEnabledAtom, cursorSpeedAtom, cursorHoverScaleAtom, cursorSizeAtom, cursorPointerSizeAtom } from "@/lib/atoms/cursor";

export function CustomCursor() {
  const isEnabled = useAtomValue(cursorEnabledAtom);
  const speed = useAtomValue(cursorSpeedAtom);
  const hoverScale = useAtomValue(cursorHoverScaleAtom);
  const baseSize = useAtomValue(cursorSizeAtom);
  const pointerSize = useAtomValue(cursorPointerSizeAtom);

  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(any-pointer: fine)");
    setHasPointer(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setHasPointer(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1);
  const pointerScale = useRef(1);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isEnabled || !hasPointer) return;

    let rafId: number;
    let isLooping = false;

    const updatePosition = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      const dx = targetX - cursorPos.current.x;
      const dy = targetY - cursorPos.current.y;

      const targetScale = isHoveringRef.current ? hoverScale : 1;
      const dScale = targetScale - currentScale.current;

      const targetPointerScale = isHoveringRef.current ? 0.3 : 1;
      const dPointerScale = targetPointerScale - pointerScale.current;

      const targetOpacity = isVisibleRef.current ? 1 : 0;

      if (
        Math.abs(dx) < 0.05 &&
        Math.abs(dy) < 0.05 &&
        Math.abs(dScale) < 0.005 &&
        Math.abs(dPointerScale) < 0.005
      ) {
        cursorPos.current.x = targetX;
        cursorPos.current.y = targetY;
        currentScale.current = targetScale;
        pointerScale.current = targetPointerScale;

        if (trailRef.current) {
          trailRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${targetScale})`;
          trailRef.current.style.opacity = String(targetOpacity * 0.85);
        }
        if (pointerRef.current) {
          pointerRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${targetPointerScale})`;
          pointerRef.current.style.opacity = String(targetOpacity);
        }

        isLooping = false;
        return;
      }

      cursorPos.current.x += dx * speed;
      cursorPos.current.y += dy * speed;
      currentScale.current += dScale * 0.15;
      pointerScale.current += dPointerScale * 0.15;

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) scale(${currentScale.current})`;
        trailRef.current.style.opacity = String(targetOpacity * 0.85);
      }

      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${pointerScale.current})`;
        pointerRef.current.style.opacity = String(targetOpacity);
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
      }
      if (!isLooping) {
        isLooping = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (!isLooping) {
        isLooping = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest("a, button, [role='button'], input, select, label, [data-state]");
      const newHover = !!isInteractive;
      if (newHover !== isHoveringRef.current) {
        isHoveringRef.current = newHover;
        if (!isLooping) {
          isLooping = true;
          rafId = requestAnimationFrame(updatePosition);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const pulse = document.createElement("div");
      pulse.style.position = "fixed";
      pulse.style.top = "0";
      pulse.style.left = "0";
      pulse.style.width = "40px";
      pulse.style.height = "40px";
      pulse.style.marginLeft = "-20px";
      pulse.style.marginTop = "-20px";
      pulse.style.borderRadius = "50%";
      pulse.style.border = "1.5px solid #ffffff";
      pulse.style.pointerEvents = "none";
      pulse.style.zIndex = "99997";
      pulse.style.mixBlendMode = "difference";
      pulse.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(0.5)`;
      pulse.style.opacity = "0.8";
      pulse.style.transition = "transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s cubic-bezier(0.1, 0.8, 0.3, 1)";

      document.body.appendChild(pulse);

      requestAnimationFrame(() => {
        pulse.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(2.5)`;
        pulse.style.opacity = "0";
      });

      setTimeout(() => {
        pulse.remove();
      }, 400);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick, true);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    isLooping = true;
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick, true);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isEnabled, hasPointer, speed, hoverScale]);

  useEffect(() => {
    if (!isEnabled || !hasPointer) {
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
  }, [isEnabled, hasPointer]);



  if (!isEnabled || !hasPointer) return null;


  return (
    <>
      <div
        ref={pointerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${pointerSize}px`,
          height: `${pointerSize}px`,
          marginLeft: `-${pointerSize / 2}px`,
          marginTop: `-${pointerSize / 2}px`,
          borderRadius: "50%",
          backgroundColor: "var(--foreground)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 99998,
        }}
        className="hidden md:block custom-cursor-pointer"
      />
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          marginLeft: `-${baseSize / 2}px`,
          marginTop: `-${baseSize / 2}px`,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          boxShadow: "0 0 16px rgba(255, 255, 255, 0.2)",
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease",
        }}
        className="hidden md:block custom-cursor-trail"
      />
    </>
  );
}
