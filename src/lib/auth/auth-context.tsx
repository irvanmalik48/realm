"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface ConnectedAccount {
  provider: string;
  email?: string | null;
  avatar_url?: string | null;
}

export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url?: string | null;
  provider: string;
  has_password: boolean;
  connected_providers: string[];
  connected_accounts?: ConnectedAccount[];
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { identifier: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    username: string;
    password: string;
    full_name: string;
    avatar_url?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: { full_name?: string; username?: string; avatar_url?: string }) => Promise<{ success: boolean; error?: string }>;
  uploadAvatar: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  setPassword: (data: { current_password?: string; new_password: string }) => Promise<{ success: boolean; error?: string }>;
  unlinkOAuth: (provider: string) => Promise<{ success: boolean; error?: string }>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (credentials: { identifier: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during login" };
    }
  };

  const register = async (data: {
    email: string;
    username: string;
    password: string;
    full_name: string;
    avatar_url?: string;
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || "Registration failed" };
      }
      setUser(resData.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during registration" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  const updateProfile = async (data: { full_name?: string; username?: string; avatar_url?: string }) => {
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || "Profile update failed" };
      }
      setUser(resData.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during profile update" };
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/auth/storage/upload", {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || "Avatar upload failed" };
      }

      const fileUrl = resData.file?.url;
      if (!fileUrl) {
        return { success: false, error: "Missing avatar URL from response" };
      }

      // Automatically update profile with newly uploaded avatar URL
      const profileRes = await updateProfile({ avatar_url: fileUrl });
      if (!profileRes.success) {
        return { success: false, error: profileRes.error || "Failed to link uploaded avatar to profile" };
      }

      return { success: true, url: fileUrl };
    } catch {
      return { success: false, error: "Network error during avatar upload" };
    }
  };

  const setPassword = async (data: { current_password?: string; new_password: string }) => {
    try {
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || "Failed to update password" };
      }
      // Refresh user profile so has_password becomes true
      await refresh();
      return { success: true };
    } catch {
      return { success: false, error: "Network error during password update" };
    }
  };

  const unlinkOAuth = async (provider: string) => {
    try {
      const res = await fetch(`/api/auth/oauth/${provider}`, {
        method: "DELETE",
      });
      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || `Failed to disconnect ${provider}` };
      }
      // Refresh user profile
      await refresh();
      return { success: true };
    } catch {
      return { success: false, error: `Network error disconnecting ${provider}` };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        uploadAvatar,
        setPassword,
        unlinkOAuth,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
