import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");
  const redirectPath = searchParams.get("redirect") || "/";

  const baseUrl = req.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_failed`);
  }

  const response = NextResponse.redirect(`${baseUrl}${redirectPath.startsWith("/") ? redirectPath : "/"}`);

  response.cookies.set("realm_auth_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return response;
}
