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

    const data = await promisifyUnary<
      { username?: string; email?: string },
      Record<string, unknown>
    >(
      client,
      "CheckAvailability",
      {
        username,
        email,
      },
      metadata
    );

    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as { digest?: string; message?: string } | undefined;
    if (err?.digest === "NEXT_PRERENDER_INTERRUPTED" || err?.message?.includes("bail out of prerendering")) {
      throw error;
    }
    const { message, status } = formatGrpcError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

