"use client";

import { useLastFM } from "@/hooks/use-last-fm";
import { LastFMCardProps } from "@/lib/types/lastfm";
import { cn } from "@/lib/utils";

export function LastFMCard(props: LastFMCardProps) {
  const { username, limit = 8, interval = 15 * 1000 } = props;
  const { song } = useLastFM(username, limit, interval, "large");

  return (
    <div className="border border-border grid grid-cols-1 md:grid-cols-2 rounded-md overflow-clip">
      {song ? (
        Array.isArray(song) ? (
          song.map((s, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-5 p-5 items-center border-border",
                index % 2 === 0 ? "md:border-r" : "",
                index <= song.length - 2 ? "border-b" : "",
                index === song.length - 2 ? "md:border-b-0" : ""
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
          <div className="flex gap-5 p-5 items-center">
            <img
              src={song.art}
              alt={song.name}
              className="size-20 rounded-sm border border-border"
            />
            <div className="w-full flex flex-col gap-1">
              <h3 className="line-clamp-1">{song.name}</h3>
              <p className="text-muted-foreground text-sm font-semibold line-clamp-1">
                {song.artist}
              </p>
              <p className="text-muted-foreground text-sm line-clamp-1">
                {song.album}
              </p>
            </div>
          </div>
        )
      ) : (
        <p>No recent tracks found.</p>
      )}
    </div>
  );
}
