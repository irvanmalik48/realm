export function dispatchAnalyticsEvent(payload: Record<string, unknown>) {
  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    try {
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      if (navigator.sendBeacon("/api/analytics", blob)) {
        return;
      }
    } catch {
      // Fall through to fetch
    }
  }

  try {
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silently swallow network anomalies so UX is unaffected
    });
  } catch {
    // Ignore background analytics dispatch failure
  }
}
