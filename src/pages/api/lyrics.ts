import type { APIRoute } from "astro";
import { getSortedLyrics } from "../../lib/lyrics";

export const get: APIRoute = async function get() {
  const lyrics = getSortedLyrics();

  return new Response(JSON.stringify(lyrics), {
    headers: {
      "content-type": "application/json",
    },
  });
};
