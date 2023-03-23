import { json } from "@hattip/response";
import { getLyricBySlug } from "src/lib/lyrics";
import { type RequestContext } from "rakkasjs";

export function get(ctx: RequestContext) {
  const posts = getLyricBySlug(ctx.url.searchParams.get("slug") as string);
  return json(posts);
}
