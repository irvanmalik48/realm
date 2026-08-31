import { NextRequest, NextResponse } from "next/server";
import { getCommentClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> },
) {
  const { slug, id } = await params;
  if (!slug || !id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

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

  try {
    const client = getCommentClient();
    const metadata = createMetadata({ token });

    const data: any = await promisifyUnary(
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
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const restRes = await fetch(`${baseUrl}/v1/posts/${encodeURIComponent(slug)}/comments/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const restData = await restRes.json();
      if (restRes.ok) {
        return NextResponse.json(restData);
      }

      return NextResponse.json(
        { error: restData.error || "Failed to update comment" },
        { status: restRes.status }
      );
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
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

  const token =
    req.cookies.get("realm_auth_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: login required" },
      { status: 401 },
    );
  }

  try {
    const client = getCommentClient();
    const metadata = createMetadata({ token });

    const data: any = await promisifyUnary(
      client,
      "DeleteComment",
      { id },
      metadata
    );

    return NextResponse.json({
      status: "success",
      message: data.message || "Comment deleted",
    });
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const restRes = await fetch(`${baseUrl}/v1/posts/${encodeURIComponent(slug)}/comments/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const restData = await restRes.json();
      if (restRes.ok) {
        return NextResponse.json(restData);
      }

      return NextResponse.json(
        { error: restData.error || "Failed to delete comment" },
        { status: restRes.status }
      );
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
  }
}

