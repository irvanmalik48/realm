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