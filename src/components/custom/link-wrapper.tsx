import { useSSToggle } from "@/hooks/atoms";
import { LinkProps } from "next/link";
import NextLink from "next/link";
import { HTMLProps } from "react";

export default function Link({
  children,
  ...rest
}: LinkProps & HTMLProps<HTMLAnchorElement>) {
  const { smoothScrolling } = useSSToggle();

  return (
    <NextLink scroll={smoothScrolling} {...(rest as LinkProps)}>
      {children}
    </NextLink>
  );
}
