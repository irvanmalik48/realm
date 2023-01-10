import { NextApiRequest, NextApiResponse } from "next";
import { getSortedProjectSlugs, getProjectSlug } from "u/projects";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  if (query.q !== undefined) {
    res.status(200).json(getProjectSlug(query.q as string));
  } else {
    res.status(200).json(getSortedProjectSlugs());
  }
}
