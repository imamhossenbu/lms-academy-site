"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Two drifting blurred accent glows behind a section. */
export function GlowOrbs({ intensity = 1 }: { intensity?: number }) {
  const reduce = useReducedMotion();
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -left-40 -top-32 -z-10 h-120 w-120 rounded-full bg-accent blur-[140px]"
        style={{ opacity: 0.22 * intensity }}
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-32 top-10 -z-10 h-112 w-112 rounded-full bg-accent-2 blur-[140px]"
        style={{ opacity: 0.2 * intensity }}
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
    </>
  );
}

export default GlowOrbs;
