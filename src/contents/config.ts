import matter from "white-matter";
import fs from "fs";
import type { Post, PostMatter } from "@/types/api/posts";

export const getPost = (slug: string): Post => {
  const path = `src/contents/blog/${slug}/index.mdx`;
  const file = fs.readFileSync(path, "utf-8");
  const { data, content } = matter(file);

  const postData: PostMatter = {
    slug: slug,
    ...(data as unknown as Omit<PostMatter, "slug">),
  };

  return {
    content,
    data: postData,
  };
};

export const getPostFrontMatter = (slug: string): PostMatter => {
  const path = `src/contents/blog/${slug}/index.mdx`;
  const file = fs.readFileSync(path, "utf-8");
  const { data } = matter(file);

  const postData: PostMatter = {
    slug: slug,
    ...(data as unknown as Omit<PostMatter, "slug">),
  };

  return postData;
};

export const getPosts = (): PostMatter[] => {
  const files = fs.readdirSync("src/contents/blog");

  return files.map((file) => {
    return getPostFrontMatter(file);
  });
};
