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
  image: TrackImage[];
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

export interface TrackImage {
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
  art: TrackImage["#text"];
  album: TrackAlbum["#text"];
  url: Track["url"];
  trackMbid: Track["mbid"] | null;
  albumMbid: TrackAlbum["mbid"] | null;
};

export interface LastFMResponseBody {
  recenttracks: RecentTracks;
}

export type State =
  | {
      status: "connecting" | "idle" | "error";
      song: null;
    }
  | {
      status: "playing";
      song: Song;
    }
  | {
      status: "playing";
      song: Song[];
    };

export interface LastFMCardProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  limit?: number;
  interval?: number;
}
