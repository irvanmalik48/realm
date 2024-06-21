import { createId } from "@paralleldrive/cuid2";
import { kv } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { text } = request.body;
  const id = createId();

  if (request.method !== "POST") {
    return response.status(405).json({
      message: "Method Not Allowed",
    });
  }

  try {
    if (typeof text !== "string" || !text) {
      throw new Error("Invalid Text.");
    }

    await kv
      .set(id, text, {
        ex: 60 * 60 * 24 * 14,
      })
      .catch((error) => {
        throw new Error((error as any).message);
      });
  } catch (error) {
    return response.status(500).json({
      message: (error as any).message,
    });
  }

  return response.status(200).json({
    id: id,
    text: text,
  });
}
