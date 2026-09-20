import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");
  const rawRedirect = searchParams.get("redirect") || "/";
  const safeRedirect =
    rawRedirect.startsWith("/") &&
    !rawRedirect.startsWith("//") &&
    !rawRedirect.startsWith("/\\")
      ? rawRedirect
      : "/";

  const baseUrl = req.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", baseUrl));
  }

  const response = NextResponse.redirect(new URL(safeRedirect, baseUrl));

  response.cookies.set("realm_auth_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return response;
}
