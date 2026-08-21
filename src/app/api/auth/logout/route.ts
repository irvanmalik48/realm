import { NextResponse } from "next/server";
import { env } from "@/env";

export async function POST() {
  const res = NextResponse.json({
    status: "success",
    message: "Logged out successfully",
  });

  res.cookies.set("realm_auth_token", "", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
