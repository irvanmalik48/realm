import fs from "fs";
import path from "path";

export const POSTS_PATH = path.join(process.cwd(), "posts");
export const SHORTS_PATH = path.join(process.cwd(), "shorts");

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export const shortFilePaths = fs
  .readdirSync(SHORTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));
