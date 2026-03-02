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

export interface FluidBackgroundProps {
  class?: string;
  IMMEDIATE?: boolean;
  HOVER?: boolean;
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLORFUL?: boolean;
  COLOR_UPDATE_SPEED?: number;
  PAUSED?: boolean;
  BACK_COLOR?: string;
  TRANSPARENT?: boolean;
  BLOOM?: boolean;
  BLOOM_ITERATIONS?: number;
  BLOOM_RESOLUTION?: number;
  BLOOM_INTENSITY?: number;
  BLOOM_THRESHOLD?: number;
  BLOOM_SOFT_KNEE?: number;
  SUNRAYS?: boolean;
  SUNRAYS_RESOLUTION?: number;
  SUNRAYS_WEIGHT?: number;
}
