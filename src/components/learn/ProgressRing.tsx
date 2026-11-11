"use client";

import React from "react";
import { motion } from "framer-motion";

/** Small circular progress (accent arc) with the percentage inside. */
export function ProgressRing({ value, size = 44 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }} aria-label={`${value}% complete`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--academy-accent)" strokeWidth="4" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - (c * value) / 100 }} transition={{ duration: 0.8, ease: "easeOut" }} />
      </svg>
      <span className="absolute body-2xsm-regular font-semibold text-white">{value}%</span>
    </span>
  );
}

export default ProgressRing;
