"use client";

import { LastFMCardProps, LastFMResponseBody } from "@/lib/types/lastfm";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { parseSongs } from "@/lib/lastfm/lastfm";

export function LastFMCard(props: LastFMCardProps) {
  const { username, limit = 8, interval = 15 * 1000 } = props;

  const endpoint =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? `http://localhost:3000/api/v7/lastfm?username=${username}&limit=${limit}`
      : `https://irvanma.eu.org/api/v7/lastfm?username=${username}&limit=${limit}`;

  const { data } = useQuery({
    queryKey: ["lastfm"],
    queryFn: async () => {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error("Failed to fetch LastFM data");
      }
      const body: LastFMResponseBody = await res.json();

      return parseSongs(body, "large");
    },
    retryDelay: 5000,
    retry: 5,
    refetchInterval: interval,
  });

  return (
    <div className="border border-border grid grid-cols-1 md:grid-cols-2 rounded-md overflow-clip">
      {data && data.song ? (
        data.song.map((s, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-5 p-5 items-center border-border",
              index % 2 === 0 ? "md:border-r" : "",
              index <= data.song.length - 2 ? "border-b" : "",
              index === data.song.length - 2 ? "md:border-b-0" : ""
            )}
          >
            <img
              src={s.art}
              alt={s.name}
              className="size-20 rounded-sm border border-border"
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
        ))
      ) : (
        <p className="flex items-center justify-center px-5 py-3">
          No recent tracks found.
        </p>
      )}
    </div>
  );
}
