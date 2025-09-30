"use client";

import { LastFMCardProps, LastFMTrackResponseBody } from "@/lib/types/lastfm";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { parseSongs } from "@/lib/lastfm/lastfm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { YouTube } from "./logos/youtube";
import { LastFM } from "./logos/lastfm";
import { Music2, RefreshCcw } from "lucide-react";

export function LastFMTrackCard(props: LastFMCardProps) {
  const { username, limit = 8, interval = 60 * 60 * 1000 } = props;

  const endpoint =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? `http://localhost:3000/api/v7/lastfm/track?username=${username}&limit=${limit}`
      : `https://irvanma.eu.org/api/v7/lastfm/track?username=${username}&limit=${limit}`;

  const { data, status, refetch } = useQuery({
    queryKey: ["lastfm-track"],
    queryFn: async () => {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error("Failed to fetch LastFM data");
      }
      const body: LastFMTrackResponseBody = await res.json();

      return parseSongs(body, "large");
    },
    retryDelay: 5000,
    retry: 5,
    refetchInterval: interval,
  });

  return (
    <div className="w-full">
      {status === "pending" && (
        <div
          key="lastfm-loading"
          className="border border-border grid grid-cols-1 md:grid-cols-2 rounded-md overflow-clip"
        >
          <div className="border-b border-border md:col-span-2 col-span-1 flex items-center justify-between px-5 py-3">
            <h2 className="text-lg font-semibold flex gap-3 items-center">
              <Music2 className="size-5" />
              <span>Recent Tracks</span>
            </h2>
            <Button
              variant="outline"
              onClick={() => refetch()}
              size="icon"
              className="cursor-pointer transition"
            >
              <span className="sr-only">Refresh LastFM tracks</span>
              <span className="flex items-center gap-2">
                <RefreshCcw className="size-5" />
              </span>
            </Button>
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col border-border",
                index % 2 === 0 ? "md:border-r" : "",
                index <= 6 ? "border-b" : "",
                index === 6 ? "md:border-b-0" : ""
              )}
            >
              <div className="flex gap-5 px-5 pt-5 pb-3 border-border">
                <Skeleton className="min-w-20 min-h-20 rounded-sm border border-border" />
                <div className="w-full flex flex-col gap-1">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
              <div className="px-5 pb-5 grid grid-cols-2 gap-3 w-full">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
        </div>
      )}
      {status === "success" && (
        <div
          key="lastfm-success"
          className="border border-border grid grid-cols-1 md:grid-cols-2 rounded-md overflow-clip"
        >
          <div className="border-b border-border md:col-span-2 col-span-1 flex items-center justify-between px-5 py-3">
            <h2 className="text-lg font-semibold flex gap-3 items-center">
              <Music2 className="size-5" />
              <span>Recent Tracks</span>
            </h2>
            <Button
              variant="outline"
              onClick={() => refetch()}
              size="icon"
              className="cursor-pointer transition"
            >
              <span className="sr-only">Refresh LastFM tracks</span>
              <span className="flex items-center gap-2">
                <RefreshCcw className="size-5" />
              </span>
            </Button>
          </div>
          {data && data.song ? (
            data.song.map((s, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col border-border",
                  index % 2 === 0 ? "md:border-r" : "",
                  index <= data.song.length - 2 ? "border-b" : "",
                  index === data.song.length - 2 ? "md:border-b-0" : ""
                )}
              >
                <div className="flex gap-5 px-5 pt-5 pb-3">
                  <img
                    src={s.art}
                    alt={s.name}
                    className="min-w-20 min-h-20 rounded-sm border border-border"
                    width={80}
                    height={80}
                  />
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="line-clamp-1">{s.name}</h3>
                    <p className="text-muted-foreground text-sm font-semibold line-clamp-1">
                      {s.artist}
                    </p>
                    <p className="text-muted-foreground text-sm line-clamp-1">
                      {s.album}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 grid grid-cols-2 gap-3 w-full">
                  <Button variant="secondary" asChild>
                    <a
                      href={s.url}
                      className="transition flex items-center justify-between"
                      target="_blank"
                    >
                      <LastFM className="size-5" />
                      <span>LastFM</span>
                      <span className="sr-only">
                        to view more details about {s.name} - {s.artist}
                      </span>
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                        `${s.name} - ${s.artist}`
                      )}`}
                      target="_blank"
                      className="transition flex items-center justify-between"
                    >
                      <YouTube className="size-5" />
                      <span>YouTube</span>
                      <span className="sr-only">
                        to find videos related to {s.name} - {s.artist}
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="flex items-center justify-center px-5 py-3">
              No recent tracks found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
