import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  FolderGit2, 
  Plus, 
  ExternalLink, 
  GitBranch, 
  Sparkles, 
  Activity, 
  Clock, 
  ArrowLeft,
  CheckCircle2,
  Server,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirectionalTransition } from "@/components/directional-transition";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Project dashboard and deployment overview.",
};

interface Project {
  id: string;
  name: string;
  description: string;
  repo: string;
  branch: string;
  status: "deployed" | "building" | "active";
  updatedAt: string;
  stars: number;
  language: string;
}

// Cached project list to ensure it is part of the instant UI shell
async function getProjects(): Promise<Project[]> {
  "use cache";
  return [
    {
      id: "realm-api",
      name: "realm-api",
      description: "High-performance Go backend service with PostgreSQL, Redis cache, and zstd storage.",
      repo: "irvanmalik48/realm-api",
      branch: "main",
      status: "deployed",
      updatedAt: "Just now",
      stars: 12,
      language: "Go",
    },
    {
      id: "realm-reference",
      name: "realm-reference",
      description: "Next.js 16 App Router client with Cache Components and Partial Prefetching.",
      repo: "irvanmalik48/realm",
      branch: "main",
      status: "active",
      updatedAt: "2 mins ago",
      stars: 28,
      language: "TypeScript",
    },
    {
      id: "gnuweeb-infra",
      name: "gnuweeb-infra",
      description: "Self-hosted infrastructure configuration, Docker compose stacks, and reverse proxy.",
      repo: "gnuweeb/infra",
      branch: "master",
      status: "deployed",
      updatedAt: "1 day ago",
      stars: 9,
      language: "HCL / Shell",
    },
    {
      id: "lappland-core",
      name: "lappland-core",
      description: "Personal automation tooling, system agents, and terminal customization suite.",
      repo: "irvanmalik48/lappland",
      branch: "main",
      status: "active",
      updatedAt: "3 days ago",
      stars: 15,
      language: "Rust",
    },
  ];
}

// Instant Header component
function DashboardHeader() {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Link
            href="/settings"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
          >
            <ArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" />
            <span>Settings</span>
          </Link>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs font-semibold text-primary">Dashboard</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          Projects & Overview
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Instant workspace console with cached project registry and streaming activity telemetry.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link href="/settings">
          <Button variant="outline" size="sm" className="cursor-pointer">
            Settings
          </Button>
        </Link>
        <Button size="sm" className="gap-1.5 cursor-pointer bg-primary text-primary-foreground">
          <Plus className="size-3.5" />
          <span>New Project</span>
        </Button>
      </div>
    </div>
  );
}

// Instant Project List component
async function ProjectList() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Active Projects</h2>
        </div>
        <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border/40">
          {projects.length} Total
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-lg border border-border bg-card/60 hover:bg-card/90 transition-all duration-200 flex flex-col justify-between gap-3 group hover:border-primary/50 shadow-xs"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  <FolderGit2 className="size-4 text-primary shrink-0" />
                  <span className="truncate">{project.name}</span>
                </div>
                <span
                  className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-medium ${
                    project.status === "deployed"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : "bg-primary/10 text-primary border border-primary/20"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <GitBranch className="size-3" />
                  {project.branch}
                </span>
                <span>{project.language}</span>
              </div>
              <span className="text-[10px] text-muted-foreground/70">{project.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dynamic Streaming Activity Stream
async function LiveActivityStream() {
  // Simulate streamed data load
  await new Promise((resolve) => setTimeout(resolve, 80));

  const activities = [
    {
      id: "act-1",
      title: "API health pulse checked",
      desc: "Latency normal (18ms) across regional edges.",
      time: "Just now",
      status: "ok",
    },
    {
      id: "act-2",
      title: "Storage zstd compress cache pruned",
      desc: "Storage space optimized by 32% on disk.",
      time: "4 mins ago",
      status: "ok",
    },
    {
      id: "act-3",
      title: "OAuth session token refreshed",
      desc: "Security headers verified with strict CORS policy.",
      time: "12 mins ago",
      status: "ok",
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-border/80 bg-muted/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-foreground">Live Telemetry & Activity</h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Streaming
        </span>
      </div>

      <div className="flex flex-col divide-y divide-border/40">
        {activities.map((item) => (
          <div key={item.id} className="py-2.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3 text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-foreground">{item.title}</span>
              <span className="text-[11px] text-muted-foreground">{item.desc}</span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-border/80 bg-muted/10 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-3 w-16 bg-muted rounded" />
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <div className="h-8 w-full bg-muted/60 rounded" />
        <div className="h-8 w-full bg-muted/60 rounded" />
        <div className="h-8 w-full bg-muted/60 rounded" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DirectionalTransition>
      <main className="w-full max-w-5xl mx-auto px-5 py-8 flex flex-col gap-8">
        {/* Instant Shell Header */}
        <DashboardHeader />

        {/* Instant Shell Project List */}
        <ProjectList />

        {/* Dynamic Streaming Telemetry */}
        <Suspense fallback={<ActivitySkeleton />}>
          <LiveActivityStream />
        </Suspense>
      </main>
    </DirectionalTransition>
  );
}
