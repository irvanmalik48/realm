"use client";

import ThemeToggleButton from "./ui/theme-toggle-button";
import Link from "next/link";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai";
import { UserNav } from "@/components/user-nav";

export interface FlatNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export interface FlatNavLinkData {
  href: string;
  text: string;
}

export function FlatNavLink({ href, children }: FlatNavLinkProps) {
  return (
    <Link
      href={href}
      prefetch={true}
      className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/40"
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const links: FlatNavLinkData[] = [
    { href: "/blog", text: "Blog" },
    { href: "/about", text: "About" },
    { href: "/settings", text: "Settings" },
  ];

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
        <div className="flex gap-2 sm:gap-3 items-center">
          {links.map((link) => (
            <FlatNavLink key={link.href} href={link.href}>
              {link.text}
            </FlatNavLink>
          ))}
          <div className="h-4 w-px bg-border/60 mx-1 hidden xs:block" />
          <ThemeToggleButton />
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
