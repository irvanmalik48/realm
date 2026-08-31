import { NextRequest, NextResponse } from "next/server";
import { getAuthClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const token =
    req.cookies.get("realm_auth_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { provider } = await params;

  try {
    const client = getAuthClient();
    const metadata = createMetadata({ token });

    const data: any = await promisifyUnary(
      client,
      "UnlinkOAuth",
      {
        provider,
      },
      metadata
    );

    return NextResponse.json({
      status: "success",
      message: data.message || `${provider} account unlinked successfully`,
    });
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const restRes = await fetch(`${baseUrl}/v1/auth/oauth/${encodeURIComponent(provider)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const restData = await restRes.json();
      if (restRes.ok) {
        return NextResponse.json({
          status: "success",
          message: restData.message || `${provider} account unlinked successfully`,
        });
      }

      return NextResponse.json(
        { error: restData.error || "Failed to unlink account" },
        { status: restRes.status }
      );
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
  }
}

