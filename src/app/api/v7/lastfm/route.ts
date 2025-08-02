import { LastFMResponseBody } from "@/lib/types/lastfm";

export async function GET(request: Request): Promise<Response> {
  const token = process.env.LASTFM_API_KEY;

  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  const limit = url.searchParams.get("limit");

  const limitNumber = limit ? parseInt(limit, 10) : 1;

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

  if (limitNumber <= 0 || limitNumber > 200) {
    return new Response(
      JSON.stringify({
        error: "Limit must be between 1 and 200.",
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

  const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${token}&format=json&limit=${limit}`;

  const response = await fetch(endpoint, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  });
  if (!response.ok) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch LastFM data",
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
  const body: LastFMResponseBody = await response.json();

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
