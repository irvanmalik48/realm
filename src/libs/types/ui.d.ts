import type { PolymorphicAttributes } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";

export interface ButtonAttributes
  extends PolymorphicAttributes<ValidComponent> {
  variant?: "solid" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon" | "none";
  class?: string;
  children: string | Element;
}

export interface StandardAttributes {
  class?: string;
  children?: string | Element;
}

export interface NavLinkAttributes extends StandardAttributes {
  href: string;
}

export interface SVGIconAttributes extends StandardAttributes {}
