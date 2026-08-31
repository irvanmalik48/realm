import { NextRequest, NextResponse } from "next/server";
import { getAuthClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function POST(req: NextRequest) {
  const token =
    req.cookies.get("realm_auth_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
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
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const restRes = await fetch(`${baseUrl}/v1/auth/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const restData = await restRes.json();
      if (restRes.ok) {
        return NextResponse.json({
          status: "success",
          message: restData.message || "Password updated successfully",
        });
      }

      return NextResponse.json(
        { error: restData.error || "Failed to update password" },
        { status: restRes.status }
      );
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
  }
}

