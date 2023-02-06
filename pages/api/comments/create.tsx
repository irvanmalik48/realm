import { NextApiRequest, NextApiResponse } from "next";
import prisma from "u/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  if (query.q !== undefined && query.body !== undefined && query.email !== undefined) {
    const user = await prisma.user.findUnique({
      where: {
        email: query.email as string,
      },
    });

    const ret = await prisma.comment.create({
      data: {
        body: query.body as string,
        userId: user?.id as string,
        createdAt: new Date(),
        authorName: user?.name as string,
        authorImg: user?.image as string,
        authorEmail: user?.email as string,
        postSlug: query.q as string,
      }
    });

    const result = {
      ...ret,
      status: "success",
    };

    res.status(200).json(result);
  } else {
    const result = {
      status: "error",
    };
    res.status(200).json(result);
  }
}
