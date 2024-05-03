import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function ShadcnProse({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert",
        "prose-heading:scroll-m-20 prose-headings:tracking-tight",
        "prose-h1:text-4xl prose-h1:font-bold lg:prose-h1:text-5xl",
        "prose-h2:border-b prose-h2:pb-2 prose-h2:text-3xl prose-h2:font-semibold prose-h2:first:mt-0",
        "prose-h3:text-2xl prose-h3:font-semibold",
        "prose-h4:text-xl prose-h4:font-semibold",
        "prose-h5:text-lg prose-h5:font-semibold",
        "prose-p:leading-7 prose-p:[&:not(:first-child)]:mt-6",
        "prose-blockquote:mt-6 prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:italic",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-ul:my-2 prose-ul:ml-2 prose-ul:[&>li]:mt-2",
        "prose-ol:my-6 prose-ol:ml-6 prose-ol:[&>li]:mt-2",
        "prose-pre:rounded-[var(--radius)] prose-pre:border prose-pre:border-border",
        "prose-lead:text-xl prose-lead:text-muted-foreground",
        "prose-inline-code:break-words prose-inline-code:relative prose-inline-code:rounded prose-inline-code:bg-muted prose-inline-code:px-[0.3rem] prose-inline-code:py-[0.2rem] prose-inline-code:font-mono prose-inline-code:text-sm prose-inline-code:font-semibold",
        "prose-a:underline prose-a:break-words",
        "prose-img:rounded-[var(--radius)] prose-img:border prose-img:border-border prose-img:my-6 prose-img:w-full"
      )}
    >
      {children}
    </div>
  );
}
