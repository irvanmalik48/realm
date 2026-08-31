"use client";

import React from "react";
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  ExternalLink,
  ShieldCheck,
  Zap,
  Server,
  Palette,
  Terminal,
  Activity,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TechItem {
  name: string;
  category: string;
  desc: string;
  url: string;
  badge?: string;
  details: string;
  version?: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: "Next.js 16",
    category: "Framework",
    desc: "App Router, Turbopack, React 19, Server Components & PPR",
    url: "https://nextjs.org",
    badge: "Core",
    details:
      "Modern React framework leveraging Partial Prerendering (PPR), Turbopack bundler, and streaming server components for instant initial page loads.",
    version: "v16.3.0",
  },
  {
    name: "TypeScript",
    category: "Language",
    desc: "Strict type checking across frontend and API models",
    url: "https://www.typescriptlang.org",
    badge: "Strict",
    details:
      "End-to-end type safety guaranteeing interface contracts between the Next.js frontend and Go backend DTOs.",
    version: "v7.0.2",
  },
  {
    name: "Tailwind CSS v4",
    category: "Styling",
    desc: "Next-generation CSS engine with @theme inline variables",
    url: "https://tailwindcss.com",
    badge: "v4.x",
    details:
      "High-speed CSS parser utilizing CSS native cascade layers, modern oklch color gamut, and dynamic theme switching.",
    version: "v4.3.3",
  },
  {
    name: "shadcn/ui",
    category: "UI System",
    desc: "Accessible components built on top of Radix UI primitives",
    url: "https://ui.shadcn.com",
    badge: "New York",
    details:
      "Composable, accessible primitives styled with Tailwind CSS tokens and full keyboard navigation support.",
    version: "Radix UI",
  },
  {
    name: "Framer Motion",
    category: "Animation",
    desc: "Directional navigation, micro-interactions, and transitions",
    url: "https://motion.dev",
    details:
      "Declarative physics-based animations powering route-level view transitions, particle bursts, and smooth layout changes.",
    version: "v12.43.0",
  },
  {
    name: "Lenis",
    category: "Scroll",
    desc: "Smooth momentum-based scrolling with configurable physics",
    url: "https://lenis.darkroom.engineering",
    details:
      "Lightweight smooth scrolling library that synchronizes hardware scroll events while preserving accessibility standards.",
    version: "v1.3.25",
  },
  {
    name: "MDX Remote",
    category: "Content",
    desc: "Interactive Markdown engine with Rehype Pretty Code & KaTeX",
    url: "https://github.com/lucashogberg/next-mdx-remote-client",
    details:
      "High-performance MDX renderer compiling Markdown with syntax highlighting, auto-linked headings, and LaTeX math equations.",
    version: "Client v2",
  },
  {
    name: "Go REST API",
    category: "Backend",
    desc: "High-performance microservice for auth, reactions, and comments",
    url: "https://github.com/irvanmalik48/realm-api",
    badge: "realm-api",
    details:
      "Dedicated backend service built with Go handling authenticated comment threads, multi-emoji reactions, and OAuth session tokens.",
    version: "Go 1.24",
  },
  {
    name: "TanStack Query",
    category: "Data Fetching",
    desc: "Declarative server-state caching and synchronization",
    url: "https://tanstack.com/query",
    details:
      "Robust state management library providing caching, optimistic updates, and background refetching for remote resources.",
    version: "v5.101.4",
  },
  {
    name: "Vercel",
    category: "Hosting",
    desc: "Global Edge delivery and continuous deployments",
    url: "https://vercel.com",
    badge: "Edge",
    details:
      "Global edge deployment platform providing low-latency asset caching, serverless compute, and automated preview builds.",
    version: "Global CDN",
  },
];

const HIGHLIGHT_FEATURES = [
  {
    icon: Zap,
    title: "Partial Prerendering (PPR)",
    description:
      "Instant static shell delivery with dynamic streaming for authenticated sections and live data.",
    details:
      "Combines ultra-fast static HTML edge caching with dynamic React Suspense streaming for user avatars and live interaction states.",
  },
  {
    icon: Workflow,
    title: "Directional View Transitions",
    description:
      "Fluid navigation animations adapting forward/backward spatial motion across routes.",
    details:
      "Utilizes the browser View Transition API with directional slide-and-fade timing variables to produce a native app feel.",
  },
  {
    icon: Activity,
    title: "Live Reaction & Discussion Engine",
    description:
      "Optimistic emoji reactions with physics particles and threaded discussion tree hierarchy.",
    details:
      "Threaded conversation trees with in-place editors, Markdown support, and single-reaction enforcement per account.",
  },
  {
    icon: ShieldCheck,
    title: "OAuth 2.0 & Session Security",
    description:
      "Multi-provider authentication (GitHub and Google) with secure Argon2 password hashing.",
    details:
      "Zero-trust session cookies with cross-origin proxy endpoints, CSRF protection, and Argon2id cryptographic hashing.",
  },
];

const QUICK_BADGES = [
  {
    icon: Terminal,
    label: "Next.js 16.3",
    subtitle: "React Framework",
    details:
      "App Router, Turbopack, Cache Components, and Partial Prerendering on React 19.",
  },
  {
    icon: Cpu,
    label: "React 19.2",
    subtitle: "UI Runtime",
    details:
      "React 19 Server Components, Actions, and compiler-level memoization.",
  },
  {
    icon: Palette,
    label: "Tailwind v4",
    subtitle: "CSS Engine",
    details:
      "Next-generation styling using modern CSS variables with OKLCH color palettes.",
  },
  {
    icon: Layers,
    label: "shadcn/ui",
    subtitle: "Component Primitives",
    details:
      "Accessible, unstyled primitives based on Radix UI styled with design tokens.",
  },
  {
    icon: Server,
    label: "Go API",
    subtitle: "realm-api",
    details:
      "High-throughput standalone REST microservice handling comments, reactions, and auth.",
  },
];

