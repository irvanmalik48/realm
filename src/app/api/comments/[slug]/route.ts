import { NextRequest, NextResponse } from "next/server";
import { getCommentClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
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
    // Fallback to HTTP REST endpoint
    try {
      const baseUrl = getApiBaseUrl();
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const restRes = await fetch(`${baseUrl}/v1/posts/${encodeURIComponent(slug)}/comments`, {
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

    // Default fallback if backend is unreachable
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

  try {
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
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const restRes = await fetch(`${baseUrl}/v1/posts/${encodeURIComponent(slug)}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const restData = await restRes.json();
      if (restRes.ok) {
        return NextResponse.json(restData, { status: 201 });
      }

      return NextResponse.json(
        { error: restData.error || "Failed to post comment" },
        { status: restRes.status }
      );
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
  }
}

