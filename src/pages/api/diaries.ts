import type { APIRoute } from "astro";
import { getSortedDiaries } from "../../lib/diaries";

export const get: APIRoute = async function get() {
  const diaries = getSortedDiaries();

  return new Response(JSON.stringify(diaries), {
    headers: {
      "content-type": "application/json",
    },
  });
};
