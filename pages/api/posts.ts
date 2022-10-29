import { NextApiRequest, NextApiResponse } from "next";
import { getPostSlugs } from "../../utils/utils";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const slugs = getPostSlugs().sort((a: any, b: any) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const query = _req.query.q as string;
  if (query) {
    const filteredSlugs = slugs.filter((slug: any) => {
      return (
        slug.title.toLowerCase().includes(query.toLowerCase()) ||
        slug.tag.some((tag: string) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
      );
    });
    res
      .status(200)
      .setHeader("content-type", "application/json")
      .json(filteredSlugs);
  } else {
    res.status(200).setHeader("content-type", "application/json").json(slugs);
  }
}
