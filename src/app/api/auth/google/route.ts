import { NextResponse } from "next/server";
import { env } from "@/env";

function getBackendUrl(): string {
  if (env.API_URL) return env.API_URL;
  if (env.NEXT_PUBLIC_API_URL) return env.NEXT_PUBLIC_API_URL;
  return env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.irvanma.eu.org";
}

export async function GET() {
  const backendUrl = getBackendUrl();
  return NextResponse.redirect(`${backendUrl}/v1/auth/google`);
}
