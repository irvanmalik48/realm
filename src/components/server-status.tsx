"use client";

import { Cpu, HardDrive, MemoryStick, Cloud, Network } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SystemInfo } from "@/lib/types/status";
import { Progress } from "./ui/progress";

function cpuModelShorthand(model: string) {
  const words = String(model).split(" ");
  const firstThreeWords = words.slice(0, Math.min(3, words.length)).join(" ");
  return firstThreeWords;
}

function uptimeCalc(uptime: number) {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);

  return `${hours}h ${minutes}m`;
}

export function ServerStatus() {
  const getServerStatus = async () => {
    const res = await fetch("https://stats.irvanma.eu.org/api/status");
    const data = await res.json();
    return data;
  };

  const query = useQuery<SystemInfo>({
    queryKey: ["server-status"],
    queryFn: getServerStatus,
    refetchInterval: 2000,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="w-full md:col-span-2 bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <Cloud className="size-4" />
          <span className="text-sm font-mono">HOST.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              OS
            </p>
            <p className="text-right truncate text-ellipsis">
              {query.data?.host.os ?? "Unknown"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Hostname
            </p>
            <p className="text-right truncate text-ellipsis">
              {query.data?.host.hostname ?? "Unknown"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Uptime
            </p>
            <p className="text-right truncate text-ellipsis">
              {uptimeCalc(query.data?.host.uptime as number)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <Cpu className="size-4" />
          <span className="text-sm font-mono">CPU.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              CPU Model
            </p>
            <p className="text-right truncate text-ellipsis">
              {cpuModelShorthand(query.data?.cpu.model ?? "Unknown")}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              CPU Cores
            </p>
            <p className="text-right truncate text-ellipsis">
              {query.data?.cpu.cores ?? "Unknown"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Utilization
            </p>
            <p className="text-right truncate text-ellipsis">
              {~~((query.data?.cpu.utilisation as number) * 100)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 pb-3">
          <Progress
            className="mt-3"
            value={~~((query.data?.cpu.utilisation as number) * 100)}
          />
        </div>
      </div>
      <div className="w-full bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <HardDrive className="size-4" />
          <span className="text-sm font-mono">STORAGE.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Total
            </p>
            <p className="text-right truncate text-ellipsis">
              {(
                (query.data?.storage["OS"].total as number) / 1000000000
              ).toFixed(2)}{" "}
              GB
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Available
            </p>
            <p className="text-right truncate text-ellipsis">
              {(
                (query.data?.storage["OS"].available as number) / 1000000000
              ).toFixed(2)}{" "}
              GB
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Used
            </p>
            <p className="text-right truncate text-ellipsis">
              {(
                ((query.data?.storage["OS"].total as number) -
                  (query.data?.storage["OS"].available as number)) /
                1000000000
              ).toFixed(2)}{" "}
              GB
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 pb-3">
          <Progress
            className="mt-3"
            value={
              (((query.data?.storage["OS"].total as number) -
                (query.data?.storage["OS"].available as number)) /
                (query.data?.storage["OS"].total as number)) *
              100
            }
          />
        </div>
      </div>
      <div className="w-full bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <MemoryStick className="size-4" />
          <span className="text-sm font-mono">MEMORY.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Total
            </p>
            <p className="text-right truncate text-ellipsis">
              {((query.data?.memory.total as number) / 1000000).toFixed(2)} GB
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Available
            </p>
            <p className="text-right truncate text-ellipsis">
              {((query.data?.memory.available as number) / 1000000).toFixed(2)}{" "}
              GB
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Used
            </p>
            <p className="text-right truncate text-ellipsis">
              {(
                ((query.data?.memory.total as number) -
                  (query.data?.memory.available as number)) /
                1000000
              ).toFixed(2)}{" "}
              GB
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 pb-3">
          <Progress
            className="mt-3"
            value={
              (((query.data?.memory.total as number) -
                (query.data?.memory.available as number)) /
                (query.data?.memory.total as number)) *
              100
            }
          />
        </div>
      </div>
      <div className="w-full bg-background rounded-lg border border-border">
        <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
          <Network className="size-4" />
          <span className="text-sm font-mono">NETWORK.md</span>
        </h2>
        <div className="flex flex-col px-5 py-3 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              Interface
            </p>
            <p className="text-right truncate text-ellipsis">
              {query.data?.network.interface}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              DL Total
            </p>
            <p className="text-right truncate text-ellipsis">
              {((query.data?.network.rx as number) / 1000000000).toFixed(2)} GB
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground font-medium w-1/3">
              UL Total
            </p>
            <p className="text-right truncate text-ellipsis">
              {((query.data?.network.tx as number) / 1000000000).toFixed(2)} GB
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 pb-3">
          <Progress
            className="mt-3"
            value={
              (((query.data?.network.rx as number) +
                (query.data?.network.tx as number)) /
                5000000000000) *
              100
            }
          />
        </div>
      </div>
    </div>
  );
}
