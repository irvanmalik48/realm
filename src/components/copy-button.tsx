"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  code: string;
  className?: string;
}

export function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={cn(
        "absolute top-2.5 right-2.5 z-10 size-8 bg-background/80 hover:bg-accent/80 backdrop-blur-xs border border-border/50 text-muted-foreground hover:text-foreground transition-all duration-200",
        "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
        copied && "text-emerald-500 hover:text-emerald-600 border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/20 dark:text-emerald-400",
        className
      )}
      onClick={handleCopy}
      aria-label={copied ? "Copied code" : "Copy code"}
    >
      <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
      <div className="relative size-4">
        {copied ? (
          <Check className="size-4 animate-in fade-in zoom-in duration-200" />
        ) : (
          <Copy className="size-4 animate-in fade-in zoom-in duration-200" />
        )}
      </div>
    </Button>
  );
}
