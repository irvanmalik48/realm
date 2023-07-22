export type Post = {
  title: string;
  date: string;
  desc: string;
  tags: string[];
  permalink: string;
  draft?: string;
};

export type KVConstant = {
  name: string;
  value: RedirectObject;
};

export type RedirectObject = {
  link: string;
  provider: string;
  activityPubUrl?: string;
};

export type KVArray = KVConstant[];

export type ProjectLinks = {
  github: string;
  deployed?: string;
};

export type Project = {
  title: string;
  description: string;
  image: string | null;
  visibility: "public" | "private";
  deployment?: string;
  links: ProjectLinks;
};

export type ProjectArray = Project[];
