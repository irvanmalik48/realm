import { NextRequest, NextResponse } from "next/server";
import { getReactionClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const token =
    req.cookies.get("realm_auth_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  const forwardedFor =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

  try {
    const client = getReactionClient();
    const metadata = createMetadata({ token, ip: forwardedFor });

    const data: any = await promisifyUnary(
      client,
      "GetReactions",
      { slug },
      metadata
    );

    return NextResponse.json({
      slug: data.slug,
      total_count: data.total_count || 0,
      reactions: data.reactions || {
        like: 0,
        love: 0,
        fire: 0,
        dislike: 0,
        frown: 0,
        skull: 0,
      },
      user_reaction: data.user_reaction || null,
      user_reactions: data.user_reactions || [],
    });
  } catch {
    // Fallback to HTTP REST endpoint
    try {
      const baseUrl = getApiBaseUrl();
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;

      const restRes = await fetch(`${baseUrl}/v1/posts/${encodeURIComponent(slug)}/reactions`, {
        headers,
        cache: "no-store",
      });

      if (restRes.ok) {
        const restData = await restRes.json();
        return NextResponse.json(restData);
      }
    } catch {
      // Fallback failed
    }

    // Default fallback if backend is offline or uninitialized
    return NextResponse.json({
      slug,
      total_count: 0,
      reactions: {
        like: 0,
        love: 0,
        fire: 0,
        dislike: 0,
        frown: 0,
        skull: 0,
      },
      user_reaction: null,
      user_reactions: [],
    });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const body = await req.json();
  const token =
    req.cookies.get("realm_auth_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  const forwardedFor =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

  try {
    const client = getReactionClient();
    const metadata = createMetadata({ token, ip: forwardedFor });

    const data: any = await promisifyUnary(
      client,
      "ToggleReaction",
      {
        slug,
        reaction: body.reaction || "",
      },
      metadata
    );

    return NextResponse.json({
      slug: data.slug,
      reaction: data.reaction,
      active: data.active,
      total_count: data.total_count || 0,
      reactions: data.reactions || {},
      user_reaction: data.user_reaction || null,
      user_reactions: data.user_reactions || [],
    });
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;

      const restRes = await fetch(`${baseUrl}/v1/posts/${encodeURIComponent(slug)}/reactions`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const restData = await restRes.json();
      if (restRes.ok) {
        return NextResponse.json(restData);
      }

      return NextResponse.json(
        { error: restData.error || "Failed to toggle reaction" },
        { status: restRes.status }
      );
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
  }
}

