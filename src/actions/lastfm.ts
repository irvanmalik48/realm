"use server";

import { parseSongs, parseUser } from "@/lib/lastfm/lastfm";
import { LastFMTrackResponseBody, LastFMUserResponseBody } from "@/lib/types/lastfm";
import { getLastFMClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";

export async function getRecentTracksAction(username: string, limit: number = 8) {
  if (!username) {
    throw new Error("Username is required");
  }

  const client = getLastFMClient();
  const metadata = createMetadata();

  try {
    const res = await promisifyUnary<
      { username: string; limit: number },
      { raw_json?: string }
    >(
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
  } catch {
    return parseSongs(null, "large");
  }
}

export async function getUserInfoAction(username: string) {
  if (!username) {
    throw new Error("Username is required");
  }

  const client = getLastFMClient();
  const metadata = createMetadata();

  try {
    const res = await promisifyUnary<
      { username: string },
      { raw_json?: string }
    >(
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
  } catch {
    return parseUser(null, "large");
  }
}
