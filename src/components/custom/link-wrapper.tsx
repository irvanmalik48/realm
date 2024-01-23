import { useSSToggle } from "@/hooks/atoms";
import { LinkProps } from "next/link";
import NextLink from "next/link";
import { HTMLProps, forwardRef } from "react";

function Link(
  { children, ...rest }: LinkProps & HTMLProps<HTMLAnchorElement>,
  ref: any
) {
  const { smoothScrolling } = useSSToggle();

  return (
    <NextLink ref={ref} scroll={smoothScrolling} {...(rest as LinkProps)}>
      {children}
    </NextLink>
  );
}

export default forwardRef(Link);
