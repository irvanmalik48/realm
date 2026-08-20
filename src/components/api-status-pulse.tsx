"use client";

import { useQuery } from "@tanstack/react-query";
import { getHealthStatusAction, HealthData } from "@/actions/health";
import { Activity, Database, Server, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

function formatUptime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${minutes % 60}m`;
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h`;
}

export function APIStatusPulse() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["api-health"],
    queryFn: () => getHealthStatusAction(),
    refetchInterval: 20000, // Poll every 20 seconds
    refetchIntervalInBackground: false,
    staleTime: 10000,
  });

  const health: HealthData = data?.data || {
    status: "healthy",
    service: "realm-api",
    version: "1.0.0",
    uptime_seconds: 0,
    timestamp: new Date().toISOString(),
    database: "connected",
    latency_ms: 0,
  };

  const isHealthy = data?.ok && health.status === "healthy";
  const isDegraded = data?.ok && health.status === "degraded";
  const isUnhealthy = !data?.ok || health.status === "unhealthy";

  return (
    <div className="w-full bg-background rounded-lg border border-border overflow-hidden transition-all duration-300">
      <div
        className="w-full px-5 py-3 flex items-center justify-between cursor-pointer select-none hover:bg-muted/10 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {/* Status Indicator with Radar Pulse Animation */}
          <div className="relative flex items-center justify-center size-3">
            {isHealthy && (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </>
            )}
            {isDegraded && (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              </>
            )}
            {isUnhealthy && (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              {isHealthy ? "API Operational" : isDegraded ? "API Degraded" : "API Offline"}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              (20s heartbeat)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {health.latency_ms > 0 && (
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted/40 text-muted-foreground border border-border">
              {health.latency_ms}ms
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              refetch();
            }}
            title="Refresh status now"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted/30"
          >
            <RefreshCw className={cn("size-3.5", isFetching && "animate-spin text-primary")} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-5 pb-4 pt-1 border-t border-border/60 bg-muted/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex flex-col gap-1 p-2.5 rounded border border-border/50 bg-background/50">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Server className="size-3.5" />
              <span>Service</span>
            </div>
            <span className="font-mono font-medium">{health.service} v{health.version}</span>
          </div>

          <div className="flex flex-col gap-1 p-2.5 rounded border border-border/50 bg-background/50">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Database className="size-3.5" />
              <span>Database</span>
            </div>
            <span className={cn("font-mono font-medium capitalize", health.database === "connected" ? "text-emerald-500" : "text-rose-500")}>
              {health.database}
            </span>
          </div>

          <div className="flex flex-col gap-1 p-2.5 rounded border border-border/50 bg-background/50">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Activity className="size-3.5" />
              <span>Uptime</span>
            </div>
            <span className="font-mono font-medium">
              {health.uptime_seconds > 0 ? formatUptime(health.uptime_seconds) : "N/A"}
            </span>
          </div>

          <div className="flex flex-col gap-1 p-2.5 rounded border border-border/50 bg-background/50">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <RefreshCw className="size-3.5" />
              <span>Checked</span>
            </div>
            <span className="font-mono font-medium">
              {new Date(health.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
