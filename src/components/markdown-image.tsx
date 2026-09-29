"use client";

import * as React from "react";
import { useState } from "react";
import { Camera, ExternalLink, Copy, Check, Globe } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export interface MarkdownImageProps
  extends React.ComponentPropsWithoutRef<"img"> {}

export interface ImageAttribution {
  creator: string;
  source: string;
  sourceUrl: string;
  creatorUrl?: string;
  isUnsplash: boolean;
}

function UnsplashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
    </svg>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "IMG";
}

const KNOWN_IMAGE_REGISTRY: Record<
  string,
  { creator: string; source: string; sourceUrl: string; creatorUrl?: string }
> = {
  "1523381210434": {
    creator: "Unsplash Contributor",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com",
  },
  "1529720317453": {
    creator: "Unsplash Contributor",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com",
  },
  "1551028719": {
    creator: "Unsplash Contributor",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com",
  },
};

export function parseImageAttribution(
  src?: string,
  title?: string,
  alt?: string,
): ImageAttribution {
  if (!src) {
    return {
      creator: "Unknown",
      source: "Unknown",
      sourceUrl: "#",
      isUnsplash: false,
    };
  }

  const isUnsplash = src.includes("unsplash.com");
  let source = isUnsplash ? "Unsplash" : "Web";
  let sourceUrl = src;
  let creator = isUnsplash ? "Unsplash Contributor" : "Unknown Creator";
  let creatorUrl: string | undefined = undefined;

  // Clean canonical source URL for Unsplash images
  if (isUnsplash) {
    try {
      const urlObj = new URL(src);
      sourceUrl = `${urlObj.origin}${urlObj.pathname}`;
    } catch {
      sourceUrl = src;
    }
  } else {
    try {
      const urlObj = new URL(src);
      source = urlObj.hostname.replace(/^www\./, "");
      sourceUrl = src;
    } catch {
      if (src.startsWith("/")) {
        source = "Local Media";
        creator = "Site Author";
      }
    }
  }

  // Check known registry
  for (const [key, entry] of Object.entries(KNOWN_IMAGE_REGISTRY)) {
    if (src.includes(key)) {
      creator = entry.creator;
      source = entry.source;
      if (entry.sourceUrl) sourceUrl = entry.sourceUrl;
      if (entry.creatorUrl) creatorUrl = entry.creatorUrl;
      break;
    }
  }

  // Parse title attribute if provided
  if (title) {
    const trimmed = title.trim();

    // Pattern: "Photo by [Creator] on [Source] | [URL]" or "Photo by [Creator] on [Source]"
    const photoByMatch = trimmed.match(
      /^Photo by ([^|]+?)(?:\s+on\s+([^|]+))?(?:\s*\|\s*(https?:\/\/\S+))?$/i,
    );
    if (photoByMatch) {
      if (photoByMatch[1]) creator = photoByMatch[1].trim();
      if (photoByMatch[2]) source = photoByMatch[2].trim();
      if (photoByMatch[3]) sourceUrl = photoByMatch[3].trim();
    } else if (trimmed.includes("|")) {
      const parts = trimmed.split("|").map((p) => p.trim());
      if (parts.length >= 3) {
        creator = parts[0];
        source = parts[1];
        sourceUrl = parts[2];
      } else if (parts.length === 2) {
        creator = parts[0];
        if (parts[1].startsWith("http://") || parts[1].startsWith("https://")) {
          sourceUrl = parts[1];
        } else {
          source = parts[1];
        }
      }
    } else if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      sourceUrl = trimmed;
    } else if (trimmed.length > 0) {
      creator = trimmed;
    }
  }

  // Parse URL search parameters if any (e.g. ?creator=...&source=...)
  try {
    const urlObj = new URL(src);
    const qCreator =
      urlObj.searchParams.get("creator") || urlObj.searchParams.get("author");
    const qSource =
      urlObj.searchParams.get("source") || urlObj.searchParams.get("platform");
    const qUrl =
      urlObj.searchParams.get("source_url") ||
      urlObj.searchParams.get("credit_url");

    if (qCreator) creator = qCreator;
    if (qSource) source = qSource;
    if (qUrl) sourceUrl = qUrl;
  } catch {
    // ignore
  }

  return {
    creator,
    source,
    sourceUrl,
    creatorUrl,
    isUnsplash,
  };
}

export function MarkdownImage({
  src,
  alt,
  title,
  className,
  ...props
}: MarkdownImageProps) {
  const [copied, setCopied] = useState(false);

  if (!src || typeof src !== "string") {
    return (
      <span className="relative block my-7 overflow-hidden rounded-xl border border-border/40 bg-muted/20">
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-auto object-cover rounded-xl", className)}
          loading="lazy"
          {...props}
        />
      </span>
    );
  }

  const attribution = parseImageAttribution(src, title, alt);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(attribution.sourceUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Image source link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy image source URL.",
      });
    }
  };

  return (
    <HoverCard openDelay={150} closeDelay={200}>
      <HoverCardTrigger asChild>
        <span className="relative block my-7 overflow-hidden rounded-xl border border-border/40 bg-muted/20 group/img cursor-pointer transition-all duration-300 hover:border-border/80 hover:shadow-2xl">
          <img
            src={src}
            alt={alt}
            className={cn(
              "w-full h-auto object-cover rounded-xl transition-transform duration-500 ease-out group-hover/img:scale-[1.015]",
              className,
            )}
            loading="lazy"
            {...props}
          />

          {/* Floating pill badge on image hover */}
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full bg-background/80 hover:bg-background/95 text-foreground/90 backdrop-blur-md border border-border/60 shadow-md opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
            {attribution.isUnsplash ? (
              <UnsplashIcon className="size-3 text-muted-foreground" />
            ) : (
              <Camera className="size-3 text-muted-foreground" />
            )}
            <span>{attribution.creator}</span>
            <span className="text-muted-foreground/60">&bull;</span>
            <span className="text-muted-foreground">{attribution.source}</span>
          </span>
        </span>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        align="center"
        sideOffset={10}
        className="w-80 p-0 overflow-hidden border border-border/80 bg-popover/95 backdrop-blur-md shadow-2xl rounded-xl z-50 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/40 border-b border-border/40">
          <div className="flex items-center gap-2">
            {attribution.isUnsplash ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground">
                <UnsplashIcon className="size-3.5" />
                <span>Unsplash</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Globe className="size-3.5 text-muted-foreground" />
                <span>{attribution.source}</span>
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80 px-1.5 py-0.5 rounded bg-muted/60 border border-border/40">
            Source Info
          </span>
        </div>

        {/* Body */}
        <div className="p-3.5 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-9 border border-border/50 shrink-0">
              <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                {attribution.isUnsplash ? (
                  <Camera className="size-4" />
                ) : (
                  getInitials(attribution.creator)
                )}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">
                {attribution.creator}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {attribution.isUnsplash
                  ? "Photographer on Unsplash"
                  : attribution.source}
              </p>
            </div>
          </div>

          {alt && (
            <div className="rounded-md bg-muted/30 border border-border/30 px-2.5 py-1.5">
              <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2 italic">
                &ldquo;{alt}&rdquo;
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              asChild
              size="sm"
              className="flex-1 h-8 text-xs font-medium gap-1.5 shadow-xs"
            >
              <a
                href={attribution.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {attribution.isUnsplash ? "View on Unsplash" : "Open Source"}
                </span>
                <ExternalLink className="size-3 shrink-0" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={handleCopyLink}
              title="Copy source link"
              aria-label="Copy image source link"
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-500 animate-in zoom-in" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
