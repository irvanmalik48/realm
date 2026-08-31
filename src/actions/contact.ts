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

import { getContactClient, promisifyUnary, createMetadata } from "@/lib/grpc/client";

export async function submitContactFormAction(payload: ContactPayload): Promise<ContactActionResult> {
  try {
    const { ip } = await getClientIpAction();
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";

    const client = getContactClient();
    const metadata = createMetadata({ ip, userAgent });

    const res: any = await promisifyUnary(
      client,
      "SendMessage",
      {
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        gotcha: payload._gotcha || "",
        ip_address: ip,
        user_agent: userAgent,
      },
      metadata
    );

    return {
      success: true,
      message: res.message || "Your message has been sent successfully.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.details || err.message || "Failed to send message. Please try again later.",
    };
  }
}
