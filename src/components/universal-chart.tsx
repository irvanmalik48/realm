"use client";

import * as React from "react";
import { useState, useId, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Shield,
  Wind,
  Layers,
  Activity,
  CheckCircle2,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChartTrait {
  label: string;
  value: string;
  icon?: "wind" | "shield" | "layers" | "activity" | "sparkles" | "check" | "gauge";
}

export interface ChartDataPoint {
  id?: string;
  name: string;
  category?: string;
  categoryLabel?: string;
  x: number;
  y: number;
  subLabel?: string;
  highlight?: boolean;
  highlightLabel?: string;
  description?: string;
  traits?: ChartTrait[];
  stats?: Array<{
    label: string;
    value: string | number;
    unit?: string;
    highlight?: boolean;
  }>;
}

export interface ChartZone {
  name: string;
  from: number;
  to: number;
  color?: string;
}

export interface ChartAxisConfig {
  label: string;
  min?: number;
  max?: number;
  unit?: string;
  ticks?: number[];
  subTicks?: Array<{ value: number; label: string }>;
}

export interface ChartCategory {
  id: string;
  label: string;
}

export interface UniversalChartProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  xAxis?: ChartAxisConfig;
  yAxis?: ChartAxisConfig;
  zones?: ChartZone[];
  categories?: ChartCategory[];
  data?: ChartDataPoint[];
  showCurve?: boolean;
  preset?: "fabric-weight" | "cost-per-wear" | "custom";
  className?: string;
}

const ICON_MAP = {
  wind: Wind,
  shield: Shield,
  layers: Layers,
  activity: Activity,
  sparkles: Sparkles,
  check: CheckCircle2,
  gauge: Gauge,
};

