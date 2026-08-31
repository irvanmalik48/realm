import { NextRequest, NextResponse } from "next/server";
import { getAuthClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username") || undefined;
    const email = searchParams.get("email") || undefined;

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
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("bail out of prerendering")) {
      throw error;
    }
    const { message, status } = formatGrpcError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

