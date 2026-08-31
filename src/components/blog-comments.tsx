"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CornerDownRight,
  Pencil,
  Trash2,
  Send,
  Loader2,
  LogIn,
  Check,
  X,
  MoreHorizontal,
  Copy,
  RotateCw,
  Bold,
  Italic,
  Code,
  Quote,
  Link2,
  Share2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CommentAuthor {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string | null;
}

interface CommentItem {
  id: string;
  post_slug: string;
  parent_id?: string | null;
  content: string;
  is_edited: boolean;
  is_author: boolean;
  author: CommentAuthor;
  replies: CommentItem[];
  created_at: string;
  updated_at: string;
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 30) return "just now";
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string, username: string): string {
  if (name && name.trim().length > 0) {
    return name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return (username || "U").slice(0, 2).toUpperCase();
}

/** Helper to insert markdown formatting markers into active textarea */
function insertFormatting(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  currentValue: string,
  setValue: (val: string) => void,
  prefix: string,
  suffix = "",
  placeholder = "text",
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = currentValue.substring(start, end) || placeholder;
  const replacement = `${prefix}${selected}${suffix}`;
  const nextValue =
    currentValue.substring(0, start) + replacement + currentValue.substring(end);

  setValue(nextValue);

  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(
      start + prefix.length,
      start + prefix.length + selected.length,
    );
  }, 0);
}

