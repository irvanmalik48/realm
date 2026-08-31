"use server";

import { env } from "@/env";
import { parseSongs, parseUser } from "@/lib/lastfm/lastfm";
import { LastFMTrackResponseBody, LastFMUserResponseBody } from "@/lib/types/lastfm";

import { getLastFMClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";

function getAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (env.API_TOKEN) {
    headers["Authorization"] = `Bearer ${env.API_TOKEN}`;
  }
  return headers;
}

export async function getRecentTracksAction(username: string, limit: number = 8) {
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    const client = getLastFMClient();
    const metadata = createMetadata();

    const res: any = await promisifyUnary(
      client,
      "GetRecentTracks",
      {
        username,
        limit,
      },
      metadata
    );

    if (res.raw_json) {
      const body: LastFMTrackResponseBody = JSON.parse(res.raw_json);
      return parseSongs(body, "large");
    }

    return parseSongs(null, "large");
  } catch (err: any) {
    // Fallback to HTTP REST endpoint
    try {
      const baseUrl = getApiBaseUrl();
      const endpoint = `${baseUrl}/v1/lastfm/track?username=${encodeURIComponent(
        username
      )}&limit=${encodeURIComponent(String(limit))}`;

      const res = await fetch(endpoint, {
        headers: getAuthHeaders(),
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const body: LastFMTrackResponseBody = await res.json();
        return parseSongs(body, "large");
      }
    } catch {
      // Fallback failed, throw original error
    }

    throw new Error(err.details || err.message || "Failed to fetch tracks");
  }
}

export async function getUserInfoAction(username: string) {
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    const client = getLastFMClient();
    const metadata = createMetadata();

    const res: any = await promisifyUnary(
      client,
      "GetUserInfo",
      {
        username,
      },
      metadata
    );

    if (res.raw_json) {
      const body: LastFMUserResponseBody = JSON.parse(res.raw_json);
      return parseUser(body, "large");
    }

    return parseUser(null, "large");
  } catch (err: any) {
    // Fallback to HTTP REST endpoint
    try {
      const baseUrl = getApiBaseUrl();
      const endpoint = `${baseUrl}/v1/lastfm/user?username=${encodeURIComponent(username)}`;

      const res = await fetch(endpoint, {
        headers: getAuthHeaders(),
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const body: LastFMUserResponseBody = await res.json();
        return parseUser(body, "large");
      }
    } catch {
      // Fallback failed, throw original error
    }

    throw new Error(err.details || err.message || "Failed to fetch user");
  }
}
