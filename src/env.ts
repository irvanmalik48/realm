import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    LASTFM_API_KEY: z.string().optional(),
    LASTFM_API_SECRET: z.string().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z
      .enum(["development", "production", "test"])
      .default("development"),
    NEXT_PUBLIC_SITE_URL: z.string().optional(),
    NEXT_PUBLIC_VPS_ACTIVE: z.string().optional(),
    NEXT_PUBLIC_API_URL: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_VPS_ACTIVE: process.env.NEXT_PUBLIC_VPS_ACTIVE,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
