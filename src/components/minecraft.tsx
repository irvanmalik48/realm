"use client";

import {
  MinecraftServerOnlineStatus,
  MinecraftServerStatusResponse,
} from "@/lib/types/mcsrvstat";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  EthernetPort,
  Link2,
  Milestone,
  Swords,
  type LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function ServerResponseItem(props: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  content: string;
  leftClassName?: string;
  rightClassName?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "w-full px-5 py-3 gap-3 flex items-center",
          props.leftClassName
        )}
      >
        <props.icon className="size-5" />
        <p>{props.title}</p>
      </div>
      <div
        className={cn(
          "w-full px-5 py-3 flex items-center",
          props.rightClassName
        )}
      >
        <p>{props.content}</p>
      </div>
    </>
  );
}

async function getMinecraftServerStatus() {
  const data = await fetch(`https://api.mcsrvstat.us/3/mc.irvanma.eu.org`);
  const res: MinecraftServerStatusResponse = await data.json();

  return res;
}

function checkIfOnline(query: MinecraftServerStatusResponse) {
  return query?.online;
}

export function MinecraftServer() {
  const query = useQuery({
    queryKey: ["minecraft"],
    queryFn: getMinecraftServerStatus,
    retryDelay: 5000,
    retry: 5,
    refetchInterval: 10 * 60 * 1000,
  });

  return (
    <div className="p-5 pt-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-primary font-bold dark:font-semibold flex items-center gap-3">
          <Activity className="size-5" />
          <span>Server Status</span>
        </h3>
        <p
          className={cn(
            "px-3 py-1 text-sm border rounded-full",
            checkIfOnline(query.data as MinecraftServerStatusResponse)
              ? "bg-green-800/20 border-green-800 dark:bg-green-500/20 dark:border-green-500 text-foreground"
              : "bg-red-800/20 border-red-800 dark:bg-red-500/20 dark:border-red-500 text-foreground"
          )}
        >
          {checkIfOnline(query.data as MinecraftServerStatusResponse)
            ? "Online"
            : "Offline"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-md border border-border overflow-clip">
        <ServerResponseItem
          icon={Link2}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="Server Hostname"
          content={query.data?.hostname ? query.data.hostname : "Loading..."}
        />
        <ServerResponseItem
          icon={EthernetPort}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="Server Port"
          content={query.data?.port ? query.data.port.toString() : "Loading..."}
        />
        <ServerResponseItem
          icon={Milestone}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="Server Version"
          content={
            checkIfOnline(query.data as MinecraftServerStatusResponse)
              ? (query.data as MinecraftServerOnlineStatus).version
              : "Offline"
          }
        />
        <ServerResponseItem
          icon={Swords}
          leftClassName="bg-muted/20 border-b md:border-b-0 md:border-r border-border"
          title="Server Software"
          content={
            checkIfOnline(query.data as MinecraftServerStatusResponse)
              ? (query.data as MinecraftServerOnlineStatus).software ??
                "Unknown"
              : "Offline"
          }
        />
      </div>
    </div>
  );
}