export function AboutSite() {
  return (
    <div className="flex flex-col">
      {/* Philosophy Intro */}
      <div className="p-5 border-b border-border/80 bg-muted/10 flex flex-col gap-3">
        <p className="text-sm text-foreground/90 leading-relaxed">
          <strong className="font-semibold text-foreground">realm.</strong> is a
          carefully crafted digital garden and portfolio engineered for speed,
          aesthetics, and technical transparency. Built with a modern full-stack
          architecture combining React 19 Server Components and a dedicated Go backend
          service.
        </p>

        {/* Quick Tech Badges with HoverCards */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {QUICK_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <HoverCard key={badge.label} openDelay={100} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <span className="inline-flex cursor-help">
                    <Badge
                      variant="secondary"
                      className="font-mono text-xs gap-1.5 py-0.5 hover:bg-muted/80 transition-colors"
                    >
                      <Icon className="size-3 text-primary" />
                      <span>{badge.label}</span>
                    </Badge>
                  </span>
                </HoverCardTrigger>
                <HoverCardContent align="start" className="w-72 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="size-3.5" />
                      </div>
                      <span className="font-semibold text-xs text-foreground">
                        {badge.label}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">
                      {badge.subtitle}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {badge.details}
                  </p>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </div>

      {/* Architectural Highlights */}
      <div className="p-5 border-b border-border/80 flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-2">
          <Sparkles className="size-3.5 text-primary" />
          <span>Architecture & Capabilities</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {HIGHLIGHT_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <HoverCard key={feat.title} openDelay={100} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <div className="rounded-lg border border-border/70 bg-card/40 p-3.5 flex flex-col gap-1.5 shadow-2xs hover:border-border transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 text-foreground font-medium text-xs">
                      <Icon className="size-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-primary transition-colors">
                        {feat.title}
                      </span>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <Icon className="size-4 text-primary" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feat.details}
                  </p>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </div>

      {/* Detailed Tech Stack Grid with HoverCards */}
      <div className="p-5 border-b border-border/80 flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-2">
          <Code2 className="size-3.5 text-primary" />
          <span>Core Technologies</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {TECH_STACK.map((item) => (
            <HoverCard key={item.name} openDelay={100} closeDelay={150}>
              <HoverCardTrigger asChild>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between p-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/50 hover:border-border transition-all duration-150"
                >
                  <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-background border border-border text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground leading-tight truncate">
                      {item.desc}
                    </span>
                  </div>
                  <ExternalLink className="size-3.5 text-muted-foreground/50 group-hover:text-foreground shrink-0 mt-0.5 transition-colors" />
                </a>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-foreground">
                    {item.name}
                  </span>
                  {item.version && (
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {item.version}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.details}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono border-t border-border/60">
                  <span>Category: {item.category}</span>
                  <span className="text-primary hover:underline flex items-center gap-1">
                    Docs <ExternalLink className="size-2.5" />
                  </span>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>

      {/* Source & Open Source Details */}
      <div className="p-5 bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
            <GitBranch className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-semibold text-foreground">
              Open Source & Community Driven
            </p>
            <p className="text-[11px] text-muted-foreground">
              Licensed under{" "}
              <HoverCard openDelay={100} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <span className="underline decoration-dotted underline-offset-2 cursor-help text-foreground/90 hover:text-foreground transition-colors font-medium">
                    RCCL v1.0
                  </span>
                </HoverCardTrigger>
                <HoverCardContent align="start" className="w-80 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-foreground">
                      RCCL Version 1.0
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      License
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Realm Collectives Community License — derived from Raphielscape
                    Public License Version 1.b, ensuring redistribution attribution and
                    preserving open source freedom.
                  </p>
                </HoverCardContent>
              </HoverCard>
              . Inspect, fork, or learn from the code.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <HoverCard openDelay={100} closeDelay={150}>
            <HoverCardTrigger asChild>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs h-8 px-3 cursor-pointer shadow-2xs"
              >
                <a
                  href="https://github.com/irvanmalik48/realm-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <Server data-icon="inline-start" />
                  <span>API Repo</span>
                </a>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-72 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground">
                  irvanmalik48/realm-api
                </span>
                <Badge variant="outline" className="text-[10px] font-mono">
                  Go 1.24
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Go REST backend microservice with SQLite/PostgreSQL storage, Argon2
                auth, and blog comment API endpoints.
              </p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard openDelay={100} closeDelay={150}>
            <HoverCardTrigger asChild>
              <Button
                asChild
                size="sm"
                className="text-xs h-8 px-3 cursor-pointer shadow-2xs"
              >
                <a
                  href="https://github.com/irvanmalik48/realm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <Code2 data-icon="inline-start" />
                  <span>View Source</span>
                </a>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-72 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground">
                  irvanmalik48/realm
                </span>
                <Badge variant="outline" className="text-[10px] font-mono">
                  Next.js 16
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Next.js 16 App Router repository with Tailwind CSS v4, shadcn/ui, and
                MDX blog engine.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}
