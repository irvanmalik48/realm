import { NextApiRequest, NextApiResponse } from "next";
import prisma from "u/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  if (query.id !== undefined && query.email !== undefined && req.method === "DELETE") {
    const user = await prisma.user.findUnique({
      where: {
        email: query.email as string,
      },
    });

    let check = null;

    if (user?.role !== "admin") {
      check = await prisma.comment.findUnique({
        where: {
          id: Number(query.id),
        },
      });
      if (check?.userId !== user?.id) {
        res.status(200).json([]);
        return;
      }
    }

    const ret = (await prisma.comment.delete({
      where: {
        id: Number(query.id),
      }
    }));

    res.status(200).json(ret);
  } else {
    res.status(200).json([]);
  }
}