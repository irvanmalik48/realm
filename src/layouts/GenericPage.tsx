import { ScrollArea } from "@/components/ui/scroll-area";
import type { GenericPageProps } from "@/types/layouts";

export default function GenericPageLayout({ children }: GenericPageProps) {
  return (
    <ScrollArea className="h-screen w-full flex flex-col">
      <div className="w-full max-w-3xl mx-auto mt-24 px-5">{children}</div>
    </ScrollArea>
  );
}
