export interface PostCardProps {
  slug?: string;
  title?: string;
  date?: string;
  desc?: string;
  tag?: string[];
}

export interface ProjectCardProps {
  slug?: string;
  title?: string;
  desc?: string;
  link?: string;
  gh?: string;
  tag?: string[];
  screenshot?: string;
}

export interface RealmPageProps {
  title?: string;
  desc?: string;
  path?: string;
}

export interface PlaiceholderImage {
  height: number;
  width: number;
  type?: string;
  src: string;
}

export interface UnistNode {
  type: string;
  data?: UnistData;
  position?: UnistPosition;
}

export interface UnistPosition {
  start: UnistPoint;
  end: UnistPoint;
  indent?: number;
}

export interface UnistPoint {
  line: number;
  column: number;
  offset?: number;
}

export interface UnistData {}
