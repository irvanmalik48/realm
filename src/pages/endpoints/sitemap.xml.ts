import { getSortedCollectionPosts, generateSitemapXml } from "../../lib/utils";

export async function get() {
  const posts = await getSortedCollectionPosts("posts");
  const diaries = await getSortedCollectionPosts("diaries");
  const lyrics = await getSortedCollectionPosts("lyrics");
  posts.push(...diaries, ...lyrics);

  return {
    headers: { "Content-Type": "application/xml" },
    body: await generateSitemapXml(posts, { url: import.meta.env.SITE }),
  };
}
