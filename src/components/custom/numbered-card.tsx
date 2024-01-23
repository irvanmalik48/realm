import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export default function NumberedCard({
  number,
  title,
  description,
  content,
}: {
  number: number;
  title: string;
  description: string;
  content: string;
}) {
  return (
    <div className="flex overflow-hidden gap-5 relative">
      <div className={cn("relative mt-5 h-10")}>
        <div
          className={cn(
            "h-[1px] w-[100px] absolute top-1/2",
            "-translate-y-1/2 bg-border"
          )}
        />
        <div
          className={cn(
            "relative flex items-center justify-center",
            "w-10 h-10 rounded-full border border-border",
            "font-bold bg-card text-card-foreground text-sm"
          )}
        >
          {number}
        </div>
      </div>
      <Card className="relative flex-1">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="italic">{content}</CardContent>
      </Card>
    </div>
  );
}
