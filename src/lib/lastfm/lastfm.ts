import {
  LastFMTrackResponseBody,
  TrackState,
  Image,
  LastFMUserResponseBody,
  UserState,
} from "@/lib/types/lastfm";

function parseSongs(
  body: LastFMTrackResponseBody | null,
  imageSize: Image["size"]
): TrackState {
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

function parseUser(
  body: LastFMUserResponseBody | null,
  imageSize: Image["size"]
): UserState {
  if (!body) {
    return {
      status: "connecting",
      user: null,
    };
  }
  const user = body.user;

  if (!user) {
    return {
      status: "error",
      user: null,
    };
  }

  return {
    status: "success",
    user: {
      ...user,
      image: [user.image.find((i) => i.size === imageSize) ?? user.image[0]],
    },
  };
}

export { parseSongs, parseUser };