// Default Preset: Fabric Weight & Sensory Grounding Matrix
const PRESET_FABRIC_WEIGHT: {
  title: string;
  subtitle: string;
  badge: string;
  xAxis: ChartAxisConfig;
  yAxis: ChartAxisConfig;
  zones: ChartZone[];
  categories: Array<{ id: string; label: string }>;
  data: ChartDataPoint[];
} = {
  title: "Fabric Weight & Sensory Grounding Map",
  subtitle:
    "Click or hover any garment to inspect tactile feedback, chimney convection dynamic, and silhouette retention.",
  badge: "Phase Transition Matrix",
  xAxis: {
    label: "Fabric Weight (GSM)",
    min: 100,
    max: 560,
    unit: "GSM",
    ticks: [120, 200, 300, 400, 500],
    subTicks: [
      { value: 120, label: "~3.5 oz" },
      { value: 200, label: "~5.9 oz" },
      { value: 300, label: "~8.8 oz" },
      { value: 400, label: "~11.8 oz" },
      { value: 500, label: "~14.7 oz" },
    ],
  },
  yAxis: {
    label: "Structural Rigidity & Silhouette Drape →",
    min: 0,
    max: 100,
    unit: "%",
    ticks: [20, 40, 60, 80, 100],
  },
  zones: [
    { name: "Ultralight", from: 100, to: 165, color: "#f43f5e" },
    { name: "Midweight", from: 165, to: 245, color: "#fbbf24" },
    { name: "Heavyweight", from: 245, to: 360, color: "#10b981" },
    { name: "Armor", from: 360, to: 560, color: "#6366f1" },
  ],
  categories: [
    { id: "all", label: "All Weights" },
    { id: "ultralight", label: "Ultralight (120–150)" },
    { id: "midweight", label: "Midweight (180–220)" },
    { id: "heavyweight", label: "Heavyweight (260–320)" },
    { id: "armor", label: "Armor (400–540+)" },
  ],
  data: [
    {
      id: "poly-gym",
      name: "Fast Fashion Poly-Blend",
      category: "ultralight",
      categoryLabel: "Ultralight",
      x: 130,
      y: 18,
      subLabel: "3.8 oz",
      stats: [
        { label: "Drape Rigidity", value: "18%" },
        { label: "Sensory Grounding", value: "12%", highlight: true },
      ],
      traits: [
        {
          label: "Convection Airflow",
          value: "Clings with sweat; zero chimney draft",
          icon: "wind",
        },
        {
          label: "Solar & UV Rating",
          value: "UPF 10 (diffuse UV cook-through)",
          icon: "shield",
        },
        {
          label: "Expected Lifespan",
          value: "< 6 months (seam twist & skew)",
          icon: "layers",
        },
      ],
    },
    {
      id: "cheap-jersey",
      name: "Sheer Carded Cotton",
      category: "ultralight",
      categoryLabel: "Ultralight",
      x: 150,
      y: 26,
      subLabel: "4.4 oz",
      stats: [
        { label: "Drape Rigidity", value: "26%" },
        { label: "Sensory Grounding", value: "22%", highlight: true },
      ],
      traits: [
        {
          label: "Convection Airflow",
          value: "Semi-sheer; sticks to torso moisture",
          icon: "wind",
        },
        {
          label: "Solar & UV Rating",
          value: "UPF 15",
          icon: "shield",
        },
        {
          label: "Expected Lifespan",
          value: "~4 months (collar baconing)",
          icon: "layers",
        },
      ],
    },
    {
      id: "band-tee",
      name: "Standard Ring-Spun Tee",
      category: "midweight",
      categoryLabel: "Midweight",
      x: 190,
      y: 48,
      subLabel: "5.6 oz",
      stats: [
        { label: "Drape Rigidity", value: "48%" },
        { label: "Sensory Grounding", value: "45%", highlight: true },
      ],
      traits: [
        {
          label: "Convection Airflow",
          value: "Everyday breathability; collapses on posture",
          icon: "wind",
        },
        {
          label: "Solar & UV Rating",
          value: "UPF 25",
          icon: "shield",
        },
        {
          label: "Expected Lifespan",
          value: "1–2 years",
          icon: "layers",
        },
      ],
    },
    {
      id: "heavy-combed",
      name: "Heavy Combed Jersey",
      category: "heavyweight",
      categoryLabel: "Heavyweight",
      x: 280,
      y: 78,
      subLabel: "8.3 oz",
      stats: [
        { label: "Drape Rigidity", value: "78%" },
        { label: "Sensory Grounding", value: "82%", highlight: true },
      ],
      traits: [
        {
          label: "Convection Airflow",
          value: "Chimney convection; vents warm air upward",
          icon: "wind",
        },
        {
          label: "Solar & UV Rating",
          value: "UPF 50+ (blackout shade)",
          icon: "shield",
        },
        {
          label: "Expected Lifespan",
          value: "3–5+ years (double-stitched collar)",
          icon: "layers",
        },
      ],
    },
    {
      id: "daily-uniform",
      name: "320 GSM Boxy Heavyweight",
      category: "heavyweight",
      categoryLabel: "Heavyweight",
      x: 320,
      y: 88,
      subLabel: "9.4 oz",
      highlight: true,
      highlightLabel: "★ MY UNIFORM",
      stats: [
        { label: "Drape Rigidity", value: "88%" },
        { label: "Sensory Grounding", value: "90%", highlight: true },
      ],
      traits: [
        {
          label: "Convection Airflow",
          value: "Self-supporting air gap; sweat evaporates freely",
          icon: "wind",
        },
        {
          label: "Solar & UV Rating",
          value: "UPF 50+ (complete shield)",
          icon: "shield",
        },
        {
          label: "Expected Lifespan",
          value: "5+ years (permanent shape retention)",
          icon: "layers",
        },
      ],
    },
    {
      id: "loopback-terry",
      name: "420 GSM Loopback Fleece",
      category: "armor",
      categoryLabel: "Outerwear / Armor",
      x: 420,
      y: 92,
      subLabel: "12.4 oz",
      stats: [
        { label: "Drape Rigidity", value: "92%" },
        { label: "Sensory Grounding", value: "95%", highlight: true },
      ],
      traits: [
        {
          label: "Convection Airflow",
          value: "Thermal microclimate & windbreak barrier",
          icon: "wind",
        },
        {
          label: "Solar & UV Rating",
          value: "UPF 50+ maximum",
          icon: "shield",
        },
        {
          label: "Expected Lifespan",
          value: "10+ years (generational wear)",
          icon: "layers",
        },
      ],
    },
    {
      id: "raw-denim",
      name: "14oz Raw Selvedge Denim",
      category: "armor",
      categoryLabel: "Outerwear / Armor",
      x: 475,
      y: 96,
      subLabel: "14.0 oz",
      stats: [
        { label: "Drape Rigidity", value: "96%" },
        { label: "Sensory Grounding", value: "98%", highlight: true },
      ],
      traits: [
        {
          label: "Convection Airflow",
          value: "Rigid structure; deep sensory grounding feedback",
          icon: "wind",
        },
        {
          label: "Solar & UV Rating",
          value: "UPF 50+ maximum",
          icon: "shield",
        },
        {
          label: "Expected Lifespan",
          value: "Decades (breaks in with friction)",
          icon: "layers",
        },
      ],
    },
    {
      id: "duck-canvas",
      name: "16oz Heavy Duck Canvas",
      category: "armor",
      categoryLabel: "Outerwear / Armor",
      x: 540,
      y: 99,
      subLabel: "16.0 oz",
      stats: [
        { label: "Drape Rigidity", value: "99%" },
        { label: "Sensory Grounding", value: "100%", highlight: true },
      ],
      traits: [
        {
          label: "Convection Airflow",
          value: "Maximum physical inertia; immovable silhouette",
          icon: "wind",
        },
        {
          label: "Solar & UV Rating",
          value: "UPF 50+ maximum",
          icon: "shield",
        },
        {
          label: "Expected Lifespan",
          value: "Decades (abrasion proof)",
          icon: "layers",
        },
      ],
    },
  ],
};

