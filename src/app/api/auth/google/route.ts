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
  const token =
    req.cookies.get("realm_auth_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  const backendUrl = getBackendUrl();
  const url = new URL(`${backendUrl}/v1/auth/google`);

  if (token) {
    url.searchParams.set("token", token);
  }

  return NextResponse.redirect(url.toString());
}
