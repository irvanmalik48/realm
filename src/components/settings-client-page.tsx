"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/container";
import { ImageComponent } from "@/components/image";
import { Settings, Search, Sliders, PlayCircle, MousePointer, Activity, X } from "lucide-react";
import CuteImage from "@/assets/img/awoocon.jpg";
import { PerformanceModeToggle } from "@/components/performance-mode-toggle";
import { MarqueeToggle } from "@/components/marquee-toggle";
import { ScrollSettingsToggle } from "@/components/scroll-settings-toggle";
import { CursorSettingsToggle } from "@/components/cursor-settings-toggle";

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: "performance", label: "Performance", icon: Activity },
  { id: "behavior", label: "Behavior", icon: PlayCircle },
  { id: "scrolling", label: "Scrolling", icon: Sliders },
  { id: "cursor", label: "Cursor", icon: MousePointer },
];

export function SettingsClientPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("performance");

  const matchQuery = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const hasPerformanceMatch = matchQuery("Performance Mode") || 
    matchQuery("Turn off unneccessary effects to improve performance on lower-end devices.") ||
    matchQuery("optimization lag effects battery slow");

  const hasBehaviorMatch = matchQuery("Toggle Marquee") || 
    matchQuery("Enable or disable the scrolling marquee effect on the homepage's footer top.") ||
    matchQuery("marquee scrolling text animation footer");

  const hasScrollingMatch = matchQuery("Smooth Scrolling") || 
    matchQuery("Enable smooth inertia-based scrolling using Lenis.") ||
    matchQuery("Scroll Velocity (Lerp)") ||
    matchQuery("Scroll Duration (Acceleration)") ||
    matchQuery("Custom Scrollbar") ||
    matchQuery("smooth scrolling scroll inertia lenis lerp velocity speed scroll speed easing acceleration custom scrollbar scrollbar styling");

  const hasCursorMatch = matchQuery("Custom Cursor (Orb)") || 
    matchQuery("Follow-up Speed") ||
    matchQuery("Hover Scale") ||
    matchQuery("Pointer Orb Size") ||
    matchQuery("Trail Orb Size (Delayed)") ||
    matchQuery("custom cursor cursor orb mouse pointer follow-up speed speed latency hover scale cursor hover hover size pointer size leading orb trail size trailing orb");

  const visibleCategories = categories.filter((cat) => {
    if (cat.id === "performance") return hasPerformanceMatch;
    if (cat.id === "behavior") return hasBehaviorMatch;
    if (cat.id === "scrolling") return hasScrollingMatch;
    if (cat.id === "cursor") return hasCursorMatch;
    return true;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    visibleCategories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => {
      visibleCategories.forEach((cat) => {
        const el = document.getElementById(cat.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [searchQuery, visibleCategories.length]);

  const handleCategoryClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(id);
    }
  };

  return (
    <main className="w-full flex flex-col gap-5 py-5">
      <div className="w-full max-w-3xl mx-auto px-5">
        <div className="relative rounded-lg overflow-clip mb-6">
          <ImageComponent
            img={CuteImage}
            alt="Awoo"
            className="w-full relative max-h-96 z-10 rounded-lg"
            innerClassName="md:-translate-y-8"
            height={720}
          />
          <p className="z-20 md:w-fit w-3/4 text-center font-bold absolute bottom-3 left-1/2 rounded-full -translate-x-1/2 px-7 py-3 font-doto bg-background/80 text-foreground md:text-xl backdrop-blur-lg">
            SETTINGS
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-5 flex flex-col md:flex-row gap-6 items-start">
        {/* Sidenav Sidebar Column */}
        {visibleCategories.length > 0 && (
          <aside className="w-full md:w-64 shrink-0 sticky top-18 z-30 hidden md:block">
            <div className="bg-background rounded-lg border border-border p-4 flex flex-col gap-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                Categories
              </p>
              {visibleCategories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all cursor-pointer text-left ${
                      isActive
                        ? "bg-primary text-primary-foreground font-medium shadow-xs"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <IconComponent className="size-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Main Content Column */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {/* Search bar widget */}
          <div className="w-full sticky top-18 z-40 bg-background/95 backdrop-blur-md py-2 border-b border-border/40 md:border md:rounded-lg md:px-4 md:py-3 md:shadow-xs">
            <div className="relative w-full flex items-center">
              <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search settings (e.g. cursor, scroll, lerp...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-muted/30 border border-border rounded-md text-sm outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 p-0.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Settings Section Group */}
          <div className="w-full flex flex-col gap-6">
            {visibleCategories.length === 0 ? (
              <div className="w-full text-center py-12 border border-dashed border-border rounded-lg bg-muted/10">
                <Settings className="size-8 text-muted-foreground/60 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No matching settings found.</p>
                <p className="text-xs text-muted-foreground/80 mt-1">
                  Try searching for keywords like &quot;scrolling&quot;, &quot;cursor&quot;, or &quot;marquee&quot;.
                </p>
              </div>
            ) : (
              visibleCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <section
                    key={cat.id}
                    id={cat.id}
                    className="w-full bg-background rounded-lg border border-border scroll-mt-20 overflow-hidden"
                  >
                    <h2 className="w-full flex items-center gap-3 text-foreground font-semibold px-5 py-4 border-b border-border bg-muted/20">
                      <IconComponent className="size-4 text-primary" />
                      <span>{cat.label} Settings</span>
                    </h2>
                    <div className="w-full divide-y divide-border/50 bg-background">
                      {cat.id === "performance" && (
                        <PerformanceModeToggle searchQuery={searchQuery} />
                      )}
                      {cat.id === "behavior" && (
                        <MarqueeToggle searchQuery={searchQuery} />
                      )}
                      {cat.id === "scrolling" && (
                        <ScrollSettingsToggle searchQuery={searchQuery} />
                      )}
                      {cat.id === "cursor" && (
                        <CursorSettingsToggle searchQuery={searchQuery} />
                      )}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
