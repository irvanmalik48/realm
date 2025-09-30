import fs from "fs";
import path from "path";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { readingTime } from "reading-time-estimator";

import type { Frontmatter, PostWithScope } from "@/lib/types/posts";

export function getMarkdownExtension(
  fileName: `${string}.md` | `${string}.mdx`
): "mdx" {
  const match = fileName.match(/\.mdx?$/);

  return match![0].substring(1) as "mdx";
}

export const RE = /\.mdx?$/;

export const getSource = async (
  filename: string
): Promise<string | undefined> => {
  const sourcePath = path.join(process.cwd(), "posts", filename);
  if (!fs.existsSync(sourcePath)) return;
  return await fs.promises.readFile(sourcePath, "utf8");
};

export const getSourceSync = (filename: string): string | undefined => {
  const sourcePath = path.join(process.cwd(), "posts", filename);
  if (!fs.existsSync(sourcePath)) return;
  return fs.readFileSync(sourcePath, "utf8");
};

export const getMarkdownFiles = (): string[] => {
  return fs
    .readdirSync(path.join(process.cwd(), "posts"))
    .filter((filePath: string) => RE.test(filePath));
};

export const getMarkdownFromSlug = async (
  slug: string
): Promise<
  | {
      source: string;
      format: "mdx";
    }
  | undefined
> => {
  const filename = `${slug}.mdx` as const;

  const fullPath = path.join(process.cwd(), "posts", filename);

  if (fs.existsSync(fullPath)) {
    const source = await getSource(filename);

    if (!source) return;

    return {
      source,
      format: getMarkdownExtension(filename),
    };
  }
};

export const getPostInformation = (
  filename: string
): PostWithScope | undefined => {
  const source = getSourceSync(filename);

  if (!source) return;

  const req = getFrontmatter(source);

  const frontmatter = req.frontmatter as Frontmatter;
  const content = req.strippedSource;

  const post: PostWithScope = {
    ...frontmatter,
    slug: filename.replace(/\.(?=[^.]*$)/, "-").replace("-mdx", ""),
    readingTime: readingTime(content).text,
  };

  return post;
};

export const getPosts = (): PostWithScope[] => {
  const files = getMarkdownFiles();

  return files
    .map((file) => getPostInformation(file))
    .filter((post): post is PostWithScope => post !== undefined);
};
