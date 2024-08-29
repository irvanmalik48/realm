import { cn } from "@/lib/utils";
import { ResizablePanel } from "./ui/resizable";

export default function RootContainer({
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ResizablePanel
      defaultSize={75}
      minSize={50}
      className={cn("min-h-screen flex flex-col", "relative z-0")}
    >
      {children}
    </ResizablePanel>
  );
}
