"use client";

import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { cursorEnabledAtom, cursorSpeedAtom, cursorHoverScaleAtom, cursorSizeAtom, cursorPointerSizeAtom } from "@/lib/atoms/cursor";

export function CustomCursor() {
  const isEnabled = useAtomValue(cursorEnabledAtom);
  const speed = useAtomValue(cursorSpeedAtom);
  const hoverScale = useAtomValue(cursorHoverScaleAtom);
  const baseSize = useAtomValue(cursorSizeAtom);
  const pointerSize = useAtomValue(cursorPointerSizeAtom);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1);
  const pointerScale = useRef(1);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<HTMLDivElement | null>(null);

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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick, true);
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

      const targetPointerScale = isHoveringRef.current ? 0.3 : 1;
      pointerScale.current += (targetPointerScale - pointerScale.current) * 0.15;

      const targetOpacity = isVisibleRef.current ? 1 : 0;

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

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isEnabled, speed, hoverScale]);

  if (!isEnabled) return null;


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
        className="hidden md:block"
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
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(4px) url(#glass-refract)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 99999,
          boxShadow: "inset 0 4px 12px rgba(255, 255, 255, 0.15), inset 0 -4px 12px rgba(0, 0, 0, 0.25), 0 8px 32px rgba(0, 0, 0, 0.15)",
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease",
        }}
        className="hidden md:block"
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "30%",
            height: "30%",
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      </div>
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
        <defs>
          <filter id="glass-refract">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
