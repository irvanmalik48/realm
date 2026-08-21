"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  User,
  AtSign,
  AlertCircle,
  Check,
  Loader2,
  X,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  targetField?: "name" | "username" | "both";
}

export function EditProfileDialog({
  isOpen,
  onClose,
  targetField = "both",
}: EditProfileDialogProps) {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  // Username status
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [usernameMessage, setUsernameMessage] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      setFullName(user.full_name || "");
      setUsername(user.username || "");
      setUsernameStatus("idle");
      setUsernameMessage("");
      setError(null);
      setSuccess(false);
    }
  }, [user, isOpen]);

  // Debounced username check
  useEffect(() => {
    if (!isOpen || !user) return;

    const candidate = username.trim().toLowerCase();
    if (!candidate) {
      setUsernameStatus("idle");
      setUsernameMessage("");
      return;
    }

    if (candidate === user.username.toLowerCase()) {
      setUsernameStatus("available");
      setUsernameMessage("Current username");
      return;
    }

    if (candidate.length < 3) {
      setUsernameStatus("invalid");
      setUsernameMessage("Username must be at least 3 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(candidate)) {
      setUsernameStatus("invalid");
      setUsernameMessage("Alphanumeric and underscores only (max 30)");
      return;
    }

    setUsernameStatus("checking");
    setUsernameMessage("Checking availability...");

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/auth/check?username=${encodeURIComponent(candidate)}`
        );
        if (!res.ok) {
          setUsernameStatus("idle");
          setUsernameMessage("");
          return;
        }
        const data = await res.json();
        if (data.username_available === false) {
          setUsernameStatus("taken");
          setUsernameMessage(data.username_reason || "Username is already taken");
        } else {
          setUsernameStatus("available");
          setUsernameMessage("Username is available!");
        }
      } catch {
        setUsernameStatus("idle");
        setUsernameMessage("");
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [username, isOpen, user]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setError(null);
    setSuccess(false);

    const cleanName = fullName.trim();
    const cleanUsername = username.trim().toLowerCase();

    if (cleanName.length < 2 || cleanName.length > 100) {
      setError("Full name must be between 2 and 100 characters.");
      return;
    }

    if (
      cleanUsername !== user.username.toLowerCase() &&
      (usernameStatus === "taken" ||
        usernameStatus === "invalid" ||
        usernameStatus === "checking")
    ) {
      setError("Please choose a valid and available username.");
      return;
    }

    setIsSaving(true);

    try {
      const updateData: { full_name?: string; username?: string } = {};

      if (cleanName !== user.full_name) {
        updateData.full_name = cleanName;
      }
      if (cleanUsername !== user.username.toLowerCase()) {
        updateData.username = cleanUsername;
      }

      if (Object.keys(updateData).length === 0) {
        onClose();
        return;
      }

      const res = await updateProfile(updateData);
      if (!res.success) {
        setError(res.error || "Failed to update profile details.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !user) return null;

  const isUsernameBlocked =
    username.trim().toLowerCase() !== user.username.toLowerCase() &&
    (usernameStatus === "taken" ||
      usernameStatus === "invalid" ||
      usernameStatus === "checking");

  const title =
    targetField === "name"
      ? "Edit Full Name"
      : targetField === "username"
      ? "Edit Username"
      : "Edit Profile Details";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              {targetField === "username" ? (
                <AtSign className="size-4" />
              ) : (
                <User className="size-4" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-[11px] text-muted-foreground">
                Update your account identity information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                className="overflow-hidden"
              >
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                className="overflow-hidden"
              >
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2">
                  <Check className="size-4 shrink-0" />
                  <span>Profile updated successfully!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full Name Field */}
          {(targetField === "both" || targetField === "name") && (
            <div className="space-y-1.5">
              <label
                htmlFor="editFullName"
                className="block text-xs font-medium text-foreground/80"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <User className="size-4" />
                </div>
                <Input
                  id="editFullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="pl-9 text-xs"
                  autoFocus={targetField === "name" || targetField === "both"}
                />
              </div>
            </div>
          )}

          {/* Username Field */}
          {(targetField === "both" || targetField === "username") && (
            <div className="space-y-1.5">
              <label
                htmlFor="editUsername"
                className="block text-xs font-medium text-foreground/80"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <AtSign className="size-4" />
                </div>
                <Input
                  id="editUsername"
                  type="text"
                  required
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                    )
                  }
                  placeholder="username"
                  className="pl-9 pr-9 text-xs"
                  autoFocus={targetField === "username"}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {usernameStatus === "checking" && (
                    <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                  )}
                  {usernameStatus === "available" && (
                    <Check className="size-3.5 text-emerald-500" />
                  )}
                  {(usernameStatus === "taken" ||
                    usernameStatus === "invalid") && (
                    <XCircle className="size-3.5 text-destructive" />
                  )}
                </div>
              </div>

              {usernameMessage && (
                <p
                  className={`text-[11px] font-medium ${
                    usernameStatus === "available"
                      ? "text-emerald-500"
                      : usernameStatus === "checking"
                      ? "text-muted-foreground"
                      : "text-destructive"
                  }`}
                >
                  {usernameMessage}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isSaving}
              className="text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSaving || isUsernameBlocked || !fullName.trim()}
              className="text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : success ? (
                <>
                  <Check className="size-3.5" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
