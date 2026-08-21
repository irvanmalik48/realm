import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username") || "";
    const email = searchParams.get("email") || "";

    const backendUrl = env.API_URL || "http://localhost:8080";
    const query = new URLSearchParams();
    if (username) query.set("username", username);
    if (email) query.set("email", email);

    const res = await fetch(`${backendUrl}/v1/auth/check?${query.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Availability check proxy error:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}
