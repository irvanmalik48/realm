"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CornerDownRight,
  Edit2,
  Trash2,
  Send,
  Loader2,
  LogIn,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

  if (diffInSeconds < 60) return "just now";
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string, username: string): string {
  if (name && name.trim().length > 0) {
    return name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return username.slice(0, 2).toUpperCase();
}

export function BlogComments({ slug }: { slug: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // New root comment state
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // Replying state (comment ID currently being replied to)
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Editing state (comment ID currently being edited)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // Deleting state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(slug)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
        setTotalCount(data.total_count || 0);
      }
    } catch {
      // Ignore network errors
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, user]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "You must be signed in to comment.",
      });
      return;
    }

    const trimmed = newCommentContent.trim();
    if (!trimmed) return;

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
        toast({
          title: "Comment posted",
          description: "Your comment has been added.",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Failed to post comment",
          description: err.error || "Could not post comment.",
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
    if (!trimmed) return;

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
              return { ...c, replies: [...c.replies, newReply] };
            }
            return c;
          }),
        );
        setTotalCount((prev) => prev + 1);
        setReplyContent("");
        setReplyingToId(null);
        toast({
          title: "Reply posted",
          description: "Your reply has been added.",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Failed to post reply",
          description: err.error || "Could not post reply.",
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
    if (!trimmed) return;

    setIsSubmittingEdit(true);
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(slug)}/${encodeURIComponent(commentId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });

      if (res.ok) {
        const updated = await res.json();
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === commentId) {
              return { ...c, content: updated.content, is_edited: true, updated_at: updated.updated_at };
            }
            return {
              ...c,
              replies: c.replies.map((r) =>
                r.id === commentId
                  ? { ...r, content: updated.content, is_edited: true, updated_at: updated.updated_at }
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

  const handleDeleteComment = async (commentId: string) => {
    setDeletingId(commentId);
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(slug)}/${encodeURIComponent(commentId)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments((prev) =>
          prev
            .filter((c) => c.id !== commentId)
            .map((c) => ({
              ...c,
              replies: c.replies.filter((r) => r.id !== commentId),
            })),
        );
        setTotalCount((prev) => Math.max(0, prev - 1));
        toast({
          title: "Comment deleted",
          description: "Your comment was removed.",
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
      setDeletingId(null);
    }
  };

  const userInitials = user
    ? getInitials(user.full_name, user.username)
    : "";

  return (
    <div className="w-full my-10 space-y-6 pt-6 border-t border-border/60">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2.5">
          <MessageSquare className="size-5 text-primary" />
          <span>Comments</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
            {totalCount}
          </span>
        </h3>
      </div>

      {/* Guest Login Banner */}
      {!user && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <LogIn className="size-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                Join the discussion
              </p>
              <p className="text-[11px] text-muted-foreground">
                Sign in to post comments and join conversation with the author and community.
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="text-xs shrink-0 cursor-pointer shadow-xs">
            <Link href="/login" className="flex items-center gap-1.5">
              <LogIn className="size-3.5" />
              <span>Sign In</span>
            </Link>
          </Button>
        </div>
      )}

      {/* Main Comment Input Box (for signed-in users) */}
      {user && (
        <form onSubmit={handlePostComment} className="p-4 rounded-xl border border-border/80 bg-muted/20 space-y-3 shadow-xs">
          <div className="flex items-start gap-3">
            <Avatar className="size-8 shrink-0 border border-border/60">
              {user.avatar_url ? <AvatarImage src={user.avatar_url} alt={user.full_name || user.username} /> : null}
              <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                placeholder="Write a thoughtful comment..."
                maxLength={2000}
                rows={3}
                className="w-full text-xs resize-y bg-background border-border/70 focus:border-primary placeholder:text-muted-foreground"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-muted-foreground font-mono">
                  {newCommentContent.length}/2000
                </span>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isPosting || !newCommentContent.trim()}
                  className="text-xs h-8 px-3 cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  {isPosting ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
                  <span>Comment</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="py-8 flex items-center justify-center">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && comments.length === 0 && (
        <div className="py-10 text-center rounded-xl border border-dashed border-border/60 bg-muted/10 space-y-2">
          <MessageSquare className="size-8 text-muted-foreground/40 mx-auto" />
          <p className="text-sm font-medium text-muted-foreground">No comments yet</p>
          <p className="text-xs text-muted-foreground/80">Be the first to share your thoughts!</p>
        </div>
      )}

      {/* Comments List */}
      {!isLoading && comments.length > 0 && (
        <div className="space-y-4">
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
              deletingId={deletingId}
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
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
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
  deletingId: string | null;
  onStartReply: (id: string) => void;
  onCancelReply: () => void;
  onReplyChange: (content: string) => void;
  onSubmitReply: (parentId: string) => void;
  onStartEdit: (id: string, currentContent: string) => void;
  onCancelEdit: () => void;
  onEditChange: (content: string) => void;
  onSubmitEdit: (id: string) => void;
  onDelete: (id: string) => void;
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
  deletingId,
  onStartReply,
  onCancelReply,
  onReplyChange,
  onSubmitReply,
  onStartEdit,
  onCancelEdit,
  onEditChange,
  onSubmitEdit,
  onDelete,
  isReply = false,
}: CommentCardProps) {
  const isEditing = editingId === comment.id;
  const isReplying = replyingToId === comment.id;
  const isDeleting = deletingId === comment.id;
  const initials = getInitials(comment.author.full_name, comment.author.username);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className={cn(
        "p-4 rounded-xl border border-border/70 bg-card/60 space-y-3 transition-colors",
        isReply ? "bg-muted/15 ml-4 sm:ml-8 border-l-2 border-l-primary/40" : "shadow-xs",
      )}
    >
      {/* Author Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className="size-7 shrink-0 border border-border/60">
            {comment.author.avatar_url ? (
              <AvatarImage src={comment.author.avatar_url} alt={comment.author.full_name || comment.author.username} />
            ) : null}
            <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            <span className="text-xs font-semibold text-foreground truncate">
              {comment.author.full_name || comment.author.username}
            </span>
            <span className="text-[11px] text-muted-foreground">
              @{comment.author.username}
            </span>
            <span className="text-[11px] text-muted-foreground/60">•</span>
            <span className="text-[11px] text-muted-foreground">
              {formatRelativeTime(comment.created_at)}
            </span>
            {comment.is_edited && (
              <span className="text-[10px] text-muted-foreground/70 font-mono">
                (edited)
              </span>
            )}
          </div>
        </div>

        {/* Action Controls for Comment Author */}
        {comment.is_author && !isEditing && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onStartEdit(comment.id, comment.content)}
              title="Edit comment"
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <Edit2 className="size-3.5" />
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              disabled={isDeleting}
              title="Delete comment"
              className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              {isDeleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* Content or Edit Form */}
      {isEditing ? (
        <div className="space-y-2 pt-1">
          <Textarea
            value={editContent}
            onChange={(e) => onEditChange(e.target.value)}
            maxLength={2000}
            rows={3}
            className="w-full text-xs bg-background border-border/70 focus:border-primary"
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancelEdit}
              className="text-xs h-7 px-2.5 cursor-pointer"
            >
              <X className="size-3 mr-1" />
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isSubmittingEdit || !editContent.trim()}
              onClick={() => onSubmitEdit(comment.id)}
              className="text-xs h-7 px-3 cursor-pointer shadow-xs flex items-center gap-1"
            >
              {isSubmittingEdit ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
              <span>Save</span>
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed">
          {comment.content}
        </p>
      )}

      {/* Reply Action */}
      {!isReply && currentUser && !isEditing && (
        <div className="pt-1 flex items-center gap-3">
          <button
            onClick={() => (isReplying ? onCancelReply() : onStartReply(comment.id))}
            className="text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <CornerDownRight className="size-3" />
            <span>{isReplying ? "Cancel" : "Reply"}</span>
          </button>
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
            <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-2">
              <Textarea
                value={replyContent}
                onChange={(e) => onReplyChange(e.target.value)}
                placeholder={`Replying to @${comment.author.username}...`}
                maxLength={2000}
                rows={2}
                className="w-full text-xs bg-background border-border/70 focus:border-primary"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-mono">
                  {replyContent.length}/2000
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
                    className="text-xs h-7 px-3 cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    {isSubmittingReply ? <Loader2 className="size-3 animate-spin" /> : <Send className="size-3" />}
                    <span>Reply</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3 pt-2">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              replyingToId={replyingToId}
              replyContent={replyContent}
              isSubmittingReply={isSubmittingReply}
              editingId={editingId}
              editContent={editContent}
              isSubmittingEdit={isSubmittingEdit}
              deletingId={deletingId}
              onStartReply={onStartReply}
              onCancelReply={onCancelReply}
              onReplyChange={onReplyChange}
              onSubmitReply={onSubmitReply}
              onStartEdit={onStartEdit}
              onCancelEdit={onCancelEdit}
              onEditChange={onEditChange}
              onSubmitEdit={onSubmitEdit}
              onDelete={onDelete}
              isReply={true}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
