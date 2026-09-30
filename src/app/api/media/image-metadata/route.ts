import { NextRequest, NextResponse } from "next/server";
import { getImageMetadata } from "@/lib/media/image-metadata";

export async function POST(req: NextRequest) {
  try {
    let url: string | undefined;

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      url = body?.url;
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData().catch(() => null);
      url = (formData?.get("url") as string) || undefined;
    }

    if (!url) {
      url = req.nextUrl.searchParams.get("url") || undefined;
    }

    if (!url || typeof url !== "string" || url.trim() === "") {
      return NextResponse.json(
        { error: "Image URL is required. Provide 'url' in JSON body or as a query parameter." },
        { status: 400 },
      );
    }

    const metadata = await getImageMetadata(url);

    return NextResponse.json(
      {
        status: "success",
        ...metadata,
        data: metadata,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process image metadata";
    const status = message.includes("forbidden") || message.includes("invalid") || message.includes("required") ? 400 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");

    if (!url || url.trim() === "") {
      return NextResponse.json(
        { error: "Image URL is required as '?url=https://...' query parameter." },
        { status: 400 },
      );
    }

    const metadata = await getImageMetadata(url);

    return NextResponse.json(
      {
        status: "success",
        ...metadata,
        data: metadata,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process image metadata";
    const status = message.includes("forbidden") || message.includes("invalid") || message.includes("required") ? 400 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
