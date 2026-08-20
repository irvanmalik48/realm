"use server";

import { headers } from "next/headers";
import { env } from "@/env";

export async function getClientIpAction(): Promise<{ ip: string }> {
  try {
    const headersList = await headers();
    const cfIp = headersList.get("cf-connecting-ip");
    const realIp = headersList.get("x-real-ip");
    const forwardedFor = headersList.get("x-forwarded-for");

    if (cfIp) return { ip: cfIp.trim() };
    if (realIp) return { ip: realIp.trim() };
    if (forwardedFor) {
      const first = forwardedFor.split(",")[0]?.trim();
      if (first) return { ip: first };
    }

    return { ip: "127.0.0.1" };
  } catch {
    return { ip: "127.0.0.1" };
  }
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha?: string;
}

export interface ContactActionResult {
  success: boolean;
  message: string;
}

function getApiBaseUrl(): string {
  if (env.API_URL) return env.API_URL;
  if (env.NEXT_PUBLIC_API_URL) return env.NEXT_PUBLIC_API_URL;
  return env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.irvanma.eu.org";
}

export async function submitContactFormAction(payload: ContactPayload): Promise<ContactActionResult> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/v1/contact`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Realm-Request": "1",
  };

  if (env.API_TOKEN) {
    headers["Authorization"] = `Bearer ${env.API_TOKEN}`;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Failed to send message. Please try again later.");
  }

  return {
    success: true,
    message: data.message || "Your message has been sent successfully.",
  };
}
