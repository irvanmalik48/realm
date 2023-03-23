import { json } from "@hattip/response";
import { getLyrics } from "src/lib/lyrics";

export function get() {
  const posts = getLyrics();
  return json(posts);
}
