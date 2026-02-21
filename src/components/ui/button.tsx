import { Polymorphic } from "@kobalte/core/polymorphic";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/helpers/cn";
import type { ButtonAttributes } from "@/libs/types/ui";
import { children } from "solid-js";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50 rounded-md"
  ),
  {
    variants: {
      variant: {
        solid: cn(
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "active:bg-primary/80"
        ),
        outline: cn(
          "border border-input bg-background hover:bg-accent",
          "hover:text-accent-foreground active:bg-accent/80"
        ),
        ghost: cn(
          "hover:bg-accent hover:text-accent-foreground",
          "active:bg-accent/80"
        ),
        link: cn(
          "text-primary underline-offset-4 hover:underline",
          "active:text-primary/80"
        )
      },
      size: {
        sm: "px-4 py-1 text-sm",
        md: "px-5 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        icon: "p-2",
        none: ""
      }
    },
    defaultVariants: {
      variant: "solid",
      size: "md"
    }
  }
);

export function Button<RenderProps>(
  props: RenderProps & ButtonAttributes
) {
  const { class: className, variant, size, as, ...rest } = props;

  const resolved = children(() => props.children);

  return (
    <Polymorphic
      {...rest}
      as={as ?? "button"}
      class={cn(buttonVariants({ variant, size }), className)}
    >
      {resolved()}
    </Polymorphic>
  );
}
