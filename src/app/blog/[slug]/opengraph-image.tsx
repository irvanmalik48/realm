import { ImageResponse } from "next/og";
import { getMarkdownFromSlug } from "@/lib/fs/posts";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import type { Frontmatter } from "@/lib/types/posts";
import { readingTime } from "reading-time-estimator";

export const alt = "realm. blog post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getMarkdownFromSlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            color: "#ffffff",
          }}
        >
          <span style={{ fontSize: 60, fontWeight: "bold", fontFamily: "sans-serif" }}>realm.</span>
        </div>
      ),
      { ...size }
    );
  }

  const { frontmatter } = getFrontmatter<Frontmatter>(post.source);
  const timeText = readingTime(post.source, { wordsPerMinute: 100 }).text;
  const dateText = frontmatter.createdAt
    ? new Date(frontmatter.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const title = frontmatter.title ?? "Untitled Post";
  const tags = frontmatter.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "80px",
          border: "12px solid #ffffff",
          boxSizing: "border-box",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: "bold",
              letterSpacing: "0.2em",
              fontFamily: "sans-serif",
            }}
          >
            REALM.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "16px",
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#a3a3a3",
              }}
            >
              {tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}

          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              lineHeight: 1.1,
              color: "#ffffff",
              wordBreak: "break-word",
              maxHeight: "220px",
              overflow: "hidden",
              display: "flex",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 20,
              color: "#a3a3a3",
            }}
          >
            {dateText && <span>{dateText}</span>}
            {dateText && timeText && <span style={{ color: "#525252" }}>•</span>}
            {timeText && <span>{timeText}</span>}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
