import { NextRequest, NextResponse } from "next/server";
import { getGitHubContributions } from "@/lib/github/fetcher";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "irvanmalik48";
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;

  try {
    const data = await getGitHubContributions(username, from, to);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch GitHub contributions.";
    return NextResponse.json(
      { error: message, isFallback: true },
      { status: 500 }
    );
  }
}
