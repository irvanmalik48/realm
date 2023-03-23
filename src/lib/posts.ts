import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontMatter {
  title: string
  date: string
  description: string
  tags: string[]
}

export const postsDirectory = path.join(process.cwd(), "posts");

export function getPostPaths() {
  return readdirSync(postsDirectory);
}

export function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, slug);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data: frontMatter, content } = matter(fileContents) as unknown as {
    data: PostFrontMatter
    content: string
  };
  return {
    frontMatter,
    content,
    slug: slug.replace(/\.mdx$/, ""),
  };
}

export function getPosts() {
  const postFileNames = getPostPaths();
  const posts = postFileNames.map((fileName) => {
    return getPostData(fileName);
  });
  return posts;
}

export function getPostBySlug(slug: string) {
  const post = getPostData(`${slug}.mdx`);
  return post;
}
