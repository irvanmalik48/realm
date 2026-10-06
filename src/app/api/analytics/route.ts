import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

function getBackendUrl(): string {
  return (
    env.API_URL ||
    env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8080"
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = getBackendUrl();

    const forwardRes = await fetch(`${backendUrl}/v1/analytics/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": req.headers.get("user-agent") || "",
        "X-Forwarded-For":
          req.headers.get("x-forwarded-for") ||
          req.headers.get("x-real-ip") ||
          "",
      },
      body: JSON.stringify(body),
    });

    const data = await forwardRes.json().catch(() => ({ status: "recorded" }));
    return NextResponse.json(data, {
      status: forwardRes.status,
    });
  } catch (err) {
    console.error("Error logging analytics event in realm-reference:", err);
    return NextResponse.json(
      { error: "Failed to record analytics event" },
      { status: 500 },
    );
  }
}
