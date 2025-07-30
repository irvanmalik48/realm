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
          "w-full px-4 py-2 gap-3 flex items-center",
          props.leftClassName
        )}
      >
        <props.icon className="size-4" />
        <p className="text-sm">{props.title}</p>
      </div>
      <div
        className={cn(
          "w-full px-4 py-2 flex items-center",
          props.rightClassName
        )}
      >
        <p className="text-sm">{props.content}</p>
      </div>
    </>
  );
}

async function getMinecraftServerStatus() {
  const data = await fetch(`https://api.mcsrvstat.us/3/mc.irvanma.eu.org`);
  const dataBedrock = await fetch(
    `https://api.mcsrvstat.us/bedrock/3/mc.irvanma.eu.org`
  );
  const res: MinecraftServerStatusResponse = await data.json();
  const resBedrock: MinecraftServerStatusResponse = await dataBedrock.json();

  return {
    java: res,
    bedrock: resBedrock,
  };
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
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="p-5 pt-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-primary font-bold dark:font-semibold flex items-center gap-3">
            <Activity className="size-5" />
            <span>Java</span>
          </h3>
          <p
            className={cn(
              "px-3 py-1 text-sm border rounded-full",
              checkIfOnline(query.data?.java as MinecraftServerStatusResponse)
                ? "bg-green-800/20 border-green-800 dark:bg-green-500/20 dark:border-green-500 text-foreground"
                : "bg-red-800/20 border-red-800 dark:bg-red-500/20 dark:border-red-500 text-foreground"
            )}
          >
            {checkIfOnline(query.data?.java as MinecraftServerStatusResponse)
              ? "Online"
              : "Offline"}
          </p>
        </div>
        <div className="grid grid-cols-2 rounded-md border border-border overflow-clip">
          <ServerResponseItem
            icon={Link2}
            leftClassName="bg-muted/20 border-r border-b border-border"
            rightClassName="border-b border-border"
            title="Hostname"
            content={
              query.data?.java.hostname
                ? query.data.java.hostname
                : "Loading..."
            }
          />
          <ServerResponseItem
            icon={EthernetPort}
            leftClassName="bg-muted/20 border-r border-b border-border"
            rightClassName="border-b border-border"
            title="Port"
            content={
              query.data?.java.port
                ? query.data.java.port.toString()
                : "Loading..."
            }
          />
          <ServerResponseItem
            icon={Milestone}
            leftClassName="bg-muted/20 border-r md:border-b-0 border-border"
            rightClassName=""
            title="Version"
            content={
              checkIfOnline(query.data?.java as MinecraftServerStatusResponse)
                ? (query.data?.java as MinecraftServerOnlineStatus).version
                : "Offline"
            }
          />
        </div>
      </div>
      <div className="p-5 pt-3 border-t md:border-t-0 md:border-l border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-primary font-bold dark:font-semibold flex items-center gap-3">
            <Activity className="size-5" />
            <span>Bedrock (Geyser)</span>
          </h3>
          <p
            className={cn(
              "px-3 py-1 text-sm border rounded-full",
              checkIfOnline(
                query.data?.bedrock as MinecraftServerStatusResponse
              )
                ? "bg-green-800/20 border-green-800 dark:bg-green-500/20 dark:border-green-500 text-foreground"
                : "bg-red-800/20 border-red-800 dark:bg-red-500/20 dark:border-red-500 text-foreground"
            )}
          >
            {checkIfOnline(query.data?.bedrock as MinecraftServerStatusResponse)
              ? "Online"
              : "Offline"}
          </p>
        </div>
        <div className="grid grid-cols-2 rounded-md border border-border overflow-clip">
          <ServerResponseItem
            icon={Link2}
            leftClassName="bg-muted/20 border-r border-b border-border"
            rightClassName="border-b border-border"
            title="Hostname"
            content={
              query.data?.bedrock.hostname
                ? query.data.bedrock.hostname
                : "Loading..."
            }
          />
          <ServerResponseItem
            icon={EthernetPort}
            leftClassName="bg-muted/20 border-r border-b border-border"
            rightClassName="border-b border-border"
            title="Port"
            content={
              query.data?.bedrock.port
                ? query.data.bedrock.port.toString()
                : "Loading..."
            }
          />
          <ServerResponseItem
            icon={Milestone}
            leftClassName="bg-muted/20 border-r md:border-b-0 border-border"
            rightClassName=""
            title="Version"
            content={
              checkIfOnline(
                query.data?.bedrock as MinecraftServerStatusResponse
              )
                ? (query.data?.bedrock as MinecraftServerOnlineStatus).version
                : "Offline"
            }
          />
        </div>
      </div>
    </div>
  );
}
