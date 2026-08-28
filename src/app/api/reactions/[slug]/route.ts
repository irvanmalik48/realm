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
  const clientID = req.headers.get("x-client-id") || "";
  const forwardedFor =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (clientID) headers["X-Client-ID"] = clientID;
  if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;

  try {
    const backendUrl = getBackendUrl();
    const res = await fetch(`${backendUrl}/v1/posts/${encodeURIComponent(slug)}/reactions`, {
      headers,
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Fallback if backend is offline
  }

  return NextResponse.json({
    slug,
    total_count: 0,
    reactions: {
      like: 0,
      love: 0,
      fire: 0,
      rocket: 0,
      mindblown: 0,
      party: 0,
    },
    user_reactions: [],
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
    const clientID = req.headers.get("x-client-id") || "";
    const forwardedFor =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (clientID) headers["X-Client-ID"] = clientID;
    if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;

    const backendUrl = getBackendUrl();
    const res = await fetch(`${backendUrl}/v1/posts/${encodeURIComponent(slug)}/reactions`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    const err = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: err.error || "Failed to toggle reaction" },
      { status: res.status },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to connect to reaction service" },
      { status: 500 },
    );
  }
}
