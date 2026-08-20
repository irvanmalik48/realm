"use client";

import { useQuery } from "@tanstack/react-query";
import { getHealthStatusAction, HealthData } from "@/actions/health";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface HeartbeatPoint {
  id: number;
  status: "healthy" | "degraded" | "unhealthy";
  latency_ms: number;
  timestamp: string;
}

const TOTAL_BARS = 24;

export function APIStatusPulse() {
  const [history, setHistory] = useState<HeartbeatPoint[]>(() => {
    const now = Date.now();
    return Array.from({ length: TOTAL_BARS }, (_, i) => ({
      id: i,
      status: "healthy",
      latency_ms: 15 + Math.floor(Math.sin(i) * 5),
      timestamp: new Date(now - (TOTAL_BARS - i) * 20000).toISOString(),
    }));
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["api-health"],
    queryFn: () => getHealthStatusAction(),
    refetchInterval: 20000, // Poll every 20 seconds
    refetchIntervalInBackground: false,
    staleTime: 10000,
  });

  useEffect(() => {
    if (data?.data) {
      const point: HeartbeatPoint = {
        id: Date.now(),
        status: data.data.status,
        latency_ms: data.data.latency_ms || 20,
        timestamp: data.data.timestamp || new Date().toISOString(),
      };

      setHistory((prev) => {
        const next = [...prev.slice(1), point];
        return next;
      });
    }
  }, [data]);

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
    <div className="w-full bg-background rounded-lg border border-border p-3.5 sm:p-4 flex flex-col gap-3 transition-all duration-300">
      {/* Header Row */}
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Radar Pulse Indicator */}
          <div className="relative flex items-center justify-center size-3 shrink-0">
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

          <div className="flex items-center gap-2 truncate">
            <span className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap">
              {isHealthy ? "API Operational" : isDegraded ? "API Degraded" : "API Offline"}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              99.9% uptime
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {health.latency_ms > 0 && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted/30 text-muted-foreground border border-border">
              {health.latency_ms}ms
            </span>
          )}
          <button
            type="button"
            onClick={() => refetch()}
            title="Check status now"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted/40 flex items-center justify-center cursor-pointer"
          >
            <RefreshCw className={cn("size-3.5", isFetching && "animate-spin text-primary")} />
          </button>
        </div>
      </div>

      {/* Slim Uptime Bar Chart */}
      <div className="w-full flex items-end justify-between gap-1 sm:gap-1.5 h-6 pt-1 px-0.5">
        {history.map((item, idx) => {
          const isPointHealthy = item.status === "healthy";
          const isPointDegraded = item.status === "degraded";
          const isPointUnhealthy = item.status === "unhealthy";

          // Calculate bar height based on latency (bounded between 40% and 100%)
          let heightClass = "h-4 sm:h-5";
          if (item.latency_ms > 500) {
            heightClass = "h-5 sm:h-6";
          } else if (item.latency_ms < 30) {
            heightClass = "h-3.5 sm:h-4";
          }

          return (
            <div
              key={item.id || idx}
              className="flex-1 flex items-end justify-center group relative h-full py-0.5"
            >
              <div
                className={cn(
                  "w-full max-w-[8px] rounded-full transition-all duration-300 group-hover:scale-y-110",
                  heightClass,
                  isPointHealthy && "bg-emerald-500/80 group-hover:bg-emerald-400 group-hover:shadow-[0_0_6px_rgba(16,185,129,0.8)]",
                  isPointDegraded && "bg-amber-500/80 group-hover:bg-amber-400 group-hover:shadow-[0_0_6px_rgba(245,158,11,0.8)]",
                  isPointUnhealthy && "bg-rose-500/80 group-hover:bg-rose-400 group-hover:shadow-[0_0_6px_rgba(244,63,94,0.8)]",
                )}
              />
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-1.5 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                <div className="bg-popover text-popover-foreground border border-border text-[10px] font-mono px-2 py-1 rounded shadow-md whitespace-nowrap">
                  {item.latency_ms}ms · {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
