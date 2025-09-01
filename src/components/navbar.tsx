"use client";

import ProgressiveBlur from "./ui/progressive-blur";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { Link } from "next-view-transitions";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai/react";

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
      className="text-primary/75 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const links: FlatNavLinkData[] = [];

  const [performanceMode] = useAtom(performanceModeAtom);

  return (
    <header
      className={`sticky top-0 z-999 w-full border-b ${
        performanceMode ? "bg-background border-border" : "border-transparent"
      }`}
    >
      <section className="relative w-full">
        {!performanceMode && (
          <>
            <div className="lg:hidden absolute z-20 top-0 inset-x-0 h-16 bg-gradient-to-b from-background/80 to-transparent" />
            <ProgressiveBlur className="z-10" height="170%" position="top" />
          </>
        )}
        <nav className="relative z-50 w-full max-w-full mx-auto px-5 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold dark:font-medium text-primary"
          >
            realm.
          </Link>
          <div className="flex gap-5 items-center">
            {links.length > 0 &&
              links.map((link) => (
                <FlatNavLink key={link.href} href={link.href}>
                  {link.text}
                </FlatNavLink>
              ))}
            <ThemeToggleButton variant="circle-blur" start="top-right" />
          </div>
        </nav>
      </section>
    </header>
  );
}
