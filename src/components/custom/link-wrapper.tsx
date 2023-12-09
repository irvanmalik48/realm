import { LinkProps } from "next/link";
import NextLink from "next/link";
import { HTMLProps } from "react";

export default function Link({
  children,
  ...rest
}: LinkProps & HTMLProps<HTMLAnchorElement>) {
  return <NextLink {...(rest as LinkProps)}>{children}</NextLink>;
}
