import { NextRequest, NextResponse } from "next/server";
import { getAuthClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function POST(req: NextRequest) {
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
      "SetPassword",
      {
        current_password: body.current_password,
        new_password: body.new_password || "",
      },
      metadata
    );

    return NextResponse.json({
      status: "success",
      message: data.message || "Password updated successfully",
    });
  } catch (error: any) {
    const { message, status } = formatGrpcError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

