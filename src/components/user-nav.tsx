"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut, Settings, User as UserIcon } from "lucide-react";
import { GoogleLogo } from "@/components/logos/google";
import { GithubLogo } from "@/components/logos/github";
import { toast } from "@/hooks/use-toast";

export function UserNav() {
  const { user, isLoading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-muted/60 animate-pulse border border-border" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        prefetch={true}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-full border border-border/80 transition-all cursor-pointer"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Sign in</span>
      </Link>
    );
  }

  const initials = (user.full_name || user.username || "U")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-primary/40 transition-all focus:outline-hidden cursor-pointer"
        aria-label="User navigation menu"
      >
        <Avatar className="w-8 h-8 border border-border">
          <AvatarImage src={user.avatar_url || undefined} alt={user.full_name || user.username} />
          <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 p-1.5 bg-popover text-popover-foreground border border-border rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* User Info Header */}
          <div className="px-3 py-2.5 border-b border-border/50">
            <div className="flex items-center gap-2.5">
              <Avatar className="w-9 h-9 border border-border shrink-0">
                <AvatarImage src={user.avatar_url || undefined} alt={user.full_name || user.username} />
                <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground truncate">
                  {user.full_name || user.username}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  @{user.username}
                </span>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground bg-muted/40 rounded-lg px-2.5 py-1">
              <span className="truncate">{user.email}</span>
              <span className="flex items-center gap-1 shrink-0 ml-1">
                {user.provider === "google" && <GoogleLogo className="w-3 h-3" />}
                {user.provider === "github" && <GithubLogo className="w-3 h-3" />}
                <span className="capitalize text-[10px] font-medium">{user.provider}</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href="/settings"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs text-foreground/90 hover:text-foreground hover:bg-muted/80 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span>Settings & Profile</span>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="pt-1 border-t border-border/50">
            <button
              onClick={async () => {
                setIsOpen(false);
                toast({
                  title: "Signed out",
                  description: "You have been signed out.",
                });
                await logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-destructive/90 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
