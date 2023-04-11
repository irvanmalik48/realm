import type { APIContext } from "astro";
import { getCollection } from "astro:content";

const posts = await getCollection("posts");

export async function get({ request }: APIContext) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify(posts), {
      status: 200,
      statusText: "OK",
      headers: { "content-type": "application/json" },
    });
  }

  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return new Response("Not found", {
      status: 404,
      statusText: "Not found",
      headers: { "content-type": "text/plain" },
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    statusText: "OK",
    headers: { "content-type": "application/json" },
  });
}
