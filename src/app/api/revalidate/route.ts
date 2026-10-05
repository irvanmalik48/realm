import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const secret =
      req.nextUrl.searchParams.get("secret") ||
      req.headers.get("x-revalidate-secret");
    const expectedSecret = process.env.REVALIDATION_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const tag = req.nextUrl.searchParams.get("tag");
    const path = req.nextUrl.searchParams.get("path");
    const slug = req.nextUrl.searchParams.get("slug");

    const revalidated: string[] = [];

    // Revalidate collection tag & path
    revalidateTag("posts", "max");
    revalidated.push("tag:posts");

    revalidatePath("/blog", "page");
    revalidated.push("path:/blog");

    if (slug) {
      revalidateTag(`post-${slug}`, "max");
      revalidated.push(`tag:post-${slug}`);
      revalidatePath(`/blog/${slug}`, "page");
      revalidated.push(`path:/blog/${slug}`);
    }

    if (tag && tag !== "posts") {
      revalidateTag(tag, "max");
      revalidated.push(`tag:${tag}`);
    }

    if (path && path !== "/blog") {
      revalidatePath(path, "page");
      revalidated.push(`path:${path}`);
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      targets: revalidated,
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { revalidated: false, error: String(err) },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
