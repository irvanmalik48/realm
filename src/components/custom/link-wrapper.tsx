import { LinkProps } from "next/link";
import NextLink from "next/link";
import { HTMLProps, forwardRef } from "react";

function Link(
  { children, ...rest }: LinkProps & HTMLProps<HTMLAnchorElement>,
  ref: any
) {
  return (
    <NextLink ref={ref} {...(rest as LinkProps)}>
      {children}
    </NextLink>
  );
}

export default forwardRef(Link);
