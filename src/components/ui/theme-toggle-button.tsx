"use client";

import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export interface ThemeToggleAnimationProps {
  variant?: string;
  start?: string;
  showLabel?: boolean;
  url?: string;
}

export default function ThemeToggleButton({
  variant,
  start,
  showLabel = false,
  url = "",
}: ThemeToggleAnimationProps = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const toggleTheme = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning || typeof window === "undefined") return;

    setIsTransitioning(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    const currentTheme = resolvedTheme || theme;
    const targetTheme = currentTheme === "dark" ? "light" : "dark";

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = `${y}px`;
    overlay.style.left = `${x}px`;
    overlay.style.width = "0px";
    overlay.style.height = "0px";
    overlay.style.borderRadius = "50%";
    overlay.style.backgroundColor = targetTheme === "dark" ? "#09090b" : "#ffffff";
    overlay.style.transform = "translate(-50%, -50%)";
    overlay.style.zIndex = "999999";
    overlay.style.pointerEvents = "none";
    overlay.style.filter = "blur(15px)";
    overlay.style.transition = "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

    document.body.appendChild(overlay);

    // Force layout reflow
    overlay.offsetWidth;

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    ) * 2.2;

    overlay.style.width = `${maxRadius}px`;
    overlay.style.height = `${maxRadius}px`;

    const root = document.documentElement;
    root.classList.add("theme-transitioning");

    setTimeout(() => {
      setTheme(targetTheme);
    }, 250);

    setTimeout(() => {
      overlay.style.transition = "opacity 0.4s ease";
      overlay.style.opacity = "0";
    }, 600);

    setTimeout(() => {
      overlay.remove();
      root.classList.remove("theme-transitioning");
      setIsTransitioning(false);
    }, 1000);
  }, [theme, resolvedTheme, setTheme, isTransitioning]);

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="w-9 p-0 h-9 relative group cursor-pointer transition-colors"
      name="Theme Toggle Button"
    >
      <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Theme Toggle</span>
      {showLabel && (
        <>
          <span className="hidden group-hover:block border rounded-full px-2 absolute -top-10">
            {" "}
            variant = {variant}
          </span>
          <span className="hidden group-hover:block border rounded-full px-2 absolute -bottom-10">
            {" "}
            start = {start}
          </span>
        </>
      )}
    </Button>
  );
}
