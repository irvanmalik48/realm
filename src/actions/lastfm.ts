"use server";

import { env } from "@/env";
import { parseSongs, parseUser } from "@/lib/lastfm/lastfm";
import { LastFMTrackResponseBody, LastFMUserResponseBody } from "@/lib/types/lastfm";

function getApiBaseUrl(): string {
  if (env.API_URL) return env.API_URL;
  if (env.NEXT_PUBLIC_API_URL) return env.NEXT_PUBLIC_API_URL;
  return env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.irvanma.eu.org";
}

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

  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/v1/lastfm/track?username=${encodeURIComponent(
    username
  )}&limit=${encodeURIComponent(String(limit))}`;

  const res = await fetch(endpoint, {
    headers: getAuthHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `Failed to fetch tracks (HTTP ${res.status})`);
  }

  const body: LastFMTrackResponseBody = await res.json();
  return parseSongs(body, "large");
}

export async function getUserInfoAction(username: string) {
  if (!username) {
    throw new Error("Username is required");
  }

  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/v1/lastfm/user?username=${encodeURIComponent(username)}`;

  const res = await fetch(endpoint, {
    headers: getAuthHeaders(),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `Failed to fetch user (HTTP ${res.status})`);
  }

  const body: LastFMUserResponseBody = await res.json();
  return parseUser(body, "large");
}
