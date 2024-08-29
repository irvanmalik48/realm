export interface PostMatter {
  slug: string;
  title: string;
  date: string;
  description: string;
  draft: string;
}

export interface Post {
  content: string;
  data: PostMatter;
}
