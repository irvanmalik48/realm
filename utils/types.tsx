import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface BaseLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  date?: string;
  tag?: string[];
}

export interface PostLayoutMeta {
  slug: string;
  title: string;
  desc: string;
  date: string;
  tag: string[];
}

export interface PostLayoutProps {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  meta: PostLayoutMeta;
}

export interface PostSlugs {
  posts: {
    slug: string;
  }[];
}

export interface ProjectLayoutMeta {
  slug: string;
  title: string;
  desc: string;
  tag: string[];
  link: string;
  gh: string;
  screenshot: string;
}

export interface ProjectLayoutProps {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  meta: ProjectLayoutMeta;
}

export interface ProjectSlugs {
  projects: {
    slug: string;
  }[];
}
