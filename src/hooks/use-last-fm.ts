import { LastFMResponseBody, State, TrackImage } from "@/lib/types/lastfm";
import { useQuery } from "@tanstack/react-query";

function parseSongs(
  body: LastFMResponseBody | null,
  imageSize: TrackImage["size"]
): State {
  if (!body) {
    return {
      status: "connecting",
      song: null,
    };
  }

  const lastSongs = body.recenttracks.track;

  if (!lastSongs || lastSongs.length === 0) {
    return {
      status: "idle",
      song: null,
    };
  }

  const images = lastSongs.map((s) => {
    return s.image.find((i) => {
      return i.size === imageSize;
    });
  });

  return {
    status: "playing",
    song: lastSongs.map((s, index) => ({
      name: s.name,
      artist: s.artist["#text"],
      art: images[index]?.["#text"] ?? s.image[0]["#text"],
      url: s.url,
      album: s.album["#text"],
      albumMbid: s.album.mbid === "" ? null : s.album.mbid,
      trackMbid: s.mbid === "" ? null : s.mbid,
    })),
  };
}

export function useLastFM(
  username: string,
  limit: number = 1,
  interval: number = 15 * 1000,
  imageSize: TrackImage["size"] = "extralarge"
): State {
  if (!username) {
    return {
      status: "error",
      song: null,
    };
  }

  const endpoint =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? `http://localhost:3000/api/v7/lastfm?username=${username}&limit=${limit}`
      : `https://irvanma.eu.org/api/v7/lastfm?username=${username}&limit=${limit}`;

  const query = useQuery({
    queryKey: ["lastfm"],
    queryFn: async () => {
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error("Failed to fetch LastFM data");
      }
      const body: LastFMResponseBody = await res.json();
      return body;
    },
    retryDelay: 5000,
    retry: 5,
    refetchInterval: interval,
  });

  return parseSongs(query.data ?? null, imageSize);
}
