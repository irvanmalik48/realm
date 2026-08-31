import { NextRequest, NextResponse } from "next/server";
import { getCommentClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";
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

  try {
    const client = getCommentClient();
    const metadata = createMetadata({ token });

    const data: any = await promisifyUnary(
      client,
      "GetComments",
      { slug },
      metadata
    );

    return NextResponse.json({
      slug: data.slug,
      total_count: data.total_count || 0,
      comments: data.comments || [],
    });
  } catch {
    // Return empty comments if unavailable
    return NextResponse.json({
      slug,
      total_count: 0,
      comments: [],
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

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: login required to post a comment" },
        { status: 401 },
      );
    }

    const client = getCommentClient();
    const metadata = createMetadata({ token });

    const data: any = await promisifyUnary(
      client,
      "CreateComment",
      {
        slug,
        content: body.content || "",
        parent_id: body.parent_id || undefined,
      },
      metadata
    );

    return NextResponse.json(
      {
        status: "success",
        comment: data.comment,
      },
      { status: 201 }
    );
  } catch (err: any) {
    const { message, status } = formatGrpcError(err);
    return NextResponse.json({ error: message }, { status });
  }
}