/** Custom Markdown inline and block formatter for rich readability */
function CommentBody({ content }: { content: string }) {
  const blocks = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="text-[13px] leading-relaxed text-foreground/90 flex flex-col gap-2.5 break-words">
      {blocks.map((block, idx) => {
        if (block.startsWith("```") && block.endsWith("```")) {
          const match = block.match(/```(\w*)\n?([\s\S]*?)```/);
          const lang = match ? match[1] : "";
          const code = match ? match[2].replace(/\n$/, "") : block.slice(3, -3);

          return (
            <div
              key={idx}
              className="relative my-1 rounded-lg bg-muted/60 border border-border/80 p-3 font-mono text-xs overflow-x-auto group"
            >
              {lang && (
                <div className="absolute top-2 right-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70 bg-background/80 px-1.5 py-0.5 rounded border border-border/40">
                  {lang}
                </div>
              )}
              <pre className="text-foreground leading-normal selection:bg-primary/20">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        const lines = block.split("\n");
        return (
          <React.Fragment key={idx}>
            {lines.map((line, lineIdx) => {
              if (!line.trim() && lines.length > 1) {
                return <div key={lineIdx} className="h-1" />;
              }

              if (line.startsWith("> ")) {
                return (
                  <blockquote
                    key={lineIdx}
                    className="border-l-2 border-primary/60 pl-3.5 py-0.5 italic text-muted-foreground bg-muted/20 rounded-r-md"
                  >
                    {renderFormattedInline(line.slice(2))}
                  </blockquote>
                );
              }

              return (
                <p key={lineIdx} className="whitespace-pre-wrap">
                  {renderFormattedInline(line)}
                </p>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function renderFormattedInline(text: string): React.ReactNode {
  const tokens = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens.map((token, i) => {
    if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-muted/80 font-mono text-xs text-foreground border border-border/70 font-normal"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
      return (
        <em key={i} className="italic text-foreground/90">
          {token.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return token;
  });
}

export function BlogComments({ slug }: { slug: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // New comment composer state
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isComposerFocused, setIsComposerFocused] = useState(false);
  const mainTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Replying state
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // Deleting state & dialog
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchComments = useCallback(
    async (showRefreshing = false) => {
      if (showRefreshing) setIsRefreshing(true);
      try {
        const res = await fetch(`/api/comments/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
          setTotalCount(data.total_count || 0);
        }
      } catch {
        // Silently handle background errors
      } finally {
        setIsLoading(false);
        if (showRefreshing) setIsRefreshing(false);
      }
    },
    [slug],
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments, user]);

  const handlePostComment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "You must be signed in to post a comment.",
      });
      return;
    }

    const trimmed = newCommentContent.trim();
    if (!trimmed || isPosting) return;

    setIsPosting(true);
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [...prev, newComment]);
        setTotalCount((prev) => prev + 1);
        setNewCommentContent("");
        setIsComposerFocused(false);
        toast({
          title: "Comment published",
          description: "Your comment is now live.",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Failed to post comment",
          description: err.error || "Could not publish your comment.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Failed to connect to comment service.",
      });
    } finally {
      setIsPosting(false);
    }
  };

  const handlePostReply = async (parentId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "You must be signed in to reply.",
      });
      return;
    }

    const trimmed = replyContent.trim();
    if (!trimmed || isSubmittingReply) return;

    setIsSubmittingReply(true);
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed, parent_id: parentId }),
      });

      if (res.ok) {
        const newReply = await res.json();
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === parentId) {
              return { ...c, replies: [...(c.replies || []), newReply] };
            }
            return c;
          }),
        );
        setTotalCount((prev) => prev + 1);
        setReplyContent("");
        setReplyingToId(null);
        toast({
          title: "Reply posted",
          description: "Your reply has been added to the thread.",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Failed to post reply",
          description: err.error || "Could not publish your reply.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Failed to connect to comment service.",
      });
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    const trimmed = editContent.trim();
    if (!trimmed || isSubmittingEdit) return;

    setIsSubmittingEdit(true);
    try {
      const res = await fetch(
        `/api/comments/${encodeURIComponent(slug)}/${encodeURIComponent(commentId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: trimmed }),
        },
      );

      if (res.ok) {
        const updated = await res.json();
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === commentId) {
              return {
                ...c,
                content: updated.content,
                is_edited: true,
                updated_at: updated.updated_at,
              };
            }
            return {
              ...c,
              replies: (c.replies || []).map((r) =>
                r.id === commentId
                  ? {
                      ...r,
                      content: updated.content,
                      is_edited: true,
                      updated_at: updated.updated_at,
                    }
                  : r,
              ),
            };
          }),
        );
        setEditingId(null);
        setEditContent("");
        toast({
          title: "Comment updated",
          description: "Your edits have been saved.",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Update failed",
          description: err.error || "Could not update comment.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Failed to connect to comment service.",
      });
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/comments/${encodeURIComponent(slug)}/${encodeURIComponent(deleteTargetId)}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        setComments((prev) =>
          prev
            .filter((c) => c.id !== deleteTargetId)
            .map((c) => ({
              ...c,
              replies: (c.replies || []).filter((r) => r.id !== deleteTargetId),
            })),
        );
        setTotalCount((prev) => Math.max(0, prev - 1));
        toast({
          title: "Comment deleted",
          description: "The comment has been removed.",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Delete failed",
          description: err.error || "Could not delete comment.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Failed to connect to comment service.",
      });
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const userInitials = user ? getInitials(user.full_name, user.username) : "";

  return (
    <TooltipProvider>
      <section
        id="comments"
        aria-label="Discussion and Comments"
        className="w-full my-12 pt-8 border-t border-border/80 flex flex-col gap-6"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-xs">
              <MessageSquare className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Discussion
                </h3>
                <Badge
                  variant="secondary"
                  className="font-mono text-xs font-semibold px-2.5 py-0.5 border border-border"
                >
                  {totalCount}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Join the conversation, ask questions, or share thoughts.
              </p>
            </div>
          </div>

          {/* Refresh button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => fetchComments(true)}
                disabled={isLoading || isRefreshing}
                className="text-muted-foreground hover:text-foreground cursor-pointer rounded-lg"
              >
                <RotateCw
                  className={cn("size-4", isRefreshing && "animate-spin text-primary")}
                />
                <span className="sr-only">Refresh comments</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Refresh discussion</TooltipContent>
          </Tooltip>
        </div>

        {/* Guest Sign-in Card */}
        {!user && (
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 via-muted/30 to-background p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="size-10 rounded-xl bg-primary/15 text-primary border border-primary/30 flex items-center justify-center shrink-0">
                  <Sparkles className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    Have something to share?
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                    Sign in to participate in the conversation, leave replies, and connect
                    with readers.
                  </p>
                </div>
              </div>

              <Button
                asChild
                size="sm"
                className="font-medium text-xs shadow-xs shrink-0 cursor-pointer h-9 px-4"
              >
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn data-icon="inline-start" />
                  <span>Sign in to comment</span>
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Comment Composer for Signed-in Users */}
        {user && (
          <form
            onSubmit={handlePostComment}
            className={cn(
              "rounded-2xl border bg-card/60 backdrop-blur-xs transition-all duration-200 shadow-xs flex flex-col p-4 sm:p-5 gap-3.5",
              isComposerFocused
                ? "border-primary/50 ring-2 ring-primary/15 shadow-sm"
                : "border-border/80 hover:border-border",
            )}
          >
            {/* Author Header & Formatting Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="size-8 shrink-0 ring-1 ring-border/80">
                  {user.avatar_url ? (
                    <AvatarImage
                      src={user.avatar_url}
                      alt={user.full_name || user.username}
                    />
                  ) : null}
                  <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-foreground truncate">
                    {user.full_name || user.username}
                  </span>
                  <span className="text-[11px] text-muted-foreground truncate">
                    @{user.username}
                  </span>
                </div>
              </div>

              {/* Formatting Helper Icons */}
              <div className="flex items-center gap-0.5 text-muted-foreground">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          mainTextareaRef,
                          newCommentContent,
                          setNewCommentContent,
                          "**",
                          "**",
                          "bold text",
                        )
                      }
                      className="p-1.5 rounded-md hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Bold className="size-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Bold (**text**)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          mainTextareaRef,
                          newCommentContent,
                          setNewCommentContent,
                          "*",
                          "*",
                          "italic text",
                        )
                      }
                      className="p-1.5 rounded-md hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Italic className="size-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Italic (*text*)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          mainTextareaRef,
                          newCommentContent,
                          setNewCommentContent,
                          "`",
                          "`",
                          "code",
                        )
                      }
                      className="p-1.5 rounded-md hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Code className="size-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Inline Code (`code`)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          mainTextareaRef,
                          newCommentContent,
                          setNewCommentContent,
                          "> ",
                          "",
                          "quote",
                        )
                      }
                      className="p-1.5 rounded-md hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Quote className="size-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Quote (&gt; quote)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          mainTextareaRef,
                          newCommentContent,
                          setNewCommentContent,
                          "[",
                          "](url)",
                          "link title",
                        )
                      }
                      className="p-1.5 rounded-md hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Link2 className="size-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Link ([title](url))</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Input area */}
            <Textarea
              ref={mainTextareaRef}
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              onFocus={() => setIsComposerFocused(true)}
              onBlur={() => setIsComposerFocused(false)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  handlePostComment();
                }
              }}
              placeholder="What are your thoughts on this? Markdown supported..."
              maxLength={2000}
              rows={3}
              className="w-full text-xs sm:text-sm bg-transparent border-0 p-1 resize-y shadow-none focus-visible:ring-0 focus-visible:border-0 placeholder:text-muted-foreground/70"
            />

            {/* Bottom Bar: Keyboard hint, char count, submit */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-[11px] font-mono",
                    newCommentContent.length > 1800
                      ? "text-amber-500 font-semibold"
                      : "text-muted-foreground",
                  )}
                >
                  {newCommentContent.length} / 2000
                </span>
                <span className="hidden sm:inline-flex items-center text-[10px] text-muted-foreground/60 font-mono bg-muted/60 px-1.5 py-0.5 rounded border border-border/40">
                  ⌘ + Enter to post
                </span>
              </div>

              <div className="flex items-center gap-2">
                {newCommentContent.trim() && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewCommentContent("")}
                    className="text-xs h-8 px-2.5 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    Clear
                  </Button>
                )}
                <Button
                  type="submit"
                  size="sm"
                  disabled={isPosting || !newCommentContent.trim()}
                  className="text-xs h-8 px-3.5 font-medium cursor-pointer shadow-xs"
                >
                  {isPosting ? (
                    <Loader2 data-icon="inline-start" className="animate-spin" />
                  ) : (
                    <Send data-icon="inline-start" />
                  )}
                  <span>Post comment</span>
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="size-6 animate-spin text-primary" />
            <span className="text-xs font-medium">Loading discussion...</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && comments.length === 0 && (
          <div className="py-14 px-6 text-center rounded-2xl border border-dashed border-border/80 bg-muted/10 flex flex-col items-center justify-center gap-3">
            <div className="size-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground/50 border border-border/60">
              <MessageSquare className="size-6" />
            </div>
            <div className="flex flex-col gap-1 max-w-sm">
              <p className="text-sm font-semibold text-foreground">No comments yet</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Be the first to share your thoughts, ask questions, or provide feedback on
                this post.
              </p>
            </div>
          </div>
        )}

        {/* Comments Thread List */}
        {!isLoading && comments.length > 0 && (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                currentUser={user}
                replyingToId={replyingToId}
                replyContent={replyContent}
                isSubmittingReply={isSubmittingReply}
                editingId={editingId}
                editContent={editContent}
                isSubmittingEdit={isSubmittingEdit}
                onStartReply={(id) => {
                  setReplyingToId(id);
                  setReplyContent("");
                }}
                onCancelReply={() => {
                  setReplyingToId(null);
                  setReplyContent("");
                }}
                onReplyChange={setReplyContent}
                onSubmitReply={handlePostReply}
                onStartEdit={(id, currentContent) => {
                  setEditingId(id);
                  setEditContent(currentContent);
                }}
                onCancelEdit={() => {
                  setEditingId(null);
                  setEditContent("");
                }}
                onEditChange={setEditContent}
                onSubmitEdit={handleUpdateComment}
                onRequestDelete={(id) => setDeleteTargetId(id)}
              />
            ))}
          </div>
        )}

        {/* Confirmation Dialog for Deletion */}
        <AlertDialog
          open={!!deleteTargetId}
          onOpenChange={(open) => !open && setDeleteTargetId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete comment?</AlertDialogTitle>
              <AlertDialogDescription>
                This comment will be permanently removed. If this comment has replies,
                they may be affected. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  handleConfirmDelete();
                }}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                ) : (
                  <Trash2 data-icon="inline-start" />
                )}
                <span>Delete</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </TooltipProvider>
  );
}

