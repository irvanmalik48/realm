import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token =
    req.cookies.get("realm_auth_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backendUrl =
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://api.irvanma.eu.org");

  return NextResponse.json({
    token,
    uploadUrl: `${backendUrl.replace(/\/+$/, "")}/v1/storage/upload`,
  });
}
