import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "w-full max-w-3xl mx-auto p-5 flex flex-col gap-5",
        className,
      )}
    >
      {children}
    </main>
  );
}
