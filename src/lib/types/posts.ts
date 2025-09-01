export type Frontmatter = {
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  tags: string[];
};

export type Slug = {
  slug: string;
};

export type Post = Frontmatter & Slug;

export type Scope = {
  readingTime: string;
};

export type PostWithScope = Post & Scope;

export interface PostCardAuxiliaries extends React.ComponentProps<"div"> {
  placeholder?: boolean;
}

export type PostCardProps = PostWithScope & PostCardAuxiliaries;
