import { env } from "@/env";
import { cn } from "@/lib/utils";
import {
  FileCode2,
  Film,
  GitFork,
  HardDrive,
  Link,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function SelfHostItem(props: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  url: string;
  sr: string;
  badge?: string;
  isLast?: boolean;
}) {
  return (
    <>
      <div
        className={cn(
          "w-full px-5 py-3 gap-3 flex md:justify-start justify-center items-center bg-muted/20 md:border-r border-b border-border",
          props.isLast && "md:border-b-0",
        )}
      >
        <props.icon className="size-5 text-muted-foreground" />
        <span className="font-medium text-sm text-foreground">{props.title}</span>
        {props.badge && (
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">
            {props.badge}
          </span>
        )}
      </div>
      <a
        className={cn(
          "w-full px-5 py-3 bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex gap-2 items-center justify-center border-b border-border text-sm font-medium",
          props.isLast && "border-b-0",
        )}
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link className="size-4" />
        <span>Visit Site</span>
        <span className="sr-only">{props.sr}</span>
      </a>
    </>
  );
}

const selfHostItems = [
  {
    icon: FileCode2,
    title: "Rustbin",
    url: "https://bin.irvanma.eu.org",
    sr: "Visit Rustbin",
  },
  {
    icon: Film,
    title: "Jellyfin",
    url: "https://fin.irvanma.eu.org",
    sr: "Visit Jellyfin",
  },
  {
    icon: GitFork,
    title: "Forgejo",
    url: "https://git.irvanma.eu.org",
    sr: "Visit Forgejo",
  },
  {
    icon: HardDrive,
    title: "Stash",
    url: "https://stash.irvanma.eu.org",
    badge: "TBD",
    sr: "Visit Stash",
  },
];

export function SelfHostedServices() {
  const isVpsActive = env.NEXT_PUBLIC_VPS_ACTIVE !== "false";

  if (!isVpsActive) {
    return (
      <div className="p-5 text-muted-foreground text-sm font-mono text-center">
        I need to renew my VPS plan, smh
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-md border border-border overflow-clip">
        {selfHostItems.map((item, index) => (
          <SelfHostItem
            {...item}
            key={item.url}
            isLast={index === selfHostItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
