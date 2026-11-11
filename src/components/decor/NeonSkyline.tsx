"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// [x, width, height] of each building on a 1440-wide strip (deterministic → no hydration mismatch).
const BUILDINGS: [number, number, number][] = [
  [0, 46, 70], [50, 34, 120], [88, 52, 90], [146, 28, 150], [178, 60, 105], [242, 40, 175], [286, 54, 95], [344, 30, 135],
  [378, 64, 80], [446, 38, 160], [488, 56, 115], [548, 30, 190], [582, 70, 100], [656, 44, 145], [704, 58, 205], [766, 36, 120],
  [806, 66, 165], [876, 30, 95], [910, 52, 140], [966, 40, 185], [1010, 62, 110], [1076, 34, 150], [1114, 58, 90], [1176, 42, 170],
  [1222, 60, 120], [1286, 32, 145], [1322, 54, 100], [1380, 60, 130],
];

/** Glowing city silhouette along the bottom of the hero, windows flickering in the accent colours. */
export function NeonSkyline() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full sm:h-56" aria-hidden>
      <defs>
        <linearGradient id="sky-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--academy-accent-2)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0B0614" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="sky-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--academy-accent)" />
          <stop offset="100%" stopColor="var(--academy-accent-2)" />
        </linearGradient>
      </defs>
      {BUILDINGS.map(([x, w, h], i) => (
        <g key={i}>
          <rect x={x} y={220 - h} width={w - 4} height={h} fill="url(#sky-b)" opacity={0.55 + (i % 3) * 0.15} />
          <rect x={x} y={220 - h} width={w - 4} height={2} fill="url(#sky-edge)" />
          {Array.from({ length: Math.floor(h / 26) }, (_, r) =>
            [0, 1].map((c) => (
              <motion.rect
                key={`${r}-${c}`}
                x={x + 6 + c * ((w - 16) / 2)}
                y={220 - h + 12 + r * 24}
                width={4}
                height={8}
                rx={1}
                fill={(r + c + i) % 2 ? "var(--academy-accent)" : "var(--academy-accent-2)"}
                initial={{ opacity: 0.25 }}
                animate={reduce || (r + i) % 4 ? undefined : { opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2 + ((i + r) % 4), repeat: Infinity, delay: (i * 0.37 + r * 0.2) % 3 }}
              />
            )),
          )}
        </g>
      ))}
      <rect x="0" y="216" width="1440" height="4" fill="url(#sky-edge)" opacity="0.8" />
    </svg>
  );
}

export default NeonSkyline;
