import { cn } from "@/lib/utils";
import {
  Apple,
  ChartNoAxesColumnIncreasing,
  ClipboardPen,
  Link,
  LucideProps,
  Map,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function SelfHostItem(props: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  url: string;
  sr: string;
  leftClassName?: string;
  rightClassName?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "w-full px-5 py-3 gap-3 flex md:justify-start justify-center items-center",
          props.leftClassName
        )}
      >
        <props.icon className="size-5" />
        <p>{props.title}</p>
      </div>
      <a
        className={cn(
          "w-full px-5 py-3 bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex gap-3 items-center justify-center",
          props.rightClassName
        )}
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link className="size-5" />
        <span>Visit Site</span>
        <span className="sr-only">{props.sr}</span>
      </a>
    </>
  );
}

export function SelfHostedServices() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-md border border-border overflow-clip">
        <SelfHostItem
          icon={Apple}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="Project Arienne (WIP)"
          url="https://arienne.irvanma.eu.org"
          sr="Visit Project Arienne"
        />
        <SelfHostItem
          icon={ChartNoAxesColumnIncreasing}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="VPS Status Page"
          url="https://stats.irvanma.eu.org"
          sr="Visit VPS Status Page"
        />
        <SelfHostItem
          icon={ClipboardPen}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="Realmbin (Unfinished)"
          url="https://bin.irvanma.eu.org"
          sr="Visit Realmbin"
        />
        <SelfHostItem
          icon={Map}
          leftClassName="bg-muted/20 border-b md:border-b-0 md:border-r border-border"
          title="Minecraft Squaremap"
          url="https://mcmap.irvanma.eu.org"
          sr="Visit Minecraft Squaremap"
        />
      </div>
    </div>
  );
}
