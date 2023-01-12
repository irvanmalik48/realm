import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PostCardProps } from "t/types";

export function getPostSlug(slug: string) {
  const dir = path.join(process.cwd(), "posts");
  const file = fs.readFileSync(path.join(dir, slug + ".mdx"), "utf-8");
  const matterResult = matter(file);
  return {
    slug,
    frontmatter: { ...matterResult.data },
    content: matterResult.content,
  };
}

export function getSortedPostSlugs(): PostCardProps[] {
  const dir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(dir);
  const allPostsData = files.map((fileName) => {
    const id = fileName.replace(/\.(md|mdx)$/, "");

    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      slug: id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a: unknown, b: unknown): number => {
    let one: string, two: string;
    const checkOne = typeof a === "object" && a !== null && "date" in a;
    const checkTwo = typeof b === "object" && b !== null && "date" in b;
    if (checkOne && checkTwo) {
      one = a.date as string;
      two = b.date as string;
      return one < two ? 1 : -1;
    }
    return 0;
  });
}
