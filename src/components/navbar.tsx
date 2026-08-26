"use client";

import ThemeToggleButton from "./ui/theme-toggle-button";
import Link from "next/link";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai";
import { UserNav } from "@/components/user-nav";

export function Navbar() {
  const [performanceMode] = useAtom(performanceModeAtom);

  return (
    <header
      className={`sticky top-0 z-998 w-full border-b ${
        performanceMode
          ? "bg-background border-border"
          : "bg-background/80 backdrop-blur-md border-border/50"
      }`}
      style={{ viewTransitionName: "site-navbar" }}
    >
      <nav className="w-full max-w-full mx-auto px-5 py-3 flex justify-between items-center">
        <Link
          href="/"
          prefetch={true}
          transitionTypes={["nav-back"]}
          className="text-xl font-bold dark:font-medium text-primary hover:opacity-90 transition-opacity"
        >
          realm.
        </Link>
        <div className="flex gap-2.5 items-center">
          <ThemeToggleButton />
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
