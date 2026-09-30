import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";
import { encode } from "blurhash";

export interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  format: string;
  size: number;
  blurhash: string;
  blurDataURL: string;
  blurWidth?: number;
  blurHeight?: number;
}

const MAX_IMAGE_BYTES = 15 * 1024 * 1024; // 15MB
const MAX_DIMENSION = 4096;
const MAX_PIXELS = 4096 * 4096; // 16.7 megapixels

/**
 * Checks if a hostname or IP is a local/private network address (SSRF guard).
 */
export function isPrivateOrLocalHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase().trim();
  if (
    normalized === "localhost" ||
    normalized.endsWith(".local") ||
    normalized.endsWith(".internal") ||
    normalized === "0.0.0.0" ||
    normalized === "::1" ||
    normalized === "127.0.0.1"
  ) {
    return true;
  }

  // IPv4 regex checks for private / loopback / link-local ranges
  const ipv4Match = normalized.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, a, b] = ipv4Match.map(Number);
    if (a === 127 || a === 10 || a === 0) return true; // Loopback, 10.0.0.0/8, 0.0.0.0/8
    if (a === 192 && b === 168) return true; // 192.168.0.0/16
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
    if (a === 169 && b === 254) return true; // Link-local 169.254.0.0/16
  }

  return false;
}

/**
 * Analyzes an image buffer using Sharp, extracting dimensions, Blurhash, and a Next.js-compatible blurDataURL.
 */
export async function processImageBuffer(
  buffer: Buffer,
  src: string,
): Promise<ImageMetadata> {
  if (!buffer || buffer.length === 0) {
    throw new Error("Empty image buffer");
  }

  if (buffer.length > MAX_IMAGE_BYTES) {
    throw new Error(
      `Image size (${buffer.length} bytes) exceeds maximum limit of ${MAX_IMAGE_BYTES} bytes`,
    );
  }

  const imageInstance = sharp(buffer);
  const meta = await imageInstance.metadata();

  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  if (width <= 0 || height <= 0) {
    throw new Error(`Invalid image dimensions (${width}x${height})`);
  }

  if (
    width > MAX_DIMENSION ||
    height > MAX_DIMENSION ||
    width * height > MAX_PIXELS
  ) {
    throw new Error(
      `Image dimensions (${width}x${height}) exceed maximum allowed bounds (${MAX_DIMENSION}x${MAX_DIMENSION})`,
    );
  }

  const aspectRatio = Number((width / height).toFixed(3));
  const format = meta.format ?? "unknown";

  // 1. Generate Blurhash from downscaled raw RGBA pixels (32px boundary)
  const xComponents = width >= height ? 4 : 3;
  const yComponents = height > width ? 4 : 3;

  const raw = await sharp(buffer)
    .resize(32, 32, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const blurhash = encode(
    new Uint8ClampedArray(raw.data),
    raw.info.width,
    raw.info.height,
    xComponents,
    yComponents,
  );

  // 2. Generate a proportional, tiny low-res WebP placeholder for next/image's blurDataURL (16px base)
  const targetW = 16;
  const targetH = Math.max(1, Math.min(32, Math.round((targetW * height) / width)));

  let blurDataURL: string;
  try {
    const blurBuffer = await sharp(buffer)
      .resize(targetW, targetH, { fit: "fill" })
      .webp({ quality: 20 })
      .toBuffer();
    blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;
  } catch {
    // Fallback to PNG placeholder if WebP fails
    const blurBuffer = await sharp(buffer)
      .resize(targetW, targetH, { fit: "fill" })
      .png({ quality: 20 })
      .toBuffer();
    blurDataURL = `data:image/png;base64,${blurBuffer.toString("base64")}`;
  }

  return {
    src,
    width,
    height,
    aspectRatio,
    format,
    size: buffer.length,
    blurhash,
    blurDataURL,
    blurWidth: targetW,
    blurHeight: targetH,
  };
}

/**
 * Resolves an image URL or local path, attempts Go realm-api proxying when applicable,
 * and falls back gracefully to local Sharp/Blurhash computation.
 */
export async function getImageMetadata(rawUrl: string): Promise<ImageMetadata> {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    throw new Error("Image URL is required");
  }

  // 1. Handle local static assets directly from public/ directory
  if (trimmed.startsWith("/") || !trimmed.startsWith("http")) {
    const relativePath = trimmed.replace(/^\//, "");
    const localFilePath = path.join(process.cwd(), "public", relativePath);

    try {
      const fileBuffer = await fs.readFile(localFilePath);
      return await processImageBuffer(fileBuffer, trimmed);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to load local asset ${trimmed}: ${message}`);
    }
  }

  // 2. Validate external URL & SSRF
  const parsed = new URL(trimmed);
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http and https protocols are supported");
  }

  if (isPrivateOrLocalHost(parsed.hostname)) {
    throw new Error(
      `Access to private/local host ${parsed.hostname} is forbidden (SSRF protection)`,
    );
  }

  // 3. Attempt to fetch from backend Go realm-api if configured
  const backendApiUrl =
    process.env.REALM_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8080";

  try {
    const backendEndpoint = `${backendApiUrl.replace(/\/+$/, "")}/v1/storage/image-metadata`;
    const backendResponse = await fetch(backendEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: trimmed }),
      signal: AbortSignal.timeout(3000), // 3s timeout for backend
    });

    if (backendResponse.ok) {
      const json = await backendResponse.json();
      const meta = json.data || json;
      if (meta && meta.width && meta.height && meta.blurDataURL) {
        return {
          src: meta.src || trimmed,
          width: Number(meta.width),
          height: Number(meta.height),
          aspectRatio: Number(meta.aspectRatio || meta.aspect_ratio || (meta.width / meta.height).toFixed(3)),
          format: meta.format || "unknown",
          size: Number(meta.size || 0),
          blurhash: meta.blurhash || "",
          blurDataURL: meta.blurDataURL || meta.blur_data_url || "",
          blurWidth: meta.blurWidth || meta.blur_width,
          blurHeight: meta.blurHeight || meta.blur_height,
        };
      }
    }
  } catch {
    // Backend service not reachable or timed out; fall through to local Sharp processing
  }

  // 4. Fallback: Fetch directly from external CDN and process with Sharp
  const remoteResponse = await fetch(trimmed, {
    headers: {
      "User-Agent": "Realm-Image-Bot/1.0 (+https://realm.irvanmalik48.com)",
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    },
    signal: AbortSignal.timeout(10000), // 10s timeout
  });

  if (!remoteResponse.ok) {
    throw new Error(
      `Failed to fetch image: server responded with HTTP ${remoteResponse.status}`,
    );
  }

  const arrayBuffer = await remoteResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return await processImageBuffer(buffer, trimmed);
}
