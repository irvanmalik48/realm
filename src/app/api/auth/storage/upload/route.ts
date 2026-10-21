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

    const contentType = req.headers.get("content-type") || "";
    const lowerContentType = contentType.toLowerCase();
    if (
      lowerContentType.startsWith("application/json") ||
      lowerContentType.includes("json")
    ) {
      return NextResponse.json(
        { error: "Upload requests must be binary. JSON payloads are not allowed." },
        { status: 400 }
      );
    }

    let filename = "upload.bin";
    let mimeType = contentType || "application/octet-stream";
    let buffer: Buffer;

    if (lowerContentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json(
          { error: "No file provided. Please attach an image file." },
          { status: 400 }
        );
      }

      filename = file.name || "upload.bin";
      mimeType = file.type || "application/octet-stream";
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      const arrayBuffer = await req.arrayBuffer();
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        return NextResponse.json(
          { error: "No file provided or request body is empty." },
          { status: 400 }
        );
      }

      const { searchParams } = new URL(req.url);
      const disposition = req.headers.get("content-disposition");
      if (disposition) {
        const match = disposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i
        );
        if (match?.[1]) {
          filename = decodeURIComponent(match[1]);
        }
      }
      if (filename === "upload.bin") {
        const xFilename = req.headers.get("x-filename");
        if (xFilename) filename = xFilename;
      }
      if (filename === "upload.bin") {
        const queryFilename = searchParams.get("filename");
        if (queryFilename) filename = queryFilename;
      }

      buffer = Buffer.from(arrayBuffer);
    }

    const client = getStorageClient();
    const metadata = createMetadata({ token });

    const data = await promisifyUnary<
      {
        filename: string;
        content_type: string;
        data: Buffer;
      },
      { message?: string; file?: unknown }
    >(
      client,
      "UploadFile",
      {
        filename,
        content_type: mimeType,
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
  } catch (error: unknown) {
    const { message, status } = formatGrpcError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

