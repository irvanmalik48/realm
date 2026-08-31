import { NextRequest, NextResponse } from "next/server";
import { getAuthClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username") || undefined;
  const email = searchParams.get("email") || undefined;

  try {
    const client = getAuthClient();
    const metadata = createMetadata();

    const data: any = await promisifyUnary(
      client,
      "CheckAvailability",
      {
        username,
        email,
      },
      metadata
    );

    return NextResponse.json(data);
  } catch (grpcError: any) {
    if (grpcError?.digest === "NEXT_PRERENDER_INTERRUPTED" || grpcError?.message?.includes("bail out of prerendering")) {
      throw grpcError;
    }

    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const params = new URLSearchParams();
      if (username) params.set("username", username);
      if (email) params.set("email", email);

      const restRes = await fetch(`${baseUrl}/v1/auth/check?${params.toString()}`, {
        cache: "no-store",
      });

      if (restRes.ok) {
        const restData = await restRes.json();
        return NextResponse.json(restData);
      }
    } catch {
      // Fallback failed
    }

    const { message, status } = formatGrpcError(grpcError);
    return NextResponse.json({ error: message }, { status });
  }
}

