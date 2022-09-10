export interface Post {
  path?: string;
  md?: string;
  title?: string;
  date?: string;
  desc?: string;
  tag?: string[];
}

export interface Spring {
  p: number;
  v: number;
}

export interface JokesText {
  status: number;
  end_point: string;
  method: string;
  data: string;
}

export interface JokesImage {
  status: number;
  end_point: string;
  method: string;
  data: {
    url: string;
    source: string;
  };
}

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  hireable?: boolean;
  bio?: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Covid {
  confirmed: {
    value: number;
    detail: string;
  };
  recovered: {
    value: number;
    detail: string;
  };
  deaths: {
    value: number;
    detail: string;
  };
  lastUpdate: string;
}

export type JokesType =
  | JokesText
  | JokesImage
  | { text?: JokesText; img?: JokesImage }
  | null;
