import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { getAuthClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("realm_auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ user: null });
    }

    try {
      const client = getAuthClient();
      const metadata = createMetadata({ token });
      const data: any = await promisifyUnary(client, "GetProfile", {}, metadata);
      return NextResponse.json({
        status: "success",
        user: data.user,
      });
    } catch {
      // Fallback to HTTP REST endpoint
      try {
        const baseUrl = getApiBaseUrl();
        const restRes = await fetch(`${baseUrl}/v1/auth/me`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (restRes.ok) {
          const restData = await restRes.json();
          return NextResponse.json({
            status: "success",
            user: restData.user,
          });
        }
      } catch {
        // Fallback failed
      }

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
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}

