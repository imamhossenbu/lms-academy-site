"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface SubmitButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  size?: "md" | "lg";
}

/** Accent action button with a spinner + label while busy (disabled meanwhile). */
export function SubmitButton({ children, loading, loadingText, icon, size = "lg", className, disabled, type = "submit", ...props }: SubmitButtonProps) {
  const off = disabled || loading;
  return (
    <motion.button
      type={type}
      disabled={off}
      whileTap={off ? undefined : { scale: 0.97 }}
      className={cn(
        "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent text-white transition-colors hover:bg-accent-hover academy-glow-btn disabled:cursor-not-allowed disabled:opacity-60",
        size === "lg" ? "h-12 px-6 body-medium" : "h-11 px-5 body-sm-medium",
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span>{loading ? loadingText ?? children : children}</span>
      {!loading && icon && <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
    </motion.button>
  );
}

export default SubmitButton;
