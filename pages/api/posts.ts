import { NextApiRequest, NextApiResponse } from "next";
import { getSortedPostSlugs, getPostSlug } from "u/posts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  if (query.q !== undefined) {
    res.status(200).json(getPostSlug(query.q as string));
  } else {
    res.status(200).json(getSortedPostSlugs());
  }
}
