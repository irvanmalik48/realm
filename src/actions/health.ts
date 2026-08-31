"use server";

import { env } from "@/env";

export interface HealthData {
  status: "healthy" | "degraded" | "unhealthy";
  service: string;
  version: string;
  uptime_seconds: number;
  timestamp: string;
  database: string;
  latency_ms: number;
}

export interface HealthResult {
  ok: boolean;
  data: HealthData;
}

import { getHealthClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";

function getHttpApiUrl(): string {
  if (env.API_URL) return env.API_URL;
  if (process.env.API_URL) return process.env.API_URL;
  if (env.NEXT_PUBLIC_API_URL) return env.NEXT_PUBLIC_API_URL;
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  return env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.irvanma.eu.org";
}

export async function getHealthStatusAction(): Promise<HealthResult> {
  const startTime = Date.now();

  try {
    const client = getHealthClient();
    const metadata = createMetadata();
    const res: any = await promisifyUnary(client, "GetHealth", {}, metadata);

    const latency_ms = Date.now() - startTime;
    return {
      ok: true,
      data: {
        status: (res.status as any) || "healthy",
        service: res.service || "realm-api",
        version: res.version || "1.0.0",
        uptime_seconds: Number(res.uptime_seconds) || 0,
        timestamp: res.timestamp || new Date().toISOString(),
        database: res.database || "connected",
        latency_ms,
      },
    };
  } catch (err) {
    // Fallback to HTTP REST health check if gRPC fails
    try {
      const httpBase = getHttpApiUrl();
      const headers: Record<string, string> = { Accept: "application/json" };
      if (env.API_TOKEN) {
        headers["Authorization"] = `Bearer ${env.API_TOKEN}`;
      }

      const res = await fetch(`${httpBase}/health`, {
        method: "GET",
        headers,
        cache: "no-store",
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        const json = await res.json();
        const latency_ms = Date.now() - startTime;
        return {
          ok: true,
          data: {
            status: json.status || "healthy",
            service: json.service || "realm-api",
            version: json.version || "1.0.0",
            uptime_seconds: Number(json.uptime_seconds) || 0,
            timestamp: json.timestamp || new Date().toISOString(),
            database: json.database || "connected",
            latency_ms,
          },
        };
      }
    } catch {
      // Fallback failed
    }

    const latency_ms = Date.now() - startTime;
    return {
      ok: false,
      data: {
        status: "unhealthy",
        service: "realm-api",
        version: "1.0.0",
        uptime_seconds: 0,
        timestamp: new Date().toISOString(),
        database: "disconnected",
        latency_ms,
      },
    };
  }
}
