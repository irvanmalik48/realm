import { kv } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id, raw } = request.query;
  let bintext;

  if (request.method !== "GET") {
    return response.status(405).json({
      message: "Method Not Allowed",
    });
  }

  try {
    if (typeof id !== "string") {
      throw new Error("Invalid ID.");
    }

    if (!id) {
      throw new Error("ID is required.");
    }

    bintext = await kv.get(id).catch((error) => {
      throw new Error((error as any).message);
    });
  } catch (error) {
    return response.status(500).json({
      message: (error as any).message,
    });
  }

  if (raw === "true") {
    return response.status(200).send(bintext);
  }

  return response.status(200).json({
    id: id,
    text: bintext,
  });
}
