"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoogleLogo } from "@/components/logos/google";
import { GithubLogo } from "@/components/logos/github";
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Check,
  Edit2,
  Loader2,
  LogIn,
  Key,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Unlink,
  Link as LinkIcon,
  Sparkles,
  ShieldAlert,
  Camera,
  Upload,
  Trash2,
  Globe,
  Crop,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { AvatarCropDialog } from "@/components/avatar-crop-dialog";

export function ProfileSettings({ searchQuery }: { searchQuery: string }) {
  const { user, isLoading, updateProfile, uploadAvatar, setPassword, unlinkOAuth, refresh } = useAuth();
  const searchParams = useSearchParams();

  // Full Name Editing State
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  // Avatar Management State
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [isAvatarOptionsOpen, setIsAvatarOptionsOpen] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarSuccess, setAvatarSuccess] = useState<string | null>(null);

  // Password Management State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // OAuth Linking/Unlinking State
  const [unlinkingProvider, setUnlinkingProvider] = useState<string | null>(null);
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [oauthSuccess, setOauthSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
    }
  }, [user]);

  // Handle URL query parameters for OAuth linking feedback
  useEffect(() => {
    const linked = searchParams.get("linked");
    const err = searchParams.get("error");

    if (linked) {
      const providerName = linked === "google" ? "Google" : linked === "github" ? "GitHub" : linked;
      setOauthSuccess(`${providerName} account linked successfully!`);
      refresh();
      window.history.replaceState({}, "", window.location.pathname);
      const timer = setTimeout(() => setOauthSuccess(null), 4000);
      return () => clearTimeout(timer);
    }

    if (err) {
      setOauthError(err.replace(/\+/g, " "));
      window.history.replaceState({}, "", window.location.pathname);
      const timer = setTimeout(() => setOauthError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, refresh]);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground">
          <User className="size-6" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-base">Not signed in</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            Sign in to manage your account details, full name, connected providers, and security settings.
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <LogIn className="size-3.5" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-xs font-medium rounded-md border border-border bg-background hover:bg-muted/80 text-foreground transition-colors"
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

  const handleSaveName = async () => {
    if (!fullName.trim()) return;
    setIsSavingName(true);
    setNameError(null);
    setNameSuccess(false);

    try {
      const res = await updateProfile({ full_name: fullName.trim() });
      if (!res.success) {
        setNameError(res.error || "Failed to update full name");
      } else {
        setNameSuccess(true);
        setIsEditingName(false);
        setTimeout(() => setNameSuccess(false), 3000);
      }
    } catch {
      setNameError("Network error occurred");
    } finally {
      setIsSavingName(false);
    }
  };

  const handleCropComplete = async (croppedFile: File) => {
    setIsSavingAvatar(true);
    setAvatarError(null);
    setAvatarSuccess(null);

    try {
      const res = await uploadAvatar(croppedFile);
      if (!res.success) {
        setAvatarError(res.error || "Failed to upload avatar");
      } else {
        setAvatarSuccess("Profile picture updated successfully!");
        setIsCropDialogOpen(false);
        setTimeout(() => setAvatarSuccess(null), 3000);
      }
    } catch {
      setAvatarError("Network error during avatar upload");
    } finally {
      setIsSavingAvatar(false);
    }
  };

  const handleSyncAvatar = async (avatarUrl: string, providerName: string) => {
    setIsSavingAvatar(true);
    setAvatarError(null);
    setAvatarSuccess(null);

    try {
      const res = await updateProfile({ avatar_url: avatarUrl });
      if (!res.success) {
        setAvatarError(res.error || `Failed to sync avatar from ${providerName}`);
      } else {
        setAvatarSuccess(`Profile picture synced with ${providerName}!`);
        setIsAvatarOptionsOpen(false);
        setTimeout(() => setAvatarSuccess(null), 3000);
      }
    } catch {
      setAvatarError("Network error during avatar sync");
    } finally {
      setIsSavingAvatar(false);
    }
  };

  const handleSetCustomUrl = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customAvatarUrl.trim()) return;

    setIsSavingAvatar(true);
    setAvatarError(null);
    setAvatarSuccess(null);

    try {
      const res = await updateProfile({ avatar_url: customAvatarUrl.trim() });
      if (!res.success) {
        setAvatarError(res.error || "Failed to set avatar URL");
      } else {
        setAvatarSuccess("Profile picture updated successfully!");
        setCustomAvatarUrl("");
        setIsAvatarOptionsOpen(false);
        setTimeout(() => setAvatarSuccess(null), 3000);
      }
    } catch {
      setAvatarError("Network error setting avatar URL");
    } finally {
      setIsSavingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setIsSavingAvatar(true);
    setAvatarError(null);
    setAvatarSuccess(null);

    try {
      const res = await updateProfile({ avatar_url: "" });
      if (!res.success) {
        setAvatarError(res.error || "Failed to remove avatar");
      } else {
        setAvatarSuccess("Profile picture removed. Reverted to default initials.");
        setIsAvatarOptionsOpen(false);
        setTimeout(() => setAvatarSuccess(null), 3000);
      }
    } catch {
      setAvatarError("Network error removing avatar");
    } finally {
      setIsSavingAvatar(false);
    }
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(newPassword);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-destructive", "bg-yellow-500", "bg-blue-500", "bg-emerald-500"];

  const handlePasswordSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setIsSavingPassword(true);

    try {
      const res = await setPassword({
        current_password: user.has_password ? currentPassword : undefined,
        new_password: newPassword,
      });

      if (!res.success) {
        setPasswordError(res.error || "Failed to update password.");
      } else {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(false), 4000);
      }
    } catch {
      setPasswordError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleUnlink = async (provider: string) => {
    setUnlinkingProvider(provider);
    setOauthError(null);
    setOauthSuccess(null);

    try {
      const res = await unlinkOAuth(provider);
      if (!res.success) {
        setOauthError(res.error || `Failed to disconnect ${provider}`);
      } else {
        setOauthSuccess(`${provider.charAt(0).toUpperCase() + provider.slice(1)} disconnected successfully.`);
        setTimeout(() => setOauthSuccess(null), 3000);
      }
    } catch {
      setOauthError("Network error occurred");
    } finally {
      setUnlinkingProvider(null);
    }
  };

  const formattedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  const isGoogleConnected =
    user.provider === "google" ||
    (user.connected_providers && user.connected_providers.includes("google"));

  const isGithubConnected =
    user.provider === "github" ||
    (user.connected_providers && user.connected_providers.includes("github"));

  const googleAccount = user.connected_accounts?.find((a) => a.provider === "google");
  const githubAccount = user.connected_accounts?.find((a) => a.provider === "github");

  return (
    <div className="p-5 sm:p-6 space-y-6">
      {/* Cropper Modal with Drag and Drop */}
      <AvatarCropDialog
        isOpen={isCropDialogOpen}
        onClose={() => setIsCropDialogOpen(false)}
        onCropComplete={handleCropComplete}
        isUploading={isSavingAvatar}
      />

      {/* Post-OAuth Password Setup Notice */}
      <AnimatePresence>
        {!user.has_password && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <ShieldAlert className="size-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">
                    Set up your account password
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    You signed in using social login. Setting a password enables logging in via your email or username.
                  </p>
                </div>
              </div>
              <a
                href="#password-section"
                className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer"
              >
                Set Password
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Overview with Interactive Avatar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-border/50">
        <div className="relative group">
          <Avatar className="size-20 border-2 border-border/80 ring-2 ring-primary/20 shadow-md transition-transform group-hover:scale-102">
            {user.avatar_url ? (
              <AvatarImage src={user.avatar_url} alt={user.full_name || user.username} />
            ) : null}
            <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => setIsCropDialogOpen(true)}
            aria-label="Change profile picture"
            className="absolute inset-0 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <Camera className="size-5" />
            <span className="text-[10px] font-medium">Edit</span>
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-foreground truncate">
              {user.full_name || user.username}
            </h3>
            {user.has_password && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="size-3" />
                Password Set
              </span>
            )}
            {isGoogleConnected && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <GoogleLogo className="size-3" />
                Google
              </span>
            )}
            {isGithubConnected && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-500/10 text-foreground border border-neutral-500/20">
                <GithubLogo className="size-3" />
                GitHub
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">@{user.username}</p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsCropDialogOpen(true)}
              className="text-xs h-7 px-2.5 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Crop className="size-3.5" />
              <span>Upload & Crop</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAvatarOptionsOpen(!isAvatarOptionsOpen)}
              className="text-xs h-7 px-2.5 flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="size-3.5" />
              <span>More Options</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Avatar Options Drawer/Panel */}
      <AnimatePresence>
        {isAvatarOptionsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl border border-primary/30 bg-muted/30 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Camera className="size-3.5 text-primary" />
                  Additional Avatar Options
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAvatarOptionsOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Close
                </button>
              </div>

              {avatarError && (
                <div className="p-2.5 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <AlertCircle className="size-3.5 shrink-0" />
                  <span>{avatarError}</span>
                </div>
              )}

              {avatarSuccess && (
                <div className="p-2.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2">
                  <Check className="size-3.5 shrink-0" />
                  <span>{avatarSuccess}</span>
                </div>
              )}

              {/* Sync and Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Sync from Google */}
                {isGoogleConnected && googleAccount?.avatar_url && (
                  <button
                    type="button"
                    onClick={() => handleSyncAvatar(googleAccount.avatar_url!, "Google")}
                    disabled={isSavingAvatar}
                    className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-foreground transition-all flex items-center gap-3 text-left cursor-pointer group"
                  >
                    <Avatar className="size-8 shrink-0 border border-blue-500/30">
                      <AvatarImage src={googleAccount.avatar_url} />
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium flex items-center gap-1">
                        <GoogleLogo className="size-3" />
                        Sync Google
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">Use Google avatar</p>
                    </div>
                  </button>
                )}

                {/* Sync from GitHub */}
                {isGithubConnected && githubAccount?.avatar_url && (
                  <button
                    type="button"
                    onClick={() => handleSyncAvatar(githubAccount.avatar_url!, "GitHub")}
                    disabled={isSavingAvatar}
                    className="p-3 rounded-lg border border-neutral-500/30 bg-neutral-500/5 hover:bg-neutral-500/10 text-foreground transition-all flex items-center gap-3 text-left cursor-pointer group"
                  >
                    <Avatar className="size-8 shrink-0 border border-neutral-500/30">
                      <AvatarImage src={githubAccount.avatar_url} />
                      <AvatarFallback>GH</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium flex items-center gap-1">
                        <GithubLogo className="size-3" />
                        Sync GitHub
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">Use GitHub avatar</p>
                    </div>
                  </button>
                )}

                {/* Remove Picture */}
                {user.avatar_url && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    disabled={isSavingAvatar}
                    className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-destructive transition-all flex items-center gap-3 text-left cursor-pointer group"
                  >
                    <div className="size-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Trash2 className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium">Remove Picture</p>
                      <p className="text-[10px] text-muted-foreground">Revert back to initials</p>
                    </div>
                  </button>
                )}
              </div>

              {/* Custom Image URL Input */}
              <form onSubmit={handleSetCustomUrl} className="pt-2 border-t border-border/40 space-y-2">
                <label className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                  <Globe className="size-3" />
                  Or enter direct Image URL:
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    placeholder="https://example.com/your-avatar.png"
                    className="text-xs h-8"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSavingAvatar || !customAvatarUrl.trim()}
                    className="h-8 text-xs cursor-pointer shrink-0"
                  >
                    {isSavingAvatar ? <Loader2 className="size-3.5 animate-spin" /> : "Apply URL"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name field */}
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <User className="size-3.5" />
              Full Name
            </span>
            {!isEditingName ? (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="size-3" />
                Edit
              </button>
            ) : null}
          </div>

          {isEditingName ? (
            <div className="space-y-2 mt-1">
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="text-xs"
                placeholder="Your full name"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSaveName}
                  disabled={isSavingName}
                  size="sm"
                  className="cursor-pointer"
                >
                  {isSavingName ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditingName(false);
                    setFullName(user.full_name || "");
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-foreground">
              {user.full_name || "Not specified"}
            </p>
          )}
          {nameSuccess && (
            <p className="text-[11px] text-emerald-500 font-medium">Updated successfully!</p>
          )}
          {nameError && <p className="text-[11px] text-destructive">{nameError}</p>}
        </div>

        {/* Email field */}
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-1">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Mail className="size-3.5" />
            Email Address
          </span>
          <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
        </div>

        {/* Username field */}
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-1">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <User className="size-3.5" />
            Username
          </span>
          <p className="text-sm font-medium text-foreground">@{user.username}</p>
        </div>

        {/* Member Since field */}
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-1">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            Member Since
          </span>
          <p className="text-sm font-medium text-foreground">{formattedDate}</p>
        </div>
      </div>

      {/* Connected Accounts Section */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <LinkIcon className="size-4 text-primary" />
            Connected Accounts
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Connect multiple OAuth providers to sign into your account seamlessly.
          </p>
        </div>

        <AnimatePresence>
          {oauthError && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{oauthError}</span>
              </div>
            </motion.div>
          )}

          {oauthSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2">
                <Check className="size-4 shrink-0" />
                <span>{oauthSuccess}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Google Connection Card */}
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <GoogleLogo className="size-5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">Google</p>
                <p className="text-[11px] text-muted-foreground">
                  {isGoogleConnected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            {isGoogleConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnlink("google")}
                disabled={unlinkingProvider === "google"}
                className="text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                {unlinkingProvider === "google" ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <>
                    <Unlink className="size-3.5" />
                    <span>Disconnect</span>
                  </>
                )}
              </Button>
            ) : (
              <a
                href="/api/auth/google"
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-background hover:bg-muted/80 text-foreground transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LinkIcon className="size-3.5" />
                <span>Connect</span>
              </a>
            )}
          </div>

          {/* GitHub Connection Card */}
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <GithubLogo className="size-5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">GitHub</p>
                <p className="text-[11px] text-muted-foreground">
                  {isGithubConnected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            {isGithubConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnlink("github")}
                disabled={unlinkingProvider === "github"}
                className="text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                {unlinkingProvider === "github" ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <>
                    <Unlink className="size-3.5" />
                    <span>Disconnect</span>
                  </>
                )}
              </Button>
            ) : (
              <a
                href="/api/auth/github"
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-background hover:bg-muted/80 text-foreground transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <LinkIcon className="size-3.5" />
                <span>Connect</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Password Management Section */}
      <div id="password-section" className="pt-4 border-t border-border/50 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Key className="size-4 text-primary" />
            {user.has_password ? "Change Password" : "Set Up Password"}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {user.has_password
              ? "Update your existing account password."
              : "Create a password to enable logging in via username or email."}
          </p>
        </div>

        {/* Animated Error/Success notices */}
        <AnimatePresence>
          {passwordError && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            </motion.div>
          )}

          {passwordSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2">
                <Check className="size-4 shrink-0" />
                <span>Password updated successfully!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handlePasswordSubmit} className="space-y-3.5 max-w-md">
          {/* Current Password (only required if user already has a password) */}
          {user.has_password && (
            <div className="space-y-1.5">
              <label
                htmlFor="currentPassword"
                className="block text-xs font-medium text-foreground/80"
              >
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock className="size-4" />
                </div>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 pr-9 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          )}

          {/* New Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="newPassword"
                className="block text-xs font-medium text-foreground/80"
              >
                {user.has_password ? "New Password" : "Password"}
              </label>
              {newPassword && (
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
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="pl-9 pr-9 text-xs"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {newPassword && (
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1 rounded-sm transition-all duration-300 ${
                      strength > step ? strengthColors[strength - 1] : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-foreground/80"
            >
              Confirm {user.has_password ? "New Password" : "Password"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Lock className="size-4" />
              </div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9 text-xs"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSavingPassword}
            size="sm"
            className="mt-2 cursor-pointer"
          >
            {isSavingPassword ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving password...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                <span>{user.has_password ? "Change Password" : "Set Password"}</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
