"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function resolveAvatarUrl(src?: string): string | undefined {
  if (!src) return undefined
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("blob:") ||
    src.startsWith("data:")
  ) {
    return src
  }
  if (src.startsWith("/")) {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://api.irvanma.eu.org")
    return `${apiUrl}${src}`
  }
  return src
}

function AvatarImage({
  className,
  src,
  ...props
}: AvatarPrimitive.Image.Props) {
  const resolvedSrc = typeof src === "string" ? resolveAvatarUrl(src) : src
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      src={resolvedSrc}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

