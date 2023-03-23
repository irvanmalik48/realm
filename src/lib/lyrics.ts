import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

export interface LyricFrontMatter {
  title: string
  artist: string
  date: string
}

export const lyricsDirectory = path.join(process.cwd(), "lyrics");

export function getLyricPaths() {
  return readdirSync(lyricsDirectory);
}

export function getLyricData(slug: string) {
  const fullPath = path.join(lyricsDirectory, slug);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data: frontMatter, content } = matter(fileContents) as unknown as {
    data: LyricFrontMatter
    content: string
  };
  return {
    frontMatter,
    content,
    slug: slug.replace(/\.mdx$/, ""),
  };
}

export function getLyrics() {
  const lyricFileNames = getLyricPaths();
  const lyrics = lyricFileNames.map((fileName) => {
    return getLyricData(fileName);
  });
  return lyrics;
}

export function getLyricBySlug(slug: string) {
  const lyric = getLyricData(`${slug}.mdx`);
  return lyric;
}
