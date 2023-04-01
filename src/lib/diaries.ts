import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

export interface DiaryFrontMatter {
  title: string;
  date: string;
  description: string;
}

export const diariesDirectory = path.join(process.cwd(), "src", "pages", "diaries");

export function getDiaryPaths() {
  return readdirSync(diariesDirectory, { withFileTypes: true });
}

export function getDiaryData(slug: string) {
  if (slug === "") {
    return;
  }

  const fullPath = path.join(diariesDirectory, slug);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data: frontMatter, content } = matter(fileContents) as unknown as {
    data: DiaryFrontMatter;
    content: string;
  };
  return {
    frontMatter,
    content,
    slug: slug.replace(/\.mdx$/, ""),
  };
}

export function getDiaries() {
  const diaryFileNames = getDiaryPaths();
  const diaries = diaryFileNames
    .map((fileName) => {
      return getDiaryData(fileName.isFile() ? fileName.name : "");
    })
    .filter((diary) => {
      return diary?.frontMatter.date !== undefined;
    });
  return diaries;
}

export function getSortedDiaries() {
  const diaries = getDiaries();
  return diaries.sort((a, b) => {
    if (a!.frontMatter.date < b!.frontMatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getDiaryBySlug(slug: string) {
  const diary = getDiaryData(`${slug}.mdx`);
  return diary;
}

export function getAllDiarySlugs() {
  const diaries = getDiaries();
  return diaries.map((diary) => {
    return diary?.slug;
  });
}

export function getAllDiaryLinks() {
  const diaries = getAllDiarySlugs();
  return diaries.map((diary) => {
    return `https://irvanma.eu.org/diaries/${diary}`;
  });
}
