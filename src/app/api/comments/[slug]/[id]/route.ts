import { NextRequest, NextResponse } from "next/server";
import { getCommentClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> },
) {
  const { slug, id } = await params;
  if (!slug || !id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const token =
      req.cookies.get("realm_auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: login required" },
        { status: 401 },
      );
    }

    const client = getCommentClient();
    const metadata = createMetadata({ token });

    const data = await promisifyUnary<
      { id: string; content: string },
      { comment?: unknown }
    >(
      client,
      "UpdateComment",
      {
        id,
        content: body.content || "",
      },
      metadata
    );

    return NextResponse.json({
      status: "success",
      comment: data.comment,
    });
  } catch (err: unknown) {
    const { message, status } = formatGrpcError(err);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> },
) {
  const { slug, id } = await params;
  if (!slug || !id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const token =
      req.cookies.get("realm_auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: login required" },
        { status: 401 },
      );
    }

    const client = getCommentClient();
    const metadata = createMetadata({ token });

    const data = await promisifyUnary<
      { id: string },
      { message?: string }
    >(
      client,
      "DeleteComment",
      { id },
      metadata
    );

    return NextResponse.json({
      status: "success",
      message: data.message || "Comment deleted",
    });
  } catch (err: unknown) {
    const { message, status } = formatGrpcError(err);
    return NextResponse.json({ error: message }, { status });
  }
}

