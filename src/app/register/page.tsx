"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Container from "@/components/container";
import { GoogleLogo } from "@/components/logos/google";
import { GithubLogo } from "@/components/logos/github";
import { Eye, EyeOff, Lock, User, Mail, Sparkles, AlertCircle, ArrowRight, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  // If already logged in, redirect to home or settings
  React.useEffect(() => {
    if (user) {
      router.push("/settings");
    }
  }, [user, router]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

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
        setError(res.error || "Registration failed. Please check your details.");
      } else {
        router.push("/");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Container className="max-w-md" noPadding>
        <div className="w-full mx-auto">
          {/* Card Container */}
          <div className="rounded-lg border border-border bg-background p-6 sm:p-8 shadow-xs">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Create an account
              </h1>
              <p className="text-xs text-muted-foreground mt-1.5">
                Join Realm and get your personalized workspace
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-5 flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                <AlertCircle className="size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

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

              {/* Username */}
              <div className="space-y-1.5">
                <label
                  htmlFor="username"
                  className="block text-xs font-medium text-foreground/80"
                >
                  Username
                </label>
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
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    placeholder="irvan"
                    className="pl-9 text-xs"
                  />
                </div>
              </div>

              {/* Email */}
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
                    className="pl-9 text-xs"
                  />
                </div>
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
                disabled={isLoading}
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
                className="font-medium text-foreground hover:underline transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
