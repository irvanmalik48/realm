import { NextRequest, NextResponse } from "next/server";
import { getReactionClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";
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
    // Return empty reactions if unavailable
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

  try {
    const body = await req.json();
    const token =
      req.cookies.get("realm_auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");
    const forwardedFor =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

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
  } catch (err: any) {
    const { message, status } = formatGrpcError(err);
    return NextResponse.json({ error: message }, { status });
  }
}

