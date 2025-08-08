"use client";

import { LastFMCardProps, LastFMUserResponseBody } from "@/lib/types/lastfm";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { YouTube } from "./logos/youtube";
import { LastFM } from "./logos/lastfm";
import { Music2, RefreshCcw, User } from "lucide-react";
import { parseUser } from "@/lib/lastfm/lastfm";

export function LastFMUserCard(props: LastFMCardProps) {
  const { username, interval = 15 * 1000 } = props;

  const endpoint =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? `http://localhost:3000/api/v7/lastfm/user?username=${username}`
      : `https://www.irvanma.eu.org/api/v7/lastfm/user?username=${username}`;

  const { data, status, refetch } = useQuery({
    queryKey: ["lastfm-user"],
    queryFn: async () => {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error("Failed to fetch LastFM data");
      }
      const body: LastFMUserResponseBody = await res.json();

      return parseUser(body, "large");
    },
    retryDelay: 5000,
    retry: 5,
    refetchInterval: interval,
  });

  return (
    <div className="w-full">
      {status === "pending" && (
        <div
          key="lastfm-user-loading"
          className="w-full border border-border flex flex-col rounded-md overflow-clip"
        >
          <div className="border-b border-border w-full flex items-center justify-between px-5 py-3">
            <h2 className="text-lg font-semibold flex gap-3 items-center">
              <User className="size-5" />
              <span>User Information</span>
            </h2>
            <Button
              variant="outline"
              onClick={() => refetch()}
              size="icon"
              className="cursor-pointer transition"
            >
              <span className="sr-only">Refresh LastFM user info</span>
              <span className="flex items-center gap-2">
                <RefreshCcw className="size-5" />
              </span>
            </Button>
          </div>
          <div className="w-full p-5 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <Skeleton className="md:min-w-24 md:min-h-24 min-w-30 min-h-30 rounded-full" />
              <div className="flex flex-col w-full items-center justify-center md:items-start">
                <Skeleton className="w-1/2 h-7 mb-1" />
                <Skeleton className="md:w-3/4 w-1/3 h-4 mb-1" />
                <Skeleton className="md:hidden w-3/4 h-4" />
                <Skeleton className="w-1/3 h-8 mt-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center border border-border rounded-md p-3 space-y-3"
                >
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-full h-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {status === "success" && (
        <div
          key="lastfm-user-success"
          className="w-full border border-border flex flex-col rounded-md overflow-clip"
        >
          <div className="border-b border-border w-full flex items-center justify-between px-5 py-3">
            <h2 className="text-lg font-semibold flex gap-3 items-center">
              <User className="size-5" />
              <span>User Information</span>
            </h2>
            <Button
              variant="outline"
              onClick={() => refetch()}
              size="icon"
              className="cursor-pointer transition"
            >
              <span className="sr-only">Refresh LastFM user info</span>
              <span className="flex items-center gap-2">
                <RefreshCcw className="size-5" />
              </span>
            </Button>
          </div>
          <div className="w-full p-5 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <img
                src={data.user?.image[0]["#text"]}
                width={96}
                height={96}
                alt={data.user?.name}
                className="md:min-w-24 md:min-h-24 min-w-30 min-h-30 rounded-full object-cover border border-border"
              />
              <div className="flex flex-col w-full items-center justify-center md:items-start">
                <h3 className="text-lg font-semibold">@{data.user?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {data.user?.realname}
                  <span className="md:inline hidden">
                    &bull; Scrobbled since{" "}
                    {new Date(
                      (data.user?.registered?.["#text"] as number) * 1000
                    ).toLocaleDateString()}
                  </span>
                </p>
                <p className="md:hidden text-sm text-muted-foreground">
                  Scrobbled since{" "}
                  {new Date(
                    (data.user?.registered?.["#text"] as number) * 1000
                  ).toLocaleDateString()}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-sm w-fit mt-2 transition"
                  asChild
                >
                  <a
                    href={data.user?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-2">
                      <LastFM className="size-4" />
                      View on LastFM
                      <span className="sr-only">
                        {data.user?.name} LastFM profile
                      </span>
                    </span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="flex flex-col items-center justify-center border border-border rounded-md p-3 space-y-3">
                <h2 className="text-sm rounded-full px-3 py-0.5 bg-primary/10 text-foreground dark:bg-secondary/50 dark:text-secondary-foreground">
                  Album Count
                </h2>
                <span className="text-2xl font-bold font-doto">
                  {data.user?.album_count}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center border border-border rounded-md p-3 space-y-3">
                <h2 className="text-sm rounded-full px-3 py-0.5 bg-primary/10 text-foreground dark:bg-secondary/50 dark:text-secondary-foreground">
                  Artist Count
                </h2>
                <span className="text-2xl font-bold font-doto">
                  {data.user?.artist_count}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center border border-border rounded-md p-3 space-y-3">
                <h2 className="text-sm rounded-full px-3 py-0.5 bg-primary/10 text-foreground dark:bg-secondary/50 dark:text-secondary-foreground">
                  Play Count
                </h2>
                <span className="text-2xl font-bold font-doto">
                  {data.user?.playcount}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center border border-border rounded-md p-3 space-y-3">
                <h2 className="text-sm rounded-full px-3 py-0.5 bg-primary/10 text-foreground dark:bg-secondary/50 dark:text-secondary-foreground">
                  Track Count
                </h2>
                <span className="text-2xl font-bold font-doto">
                  {data.user?.track_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
