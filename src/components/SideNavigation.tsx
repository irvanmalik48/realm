import { cn } from "@/lib/utils";
import type {
  SideNavigationLinksProps,
  SideNavigationProps,
} from "@/types/components";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { navLinks } from "@/constants/sidenav";

export function SideNavigationLink({
  Icon,
  currentPath,
  href,
  label,
  disabled,
  order = "default",
}: SideNavigationLinksProps) {
  const linkId = `nav${href.replace(/\/|#/g, "-")}`;

  return (
    <div
      className={cn(
        "flex items-center justify-start",
        "transition-all rounded-xl",
        "group hover:bg-secondary duration-300",
        "border border-border hover:rounded-3xl",
        currentPath === href && "bg-secondary/50",
        {
          "pointer-events-none cursor-not-allowed": disabled,
          "opacity-40 border-transparent": disabled,
          "mt-auto": order === "last",
        }
      )}
    >
      <Link className={cn("block relative z-0 p-3")} href={href} id={linkId}>
        <Icon size={22} />
      </Link>
      <div
        className={cn(
          "absolute opacity-0 bg-secondary/50",
          "text-sm px-4 py-2 font-medium",
          "group-hover:opacity-100",
          "transition origin-left duration-200",
          "pointer-events-none rounded-full",
          "group-hover:translate-x-[4.5rem]",
          "scale-0 group-hover:scale-100",
          "w-fit whitespace-nowrap backdrop-blur-lg"
        )}
      >
        {label}
      </div>
    </div>
  );
}

export default function SideNavigation({ ...rest }: SideNavigationProps) {
  const router = useRouter();

  const currentPath = router.pathname;
  const [runtimeEnv, setRuntimeEnv] = useState<string>("unknown");

  useEffect(() => {
    setRuntimeEnv(process.env.RUNTIME_ENV as string);
  });

  return (
    <section
      className={cn(
        "min-h-screen w-fit relative z-20",
        "bg-secondary/20 text-secondary-foreground"
      )}
      {...rest}
    >
      <nav className={cn("flex h-full flex-col gap-5 p-3 pb-10")}>
        {navLinks.map(({ href, Icon, label, disabled, order }) => (
          <SideNavigationLink
            currentPath={currentPath}
            href={href}
            Icon={Icon}
            label={label}
            disabled={disabled}
            order={order as "default" | "last"}
            key={href}
          />
        ))}
        <div
          className={cn(
            "text-foreground border-t border-border",
            "py-1 justify-center items-center flex",
            "text-xs absolute bottom-0 left-0 right-0"
          )}
        >
          {runtimeEnv === "development" ? "DEVEL" : "PROD"}
        </div>
      </nav>
    </section>
  );
}
