import { NextRequest, NextResponse } from "next/server";
import { getAuthClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function PATCH(req: NextRequest) {
  try {
    const token =
      req.cookies.get("realm_auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const client = getAuthClient();
    const metadata = createMetadata({ token });

    const data: any = await promisifyUnary(
      client,
      "UpdateProfile",
      {
        full_name: body.full_name,
        username: body.username,
        avatar_url: body.avatar_url,
      },
      metadata
    );

    return NextResponse.json({
      status: "success",
      message: data.message || "Profile updated successfully",
      user: data.user,
    });
  } catch (error: any) {
    const { message, status } = formatGrpcError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