interface CommentCardProps {
  comment: CommentItem;
  currentUser: any;
  replyingToId: string | null;
  replyContent: string;
  isSubmittingReply: boolean;
  editingId: string | null;
  editContent: string;
  isSubmittingEdit: boolean;
  onStartReply: (id: string) => void;
  onCancelReply: () => void;
  onReplyChange: (content: string) => void;
  onSubmitReply: (parentId: string) => void;
  onStartEdit: (id: string, currentContent: string) => void;
  onCancelEdit: () => void;
  onEditChange: (content: string) => void;
  onSubmitEdit: (id: string) => void;
  onRequestDelete: (id: string) => void;
  isReply?: boolean;
}

function CommentCard({
  comment,
  currentUser,
  replyingToId,
  replyContent,
  isSubmittingReply,
  editingId,
  editContent,
  isSubmittingEdit,
  onStartReply,
  onCancelReply,
  onReplyChange,
  onSubmitReply,
  onStartEdit,
  onCancelEdit,
  onEditChange,
  onSubmitEdit,
  onRequestDelete,
  isReply = false,
}: CommentCardProps) {
  const [copied, setCopied] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  const isEditing = editingId === comment.id;
  const isReplying = replyingToId === comment.id;
  const initials = getInitials(comment.author.full_name, comment.author.username);
  const replyCount = comment.replies?.length || 0;

  const handleCopyComment = () => {
    navigator.clipboard.writeText(comment.content);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Comment text copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#comment-${comment.id}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Link to this comment has been copied to clipboard.",
    });
  };

  return (
    <motion.article
      id={`comment-${comment.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative rounded-2xl transition-all duration-200 flex flex-col gap-3",
        isReply
          ? "p-3.5 sm:p-4 bg-muted/25 border border-border/60 hover:border-border"
          : "p-4 sm:p-5 bg-card/60 border border-border/70 hover:border-border shadow-xs",
      )}
    >
      {/* Author Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className={cn(isReply ? "size-7" : "size-8", "shrink-0 ring-1 ring-border/70")}>
            {comment.author.avatar_url ? (
              <AvatarImage
                src={comment.author.avatar_url}
                alt={comment.author.full_name || comment.author.username}
              />
            ) : null}
            <AvatarFallback className="text-[11px] font-bold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
              {comment.author.full_name || comment.author.username}
            </span>

            <span className="text-xs text-muted-foreground truncate">
              @{comment.author.username}
            </span>

            <span className="text-xs text-muted-foreground/40">•</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <time
                  dateTime={comment.created_at}
                  className="text-xs text-muted-foreground hover:text-foreground cursor-help transition-colors"
                >
                  {formatRelativeTime(comment.created_at)}
                </time>
              </TooltipTrigger>
              <TooltipContent side="top">
                {formatFullDate(comment.created_at)}
              </TooltipContent>
            </Tooltip>

            {comment.is_edited && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[11px] text-muted-foreground/60 italic cursor-help">
                    (edited)
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Edited: {formatFullDate(comment.updated_at)}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Options Dropdown Menu */}
        <div className="flex items-center gap-1 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-7 text-muted-foreground hover:text-foreground opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
              >
                <MoreHorizontal className="size-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleCopyComment} className="cursor-pointer">
                  <Copy className="size-3.5 mr-2" />
                  <span>Copy text</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShareLink} className="cursor-pointer">
                  <Share2 className="size-3.5 mr-2" />
                  <span>Copy link</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              {comment.is_author && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => onStartEdit(comment.id, comment.content)}
                      className="cursor-pointer"
                    >
                      <Pencil className="size-3.5 mr-2" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onRequestDelete(comment.id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="size-3.5 mr-2" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Comment Body / In-place Editor */}
      {isEditing ? (
        <div className="flex flex-col gap-2.5 pt-1">
          <Textarea
            ref={editTextareaRef}
            value={editContent}
            onChange={(e) => onEditChange(e.target.value)}
            maxLength={2000}
            rows={3}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                onSubmitEdit(comment.id);
              }
              if (e.key === "Escape") {
                e.preventDefault();
                onCancelEdit();
              }
            }}
            className="w-full text-xs sm:text-sm bg-background border-border/80 focus:border-primary resize-y"
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-muted-foreground">
              {editContent.length} / 2000
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancelEdit}
                className="text-xs h-7 px-2.5 cursor-pointer"
              >
                <X data-icon="inline-start" />
                <span>Cancel</span>
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={isSubmittingEdit || !editContent.trim()}
                onClick={() => onSubmitEdit(comment.id)}
                className="text-xs h-7 px-3 cursor-pointer shadow-xs"
              >
                {isSubmittingEdit ? (
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                ) : (
                  <Check data-icon="inline-start" />
                )}
                <span>Save</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <CommentBody content={comment.content} />
      )}

      {/* Action Footer: Reply & Collapse Toggle */}
      {!isEditing && (
        <div className="flex items-center justify-between pt-1 gap-2">
          <div className="flex items-center gap-2">
            {!isReply && currentUser && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => (isReplying ? onCancelReply() : onStartReply(comment.id))}
                className={cn(
                  "h-7 px-2.5 text-xs font-medium cursor-pointer transition-colors",
                  isReplying
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70",
                )}
              >
                <CornerDownRight data-icon="inline-start" />
                <span>{isReplying ? "Cancel" : "Reply"}</span>
              </Button>
            )}

            {!isReply && !currentUser && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/70 cursor-pointer"
              >
                <Link href="/login">
                  <CornerDownRight data-icon="inline-start" />
                  <span>Reply</span>
                </Link>
              </Button>
            )}

            {/* Copy button shortcut */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleCopyComment}
                  className="p-1 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Copy text</TooltipContent>
            </Tooltip>
          </div>

          {/* Toggle Nested Replies */}
          {!isReply && replyCount > 0 && (
            <button
              type="button"
              onClick={() => setShowReplies(!showReplies)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium"
            >
              <span>
                {showReplies ? "Hide" : "Show"} {replyCount}{" "}
                {replyCount === 1 ? "reply" : "replies"}
              </span>
              {showReplies ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Inline Reply Composer */}
      <AnimatePresence>
        {isReplying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 overflow-hidden"
          >
            <div className="rounded-xl border border-primary/40 bg-muted/30 p-3.5 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  Replying to @{comment.author.username}
                </span>
                <button
                  type="button"
                  onClick={onCancelReply}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <Textarea
                ref={replyTextareaRef}
                value={replyContent}
                onChange={(e) => onReplyChange(e.target.value)}
                placeholder={`Write your reply to @${comment.author.username}...`}
                maxLength={2000}
                rows={2}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    onSubmitReply(comment.id);
                  }
                  if (e.key === "Escape") {
                    e.preventDefault();
                    onCancelReply();
                  }
                }}
                className="w-full text-xs bg-background border-border/80 focus:border-primary resize-y"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-muted-foreground">
                  {replyContent.length} / 2000
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onCancelReply}
                    className="text-xs h-7 px-2.5 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    disabled={isSubmittingReply || !replyContent.trim()}
                    onClick={() => onSubmitReply(comment.id)}
                    className="text-xs h-7 px-3 font-medium cursor-pointer shadow-xs"
                  >
                    {isSubmittingReply ? (
                      <Loader2 data-icon="inline-start" className="animate-spin" />
                    ) : (
                      <Send data-icon="inline-start" />
                    )}
                    <span>Reply</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nested Replies with Threading Tree Line */}
      {!isReply && replyCount > 0 && showReplies && (
        <div className="relative ml-2 sm:ml-4 pl-3.5 sm:pl-5 pt-2 flex flex-col gap-3 before:absolute before:left-0 before:top-0 before:bottom-3 before:w-[2px] before:bg-border/70 before:rounded-full">
          {comment.replies.map((reply) => (
            <div
              key={reply.id}
              className="relative before:absolute before:-left-3.5 sm:before:-left-5 before:top-4 before:w-3.5 sm:before:w-5 before:h-3 before:border-b-2 before:border-l-2 before:border-border/70 before:rounded-bl-lg"
            >
              <CommentCard
                comment={reply}
                currentUser={currentUser}
                replyingToId={replyingToId}
                replyContent={replyContent}
                isSubmittingReply={isSubmittingReply}
                editingId={editingId}
                editContent={editContent}
                isSubmittingEdit={isSubmittingEdit}
                onStartReply={onStartReply}
                onCancelReply={onCancelReply}
                onReplyChange={onReplyChange}
                onSubmitReply={onSubmitReply}
                onStartEdit={onStartEdit}
                onCancelEdit={onCancelEdit}
                onEditChange={onEditChange}
                onSubmitEdit={onSubmitEdit}
                onRequestDelete={onRequestDelete}
                isReply={true}
              />
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
}
