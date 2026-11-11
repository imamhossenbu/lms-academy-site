"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const BACK = "M0 120 C 240 40 480 40 720 100 C 960 160 1200 160 1440 80 L 1440 220 L 0 220 Z";
const FRONT = "M0 160 C 300 90 560 200 840 150 C 1080 108 1260 120 1440 150 L 1440 220 L 0 220 Z";

/** Soft accent-coloured waves along the bottom of a section, swaying slowly (still for reduced motion). */
export function Waves({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const sway = (dx: number, duration: number) => (reduce ? {} : { animate: { x: [0, dx, 0] }, transition: { duration, repeat: Infinity, ease: "easeInOut" as const } });
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className={cn("pointer-events-none absolute bottom-0 -z-10 h-48 text-accent", className)}
      style={{ left: "-5%", width: "110%" }} aria-hidden>
      <motion.path d={BACK} fill="currentColor" fillOpacity="0.06" {...sway(-40, 14)} />
      <motion.path d={FRONT} fill="currentColor" fillOpacity="0.08" {...sway(30, 11)} />
    </svg>
  );
}

export default Waves;
