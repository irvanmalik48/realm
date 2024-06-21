export type Post = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export interface PostMatter {
  content: string;
  data: Post;
  filePath: string;
}
