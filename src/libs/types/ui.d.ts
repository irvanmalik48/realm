import type { PolymorphicAttributes } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";

export interface ButtonAttributes
  extends PolymorphicAttributes<ValidComponent> {
  variant?: "solid" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon" | "none";
  class?: string;
  children: string | Element;
}
