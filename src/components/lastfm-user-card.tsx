"use client";

import { useMemo } from "react";
import Image from "next/image";
import { LastFMCardProps } from "@/lib/types/lastfm";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { LastFM } from "./logos/lastfm";
import { RefreshCcw, User, Disc, Mic2, Music, Play } from "lucide-react";
import { getUserInfoAction } from "@/actions/lastfm";
import { cn } from "@/lib/utils";

const DEFAULT_INTERVAL = 60 * 60 * 1000;

export function LastFMUserCard(props: LastFMCardProps) {
  const { username, interval = DEFAULT_INTERVAL, className, ...rest } = props;

  const { data, status, isFetching, refetch } = useQuery({
    queryKey: ["lastfm-user", username],
    queryFn: () => getUserInfoAction(username),
    retryDelay: 5000,
    retry: 3,
    refetchInterval: interval,
  });

  const registeredDate = useMemo(() => {
    const raw = data?.user?.registered?.["#text"];
    if (!raw) return null;
    return new Date(Number(raw) * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }, [data?.user?.registered]);

  const userStats = [
    {
      label: "Scrobbles",
      value: data?.user?.playcount
        ? Number(data.user.playcount).toLocaleString()
        : "-",
      unit: "plays",
      icon: Play,
    },
    {
      label: "Artists",
      value: data?.user?.artist_count
        ? Number(data.user.artist_count).toLocaleString()
        : "-",
      unit: "listened",
      icon: Mic2,
    },
    {
      label: "Albums",
      value: data?.user?.album_count
        ? Number(data.user.album_count).toLocaleString()
        : "-",
      unit: "collected",
      icon: Disc,
    },
    {
      label: "Tracks",
      value: data?.user?.track_count
        ? Number(data.user.track_count).toLocaleString()
        : "-",
      unit: "unique",
      icon: Music,
    },
  ];

  return (
    <div
      className={cn(
        "bg-background rounded-lg border border-border overflow-hidden flex flex-col transition-all duration-200 hover:border-foreground/30 group",
        className
      )}
      {...rest}
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/10">
        <h2 className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
          <User className="size-4" />
          <span className="text-xs font-mono font-medium text-foreground">
            LASTFM_USER.md
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border">
            profile
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            className="size-7 cursor-pointer text-muted-foreground hover:text-foreground"
            title="Refresh LastFM user profile"
          >
            <RefreshCcw
              className={cn("size-3.5", isFetching && "animate-spin")}
            />
            <span className="sr-only">Refresh LastFM user info</span>
          </Button>
        </div>
      </div>

      {status === "pending" && (
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Skeleton className="size-20 rounded-full shrink-0" />
            <div className="flex flex-col items-center sm:items-start gap-1 w-full">
              <Skeleton className="w-36 h-6" />
              <Skeleton className="w-48 h-4" />
              <Skeleton className="w-28 h-7 mt-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-border/60 rounded-md p-3 space-y-2 bg-muted/5"
              >
                <Skeleton className="h-3 w-16 mx-auto" />
                <Skeleton className="h-7 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {data.user?.image[0]?.["#text"] ? (
              <Image
                src={data.user.image[0]["#text"]}
                width={80}
                height={80}
                alt={data.user?.name || "User Avatar"}
                className="size-20 rounded-full object-cover border border-border shrink-0"
                unoptimized
              />
            ) : (
              <div className="size-20 rounded-full border border-border bg-muted flex items-center justify-center shrink-0">
                <User className="size-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex flex-col items-center sm:items-start justify-center grow text-center sm:text-left">
              <h3 className="text-base font-semibold text-foreground">
                @{data.user?.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {data.user?.realname ? `${data.user.realname} • ` : ""}
                {registeredDate ? `Scrobbled since ${registeredDate}` : ""}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 mt-2 gap-1.5 cursor-pointer rounded-md font-mono"
                asChild
              >
                <a
                  href={data.user?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LastFM className="size-3.5" />
                  <span>View on LastFM</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Listening Stats Bento Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-border/50">
            {userStats.map((item) => (
              <div
                key={item.label}
                className="bg-muted/10 border border-border/60 rounded-md p-3 text-center flex flex-col items-center justify-center transition-colors hover:border-foreground/20"
              >
                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <item.icon className="size-3 text-muted-foreground" />
                  {item.label}
                </span>
                <span className="font-doto font-bold text-2xl text-foreground mt-0.5">
                  {item.value}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/80">
                  {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="p-6 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            Unable to load LastFM user profile.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="cursor-pointer gap-1.5 h-7 text-xs font-mono"
          >
            <RefreshCcw className="size-3" />
            <span>Try Again</span>
          </Button>
        </div>
      )}
    </div>
  );
}