// Preset: Cost-Per-Wear vs. Durability Matrix
const PRESET_COST_PER_WEAR: {
  title: string;
  subtitle: string;
  badge: string;
  xAxis: ChartAxisConfig;
  yAxis: ChartAxisConfig;
  zones: ChartZone[];
  categories: Array<{ id: string; label: string }>;
  data: ChartDataPoint[];
} = {
  title: "Cost-Per-Wear vs. Durability Matrix",
  subtitle:
    "Amortized clothing economics across garment lifespans. Click or hover any item to inspect acquisition price, total wears, and real unit cost.",
  badge: "Lifecycle Economics",
  xAxis: {
    label: "Garment Active Lifespan (Months) →",
    min: 0,
    max: 130,
    unit: "mo",
    ticks: [12, 36, 60, 84, 108, 120],
    subTicks: [
      { value: 12, label: "1 yr" },
      { value: 36, label: "3 yr" },
      { value: 60, label: "5 yr" },
      { value: 84, label: "7 yr" },
      { value: 120, label: "10 yr" },
    ],
  },
  yAxis: {
    label: "Cost Per Wear ($ / Wear) →",
    min: 0,
    max: 2.5,
    unit: "$",
    ticks: [0.25, 0.5, 1.0, 1.5, 2.0, 2.5],
  },
  zones: [
    { name: "Disposable (< 12 mo)", from: 0, to: 12, color: "#f43f5e" },
    { name: "Standard (12–36 mo)", from: 12, to: 36, color: "#fbbf24" },
    { name: "Durable Workwear (36–72 mo)", from: 36, to: 72, color: "#10b981" },
    { name: "Heritage (72–130 mo)", from: 72, to: 130, color: "#6366f1" },
  ],
  categories: [
    { id: "all", label: "All Items" },
    { id: "fast-fashion", label: "Fast Fashion & Hype" },
    { id: "standard", label: "Standard Retail" },
    { id: "heavyweight", label: "Heavyweight Workwear" },
    { id: "heritage", label: "Heritage Footwear" },
  ],
  data: [
    {
      id: "poly-fast",
      name: "Fast Fashion Poly-Blend Tee",
      category: "fast-fashion",
      categoryLabel: "Fast Fashion",
      x: 4,
      y: 0.9,
      subLabel: "$18 initial • 20 wears",
      stats: [
        { label: "Purchase Price", value: "$18" },
        { label: "Cost Per Wear", value: "$0.90", highlight: true },
      ],
      traits: [
        {
          label: "Failure Mode",
          value: "Collar baconing and warped side seams after 5 wash cycles",
          icon: "layers",
        },
        {
          label: "Active Lifespan",
          value: "4 months before thread breakdown",
          icon: "activity",
        },
        {
          label: "5-Year Churn Cost",
          value: "$270 for 15 disposable replacements",
          icon: "gauge",
        },
      ],
    },
    {
      id: "mall-cotton",
      name: "Mall Ring-Spun Cotton Tee",
      category: "standard",
      categoryLabel: "Standard Retail",
      x: 14,
      y: 0.47,
      subLabel: "$28 initial • 60 wears",
      stats: [
        { label: "Purchase Price", value: "$28" },
        { label: "Cost Per Wear", value: "$0.47", highlight: true },
      ],
      traits: [
        {
          label: "Failure Mode",
          value: "Fabric thinning, underarm fraying, and shape distortion",
          icon: "layers",
        },
        {
          label: "Active Lifespan",
          value: "~14 months before demotion to sleepwear",
          icon: "activity",
        },
        {
          label: "5-Year Replacement Cost",
          value: "$140 for 5 replacements",
          icon: "gauge",
        },
      ],
    },
    {
      id: "heavy-cotton-tee",
      name: "300 GSM Boxy Heavy Cotton Tee",
      category: "heavyweight",
      categoryLabel: "Heavyweight Workwear",
      x: 60,
      y: 0.14,
      subLabel: "$42 initial • 300 wears",
      highlight: true,
      highlightLabel: "★ OPTIMAL ROI",
      stats: [
        { label: "Purchase Price", value: "$42" },
        { label: "Cost Per Wear", value: "$0.14", highlight: true },
      ],
      traits: [
        {
          label: "Construction",
          value: "Double-needle ribbed collar, 16s/1 combed yarn, zero skew",
          icon: "shield",
        },
        {
          label: "Active Lifespan",
          value: "5+ years without collar breakdown or seam twists",
          icon: "check",
        },
        {
          label: "5-Year Total Cost",
          value: "$42 flat (84% cheaper than fast-fashion churn)",
          icon: "gauge",
        },
      ],
    },
    {
      id: "canvas-trousers",
      name: "15oz Raw Duck Canvas Trousers",
      category: "heavyweight",
      categoryLabel: "Heavyweight Workwear",
      x: 84,
      y: 0.16,
      subLabel: "$135 initial • 840 wears",
      stats: [
        { label: "Purchase Price", value: "$135" },
        { label: "Cost Per Wear", value: "$0.16", highlight: true },
      ],
      traits: [
        {
          label: "Construction",
          value: "Triple-stitched felled seams, solid brass hardware, bartacks",
          icon: "shield",
        },
        {
          label: "Active Lifespan",
          value: "7+ years with field-repairable canvas weave",
          icon: "check",
        },
        {
          label: "Surface Patina",
          value: "Slate-grey sulfur fades along stress lines",
          icon: "sparkles",
        },
      ],
    },
    {
      id: "heritage-boots",
      name: "Goodyear-Welted Leather Lug Boots",
      category: "heritage",
      categoryLabel: "Heritage Footwear",
      x: 120,
      y: 0.22,
      subLabel: "$260 initial • 1,200 wears",
      stats: [
        { label: "Purchase Price", value: "$260" },
        { label: "Cost Per Wear", value: "$0.22", highlight: true },
      ],
      traits: [
        {
          label: "Construction",
          value: "Full-grain oil-tanned leather, steel shank, Vibram Montagna lug sole",
          icon: "shield",
        },
        {
          label: "Active Lifespan",
          value: "10+ years with indefinite recrafting and resoling",
          icon: "check",
        },
        {
          label: "Sensory Grounding",
          value: "Firm physical inertia on concrete and asphalt",
          icon: "activity",
        },
      ],
    },
    {
      id: "techwear-cargo",
      name: "Hype Nylon Techwear Cargo",
      category: "fast-fashion",
      categoryLabel: "Fast Fashion & Hype",
      x: 16,
      y: 2.15,
      subLabel: "$280 initial • 130 wears",
      stats: [
        { label: "Purchase Price", value: "$280" },
        { label: "Cost Per Wear", value: "$2.15", highlight: true },
      ],
      traits: [
        {
          label: "Failure Mode",
          value: "Delaminating PU seam tape and broken plastic strap buckles",
          icon: "layers",
        },
        {
          label: "Active Lifespan",
          value: "16 months before micro-trend obsolescence",
          icon: "activity",
        },
        {
          label: "Market Premium",
          value: "400% branding markup over military surplus nylon",
          icon: "gauge",
        },
      ],
    },
  ],
};

