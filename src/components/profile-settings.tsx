"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoogleLogo } from "@/components/logos/google";
import { GithubLogo } from "@/components/logos/github";
import { User, Mail, Calendar, ShieldCheck, Check, Edit2, Loader2, LogIn } from "lucide-react";

export function ProfileSettings({ searchQuery }: { searchQuery: string }) {
  const { user, isLoading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-base">Not signed in</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            Sign in to manage your account details, full name, and linked providers.
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-xs font-medium rounded-xl border border-border bg-background hover:bg-muted/80 text-foreground transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user.username.slice(0, 2).toUpperCase();

  const handleSave = async () => {
    if (!fullName.trim()) return;
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const res = await updateProfile({ full_name: fullName.trim() });
      if (!res.success) {
        setError(res.error || "Failed to update profile");
      } else {
        setSaveSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      setError("Network error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const formattedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="p-5 sm:p-6 space-y-6">
      {/* Profile Overview */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-border/50">
        <Avatar className="w-16 h-16 border-2 border-border/80 ring-2 ring-primary/20 shadow-md">
          {user.avatar_url ? (
            <AvatarImage src={user.avatar_url} alt={user.full_name || user.username} />
          ) : null}
          <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground truncate">
              {user.full_name || user.username}
            </h3>
            {user.provider === "google" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <GoogleLogo className="w-3 h-3" />
                Google
              </span>
            )}
            {user.provider === "github" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-500/10 text-foreground border border-neutral-500/20">
                <GithubLogo className="w-3 h-3" />
                GitHub
              </span>
            )}
            {user.provider === "local" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="w-3 h-3" />
                Email Auth
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">@{user.username}</p>
        </div>
      </div>

      {/* Account Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name field */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Full Name
            </span>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            ) : null}
          </div>

          {isEditing ? (
            <div className="space-y-2 mt-1">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Your full name"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                >
                  {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(user.full_name || "");
                  }}
                  className="px-3 py-1 text-xs rounded-md border border-border bg-background text-foreground hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-foreground">
              {user.full_name || "Not specified"}
            </p>
          )}
          {saveSuccess && (
            <p className="text-[11px] text-emerald-500 font-medium">Updated successfully!</p>
          )}
          {error && <p className="text-[11px] text-destructive">{error}</p>}
        </div>

        {/* Email field */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Email Address
          </span>
          <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
        </div>

        {/* Username field */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            Username
          </span>
          <p className="text-sm font-medium text-foreground">@{user.username}</p>
        </div>

        {/* Member Since field */}
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Member Since
          </span>
          <p className="text-sm font-medium text-foreground">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
