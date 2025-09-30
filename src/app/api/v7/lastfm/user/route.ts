import { LastFMUserResponseBody } from "@/lib/types/lastfm";

export async function GET(request: Request): Promise<Response> {
  const token = process.env.LASTFM_API_KEY;

  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!token) {
    return new Response(
      JSON.stringify({
        error: "LastFM API key is not set.",
        status: "error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }

  if (!username) {
    return new Response(
      JSON.stringify({
        error: "Username is required.",
        status: "error",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }

  const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${token}&format=json`;

  const response = await fetch(endpoint, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  });
  if (!response.ok) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch LastFM user data",
        status: "error",
      }),
      {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
  const body: LastFMUserResponseBody = await response.json();

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