const EMPTY_DATA: ChartDataPoint[] = [];
const EMPTY_ZONES: ChartZone[] = [];
const EMPTY_CATEGORIES: ChartCategory[] = [];

export function UniversalChart({
  title: propTitle,
  subtitle: propSubtitle,
  badge: propBadge,
  xAxis: propXAxis,
  yAxis: propYAxis,
  zones: propZones,
  categories: propCategories,
  data: propData,
  showCurve: propShowCurve,
  preset = "fabric-weight",
  className,
}: UniversalChartProps) {
  const gradientId = useId();

  // If using preset and custom props are not provided, fall back to preset
  const presetConfig =
    preset === "cost-per-wear"
      ? PRESET_COST_PER_WEAR
      : preset === "fabric-weight"
        ? PRESET_FABRIC_WEIGHT
        : null;

  const showCurve =
    propShowCurve !== undefined
      ? propShowCurve
      : preset === "cost-per-wear"
        ? false
        : true;

  const title = propTitle ?? presetConfig?.title ?? "Data Distribution Matrix";
  const subtitle = propSubtitle ?? presetConfig?.subtitle ?? "";
  const badge = propBadge ?? presetConfig?.badge ?? "Matrix";

  const xAxis = useMemo(() => {
    return {
      label: propXAxis?.label ?? presetConfig?.xAxis.label ?? "X Axis",
      min: propXAxis?.min ?? presetConfig?.xAxis.min ?? 0,
      max: propXAxis?.max ?? presetConfig?.xAxis.max ?? 100,
      unit: propXAxis?.unit ?? presetConfig?.xAxis.unit ?? "",
      ticks: propXAxis?.ticks ?? presetConfig?.xAxis.ticks ?? [0, 25, 50, 75, 100],
      subTicks: propXAxis?.subTicks ?? presetConfig?.xAxis.subTicks ?? [],
    };
  }, [propXAxis, presetConfig]);

  const yAxis = useMemo(() => {
    return {
      label: propYAxis?.label ?? presetConfig?.yAxis.label ?? "Y Axis",
      min: propYAxis?.min ?? presetConfig?.yAxis.min ?? 0,
      max: propYAxis?.max ?? presetConfig?.yAxis.max ?? 100,
      unit: propYAxis?.unit ?? presetConfig?.yAxis.unit ?? "",
      ticks: propYAxis?.ticks ?? presetConfig?.yAxis.ticks ?? [20, 40, 60, 80, 100],
    };
  }, [propYAxis, presetConfig]);

  const zones = propZones ?? presetConfig?.zones ?? EMPTY_ZONES;

  const rawData = useMemo(() => {
    return propData ?? presetConfig?.data ?? EMPTY_DATA;
  }, [propData, presetConfig]);

  // Derive categories from data if not explicitly provided
  const categories = useMemo(() => {
    if (propCategories) return propCategories;
    if (presetConfig?.categories) return presetConfig.categories;
    const uniqueCats = Array.from(
      new Set(rawData.map((d) => d.category).filter(Boolean)),
    ) as string[];
    if (uniqueCats.length <= 1) return EMPTY_CATEGORIES;
    return [
      { id: "all", label: "All Items" },
      ...uniqueCats.map((c) => ({
        id: c,
        label: c.charAt(0).toUpperCase() + c.slice(1),
      })),
    ];
  }, [propCategories, presetConfig, rawData]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePoint, setActivePoint] = useState<ChartDataPoint>(() =>
    rawData.find((d) => d.highlight) || rawData[0] || { name: "", x: 0, y: 0 }
  );

  // SVG Dimension constants
  const viewBoxWidth = 740;
  const viewBoxHeight = 360;
  const paddingLeft = 65;
  const paddingRight = 35;
  const paddingTop = 30;
  const paddingBottom = 55;

  const plotWidth = viewBoxWidth - paddingLeft - paddingRight;
  const plotHeight = viewBoxHeight - paddingTop - paddingBottom;

  const getX = React.useCallback(
    (val: number) =>
      paddingLeft + ((val - xAxis.min) / (xAxis.max - xAxis.min)) * plotWidth,
    [xAxis.min, xAxis.max, plotWidth],
  );

  const getY = React.useCallback(
    (val: number) =>
      paddingTop +
      plotHeight -
      ((val - yAxis.min) / (yAxis.max - yAxis.min)) * plotHeight,
    [yAxis.min, yAxis.max, plotHeight],
  );

  // Generate smooth cubic bezier curve through data points
  const pathD = useMemo(() => {
    if (!showCurve || rawData.length < 2) return "";
    const sorted = [...rawData].sort((a, b) => a.x - b.x);
    const pts = sorted.map((p) => ({ x: getX(p.x), y: getY(p.y) }));

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }, [showCurve, rawData, getX, getY]);

  return (
    <div
      className={cn(
        "not-prose my-10 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md shadow-2xl overflow-hidden transition-colors duration-300",
        className,
      )}
    >
      {/* Header bar */}
      <div className="p-5 md:p-6 border-b border-border/50 bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="size-3.5" />
              <span>{badge}</span>
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {xAxis.unit && yAxis.unit ? `${xAxis.unit} vs. ${yAxis.unit}` : ""}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground mt-1.5">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Category Filter Pills (if categories available) */}
        {categories.length > 1 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer",
                  selectedCategory === cat.id
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/40",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Quick-Select Pill Strip: Instant finger-friendly inspection */}
      <div className="md:hidden px-4 py-3 border-b border-border/40 bg-muted/20 flex flex-col gap-2">
        <div className="flex items-center justify-between text-2xs font-mono text-muted-foreground">
          <span>Tap to inspect point:</span>
          <span className="text-3xs text-muted-foreground/70">Swipe matrix ↔</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {rawData.map((point) => {
            const isSelected = activePoint.name === point.name;
            return (
              <button
                key={point.name}
                type="button"
                onClick={() => setActivePoint(point)}
                className={cn(
                  "shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors duration-150 flex items-center gap-1 border",
                  isSelected
                    ? "bg-foreground text-background font-bold border-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground border-border/40 hover:bg-muted hover:text-foreground",
                )}
              >
                <span>
                  {xAxis.unit === "GSM"
                    ? `${point.x}g`
                    : xAxis.unit === "mo"
                      ? `${point.x}m`
                      : xAxis.unit === "$"
                        ? `$${point.x}`
                        : `${point.x}${xAxis.unit ? ` ${xAxis.unit}` : ""}`}
                </span>
                {point.highlight && (
                  <span className="text-3xs text-emerald-400">★</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Canvas Plot */}
      <div className="p-2 sm:p-4 md:p-6 relative select-none overflow-x-auto scrollbar-thin">
        <div className="min-w-140 md:min-w-0">
          <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            className="w-full h-auto overflow-visible"
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
                <stop offset="28%" stopColor="#fbbf24" stopOpacity="0.85" />
                <stop offset="58%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Zones Background */}
            {zones.map((zone) => {
              const zx = getX(zone.from);
              const zw = getX(zone.to) - zx;
              return (
                <rect
                  key={zone.name}
                  x={zx}
                  y={paddingTop}
                  width={Math.max(0, zw)}
                  height={plotHeight}
                  fill={zone.color || "currentColor"}
                  fillOpacity="0.04"
                />
              );
            })}

            {/* Horizontal Grid lines */}
            {yAxis.ticks.map((level) => {
              const y = getY(level);
              return (
                <g key={level}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={paddingLeft + plotWidth}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.07"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingLeft - 10}
                    y={y + 3.5}
                    textAnchor="end"
                    className="fill-muted-foreground text-3xs font-mono"
                  >
                    {yAxis.unit === "$"
                      ? `$${level < 1 ? level.toFixed(2) : level}`
                      : `${level}${yAxis.unit ? yAxis.unit : ""}`}
                  </text>
                </g>
              );
            })}

            {/* Vertical Grid / Zone Dividers */}
            {zones.slice(0, -1).map((z) => (
              <line
                key={z.name}
                x1={getX(z.to)}
                y1={paddingTop}
                x2={getX(z.to)}
                y2={paddingTop + plotHeight}
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeDasharray="3 3"
              />
            ))}

            {/* X Axis Ticks */}
            {xAxis.ticks.map((val) => {
              const x = getX(val);
              const subTick = xAxis.subTicks.find((st) => st.value === val);
              return (
                <g key={val}>
                  <line
                    x1={x}
                    y1={paddingTop + plotHeight}
                    x2={x}
                    y2={paddingTop + plotHeight + 6}
                    stroke="currentColor"
                    strokeOpacity="0.3"
                  />
                  <text
                    x={x}
                    y={paddingTop + plotHeight + 20}
                    textAnchor="middle"
                    className="fill-foreground text-2xs font-semibold font-mono"
                  >
                    {val} {xAxis.unit}
                  </text>
                  {subTick && (
                    <text
                      x={x}
                      y={paddingTop + plotHeight + 33}
                      textAnchor="middle"
                      className="fill-muted-foreground text-3xs font-mono"
                    >
                      {subTick.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Fitted Trend Trajectory Curve */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="3"
                strokeDasharray="6 4"
                className="opacity-80"
              />
            )}

            {/* Highlight Badge Callout for designated point */}
            {rawData
              .filter((p) => p.highlight && p.highlightLabel)
              .map((p) => {
                const hx = getX(p.x);
                const hy = getY(p.y);
                return (
                  <g key={`hl-${p.name}`} transform={`translate(${hx}, ${hy - 28})`}>
                    <rect
                      x="-48"
                      y="-18"
                      width="96"
                      height="20"
                      rx="10"
                      className="fill-background/90 stroke-emerald-500/50 shadow-md"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      className="fill-emerald-400 text-3xs font-bold tracking-wide"
                    >
                      {p.highlightLabel}
                    </text>
                  </g>
                );
              })}

            {/* Interactive Data Points */}
            {rawData.map((point) => {
              const cx = getX(point.x);
              const cy = getY(point.y);
              const isSelected = activePoint.name === point.name;
              const isDimmed =
                selectedCategory !== "all" &&
                point.category &&
                point.category !== selectedCategory;

              return (
                <g
                  key={point.name}
                  className={cn(
                    "cursor-pointer transition-opacity duration-300",
                    isDimmed && "opacity-20 pointer-events-none",
                  )}
                  onClick={() => setActivePoint(point)}
                  onMouseEnter={() => setActivePoint(point)}
                >
                  {/* Generous touch hitbox for mobile fingertips (48px tap area) */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="24"
                    fill="transparent"
                    className="cursor-pointer"
                  />

                  {/* Concentric radar pulse for active or highlight point (native SVG animate - no CSS diagonal drift) */}
                  {(isSelected || point.highlight) && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 10 : 8}
                      fill="none"
                      stroke={point.highlight ? "#34d399" : "currentColor"}
                      strokeWidth={isSelected ? 2 : 1.5}
                      pointerEvents="none"
                    >
                      <animate
                        attributeName="r"
                        values={isSelected ? "10;28" : "8;20"}
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.75;0"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Outer Glow Halo */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "12" : "8"}
                    className={cn(
                      "transition-all duration-200 pointer-events-none",
                      isSelected
                        ? "fill-emerald-500/20 stroke-emerald-400 stroke-2"
                        : point.highlight
                          ? "fill-emerald-500/10 stroke-emerald-500/80 stroke-1.5"
                          : "fill-background stroke-foreground/40 stroke-1 hover:stroke-foreground",
                    )}
                  />

                  {/* Core Dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "5" : "3.5"}
                    className={cn(
                      "transition-all duration-200 pointer-events-none",
                      isSelected
                        ? "fill-emerald-400"
                        : point.highlight
                          ? "fill-emerald-500"
                          : "fill-foreground",
                    )}
                  />

                  {/* Direct Point Label */}
                  <text
                    x={cx}
                    y={cy - 12}
                    textAnchor="middle"
                    className={cn(
                      "text-3xs font-medium transition-colors duration-200 pointer-events-none",
                      isSelected
                        ? "fill-foreground font-bold"
                        : "fill-muted-foreground/80",
                    )}
                  >
                    {point.x}
                    {xAxis.unit === "GSM" ? "g" : ""}
                  </text>
                </g>
              );
            })}

            {/* Y Axis Label */}
            <text
              x={-180}
              y={20}
              transform="rotate(-90)"
              textAnchor="middle"
              className="fill-muted-foreground text-3xs font-mono tracking-widest uppercase"
            >
              {yAxis.label}
            </text>
          </svg>
        </div>
      </div>

      {/* Interactive Detail Card Panel (Below Plot) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePoint.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="p-5 md:p-6 bg-muted/30 border-t border-border/50"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-foreground border border-border/40 font-mono">
                  {activePoint.x} {xAxis.unit}
                  {activePoint.subLabel ? ` / ${activePoint.subLabel}` : ""}
                </span>
                {activePoint.categoryLabel && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {activePoint.categoryLabel}
                  </span>
                )}
                {activePoint.highlight && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" />
                    Selected Choice
                  </span>
                )}
              </div>
              <h4 className="text-base md:text-lg font-bold text-foreground mt-1">
                {activePoint.name}
              </h4>
            </div>

            {/* Custom Stats / Metrics */}
            {activePoint.stats && activePoint.stats.length > 0 && (
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {activePoint.stats.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    {i > 0 && <div className="w-px h-8 bg-border/60 shrink-0" />}
                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-2xs text-muted-foreground font-mono">
                        {stat.label}
                      </div>
                      <div
                        className={cn(
                          "text-sm font-bold font-mono",
                          stat.highlight
                            ? "text-emerald-400"
                            : "text-foreground",
                        )}
                      >
                        {stat.value}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Custom Traits Grid */}
          {activePoint.traits && activePoint.traits.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-3 border-t border-border/40">
              {activePoint.traits.map((trait) => {
                const IconComponent =
                  (trait.icon && ICON_MAP[trait.icon]) || Sparkles;
                return (
                  <div key={trait.label} className="flex items-start gap-2.5">
                    <IconComponent className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-2xs font-semibold text-foreground uppercase tracking-wider block">
                        {trait.label}
                      </span>
                      <span className="text-xs text-muted-foreground leading-snug">
                        {trait.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Re-export under universal aliases for clean developer UX in MDX
export { UniversalChart as PlotChart };
export { UniversalChart as FabricWeightChart };
export default UniversalChart;
