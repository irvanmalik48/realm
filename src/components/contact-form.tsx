"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Globe,
  Monitor,
  Clock,
  Fingerprint,
  ChevronDown,
  Lock,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { submitContactFormAction } from "@/actions/contact";
import { cn } from "@/lib/utils";

interface ClientTelemetry {
  userAgent: string;
  timezone: string;
  language: string;
  screenResolution: string;
  platform: string;
}

export function ContactForm() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [showTelemetryDetails, setShowTelemetryDetails] = React.useState(false);
  const [telemetry, setTelemetry] = React.useState<ClientTelemetry>({
    userAgent: "Loading...",
    timezone: "Detecting...",
    language: "en-US",
    screenResolution: "Detecting...",
    platform: "Detecting...",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setTelemetry({
        userAgent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        language: navigator.language || "en",
        screenResolution: `${window.screen.width}x${window.screen.height} (${window.devicePixelRatio}x DPR)`,
        platform: navigator.platform || "Unknown",
      });
    }
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      _gotcha: "",
      disclaimerAccepted: false,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      if (!value.disclaimerAccepted) {
        setErrorMessage("You must accept the telemetry and data processing disclaimer to send a message.");
        return;
      }

      try {
        const result = await submitContactFormAction({
          name: value.name,
          email: value.email,
          subject: value.subject,
          message: value.message,
          _gotcha: value._gotcha,
        });

        if (result.success) {
          setIsSuccess(true);
        }
      } catch (err: any) {
        setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      }
    },
  });

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-8 animate-in fade-in zoom-in duration-300 text-center">
        <CheckCircle2 className="size-12 text-emerald-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Message Dispatched!</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          Thank you for reaching out. Your message and secure transmission telemetry have been safely recorded.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            form.reset();
            setIsSuccess(false);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 py-2"
    >
      {/* Honeypot field for bot/forgery detection */}
      <form.Field name="_gotcha">
        {(field) => (
          <input
            type="text"
            name={field.name}
            tabIndex={-1}
            autoComplete="off"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />
        )}
      </form.Field>

      {errorMessage ? (
        <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              if (!value.trim()) return "Name is required";
              if (value.trim().length < 2) return "Must be at least 2 characters";
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={field.name}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Name
              </label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="Your Name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.isTouched && !!field.state.meta.errors?.length}
              />
              {field.state.meta.isTouched && field.state.meta.errors?.length ? (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value.trim()) return "Email is required";
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) return "Invalid email address";
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={field.name}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Email
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.isTouched && !!field.state.meta.errors?.length}
              />
              {field.state.meta.isTouched && field.state.meta.errors?.length ? (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field
        name="subject"
        validators={{
          onChange: ({ value }) => {
            if (!value.trim()) return "Subject is required";
            if (value.trim().length < 3) return "Must be at least 3 characters";
            return undefined;
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={field.name}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Subject
            </label>
            <Input
              id={field.name}
              name={field.name}
              placeholder="What is this about?"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={field.state.meta.isTouched && !!field.state.meta.errors?.length}
            />
            {field.state.meta.isTouched && field.state.meta.errors?.length ? (
              <p className="text-xs text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field
        name="message"
        validators={{
          onChange: ({ value }) => {
            if (!value.trim()) return "Message is required";
            if (value.trim().length < 10) return "Must be at least 10 characters";
            return undefined;
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={field.name}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Message
            </label>
            <Textarea
              id={field.name}
              name={field.name}
              placeholder="Your Message..."
              rows={3}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                field.handleChange(e.target.value)
              }
              aria-invalid={field.state.meta.isTouched && !!field.state.meta.errors?.length}
            />
            {field.state.meta.isTouched && field.state.meta.errors?.length ? (
              <p className="text-xs text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      {/* Telemetry Disclosure Box */}
      <div className="w-full rounded-lg border border-border/80 bg-muted/20 overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => setShowTelemetryDetails(!showTelemetryDetails)}
          className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-muted/40 transition-colors text-left"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <ShieldAlert className="size-3.5 text-primary shrink-0" />
            <span>Captured Telemetry</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70 font-mono">
            <span>{showTelemetryDetails ? "Hide" : "Details"}</span>
            <ChevronDown className={cn("size-3.5 transition-transform duration-200", showTelemetryDetails && "rotate-180")} />
          </div>
        </button>

        {showTelemetryDetails && (
          <div className="px-3.5 pb-3 pt-1 border-t border-border/50 flex flex-col gap-2 text-xs animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px]">
              {/* User Agent with Show Dialog */}
              <div className="p-1.5 rounded bg-background/60 border border-border/40 flex items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[10px] text-muted-foreground font-sans flex items-center gap-1">
                    <Monitor className="size-3 text-muted-foreground" />
                    User Agent
                  </span>
                  <span className="text-muted-foreground/60 text-[10px] tracking-widest font-mono">
                    ••••••••••••••••
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="px-2 py-0.5 text-[10px] font-sans font-medium rounded border border-border/60 bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                    >
                      <Eye className="size-2.5" />
                      Show
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-base">
                        <Monitor className="size-4 text-primary" />
                        User Agent Telemetry
                      </DialogTitle>
                      <DialogDescription className="text-xs">
                        Information transmitted by your client browser for device identification and security.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 py-2 text-xs">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-medium text-muted-foreground">Raw User-Agent Header</span>
                        <div className="p-2.5 rounded-md bg-muted/40 border border-border/60 font-mono text-[11px] break-all select-all leading-relaxed text-foreground/90">
                          {telemetry.userAgent}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-muted/30 border border-border/40 flex flex-col gap-0.5">
                          <span className="text-[10px] text-muted-foreground">Platform</span>
                          <span className="font-mono text-foreground">{telemetry.platform}</span>
                        </div>
                        <div className="p-2 rounded bg-muted/30 border border-border/40 flex flex-col gap-0.5">
                          <span className="text-[10px] text-muted-foreground">Language</span>
                          <span className="font-mono text-foreground">{telemetry.language}</span>
                        </div>
                        <div className="p-2 rounded bg-muted/30 border border-border/40 flex flex-col gap-0.5 col-span-2">
                          <span className="text-[10px] text-muted-foreground">Screen Resolution</span>
                          <span className="font-mono text-foreground">{telemetry.screenResolution}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-normal">
                        This header is transmitted with standard HTTP requests and logged alongside form submissions to verify authentic browser traffic and prevent automated spam bots.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary" size="sm">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* IP & Security with Show Dialog */}
              <div className="p-1.5 rounded bg-background/60 border border-border/40 flex items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[10px] text-muted-foreground font-sans flex items-center gap-1">
                    <ShieldAlert className="size-3 text-muted-foreground" />
                    IP & Security
                  </span>
                  <span className="text-muted-foreground/60 text-[10px] tracking-widest font-mono">
                    ••••••••••••••••
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="px-2 py-0.5 text-[10px] font-sans font-medium rounded border border-border/60 bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                    >
                      <Eye className="size-2.5" />
                      Show
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-base">
                        <ShieldAlert className="size-4 text-primary" />
                        IP & Security Details
                      </DialogTitle>
                      <DialogDescription className="text-xs">
                        Server-side network information and cryptographic security checks applied during submission.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 py-2 text-xs">
                      <div className="flex flex-col gap-1.5">
                        <div className="p-2.5 rounded-md bg-muted/30 border border-border/40 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-foreground">Client IP Address</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono">Server Resolved</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Extracted on the server via trusted reverse proxy headers (<code className="text-[10px] bg-muted px-1 py-0.5 rounded font-mono">CF-Connecting-IP</code> / <code className="text-[10px] bg-muted px-1 py-0.5 rounded font-mono">X-Forwarded-For</code>) to ensure accurate origin tracking.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-md bg-muted/30 border border-border/40 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-foreground">CSRF & Origin Verification</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Requests are validated against Cross-Site Request Forgery tokens and origin-header policies to guarantee submission integrity.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-md bg-muted/30 border border-border/40 flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-foreground">Bot Protection & Honeypot</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Hidden anti-bot form traps and client-side interaction timestamps are verified to reject automated spam submission scripts.
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-muted-foreground leading-normal">
                        Telemetry and network records are stored strictly for rate-limiting, security auditing, and spam filtering in accordance with privacy disclosures.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary" size="sm">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Timezone */}
              <div className="p-1.5 rounded bg-background/60 border border-border/40 flex flex-col gap-0.5">
                <span className="text-[10px] text-muted-foreground font-sans flex items-center gap-1">
                  <Globe className="size-3 text-muted-foreground" />
                  Timezone
                </span>
                <span className="text-foreground/90 truncate">
                  {telemetry.timezone}
                </span>
              </div>

              {/* Timestamp */}
              <div className="p-1.5 rounded bg-background/60 border border-border/40 flex flex-col gap-0.5">
                <span className="text-[10px] text-muted-foreground font-sans flex items-center gap-1">
                  <Clock className="size-3 text-muted-foreground" />
                  Timestamp
                </span>
                <span className="text-foreground/90 truncate text-[10px]">
                  {new Date().toISOString()}
                </span>
              </div>
            </div>

            <span className="text-[10px] text-muted-foreground/70">
              Stored in database solely for rate limiting and spam prevention.
            </span>
          </div>
        )}
      </div>

      {/* Mandatory Disclaimer Acceptance Checkbox */}
      <form.Field
        name="disclaimerAccepted"
        validators={{
          onChange: ({ value }) => {
            if (!value) return "You must acknowledge and accept the telemetry disclosure";
            return undefined;
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1 mt-1">
            <label
              htmlFor="disclaimer-checkbox"
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="relative flex items-center justify-center">
                <input
                  id="disclaimer-checkbox"
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  onBlur={field.handleBlur}
                  className="sr-only peer"
                />
                <div className="size-4 rounded border border-border bg-background peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center shrink-0">
                  {field.state.value && (
                    <svg
                      className="size-3 text-primary-foreground stroke-current stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                I agree to the collection of transmission telemetry (IP & user-agent) for spam protection.
              </span>
            </label>
            {field.state.meta.isTouched && field.state.meta.errors?.length ? (
              <p className="text-xs text-destructive pl-6.5">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting, state.values.disclaimerAccepted]}
      >
        {([canSubmit, isSubmitting, disclaimerAccepted]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting || !disclaimerAccepted}
            className="mt-2 w-full flex items-center justify-center gap-2 font-medium cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <span>Send Message</span>
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
