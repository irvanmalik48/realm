import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { ProjectCardProps } from "t/types";

export function getProjectSlug(slug: string) {
  const dir = path.join(process.cwd(), "projects");
  const file = fs.readFileSync(path.join(dir, slug + ".mdx"), "utf-8");
  const matterResult = matter(file);
  return {
    slug,
    frontmatter: { ...matterResult.data },
    content: matterResult.content,
  };
}

export function getSortedProjectSlugs(): ProjectCardProps[] {
  const dir = path.join(process.cwd(), "projects");
  const files = fs.readdirSync(dir);
  const allProjectsData = files.map((fileName) => {
    const id = fileName.replace(/\.(md|mdx)$/, "");

    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      slug: id,
      ...matterResult.data,
    };
  });

  return allProjectsData.sort((a: unknown, b: unknown): number => {
    let one: string, two: string;
    const checkOne = typeof a === "object" && a !== null && "title" in a;
    const checkTwo = typeof b === "object" && b !== null && "title" in b;
    if (checkOne && checkTwo) {
      one = a.title as string;
      two = b.title as string;
      return one < two ? -1 : 1;
    }
    return 0;
  });
}
