import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { cookies } from "next/headers";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("realm_auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { provider } = await params;
    const backendUrl = env.API_URL || "http://localhost:8080";

    const res = await fetch(`${backendUrl}/v1/auth/oauth/${provider}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("OAuth unlink proxy error:", error);
    return NextResponse.json(
      { error: "Failed to disconnect account" },
      { status: 500 }
    );
  }
}
