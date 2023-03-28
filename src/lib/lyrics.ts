import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

export interface LyricFrontMatter {
  title: string;
  artist: string;
  date: string;
}

export const lyricsDirectory = path.join(
  process.cwd(),
  "src",
  "pages",
  "lyrics"
);

export function getLyricPaths() {
  return readdirSync(lyricsDirectory);
}

export function getLyricData(slug: string) {
  const fullPath = path.join(lyricsDirectory, slug);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data: frontMatter, content } = matter(fileContents) as unknown as {
    data: LyricFrontMatter;
    content: string;
  };
  return {
    frontMatter,
    content,
    slug: slug.replace(/\.mdx$/, ""),
  };
}

export function getLyrics() {
  const lyricFileNames = getLyricPaths();
  const lyrics = lyricFileNames
    .map((fileName) => {
      return getLyricData(fileName);
    })
    .filter((lyric) => {
      return lyric.frontMatter.date !== undefined;
    });
  return lyrics;
}

export function getSortedLyrics() {
  const lyrics = getLyrics();
  return lyrics.sort((a, b) => {
    if (a.frontMatter.date < b.frontMatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getLyricBySlug(slug: string) {
  const lyric = getLyricData(`${slug}.mdx`);
  return lyric;
}

export function getAllLyricSlugs() {
  const lyrics = getLyrics();
  return lyrics.map((lyric) => {
    return lyric.slug;
  });
}

export function getAllLyricLinks() {
  const lyrics = getAllLyricSlugs();
  return lyrics.map((lyric) => {
    return `https://irvanma.eu.org/posts/${lyric}`;
  });
}
