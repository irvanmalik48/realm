import { json } from "@hattip/response";
import { getPostBySlug } from "src/lib/posts";
import { type RequestContext } from "rakkasjs";

export function get(ctx: RequestContext) {
  const posts = getPostBySlug(ctx.url.searchParams.get("slug") as string);
  return json(posts);
}
