import React from "react";
import { cn } from "@/lib/cn";

export type Tone =
  | "green"
  | "blue"
  | "red"
  | "orange"
  | "gray"
  | "primary"
  | "success"
  | "warning"
  | "yellow"
  | "danger"
  | "neutral"
  | "ice"
  | "navy"
  | "indigo"
  | "purple"
  | "accent"
  | "white";

const TONE_CLASS: Record<string, string> = {
  green: "bg-green/15 text-green border border-green/30",
  success: "bg-green/15 text-green border border-green/30",
  blue: "bg-blue/15 text-blue border border-blue/30",
  primary: "bg-accent-20 text-accent border border-accent/30",
  orange: "bg-accent-20 text-accent border border-accent/30",
  accent: "bg-accent-20 text-accent border border-accent/30",
  red: "bg-red/15 text-red border border-red/30",
  danger: "bg-red/15 text-red border border-red/30",
  warning: "bg-yellow/15 text-yellow border border-yellow/30",
  yellow: "bg-yellow/15 text-yellow border border-yellow/30",
  gray: "bg-white/5 text-night-soft border border-night-line",
  neutral: "bg-white/5 text-night-soft border border-night-line",
  ice: "bg-accent-20 text-accent border border-accent/30",
  navy: "bg-white/5 text-white border border-night-line",
  indigo: "bg-blue/15 text-blue border border-blue/30",
  purple: "bg-purple/15 text-purple border border-purple/30",
  white: "bg-black/55 text-white border border-white/15 backdrop-blur",
};

const DOT_CLASS: Record<string, string> = {
  green: "bg-green",
  success: "bg-green",
  blue: "bg-blue",
  primary: "bg-accent",
  orange: "bg-accent",
  accent: "bg-accent",
  red: "bg-red",
  danger: "bg-red",
  warning: "bg-yellow",
  yellow: "bg-yellow",
  gray: "bg-white/40",
  neutral: "bg-white/40",
  ice: "bg-accent",
  navy: "bg-white",
  indigo: "bg-blue",
  purple: "bg-purple",
  white: "bg-white",
};

const SIZE_CLASS: Record<string, string> = {
  sm: "px-2 py-0.5 body-2xsm-regular",
  md: "px-2.5 py-1 body-xsm-medium",
  lg: "px-3 py-1.5 body-sm-medium",
};

export interface ToneBadgeProps {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "rounded" | "pill";
  dot?: boolean;
  icon?: React.ReactNode;
}

export function ToneBadge({
  tone,
  children,
  className,
  size = "md",
  variant = "rounded",
  dot = false,
  icon,
}: ToneBadgeProps) {
  const roundedClass = variant === "pill" ? "rounded-full" : "rounded-md";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors",
        roundedClass,
        SIZE_CLASS[size] || SIZE_CLASS.md,
        TONE_CLASS[tone] || TONE_CLASS.gray,
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            DOT_CLASS[tone] || "bg-white/40"
          )}
        />
      )}
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      {children}
    </span>
  );
}

export default ToneBadge;
