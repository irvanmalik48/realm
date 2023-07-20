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
