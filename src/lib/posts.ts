import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { extractHeadings } from "extract-md-headings";

export interface PostFrontMatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export const postsDirectory = path.join(process.cwd(), "src", "pages", "posts");

export function getPostPaths() {
  return readdirSync(postsDirectory, { withFileTypes: true });
}

export function getPostData(slug: string) {
  if (slug === "") {
    return;
  }

  const fullPath = path.join(postsDirectory, slug);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data: frontMatter, content } = matter(fileContents) as unknown as {
    data: PostFrontMatter;
    content: string;
  };
  return {
    frontMatter,
    content,
    slug: slug.replace(/\.mdx$/, ""),
  };
}

export function getPostHeadings(slug: string) {
  const fullPath = path.join(postsDirectory, slug);
  return extractHeadings(fullPath);
}

export function getPosts() {
  const postFileNames = getPostPaths();
  const posts = postFileNames
    .map((fileName) => {
      return getPostData(fileName.isFile() ? fileName.name : "");
    })
    .filter((post) => {
      return post?.frontMatter.date !== undefined;
    });
  return posts;
}

export function getSortedPosts() {
  const posts = getPosts();
  return posts.sort((a, b) => {
    if (a!.frontMatter.date < b!.frontMatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string) {
  const post = getPostData(`${slug}.mdx`);
  return post;
}

export function getAllPostSlugs() {
  const posts = getPosts();
  return posts.map((post) => {
    return post?.slug;
  });
}

export function getAllPostLinks() {
  const posts = getAllPostSlugs();
  return posts.map((post) => {
    return `https://irvanma.eu.org/posts/${post}`;
  });
}
