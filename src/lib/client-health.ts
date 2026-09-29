import { getHealthStatusAction, type HealthResult } from "@/actions/health";

export async function fetchClientHealthStatus(): Promise<HealthResult> {
  const startTime = performance.now();

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : "https://api.irvanma.eu.org");

  try {
    const res = await fetch(`${apiBase}/health`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const latency_ms = Math.round(performance.now() - startTime);

    if (!res.ok) {
      throw new Error(`Health check returned status ${res.status}`);
    }

    const data = await res.json();
    return {
      ok: true,
      data: {
        status: data.status || "healthy",
        service: data.service || "realm-api",
        version: data.version || "1.0.0",
        uptime_seconds: Number(data.uptime_seconds) || 0,
        timestamp: data.timestamp || new Date().toISOString(),
        database: data.database || "connected",
        latency_ms,
      },
    };
  } catch {
    // If direct client fetch fails (e.g. adblocker, strict firewall, or CORS issue),
    // gracefully fall back to the Vercel server action
    try {
      return await getHealthStatusAction();
    } catch {
      const latency_ms = Math.round(performance.now() - startTime);
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
}
