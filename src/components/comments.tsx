"use client";

import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, ThumbsUp, ThumbsDown, Reply, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import md5 from "blueimp-md5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Comment = {
  id: string;
  name: string;
  email?: string;
  content: string;
  created: string;
  parent?: string;
  likes?: number;
  dislikes?: number;
  children?: Comment[];
};

export default function Comments({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", slug],
    queryFn: async () => {
      const records = await pb.collection("comments").getList<Comment>(1, 200, {
        filter: `slug = "${slug}"`,
        sort: "-created",
      });

      const items = records.items;
      const commentMap = new Map<string, Comment>();
      const rootComments: Comment[] = [];

      items.forEach((item) => {
        item.children = [];
        commentMap.set(item.id, item);
      });

      items.forEach((item) => {
        if (item.parent && commentMap.has(item.parent)) {
          commentMap.get(item.parent)!.children!.push(item);
        } else if (!item.parent) {
          rootComments.push(item);
        }
      });

      return rootComments;
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async () => {
      await pb.collection("comments").create({
        slug,
        name,
        email,
        content,
      });
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    createCommentMutation.mutate();
  };

  const isSubmitting = createCommentMutation.isPending;

  return (
    <div className="mt-16 w-full space-y-8">
      <h2 id="comments" className="text-2xl font-bold scroll-mt-24">
        Comments
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-muted/30 p-6 rounded-lg border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              required
              className="pl-9 bg-background"
            />
          </div>
          <div className="space-y-2 relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email (for Gravatar)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="pl-9 bg-background"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Textarea
            id="content"
            name="content"
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            required
            className="resize-none min-h-[100px] bg-background"
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post Comment"
          )}
        </Button>
      </form>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          <AnimatePresence mode="popLayout">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} slug={slug} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  slug,
  level = 0,
  isLast = true,
  hasFriend = false,
}: {
  comment: Comment;
  slug: string;
  level?: number;
  isLast?: boolean;
  hasFriend?: boolean;
}) {
  const queryClient = useQueryClient();
  const [replying, setReplying] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [localLikes, setLocalLikes] = useState(comment.likes || 0);
  const [localDislikes, setLocalDislikes] = useState(comment.dislikes || 0);
  const [userReaction, setUserReaction] = useState<"likes" | "dislikes" | null>(
    null,
  );

  useEffect(() => {
    const stored = localStorage.getItem(`comment_reaction_${comment.id}`);
    if (stored === "likes" || stored === "dislikes") {
      setUserReaction(stored);
    }
  }, [comment.id]);

  const replyMutation = useMutation({
    mutationFn: async () => {
      await pb.collection("comments").create({
        slug,
        name,
        email,
        content,
        parent: comment.id,
      });
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setContent("");
      setReplying(false);
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
    },
  });

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    replyMutation.mutate();
  };

  const smartReactionMutation = useMutation({
    mutationFn: async (vars: {
      type: "likes" | "dislikes";
      isSame: boolean;
      prevReaction: string | null;
    }) => {
      const { type, isSame, prevReaction } = vars;
      const current = await pb
        .collection("comments")
        .getOne<Comment>(comment.id);

      let newLikes = current.likes || 0;
      let newDislikes = current.dislikes || 0;

      if (isSame) {
        if (type === "likes") newLikes = Math.max(0, newLikes - 1);
        else newDislikes = Math.max(0, newDislikes - 1);
      } else {
        if (prevReaction === "likes") newLikes = Math.max(0, newLikes - 1);
        else if (prevReaction === "dislikes")
          newDislikes = Math.max(0, newDislikes - 1);

        if (type === "likes") newLikes++;
        else newDislikes++;
      }

      await pb.collection("comments").update(comment.id, {
        likes: newLikes,
        dislikes: newDislikes,
      });
    },
  });

  const handleReactionClick = (type: "likes" | "dislikes") => {
    const prevReaction = userReaction;
    const isSame = prevReaction === type;

    let newLikes = localLikes;
    let newDislikes = localDislikes;

    if (isSame) {
      if (type === "likes") newLikes = Math.max(0, newLikes - 1);
      else newDislikes = Math.max(0, newDislikes - 1);
      setUserReaction(null);
      localStorage.removeItem(`comment_reaction_${comment.id}`);
    } else {
      if (prevReaction === "likes") newLikes = Math.max(0, newLikes - 1);
      else if (prevReaction === "dislikes")
        newDislikes = Math.max(0, newDislikes - 1);
      if (type === "likes") newLikes++;
      else newDislikes++;
      setUserReaction(type);
      localStorage.setItem(`comment_reaction_${comment.id}`, type);
    }
    setLocalLikes(newLikes);
    setLocalDislikes(newDislikes);

    smartReactionMutation.mutate({ type, isSame, prevReaction });
  };

  const gravatarUrl = comment.email
    ? `https://www.gravatar.com/avatar/${md5(comment.email.trim().toLowerCase())}?d=mp`
    : undefined;

  const hasChildren = comment.children && comment.children.length > 0;
  const hasParent = level > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn("relative group w-full", level > 0 && "-mt-px")}
    >
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "bg-background w-full relative z-10 border rounded-md overflow-clip",
            hasChildren && "rounded-br-none",
            hasParent && "rounded-t-none",
            hasFriend && !isLast && "rounded-b-none border-b-0",
          )}
        >
          <div className="bg-muted/40 border-b px-3 py-2 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border shrink-0">
                <AvatarImage src={gravatarUrl} alt={comment.name} />
                <AvatarFallback>
                  {comment.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-foreground">
                    {comment.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    commented on{" "}
                    {new Date(comment.created).toLocaleDateString()}
                  </span>
                </div>
                {comment.email && (
                  <span className="text-xs text-muted-foreground/80">
                    {comment.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 overflow-hidden">
            <p className="text-sm leading-relaxed whitespace-pre-wrap flex-wrap-reverse break-words">
              {comment.content}
            </p>
          </div>

          <div
            className={cn(
              "px-3 py-2 border-t flex items-center gap-4 bg-muted/10",
              !hasChildren && "rounded-b-md",
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-auto p-0 hover:bg-transparent hover:text-primary gap-1.5 text-muted-foreground",
                userReaction === "likes" && "text-primary font-medium",
              )}
              onClick={() => handleReactionClick("likes")}
            >
              <ThumbsUp
                className={cn(
                  "w-3.5 h-3.5",
                  userReaction === "likes" && "fill-current",
                )}
              />
              <span className="text-xs">{localLikes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-auto p-0 hover:bg-transparent hover:text-primary gap-1.5 text-muted-foreground",
                userReaction === "dislikes" && "text-destructive font-medium",
              )}
              onClick={() => handleReactionClick("dislikes")}
            >
              <ThumbsDown
                className={cn(
                  "w-3.5 h-3.5",
                  userReaction === "dislikes" && "fill-current",
                )}
              />
              <span className="text-xs">{localDislikes}</span>
            </Button>

            {level < 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent hover:text-primary gap-1.5 text-muted-foreground ml-auto"
                onClick={() => setReplying(!replying)}
              >
                <Reply className="w-3.5 h-3.5" />
                <span className="text-xs">Reply</span>
              </Button>
            )}
          </div>

          <AnimatePresence>
            {replying && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleReply}
                className="px-4 border-t border-border overflow-hidden"
              >
                <div className="py-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`name-${comment.id}`}
                        name="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={replyMutation.isPending}
                        required
                        className="pl-9 h-9"
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`email-${comment.id}`}
                        name="email"
                        type="email"
                        placeholder="Email (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={replyMutation.isPending}
                        className="pl-9 h-9"
                      />
                    </div>
                  </div>
                  <Textarea
                    id={`content-${comment.id}`}
                    name="content"
                    placeholder="Write a reply..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={replyMutation.isPending}
                    required
                    className="resize-none h-20"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      size="sm"
                      disabled={replyMutation.isPending}
                    >
                      {replyMutation.isPending ? "Replying..." : "Post Reply"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setReplying(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {hasChildren && (
          <div className="pl-4 relative z-0">
            {comment.children!.map((child, index) => (
              <CommentItem
                key={child.id}
                comment={child}
                slug={slug}
                level={level + 1}
                isLast={index === comment.children!.length - 1}
                hasFriend={comment.children!.length > 1}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
