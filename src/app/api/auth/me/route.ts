import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

function getBackendUrl(): string {
  if (env.API_URL) return env.API_URL;
  if (env.NEXT_PUBLIC_API_URL) return env.NEXT_PUBLIC_API_URL;
  return env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.irvanma.eu.org";
}

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("realm_auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const backendUrl = getBackendUrl();
    const response = await fetch(`${backendUrl}/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const res = NextResponse.json({ user: null });
      res.cookies.set("realm_auth_token", "", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return res;
    }

    const data = await response.json();
    return NextResponse.json({
      status: "success",
      user: data.user,
    });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
