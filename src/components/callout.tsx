"use client";

import * as React from "react";
import {
  Info,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Quote,
  Flame,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutType =
  | "info"
  | "warning"
  | "tip"
  | "success"
  | "quote"
  | "physics"
  | "principle";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType;
  title?: string;
  badge?: string;
  children: React.ReactNode;
}

const CALLOUT_CONFIGS: Record<
  CalloutType,
  {
    border: string;
    bg: string;
    iconColor: string;
    badgeBg: string;
    Icon: React.ComponentType<{ className?: string }>;
    defaultTitle: string;
  }
> = {
  info: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/5",
    iconColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Icon: Info,
    defaultTitle: "Note",
  },
  tip: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Icon: Lightbulb,
    defaultTitle: "Insight",
  },
  warning: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    iconColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Icon: AlertTriangle,
    defaultTitle: "Caution",
  },
  success: {
    border: "border-teal-500/30",
    bg: "bg-teal-500/5",
    iconColor: "text-teal-400",
    badgeBg: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    Icon: CheckCircle2,
    defaultTitle: "Verified",
  },
  quote: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    iconColor: "text-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Icon: Quote,
    defaultTitle: "Perspective",
  },
  physics: {
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    iconColor: "text-orange-400",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Icon: Flame,
    defaultTitle: "Thermodynamic Principle",
  },
  principle: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/5",
    iconColor: "text-indigo-400",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    Icon: Layers,
    defaultTitle: "System Invariant",
  },
};

export function Callout({
  type = "info",
  title,
  badge,
  children,
  className,
  ...props
}: CalloutProps) {
  const config = CALLOUT_CONFIGS[type] || CALLOUT_CONFIGS.info;
  const IconComponent = config.Icon;
  const displayTitle = title ?? config.defaultTitle;

  return (
    <div
      className={cn(
        "relative my-6 overflow-hidden rounded-xl border p-4 md:p-5 backdrop-blur-sm transition-all duration-200",
        config.border,
        config.bg,
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3.5">
        <div className={cn("p-1.5 rounded-lg shrink-0 mt-0.5", config.iconColor)}>
          <IconComponent className="size-4.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h5 className="text-sm font-semibold text-foreground tracking-tight">
              {displayTitle}
            </h5>
            {badge && (
              <span
                className={cn(
                  "text-3xs font-mono uppercase px-2 py-0.5 rounded border tracking-wider",
                  config.badgeBg,
                )}
              >
                {badge}
              </span>
            )}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground leading-relaxed [&>p]:my-1.5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface SpecItemProps {
  label: string;
  value: string;
  detail?: string;
  highlight?: boolean;
}

export function SpecGrid({
  title,
  badge = "SPECIFICATION MATRIX",
  children,
  className,
}: {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "my-6 rounded-xl border border-border/70 bg-card/40 backdrop-blur-sm p-4 md:p-5 not-prose shadow-sm",
        className,
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            {title}
          </span>
          <span className="text-3xs font-mono text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            {badge}
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {children}
      </div>
    </div>
  );
}

export function SpecItem({ label, value, detail, highlight }: SpecItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-3 rounded-lg border transition-colors duration-150",
        highlight
          ? "border-emerald-500/40 bg-emerald-500/5 shadow-xs"
          : "border-border/40 bg-muted/20 hover:bg-muted/40",
      )}
    >
      <span className="text-3xs font-mono text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span
        className={cn(
          "text-base md:text-lg font-bold font-mono tracking-tight mt-0.5",
          highlight ? "text-emerald-400" : "text-foreground",
        )}
      >
        {value}
      </span>
      {detail && (
        <span className="text-xs text-muted-foreground/80 mt-1 leading-snug">
          {detail}
        </span>
      )}
    </div>
  );
}
