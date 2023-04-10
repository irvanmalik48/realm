import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get(context: any) {
  const posts = await getCollection("posts");
  return rss({
    title: "Irvan Malik Azantha's Realm",
    description: "The Realm of Irvan Malik Azantha",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/posts/${post.slug}`,
    })),
  });
}
