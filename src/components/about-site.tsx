import React from "react";
import Link from "next/link";
import {
  Code2,
  Cpu,
  Layers,
  Globe,
  Sparkles,
  GitBranch,
  ExternalLink,
  ShieldCheck,
  Zap,
  Server,
  Palette,
  Terminal,
  Activity,
  FileText,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechItem {
  name: string;
  category: string;
  desc: string;
  url: string;
  badge?: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: "Next.js 16",
    category: "Framework",
    desc: "App Router, Turbopack, React 19, Server Components & PPR",
    url: "https://nextjs.org",
    badge: "Core",
  },
  {
    name: "TypeScript",
    category: "Language",
    desc: "Strict type checking across frontend and API models",
    url: "https://www.typescriptlang.org",
    badge: "Strict",
  },
  {
    name: "Tailwind CSS v4",
    category: "Styling",
    desc: "Next-generation CSS engine with @theme inline variables",
    url: "https://tailwindcss.com",
    badge: "v4.x",
  },
  {
    name: "shadcn/ui",
    category: "UI System",
    desc: "Accessible components built on top of Radix UI primitives",
    url: "https://ui.shadcn.com",
    badge: "New York",
  },
  {
    name: "Framer Motion",
    category: "Animation",
    desc: "Directional navigation, micro-interactions, and transitions",
    url: "https://motion.dev",
  },
  {
    name: "Lenis",
    category: "Scroll",
    desc: "Smooth momentum-based scrolling with configurable physics",
    url: "https://lenis.darkroom.engineering",
  },
  {
    name: "MDX Remote",
    category: "Content",
    desc: "Interactive Markdown engine with Rehype Pretty Code & KaTeX",
    url: "https://github.com/lucashogberg/next-mdx-remote-client",
  },
  {
    name: "Go REST API",
    category: "Backend",
    desc: "High-performance microservice for auth, reactions, and comments",
    url: "https://github.com/irvanmalik48/realm-api",
    badge: "realm-api",
  },
  {
    name: "TanStack Query",
    category: "Data Fetching",
    desc: "Declarative server-state caching and synchronization",
    url: "https://tanstack.com/query",
  },
  {
    name: "Vercel",
    category: "Hosting",
    desc: "Global Edge delivery and continuous deployments",
    url: "https://vercel.com",
    badge: "Edge",
  },
];

const HIGHLIGHT_FEATURES = [
  {
    icon: Zap,
    title: "Partial Prerendering (PPR)",
    description:
      "Instant static shell delivery with dynamic streaming for authenticated sections and live data.",
  },
  {
    icon: Workflow,
    title: "Directional View Transitions",
    description:
      "Fluid navigation animations adapting forward/backward spatial motion across routes.",
  },
  {
    icon: Activity,
    title: "Live Reaction & Discussion Engine",
    description:
      "Optimistic emoji reactions with physics particles and threaded discussion tree hierarchy.",
  },
  {
    icon: ShieldCheck,
    title: "OAuth 2.0 & Session Security",
    description:
      "Multi-provider authentication (GitHub and Google) with secure Argon2 password hashing.",
  },
];

export function AboutSite() {
  return (
    <TooltipProvider>
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
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="secondary" className="font-mono text-xs gap-1.5 py-0.5">
              <Terminal className="size-3 text-primary" />
              <span>Next.js 16.3</span>
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs gap-1.5 py-0.5">
              <Cpu className="size-3 text-primary" />
              <span>React 19.2</span>
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs gap-1.5 py-0.5">
              <Palette className="size-3 text-primary" />
              <span>Tailwind v4</span>
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs gap-1.5 py-0.5">
              <Layers className="size-3 text-primary" />
              <span>shadcn/ui</span>
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs gap-1.5 py-0.5">
              <Server className="size-3 text-primary" />
              <span>Go API</span>
            </Badge>
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
                <div
                  key={feat.title}
                  className="rounded-lg border border-border/70 bg-card/40 p-3.5 flex flex-col gap-1.5 shadow-2xs hover:border-border transition-colors"
                >
                  <div className="flex items-center gap-2 text-foreground font-medium text-xs">
                    <Icon className="size-4 text-primary shrink-0" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Tech Stack Grid */}
        <div className="p-5 border-b border-border/80 flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono flex items-center gap-2">
            <Code2 className="size-3.5 text-primary" />
            <span>Core Technologies</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {TECH_STACK.map((item) => (
              <a
                key={item.name}
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
                  <span className="text-[11px] text-muted-foreground leading-tight">
                    {item.desc}
                  </span>
                </div>
                <ExternalLink className="size-3.5 text-muted-foreground/50 group-hover:text-foreground shrink-0 mt-0.5 transition-colors" />
              </a>
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
                Open Source & Fully Transparent
              </p>
              <p className="text-[11px] text-muted-foreground">
                Licensed under MIT. Feel free to inspect, fork, or learn from the code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
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
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
