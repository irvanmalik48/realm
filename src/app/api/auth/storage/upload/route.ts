import { NextRequest, NextResponse } from "next/server";
import { getStorageClient, promisifyUnary, createMetadata, getApiBaseUrl } from "@/lib/grpc/client";
import { formatGrpcError } from "@/lib/grpc/errors";

export async function POST(req: NextRequest) {
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

  try {
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
  } catch (grpcError: any) {
    // Attempt REST fallback
    try {
      const baseUrl = getApiBaseUrl();
      const uploadForm = new FormData();
      const blob = new Blob([buffer], { type: file.type || "application/octet-stream" });
      uploadForm.append("file", blob, file.name || "upload.bin");

      const restRes = await fetch(`${baseUrl}/v1/storage/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadForm,
      });

      const restData = await restRes.json();
      if (restRes.ok) {
        return NextResponse.json(
          {
            status: "success",
            message: restData.message || "File uploaded and compressed successfully",
            file: restData.file,
          },
          { status: 201 }
        );
      }

      return NextResponse.json(
        { error: restData.error || "Failed to upload file" },
        { status: restRes.status }
      );
    } catch {
      const { message, status } = formatGrpcError(grpcError);
      return NextResponse.json({ error: message }, { status });
    }
  }
}

