"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Container from "@/components/container";
import { GoogleLogo } from "@/components/logos/google";
import { GithubLogo } from "@/components/logos/github";
import { Eye, EyeOff, Lock, User, AlertCircle, ArrowRight, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DirectionalTransition } from "@/components/directional-transition";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to home or settings
  React.useEffect(() => {
    if (user) {
      router.push("/settings");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await login({ identifier, password });
      if (!res.success) {
        const err = res.error || "Invalid username/email or password.";
        setError(err);
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: err,
        });
      } else {
        toast({
          variant: "success",
          title: "Welcome back!",
          description: "Signed in successfully.",
        });
        router.push("/");
      }
    } catch {
      const err = "An unexpected error occurred. Please try again.";
      setError(err);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: err,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DirectionalTransition>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Container className="max-w-md" noPadding>
          <div className="w-full mx-auto">
            {/* Card Container */}
            <div
              className="rounded-lg border border-border bg-background p-6 sm:p-8 shadow-xs"
              style={{ viewTransitionName: "auth-card" }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Welcome back
                </h1>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Sign in with your social account or credentials
                </p>
              </div>

              {/* Animated Error Alert */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, height: "auto", scale: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden mb-5"
                  >
                    <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                      <AlertCircle className="size-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social OIDC Logins */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a
                  href="/api/auth/google"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-border bg-muted/20 hover:bg-muted/60 text-foreground font-medium text-xs transition-colors"
                >
                  <GoogleLogo className="size-4 shrink-0" />
                  <span>Google</span>
                </a>
                <a
                  href="/api/auth/github"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-border bg-muted/20 hover:bg-muted/60 text-foreground font-medium text-xs transition-colors"
                >
                  <GithubLogo className="size-4 shrink-0" />
                  <span>GitHub</span>
                </a>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="w-full border-t border-border" />
                <span className="absolute px-3 bg-background text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                  Or with credentials
                </span>
              </div>

              {/* Traditional Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Identifier (Email or Username) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="identifier"
                    className="block text-xs font-medium text-foreground/80"
                  >
                    Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <User className="size-4" />
                    </div>
                    <Input
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="irvan or you@example.com"
                      className="pl-9 text-xs"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-foreground/80"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Lock className="size-4" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 pr-9 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="size-4" />
                      <span>Sign In</span>
                      <ArrowRight className="size-4 ml-auto" />
                    </>
                  )}
                </Button>
              </form>

              {/* Footer / Switch to Register */}
              <div className="mt-6 pt-5 border-t border-border text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  prefetch={true}
                  transitionTypes={["nav-forward"]}
                  className="font-medium text-foreground hover:underline transition-colors"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </DirectionalTransition>
  );
}
