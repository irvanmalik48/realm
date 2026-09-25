"use client";

import Image from "next/image";
import { LastFMCardProps } from "@/lib/types/lastfm";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { YouTube } from "./logos/youtube";
import { LastFM } from "./logos/lastfm";
import { Music2, RefreshCcw } from "lucide-react";
import { getRecentTracksAction } from "@/actions/lastfm";

const DEFAULT_INTERVAL = 60 * 60 * 1000;

export function LastFMTrackCard(props: LastFMCardProps) {
  const {
    username,
    limit = 8,
    interval = DEFAULT_INTERVAL,
    className,
    ...rest
  } = props;

  const { data, status, isFetching, refetch } = useQuery({
    queryKey: ["lastfm-track", username, limit],
    queryFn: () => getRecentTracksAction(username, limit),
    retryDelay: 5000,
    retry: 3,
    refetchInterval: interval,
  });

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
          <Music2 className="size-4" />
          <span className="text-xs font-mono font-medium text-foreground">
            RECENT_TRACKS.md
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border">
            scrobbles
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            className="size-7 cursor-pointer text-muted-foreground hover:text-foreground"
            title="Refresh recent tracks"
          >
            <RefreshCcw
              className={cn("size-3.5", isFetching && "animate-spin")}
            />
            <span className="sr-only">Refresh LastFM tracks</span>
          </Button>
        </div>
      </div>

      {status === "pending" && (
        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 rounded-md border border-border/60 bg-muted/5 items-center"
            >
              <Skeleton className="size-14 rounded-md shrink-0" />
              <div className="w-full flex flex-col gap-1.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {status === "success" && (
        <div className="p-3 sm:p-4">
          {data && data.song && data.song.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {data.song.map((s) => (
                <div
                  key={`${s.name}-${s.artist}-${s.url}`}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-md border border-border/60 bg-muted/5 hover:bg-muted/15 hover:border-foreground/20 transition-all group/track"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Image
                      src={s.art}
                      alt={s.name}
                      className="size-12 rounded-md border border-border object-cover shrink-0"
                      width={48}
                      height={48}
                      unoptimized
                    />
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-xs font-semibold text-foreground line-clamp-1 group-hover/track:text-primary transition-colors">
                        {s.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground line-clamp-1">
                        {s.artist}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 font-mono line-clamp-1">
                        {s.album}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                      asChild
                    >
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`View ${s.name} on LastFM`}
                      >
                        <LastFM className="size-3.5" />
                        <span className="sr-only">LastFM</span>
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                      asChild
                    >
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                          `${s.name} - ${s.artist}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Search ${s.name} on YouTube`}
                      >
                        <YouTube className="size-3.5" />
                        <span className="sr-only">YouTube</span>
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="flex items-center justify-center p-6 text-xs font-mono text-muted-foreground">
              No recent tracks found.
            </p>
          )}
        </div>
      )}

      {status === "error" && (
        <div className="p-6 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            Unable to load LastFM recent tracks.
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
