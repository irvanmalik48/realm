import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";
import { Link } from "next-view-transitions";

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl mx-auto p-5 gap-3 flex flex-col justify-center items-center min-h-[72vh]">
      <h2 className="text-7xl font-bold dark:font-semibold">404</h2>
      <p>There&apos;s literally nothing but homepage</p>
      <Button
        variant="outline"
        className="transition-colors flex gap-3 items-center"
        asChild
      >
        <Link href="/">
          <Undo className="size-5" />
          <span>Return to Homepage</span>
        </Link>
      </Button>
    </div>
  );
}
