// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getPostSlugs } from "@utils/utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postSlugs = getPostSlugs().sort((a: any, b: any) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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

  const fieldsPost = postSlugs.map((post: any) => ({
    loc: `https://www.irvanma.me${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
  }));

  const fields = [...fieldsRegular, ...fieldsPost];

  return getServerSideSitemap(ctx, fields);
};

export default function SitemapIndex() {}
