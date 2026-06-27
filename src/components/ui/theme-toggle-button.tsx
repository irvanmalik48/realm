"use client";

import React from "react";
import { flushSync } from "react-dom";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import darkModeToggleAnimation from "@/lib/atoms/fade";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";

import {
  AnimationStart,
  AnimationVariant,
  createAnimation,
} from "./theme-animations";

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant;
  start?: AnimationStart;
  showLabel?: boolean;
  url?: string;
}

export default function ThemeToggleButton({
  variant = "circle-blur",
  start = "top-left",
  showLabel = false,
  url = "",
}: ThemeToggleAnimationProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [darkModeAnim] = useAtom(darkModeToggleAnimation);

  const styleId = "theme-transition-styles";

  const updateStyles = React.useCallback((css: string, name: string): void => {
    if (typeof window === "undefined") return;

    let styleElement = document.getElementById(
      styleId,
    ) as HTMLStyleElement | null;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, url, darkModeAnim);

    updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const disableTransitions = document.createElement("style");
    disableTransitions.textContent = `*, *::before, *::after { transition: none !important; }`;
    document.head.appendChild(disableTransitions);

    const currentTheme = resolvedTheme || theme;
    const targetTheme = currentTheme === "dark" ? "light" : "dark";

    const switchTheme = async () => {
      setTheme(targetTheme);

      const checkTheme = () => {
        const hasDark = document.documentElement.classList.contains("dark");
        return (hasDark ? "dark" : "light") === targetTheme;
      };

      if (checkTheme()) {
        document.documentElement.style.colorScheme = targetTheme;
        return;
      }

      await new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
          if (checkTheme()) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 150);
      });

      document.documentElement.style.colorScheme = targetTheme;
    };

    if (!document.startViewTransition) {
      switchTheme().then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            disableTransitions.remove();
            document.getElementById(styleId)?.remove();
          });
        });
      });
      return;
    }

    const transition = document.startViewTransition(switchTheme);

    const cleanup = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          disableTransitions.remove();
          document.getElementById(styleId)?.remove();
        });
      });
    };
    transition.finished.then(cleanup).catch(cleanup);
  }, [theme, resolvedTheme, setTheme, darkModeAnim, variant, start, url, updateStyles]);

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
      <span className="sr-only">Theme Toggle </span>
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
