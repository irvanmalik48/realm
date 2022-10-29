import path from "path";
import fs from "fs";
import matter from "gray-matter";

export const findPath = path;
export const POSTS_PATH = path.join(process.cwd(), "posts");
export const PROJECTS_PATH = path.join(process.cwd(), "projects");

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path: string) => /\.mdx?$/.test(path));

export const projectFilePaths = fs
  .readdirSync(PROJECTS_PATH)
  .filter((path: string) => /\.mdx?$/.test(path));

export function getPost(slug: string) {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const postFile = fs.readFileSync(postFilePath);
  return postFile;
}

export function getProject(slug: string) {
  const projectFilePath = path.join(PROJECTS_PATH, `${slug}.mdx`);
  const projectFile = fs.readFileSync(projectFilePath);
  return projectFile;
}

export function getPostSlugs() {
  const slugs = postFilePaths.map((path: string) => {
    const source = fs.readFileSync(POSTS_PATH + "/" + path);
    const { data } = matter(source);
    return {
      slug: "/posts/" + path.replace(/\.mdx?$/, ""),
      ...data,
    };
  });

  return slugs;
}

export function getProjectSlugs() {
  const slugs = projectFilePaths.map((path: string) => {
    const source = fs.readFileSync(PROJECTS_PATH + "/" + path);
    const { data } = matter(source);
    return {
      slug: "/projects/" + path.replace(/\.mdx?$/, ""),
      ...data,
    };
  });

  return slugs;
}
