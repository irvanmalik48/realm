"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitContactFormAction } from "@/actions/contact";
import { toast } from "@/hooks/use-toast";

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
          toast({
            variant: "success",
            title: "Message Sent!",
            description: "Your message has been received successfully.",
          });
        } else {
          setErrorMessage(result.message || "Failed to send message.");
          toast({
            variant: "destructive",
            title: "Submission failed",
            description: result.message || "Please try again later.",
          });
        }
      } catch (err: any) {
        const msg = err.message || "An unexpected error occurred. Please try again.";
        setErrorMessage(msg);
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: msg,
        });
      }
    },
  });

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-6 sm:py-8 text-center gap-3">
        <CheckCircle2 className="size-12 text-emerald-500 mb-1" />
        <DialogHeader className="text-center sm:text-center items-center">
          <DialogTitle className="text-xl font-bold">Message Dispatched!</DialogTitle>
          <DialogDescription className="text-sm max-w-sm">
            Thank you for reaching out. Your message has been received and I&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="secondary"
          onClick={() => {
            form.reset();
            setIsSuccess(false);
          }}
          className="mt-2 cursor-pointer"
        >
          Send another message
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Mail className="size-5 text-primary" />
          <span>Contact Me</span>
        </DialogTitle>
        <DialogDescription>
          Fill out the form below to get in touch.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
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

        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, height: "auto", scale: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  className="h-10 text-sm"
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
                  className="h-10 text-sm"
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
                className="h-10 text-sm"
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
                rows={4}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  field.handleChange(e.target.value)
                }
                aria-invalid={field.state.meta.isTouched && !!field.state.meta.errors?.length}
                className="text-sm resize-y"
              />
              {field.state.meta.isTouched && field.state.meta.errors?.length ? (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <div className="flex flex-col gap-2 pt-1">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full flex items-center justify-center gap-2 font-medium h-10 cursor-pointer disabled:cursor-not-allowed shadow-xs"
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

          <p className="text-[11px] text-muted-foreground text-center">
            Your details are kept private and used only to respond to your inquiry.
          </p>
        </div>
      </form>
    </div>
  );
}
