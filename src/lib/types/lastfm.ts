export interface RecentTracks {
  "@attr": RecentTracksAttr;
  track?: Track[];
}

export interface RecentTracksAttr {
  page: string;
  total: string;
  user: string;
  perPage: string;
  totalPages: string;
}

export interface Track {
  artist: TrackArtist;
  "@attr"?: TrackAttr;
  mbid: string;
  album: TrackAlbum;
  streamable: string;
  url: string;
  name: string;
  image: Image[];
  date?: TrackDate;
}

export interface TrackArtist {
  mbid: string;
  "#text": string;
}

export interface TrackAttr {
  nowplaying: string;
}

export interface TrackAlbum {
  mbid: string;
  "#text": string;
}

export interface Image {
  size: "small" | "medium" | "large" | "extralarge";
  "#text": string;
}

export interface TrackDate {
  uts: string;
  "#text": string;
}

export type Song = {
  name: Track["name"];
  artist: TrackArtist["#text"];
  art: Image["#text"];
  album: TrackAlbum["#text"];
  url: Track["url"];
  trackMbid: Track["mbid"] | null;
  albumMbid: TrackAlbum["mbid"] | null;
};

export interface LastFMTrackResponseBody {
  recenttracks: RecentTracks;
}

export interface LastFMUserRegistered {
  unixtime: string;
  "#text": number;
}

export interface LastFMUser {
  name: string;
  age: string;
  subscriber: string;
  realname: string;
  bootstrap: string;
  playcount: string;
  artist_count: string;
  playlists: string;
  track_count: string;
  album_count: string;
  image: Image[];
  registered: LastFMUserRegistered;
  country: string;
  gender: string;
  url: string;
  type: string;
}

export interface LastFMUserResponseBody {
  user: LastFMUser;
}

export type TrackState =
  | {
      status: "connecting" | "idle" | "error";
      song: null;
    }
  | {
      status: "playing";
      song: Song[];
    };

export type UserState =
  | {
      status: "connecting" | "idle" | "error";
      user: null;
    }
  | {
      status: "success";
      user: LastFMUser;
    };

export interface LastFMCardProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  limit?: number;
  interval?: number;
}
