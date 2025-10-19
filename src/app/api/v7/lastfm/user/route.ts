import { LastFMUserResponseBody } from "@/lib/types/lastfm";
import { jsonResponse, errorResponse } from "@/lib/headers/index";

export async function GET(request: Request): Promise<Response> {
  const token = process.env.LASTFM_API_KEY;

  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!token) {
    return errorResponse("LastFM API key is not set.", 500);
  }

  if (!username) {
    return errorResponse("Username is required.", 400);
  }

  const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${encodeURIComponent(
    username,
  )}&api_key=${encodeURIComponent(token)}&format=json`;

  const response = await fetch(endpoint, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  });

  if (!response.ok) {
    return errorResponse("Failed to fetch LastFM user data", response.status);
  }

  const body: LastFMUserResponseBody = await response.json();
  return jsonResponse(body, 200);
}
