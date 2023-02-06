"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthContext(props: { children: any }) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
