"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Container from "@/components/container";
import { GoogleLogo } from "@/components/logos/google";
import { GithubLogo } from "@/components/logos/github";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Mail,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Loader2,
  UserPlus,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DirectionalTransition } from "@/components/directional-transition";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { register, user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Username availability state
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [usernameMessage, setUsernameMessage] = useState<string>("");

  // Email availability state
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [emailMessage, setEmailMessage] = useState<string>("");

  // If already logged in, redirect to home or settings
  useEffect(() => {
    if (user) {
      router.push("/settings");
    }
  }, [user, router]);

  // Debounced username check
  useEffect(() => {
    const trimmed = username.trim().toLowerCase();
    if (!trimmed) {
      setUsernameStatus("idle");
      setUsernameMessage("");
      return;
    }

    if (trimmed.length < 3) {
      setUsernameStatus("invalid");
      setUsernameMessage("Username must be at least 3 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(trimmed)) {
      setUsernameStatus("invalid");
      setUsernameMessage("Alphanumeric and underscores only (max 30)");
      return;
    }

    setUsernameStatus("checking");
    setUsernameMessage("");

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/check?username=${encodeURIComponent(trimmed)}`);
        if (!res.ok) throw new Error("Failed to check username");
        const data = await res.json();

        if (data.username_available === true) {
          setUsernameStatus("available");
          setUsernameMessage("Username is available");
        } else if (data.username_available === false) {
          setUsernameStatus("taken");
          setUsernameMessage(data.username_reason || "Username is already taken");
        } else {
          setUsernameStatus("idle");
        }
      } catch {
        setUsernameStatus("idle");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  // Debounced email check
  useEffect(() => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setEmailStatus("idle");
      setEmailMessage("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setEmailStatus("idle");
      setEmailMessage("");
      return;
    }

    setEmailStatus("checking");
    setEmailMessage("");

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/check?email=${encodeURIComponent(trimmed)}`);
        if (!res.ok) throw new Error("Failed to check email");
        const data = await res.json();

        if (data.email_available === true) {
          setEmailStatus("available");
          setEmailMessage("Email is available");
        } else if (data.email_available === false) {
          setEmailStatus("taken");
          setEmailMessage(data.email_reason || "Email is already registered");
        } else {
          setEmailStatus("idle");
        }
      } catch {
        setEmailStatus("idle");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [email]);

  // Calculate password strength score (0-4)
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-destructive", "bg-yellow-500", "bg-blue-500", "bg-emerald-500"];

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (usernameStatus === "taken" || usernameStatus === "invalid") {
      setError(usernameMessage || "Please choose an available username.");
      return;
    }

    if (emailStatus === "taken") {
      setError(emailMessage || "An account with this email already exists.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await register({
        full_name: fullName,
        username,
        email,
        password,
      });
      if (!res.success) {
        const err = res.error || "Registration failed. Please check your details.";
        setError(err);
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: err,
        });
      } else {
        toast({
          variant: "success",
          title: "Account created!",
          description: "Welcome to Realm.",
        });
        router.push("/");
      }
    } catch {
      const err = "An unexpected error occurred. Please try again.";
      setError(err);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: err,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormBlocked =
    usernameStatus === "checking" ||
    emailStatus === "checking" ||
    usernameStatus === "taken" ||
    usernameStatus === "invalid" ||
    emailStatus === "taken";

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
                  Create an account
                </h1>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Join Realm and get your personalized workspace
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
                  Or fill your details
                </span>
              </div>

              {/* Traditional Register Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-medium text-foreground/80"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Sparkles className="size-4" />
                    </div>
                    <Input
                      id="fullName"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Irvan Malik"
                      className="pl-9 text-xs"
                    />
                  </div>
                </div>

                {/* Username with Live Debounced Availability */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="username"
                      className="block text-xs font-medium text-foreground/80"
                    >
                      Username
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <User className="size-4" />
                    </div>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))
                      }
                      placeholder="irvan"
                      className={`pl-9 pr-9 text-xs ${
                        usernameStatus === "available"
                          ? "border-emerald-500/50 focus-visible:ring-emerald-500/30"
                          : usernameStatus === "taken" || usernameStatus === "invalid"
                          ? "border-destructive/60 focus-visible:ring-destructive/30"
                          : ""
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      {usernameStatus === "checking" && (
                        <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                      )}
                      {usernameStatus === "available" && (
                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                      )}
                      {(usernameStatus === "taken" || usernameStatus === "invalid") && (
                        <XCircle className="size-3.5 text-destructive" />
                      )}
                    </div>
                  </div>

                  {/* Animated Helper Message for Username */}
                  <AnimatePresence>
                    {usernameMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`text-[11px] flex items-center gap-1 font-medium mt-0.5 ${
                            usernameStatus === "available"
                              ? "text-emerald-500"
                              : "text-destructive"
                          }`}
                        >
                          <span>{usernameMessage}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email with Live Debounced Availability */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-foreground/80"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Mail className="size-4" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="irvan@example.com"
                      className={`pl-9 pr-9 text-xs ${
                        emailStatus === "available"
                          ? "border-emerald-500/50 focus-visible:ring-emerald-500/30"
                          : emailStatus === "taken"
                          ? "border-destructive/60 focus-visible:ring-destructive/30"
                          : ""
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      {emailStatus === "checking" && (
                        <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                      )}
                      {emailStatus === "available" && (
                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                      )}
                      {emailStatus === "taken" && (
                        <XCircle className="size-3.5 text-destructive" />
                      )}
                    </div>
                  </div>

                  {/* Animated Helper Message for Email */}
                  <AnimatePresence>
                    {emailMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`text-[11px] flex items-center gap-1 font-medium mt-0.5 ${
                            emailStatus === "available"
                              ? "text-emerald-500"
                              : "text-destructive"
                          }`}
                        >
                          <span>{emailMessage}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="new-password"
                      className="block text-xs font-medium text-foreground/80"
                    >
                      Password
                    </label>
                    {password && (
                      <span className="text-[11px] font-medium text-muted-foreground">
                        {strengthLabels[strength - 1] || "Too short"}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Lock className="size-4" />
                    </div>
                    <Input
                      id="new-password"
                      name="new-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
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

                  {/* Password Strength Bar */}
                  {password && (
                    <div className="grid grid-cols-4 gap-1.5 pt-1">
                      {[0, 1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`h-1 rounded-sm transition-all duration-300 ${
                            strength > step
                              ? strengthColors[strength - 1]
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || isFormBlocked}
                  className="w-full mt-3 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="size-4" />
                      <span>Create Account</span>
                      <ArrowRight className="size-4 ml-auto" />
                    </>
                  )}
                </Button>
              </form>

              {/* Footer / Switch to Login */}
              <div className="mt-6 pt-5 border-t border-border text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  transitionTypes={["nav-back"]}
                  className="font-medium text-foreground hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </DirectionalTransition>
  );
}
