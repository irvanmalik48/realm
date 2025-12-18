import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
  noPadding = false,
}: {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}) {
  return (
    <main
      className={cn(
        "w-full max-w-3xl mx-auto flex flex-col gap-5",
        noPadding ? "py-5" : "p-5",
        className,
      )}
    >
      {children}
    </main>
  );
}
