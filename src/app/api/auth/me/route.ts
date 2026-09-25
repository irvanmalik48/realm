import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { getAuthClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("realm_auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const client = getAuthClient();
    const metadata = createMetadata({ token });

    try {
      const data = await promisifyUnary<
        Record<string, never>,
        { user?: unknown }
      >(client, "GetProfile", {}, metadata);
      return NextResponse.json({
        status: "success",
        user: data.user,
      });
    } catch {
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
  } catch {
    return NextResponse.json({ user: null });
  }
}

