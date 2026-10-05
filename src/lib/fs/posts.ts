import "server-only";
import type { Frontmatter, PostWithScope } from "@/lib/types/posts";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function getMarkdownExtension(
  fileName: `${string}.md` | `${string}.mdx` | string
): "md" | "mdx" {
  const match = fileName.match(/\.mdx?$/);
  return (match ? match[0].substring(1) : "mdx") as "md" | "mdx";
}

export const RE = /\.mdx?$/;

interface ApiPostSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  reading_time: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

interface ApiPostDetail extends ApiPostSummary {
  content: string;
  cover_image?: string;
}

export const getPosts = async (): Promise<PostWithScope[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/v1/posts?limit=100`, {
      next: { revalidate: 60, tags: ["posts"] },
    });
    if (!res.ok) {
      console.error("Failed to fetch posts from API:", res.statusText);
      return [];
    }
    const data = await res.json();
    const posts: ApiPostSummary[] = data.posts || [];
    return posts
      .filter((p) => p.is_published)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        tags: p.tags || [],
        readingTime: p.reading_time || "1 min read",
      }));
  } catch (err) {
    console.error("Error connecting to realm-api:", err);
    return [];
  }
};

export const getMarkdownFiles = async (): Promise<string[]> => {
  const posts = await getPosts();
  return posts.map((p) => `${p.slug}.mdx`);
};

export function getFrontmatter<T = Frontmatter>(source: string): { frontmatter: T } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { frontmatter: {} as T };
  }
  const lines = match[1].split("\n");
  const fm: Record<string, string | string[]> = {};
  let currentKey = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") && currentKey) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(trimmed.slice(2).replace(/^["']|["']$/g, ""));
    } else {
      const idx = line.indexOf(":");
      if (idx !== -1) {
        currentKey = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (val) {
          fm[currentKey] = val;
        } else {
          fm[currentKey] = [];
        }
      }
    }
  }
  return { frontmatter: fm as T };
}

export const getMarkdownFromSlug = async (
  slug: string
): Promise<
  | {
      source: string;
      content: string;
      format: "md" | "mdx";
      frontmatter: Frontmatter;
      post: ApiPostDetail;
    }
  | undefined
> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/v1/posts/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60, tags: [`post-${slug}`] },
      }
    );
    if (!res.ok) return undefined;
    const post: ApiPostDetail = await res.json();

    const frontmatter: Frontmatter = {
      title: post.title,
      description: post.description || "",
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      tags: post.tags || [],
    };

    const yamlTags = (post.tags || [])
      .map((t) => `  - ${JSON.stringify(t)}`)
      .join("\n");
    const frontmatterLines = [
      "---",
      `title: ${JSON.stringify(post.title)}`,
      `description: ${JSON.stringify(post.description || "")}`,
      `createdAt: ${JSON.stringify(post.created_at)}`,
      `updatedAt: ${JSON.stringify(post.updated_at)}`,
      "tags:",
      yamlTags,
      "---",
      "",
      post.content || "",
    ];
    const source = frontmatterLines.join("\n");

    return {
      source,
      content: post.content || "",
      format: "md",
      frontmatter,
      post,
    };
  } catch (err) {
    console.error(`Error fetching post ${slug} from realm-api:`, err);
    return undefined;
  }
};
