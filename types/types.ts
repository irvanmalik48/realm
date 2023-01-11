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