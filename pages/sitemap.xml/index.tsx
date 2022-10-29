// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const urlPost = new URL("/api/posts", process.env.NEXT_PUBLIC_API_URL);
  const posts = await fetch(urlPost.toString());
  const postsJSON = await posts.json();

  const fieldsRegular = [
    {
      loc: "https://www.irvanma.me",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://www.irvanma.me/about",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://www.irvanma.me/projects",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://www.irvanma.me/posts",
      lastmod: new Date().toISOString(),
    },
  ];

  const fieldsPost = postsJSON.map((post: any) => ({
    loc: `https://www.irvanma.me${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
  }));

  const fields = [...fieldsRegular, ...fieldsPost];

  return getServerSideSitemap(ctx, fields);
};

export default function SitemapIndex() {}
