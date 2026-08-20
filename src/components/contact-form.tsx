"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { env } from "@/env";

export function ContactForm() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      _gotcha: "",
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);

      const apiBase =
        env.NEXT_PUBLIC_API_URL ||
        (env.NEXT_PUBLIC_ENVIRONMENT === "development"
          ? "http://localhost:8080"
          : "https://api.irvanma.eu.org");

      try {
        const response = await fetch(`${apiBase}/v1/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Realm-Request": "1",
          },
          body: JSON.stringify(value),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message");
        }

        setIsSuccess(true);
      } catch (err: any) {
        setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      }
    },
  });

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-6 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="size-12 text-emerald-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground text-center text-sm mb-6 max-w-sm">
          Thank you for reaching out. I have received your message and will get back to you as soon as possible.
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
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground animate-none"
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

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="mt-2 w-full flex items-center justify-center gap-2 font-medium"
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
