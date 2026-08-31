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
    throw new Error(err.details || err.message || "Failed to fetch tracks");
  }
}

export async function getUserInfoAction(username: string) {
  if (!username) {
    throw new Error("Username is required");
  }

  const client = getLastFMClient();
  const metadata = createMetadata();

  try {
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
    throw new Error(err.details || err.message || "Failed to fetch user");
  }
}
