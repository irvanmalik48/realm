import { getPosts } from "src/lib/posts";
import { json } from "@hattip/response";

export function get() {
  const posts = getPosts();
  return json(posts);
}
