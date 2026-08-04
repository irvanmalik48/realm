import { LastFMTrackResponseBody } from "@/lib/types/lastfm";
import { jsonResponse, errorResponse } from "@/lib/headers/index";
import { env } from "@/env";

export async function GET(request: Request): Promise<Response> {
  const token = env.LASTFM_API_KEY;

  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  const limit = url.searchParams.get("limit");

  const limitNumber = limit ? parseInt(limit, 10) : 1;

  if (!token) {
    console.error("Missing LASTFM_API_KEY environment variable");
    return errorResponse("Internal server error", 500);
  }

  if (!username) {
    return errorResponse("Username is required.", 400);
  }

  if (isNaN(limitNumber) || limitNumber <= 0 || limitNumber > 200) {
    return errorResponse("Limit must be between 1 and 200.", 400);
  }

  const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
    username,
  )}&api_key=${encodeURIComponent(token)}&format=json&limit=${encodeURIComponent(
    String(limitNumber),
  )}`;

  const response = await fetch(endpoint, {
    next: {
      revalidate: 60 * 15,
    },
  });

  if (!response.ok) {
    return errorResponse("Failed to fetch LastFM data", response.status);
  }

  const body: LastFMTrackResponseBody = await response.json();

  return jsonResponse(body, 200);
}
