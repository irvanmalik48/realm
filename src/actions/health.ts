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
