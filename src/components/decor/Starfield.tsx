"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Fixed positions (no Math.random → no hydration mismatch).
const STARS = [
  [8, 18], [14, 62], [22, 34], [31, 80], [38, 12], [47, 55], [55, 26], [63, 72], [71, 40], [78, 15], [86, 64], [92, 30], [18, 88], [67, 90], [44, 6], [96, 82],
];

/** Faint twinkling dots across a dark section. */
export function Starfield() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {STARS.map(([x, y], i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-accent"
          style={{ left: `${x}%`, top: `${y}%`, boxShadow: "0 0 8px var(--academy-accent)" }}
          animate={reduce ? undefined : { opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 2.5 + (i % 5) * 0.6, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

export default Starfield;
