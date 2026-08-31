import { NextRequest, NextResponse } from "next/server";
import { getAuthClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function PATCH(req: NextRequest) {
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
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const restRes = await fetch(`${baseUrl}/v1/auth/profile`, {
        method: "PATCH",
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
          message: restData.message || "Profile updated successfully",
          user: restData.user,
        });
      }

      return NextResponse.json(
        { error: restData.error || "Failed to update profile" },
        { status: restRes.status }
      );
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
  }
}

