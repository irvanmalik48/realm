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
  AlertCircle,
  Unlink,
  Link as LinkIcon,
  ShieldAlert,
  Camera,
  Trash2,
  Globe,
  Crop,
  Shield,
  AtSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { AvatarCropDialog } from "@/components/avatar-crop-dialog";
import { PasswordDialog } from "@/components/password-dialog";
import { EditProfileDialog } from "@/components/edit-profile-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";

export function ProfileSettingsSkeleton() {
  return (
    <div className="p-5 sm:p-6 space-y-6">
      {/* Profile Overview Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-border/50">
        <Skeleton className="size-20 rounded-full shrink-0 border-2 border-border/80" />
        <div className="flex-1 space-y-2.5 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-36 rounded-md" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-3.5 w-24 rounded-md" />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Skeleton className="h-7 w-28 rounded-md" />
            <Skeleton className="h-7 w-24 rounded-md" />
          </div>
        </div>
      </div>

      {/* Account Details Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-2"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-20 rounded-md" />
              {i < 2 && <Skeleton className="h-3.5 w-10 rounded-md" />}
            </div>
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
        ))}
      </div>

      {/* Security & Password Section Skeleton */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        <div className="space-y-1">
          <Skeleton className="h-4 w-44 rounded-md" />
          <Skeleton className="h-3 w-64 rounded-md" />
        </div>
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-lg shrink-0" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-3 w-56 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-8 w-28 rounded-md shrink-0" />
        </div>
      </div>

      {/* Connected Accounts Section Skeleton */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        <div className="space-y-1">
          <Skeleton className="h-4 w-36 rounded-md" />
          <Skeleton className="h-3 w-60 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="p-3.5 rounded-lg border border-border/60 bg-muted/20 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-5 rounded-full shrink-0" />
                <div className="space-y-1">
                  <Skeleton className="h-3.5 w-16 rounded-md" />
                  <Skeleton className="h-2.5 w-20 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-7 w-20 rounded-md shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProfileSettings({ searchQuery }: { searchQuery: string }) {
  const { user, isLoading, updateProfile, uploadAvatar, unlinkOAuth, refresh } = useAuth();
  const searchParams = useSearchParams();

  // Dialog States
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isAvatarOptionsOpen, setIsAvatarOptionsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTargetField, setEditTargetField] = useState<"name" | "username" | "both">("both");

  // Avatar Direct URL / Sync State
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarSuccess, setAvatarSuccess] = useState<string | null>(null);

  // OAuth Linking/Unlinking State
  const [unlinkingProvider, setUnlinkingProvider] = useState<string | null>(null);
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [oauthSuccess, setOauthSuccess] = useState<string | null>(null);

  // Handle URL query parameters for OAuth linking feedback
  useEffect(() => {
    const linked = searchParams.get("linked");
    const err = searchParams.get("error");

    if (linked) {
      const providerName = linked === "google" ? "Google" : linked === "github" ? "GitHub" : linked;
      setOauthSuccess(`${providerName} account linked successfully!`);
      toast({
        variant: "success",
        title: "Account linked",
        description: `${providerName} account linked successfully!`,
      });
      refresh();
      window.history.replaceState({}, "", window.location.pathname);
      const timer = setTimeout(() => setOauthSuccess(null), 4000);
      return () => clearTimeout(timer);
    }

    if (err) {
      const errMsg = err.replace(/\+/g, " ");
      setOauthError(errMsg);
      toast({
        variant: "destructive",
        title: "OAuth connection error",
        description: errMsg,
      });
      window.history.replaceState({}, "", window.location.pathname);
      const timer = setTimeout(() => setOauthError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, refresh]);

  if (isLoading) {
    return <ProfileSettingsSkeleton />;
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

  const handleCropComplete = async (croppedFile: File) => {
    setIsSavingAvatar(true);
    setAvatarError(null);
    setAvatarSuccess(null);

    try {
      const res = await uploadAvatar(croppedFile);
      if (!res.success) {
        const err = res.error || "Failed to upload avatar";
        setAvatarError(err);
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: err,
        });
      } else {
        setAvatarSuccess("Profile picture updated successfully!");
        toast({
          variant: "success",
          title: "Avatar updated",
          description: "Your profile picture has been updated.",
        });
        setIsCropDialogOpen(false);
        setTimeout(() => setAvatarSuccess(null), 3000);
      }
    } catch {
      setAvatarError("Network error during avatar upload");
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Network error during avatar upload.",
      });
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
        const err = res.error || `Failed to sync avatar from ${providerName}`;
        setAvatarError(err);
        toast({
          variant: "destructive",
          title: "Sync failed",
          description: err,
        });
      } else {
        setAvatarSuccess(`Profile picture synced with ${providerName}!`);
        toast({
          variant: "success",
          title: "Avatar synced",
          description: `Profile picture synced with ${providerName}.`,
        });
        setIsAvatarOptionsOpen(false);
        setTimeout(() => setAvatarSuccess(null), 3000);
      }
    } catch {
      setAvatarError("Network error during avatar sync");
      toast({
        variant: "destructive",
        title: "Sync failed",
        description: "Network error during avatar sync.",
      });
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
        const err = res.error || "Failed to set avatar URL";
        setAvatarError(err);
        toast({
          variant: "destructive",
          title: "Update failed",
          description: err,
        });
      } else {
        setAvatarSuccess("Profile picture updated successfully!");
        toast({
          variant: "success",
          title: "Avatar updated",
          description: "Profile picture URL applied successfully.",
        });
        setCustomAvatarUrl("");
        setIsAvatarOptionsOpen(false);
        setTimeout(() => setAvatarSuccess(null), 3000);
      }
    } catch {
      setAvatarError("Network error setting avatar URL");
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Network error setting avatar URL.",
      });
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
        const err = res.error || "Failed to remove avatar";
        setAvatarError(err);
        toast({
          variant: "destructive",
          title: "Removal failed",
          description: err,
        });
      } else {
        setAvatarSuccess("Profile picture removed. Reverted to default initials.");
        toast({
          title: "Avatar removed",
          description: "Reverted to default initials.",
        });
        setIsAvatarOptionsOpen(false);
        setTimeout(() => setAvatarSuccess(null), 3000);
      }
    } catch {
      setAvatarError("Network error removing avatar");
      toast({
        variant: "destructive",
        title: "Removal failed",
        description: "Network error removing avatar.",
      });
    } finally {
      setIsSavingAvatar(false);
    }
  };

  const handleUnlink = async (provider: string) => {
    setUnlinkingProvider(provider);
    setOauthError(null);
    setOauthSuccess(null);

    try {
      const res = await unlinkOAuth(provider);
      if (!res.success) {
        const err = res.error || `Failed to disconnect ${provider}`;
        setOauthError(err);
        toast({
          variant: "destructive",
          title: "Disconnection failed",
          description: err,
        });
      } else {
        const msg = `${provider.charAt(0).toUpperCase() + provider.slice(1)} disconnected successfully.`;
        setOauthSuccess(msg);
        toast({
          variant: "success",
          title: "Account disconnected",
          description: msg,
        });
        setTimeout(() => setOauthSuccess(null), 3000);
      }
    } catch {
      setOauthError("Network error occurred");
      toast({
        variant: "destructive",
        title: "Disconnection failed",
        description: "Network error occurred.",
      });
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

      {/* Password Setup/Change Modal Dialog */}
      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        hasPassword={user.has_password}
      />

      {/* Full Name & Username Edit Modal Dialog */}
      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        targetField={editTargetField}
      />

      {/* Elegant Post-OAuth Password Setup Banner */}
      <AnimatePresence>
        {!user.has_password && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            className="overflow-hidden"
          >
            <div className="p-3.5 sm:p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <ShieldAlert className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground">
                    Set up your account password
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    You signed in using social login. Setting a password enables logging in via your email or username.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPasswordDialogOpen(true)}
                className="shrink-0 text-xs border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 cursor-pointer"
              >
                Set Password
              </Button>
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

          <div className="flex flex-wrap items-center gap-2 mt-2.5">
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
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <User className="size-3.5" />
              Full Name
            </span>
            <button
              onClick={() => {
                setEditTargetField("name");
                setIsEditDialogOpen(true);
              }}
              className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="size-3" />
              Edit
            </button>
          </div>
          <p className="text-sm font-medium text-foreground">
            {user.full_name || "Not specified"}
          </p>
        </div>

        {/* Username field */}
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <AtSign className="size-3.5" />
              Username
            </span>
            <button
              onClick={() => {
                setEditTargetField("username");
                setIsEditDialogOpen(true);
              }}
              className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="size-3" />
              Edit
            </button>
          </div>
          <p className="text-sm font-medium text-foreground">@{user.username}</p>
        </div>

        {/* Email field */}
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Mail className="size-3.5" />
            Email Address
          </span>
          <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
        </div>

        {/* Member Since field */}
        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            Member Since
          </span>
          <p className="text-sm font-medium text-foreground">{formattedDate}</p>
        </div>
      </div>

      {/* Security & Password Section */}
      <div className="pt-4 border-t border-border/50 space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            Security & Authentication
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your account login credentials and security methods.
          </p>
        </div>

        <div className="p-4 rounded-lg border border-border/60 bg-muted/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-background border border-border flex items-center justify-center text-primary shrink-0 shadow-2xs">
              <Key className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-foreground">Account Password</p>
                {user.has_password ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Check className="size-2.5" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    Not Set
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {user.has_password
                  ? "Used to log in directly with your email or username."
                  : "Set a password to enable email & username sign-in alongside social login."}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPasswordDialogOpen(true)}
            className="text-xs shrink-0 cursor-pointer"
          >
            {user.has_password ? "Change Password" : "Set Password"}
          </Button>
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
    </div>
  );
}
