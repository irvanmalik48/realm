import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { getAuthClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function POST(req: NextRequest) {
  const body = await req.json();

  let token: string | undefined;
  let user: any;

  try {
    const client = getAuthClient();
    const metadata = createMetadata();

    const data: any = await promisifyUnary(
      client,
      "Login",
      {
        identifier: body.identifier || "",
        password: body.password || "",
      },
      metadata
    );

    token = data.token;
    user = data.user;
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const restRes = await fetch(`${baseUrl}/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const restData = await restRes.json();
      if (!restRes.ok) {
        return NextResponse.json(
          { error: restData.error || "Invalid email/username or password" },
          { status: restRes.status }
        );
      }

      token = restData.token;
      user = restData.user;
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
  }

  const res = NextResponse.json({
    status: "success",
    message: "Login successful",
    user,
  });

  if (token) {
    res.cookies.set("realm_auth_token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  }

  return res;
}

