import { onMount } from "solid-js";
import WebGLFluidEnhanced from "webgl-fluid-enhanced";
import { cn } from "@/libs/helpers/cn";

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

export default function FluidBackground(props: FluidBackgroundProps) {
  let containerRef!: HTMLDivElement;

  onMount(async () => {
    try {
      if (typeof window !== "undefined") {
        const fluid = new WebGLFluidEnhanced(containerRef);

        fluid.setConfig({
          hover: props.HOVER ?? true,
          simResolution: props.SIM_RESOLUTION ?? 32,
          dyeResolution: props.DYE_RESOLUTION ?? 128,
          captureResolution: props.CAPTURE_RESOLUTION ?? 128,
          densityDissipation: props.DENSITY_DISSIPATION ?? 1,
          velocityDissipation: props.VELOCITY_DISSIPATION ?? 0.2,
          pressure: props.PRESSURE ?? 0.8,
          pressureIterations: props.PRESSURE_ITERATIONS ?? 20,
          curl: props.CURL ?? 30,
          splatRadius: props.SPLAT_RADIUS ?? 0.25,
          splatForce: props.SPLAT_FORCE ?? 6000,
          shading: props.SHADING ?? true,
          colorful: props.COLORFUL ?? true,
          colorUpdateSpeed: props.COLOR_UPDATE_SPEED ?? 10,
          backgroundColor: props.BACK_COLOR ?? "#000000",
          transparent: props.TRANSPARENT ?? true,
          bloom: props.BLOOM ?? true,
          bloomIterations: props.BLOOM_ITERATIONS ?? 8,
          bloomResolution: props.BLOOM_RESOLUTION ?? 256,
          bloomIntensity: props.BLOOM_INTENSITY ?? 0.8,
          bloomThreshold: props.BLOOM_THRESHOLD ?? 0.6,
          bloomSoftKnee: props.BLOOM_SOFT_KNEE ?? 0.7,
          sunrays: props.SUNRAYS ?? true,
          sunraysResolution: props.SUNRAYS_RESOLUTION ?? 196,
          sunraysWeight: props.SUNRAYS_WEIGHT ?? 1.0,
          colorPalette: ["#FF0000", "#00FF00", "#FFFF00", "#00FFFF"]
        });

        fluid.start();
      }
    } catch (e) {
      console.error("Failed to initialize WebGL Fluid Simulation", e);
    }
  });

  return (
    <div
      ref={containerRef}
      class={cn(
        "absolute inset-0 w-full h-full block pointer-events-auto",
        props.class
      )}
    />
  );
}
