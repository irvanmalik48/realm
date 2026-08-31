import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { getAuthClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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

    const token = data.token;
    const user = data.user;

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
  } catch (error: any) {
    const { message, status } = formatGrpcError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

