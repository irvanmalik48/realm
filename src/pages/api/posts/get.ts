import { getPosts } from "@/contents/config";
import { PostMatter } from "@/types/api/posts";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostMatter[]>
) {
  if (req.method === "GET") {
    const posts = getPosts();
    return res.status(200).json(posts);
  }
}
