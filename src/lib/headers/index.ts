import { env } from "@/env";

const ALLOWED_ORIGIN =
  env.NEXT_PUBLIC_SITE_URL || "https://irvanma.eu.org";

export const JSON_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function jsonResponse(
  body: unknown,
  status = 200,
  revalidateSeconds = 900
): Response {
  const headers = new Headers(JSON_HEADERS);
  headers.set(
    "Cache-Control",
    `public, s-maxage=${revalidateSeconds}, stale-while-revalidate=${revalidateSeconds * 2}`
  );

  return new Response(JSON.stringify(body), {
    status,
    headers,
  });
}

export function errorResponse(message: string, status: number): Response {
  return jsonResponse({ error: message, status: "error" }, status);
}
