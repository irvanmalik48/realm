import { NextRequest, NextResponse } from "next/server";
import { getStorageClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function POST(req: NextRequest) {
  try {
    const token =
      req.cookies.get("realm_auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { error: "No file provided. Please attach an image file." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const client = getStorageClient();
    const metadata = createMetadata({ token });

    const data: any = await promisifyUnary(
      client,
      "UploadFile",
      {
        filename: file.name || "upload.bin",
        content_type: file.type || "application/octet-stream",
        data: buffer,
      },
      metadata
    );

    return NextResponse.json(
      {
        status: "success",
        message: data.message || "File uploaded and compressed successfully",
        file: data.file,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Storage upload gRPC error:", error);
    const { message, status } = formatGrpcError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

