import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

function getBackendUrl(): string {
  if (env.API_URL) return env.API_URL;
  if (env.NEXT_PUBLIC_API_URL) return env.NEXT_PUBLIC_API_URL;
  return env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.irvanma.eu.org";
}

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

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const backendUrl = getBackendUrl();
    const res = await fetch(`${backendUrl}/v1/posts/${encodeURIComponent(slug)}/comments`, {
      headers,
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Fallback if backend is unreachable
  }

  return NextResponse.json({
    slug,
    total_count: 0,
    comments: [],
  });
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

    const backendUrl = getBackendUrl();
    const res = await fetch(`${backendUrl}/v1/posts/${encodeURIComponent(slug)}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, { status: 201 });
    }

    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: err.error || "Failed to post comment" },
      { status: res.status },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to connect to comment service" },
      { status: 500 },
    );
  }
}
