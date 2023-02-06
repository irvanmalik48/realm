import { NextApiRequest, NextApiResponse } from "next";
import prisma from "u/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  if (query.q !== undefined && query.email !== undefined) {
    const user = await prisma.user.findUnique({
      where: {
        email: query.email as string,
      },
    });

    const ret = (await prisma.comment.findMany({
      where: {
        postSlug: query.q as string,
        userId: user?.id as string,
      }
    })).sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())

    res.status(200).json(ret);
  } else {
    res.status(200).json([]);
  }
}
