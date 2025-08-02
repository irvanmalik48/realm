import { LastFMResponseBody, State, TrackImage } from "@/lib/types/lastfm";

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

export { parseSongs };
