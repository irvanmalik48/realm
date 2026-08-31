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
      "Register",
      {
        email: body.email || "",
        username: body.username || "",
        password: body.password || "",
        full_name: body.full_name || "",
        avatar_url: body.avatar_url,
      },
      metadata
    );

    token = data.token;
    user = data.user;
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const restRes = await fetch(`${baseUrl}/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const restData = await restRes.json();
      if (!restRes.ok) {
        return NextResponse.json(
          { error: restData.error || "Registration failed" },
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

  const res = NextResponse.json(
    {
      status: "success",
      message: "Registration successful",
      user,
    },
    { status: 201 }
  );

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

