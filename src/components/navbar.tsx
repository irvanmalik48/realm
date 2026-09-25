"use client";

import React, { useMemo } from "react";
import ThemeToggleButton from "./ui/theme-toggle-button";
import Link from "next/link";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai";
import { UserNav } from "@/components/user-nav";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Navbar() {
  const [performanceMode] = useAtom(performanceModeAtom);
  const pathname = usePathname();

  const segments = useMemo(() => {
    return pathname ? pathname.split("/").filter(Boolean) : [];
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-998 w-full border-b ${
        performanceMode
          ? "bg-background border-border"
          : "bg-background/80 backdrop-blur-md border-border/50"
      }`}
      style={{ viewTransitionName: "site-navbar" }}
    >
      <nav className="w-full max-w-full mx-auto px-5 py-3 flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <Link
            href="/"
            prefetch={true}
            transitionTypes={["nav-back"]}
            className="text-xl font-bold dark:font-medium text-primary hover:opacity-90 transition-opacity shrink-0"
          >
            realm.
          </Link>

          {segments.length > 0 && (
            <Breadcrumb className="min-w-0 hidden sm:block">
              <BreadcrumbList className="flex-nowrap items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-mono text-muted-foreground">
                {segments.map((segment, index) => {
                  const href = `/${segments.slice(0, index + 1).join("/")}`;
                  const isLast = index === segments.length - 1;

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbSeparator className="text-muted-foreground/40 shrink-0 [&>svg]:size-3 sm:[&>svg]:size-3.5" />
                      <BreadcrumbItem className="min-w-0 shrink">
                        {isLast ? (
                          <BreadcrumbPage className="font-mono text-xs sm:text-sm text-foreground truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
                            {segment}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link
                              href={href}
                              prefetch={true}
                              className="font-mono text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors truncate max-w-[120px] sm:max-w-[200px] md:max-w-none"
                            >
                              {segment}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>

        <div className="flex gap-2.5 items-center shrink-0">
          <ThemeToggleButton />
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
