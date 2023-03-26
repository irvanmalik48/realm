import type { APIRoute } from "astro";
import { getSortedPosts } from "../../lib/posts";

export const get: APIRoute = async function get() {
  const posts = getSortedPosts();

  return new Response(JSON.stringify(posts), {
    headers: {
      "content-type": "application/json",
    },
  });
};
