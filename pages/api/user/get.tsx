import { NextApiRequest, NextApiResponse } from "next";
import prisma from "u/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;

  if (query.email !== undefined) {
    const user = await prisma.user.findUnique({
      where: {
        email: query.email as string,
      },
    });

    res.status(200).json(user);
  } else {
    res.status(200).json([]);
  }
}
