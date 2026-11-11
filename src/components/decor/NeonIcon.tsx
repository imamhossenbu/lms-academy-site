"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/** Floating outlined icon tile with a neon glow, bobbing gently. */
export function NeonIcon({ icon: Icon, className, delay = 0, rotate = 0 }: { icon: LucideIcon; className?: string; delay?: number; rotate?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={cn("academy-neon absolute flex h-12 w-12 items-center justify-center rounded-xl border-2 border-accent text-accent", className)}
      style={{ rotate }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ opacity: { delay, duration: 0.4 }, scale: { delay, duration: 0.4 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay } }}
      aria-hidden
    >
      <Icon className="h-6 w-6" />
    </motion.span>
  );
}

export default NeonIcon;
