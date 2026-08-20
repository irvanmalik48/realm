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

function getApiBaseUrl(): string {
  if (env.API_URL) return env.API_URL;
  if (env.NEXT_PUBLIC_API_URL) return env.NEXT_PUBLIC_API_URL;
  return env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.irvanma.eu.org";
}

export async function getHealthStatusAction(): Promise<HealthResult> {
  const baseUrl = getApiBaseUrl();
  const startTime = Date.now();

  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (env.API_TOKEN) {
      headers["Authorization"] = `Bearer ${env.API_TOKEN}`;
    }

    const res = await fetch(`${baseUrl}/health`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const latency_ms = Date.now() - startTime;

    if (!res.ok) {
      return {
        ok: false,
        data: {
          status: "unhealthy",
          service: "realm-api",
          version: "1.0.0",
          uptime_seconds: 0,
          timestamp: new Date().toISOString(),
          database: "unreachable",
          latency_ms,
        },
      };
    }

    const json = await res.json();
    return {
      ok: true,
      data: {
        status: json.status || "healthy",
        service: json.service || "realm-api",
        version: json.version || "1.0.0",
        uptime_seconds: json.uptime_seconds || 0,
        timestamp: json.timestamp || new Date().toISOString(),
        database: json.database || "connected",
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
