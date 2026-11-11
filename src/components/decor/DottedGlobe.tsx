"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Big planet horizon: a glowing arc filled with a dot pattern, slowly drifting (the stats section's backdrop). */
export function DottedGlobe() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[78%] overflow-hidden" aria-hidden>
      <motion.div
        className="absolute left-1/2 top-0 aspect-square w-[160%] -translate-x-1/2 rounded-full sm:w-[120%]"
        style={{
          background: "radial-gradient(circle at 50% 18%, color-mix(in srgb, var(--academy-accent-2) 55%, transparent), color-mix(in srgb, var(--academy-accent) 18%, #0B0614) 38%, #0B0614 70%)",
          boxShadow: "0 -20px 80px -10px color-mix(in srgb, var(--academy-accent-2) 70%, transparent), inset 0 2px 0 rgba(255,255,255,0.35)",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full opacity-40"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1.4px)", backgroundSize: "14px 14px", maskImage: "radial-gradient(circle at 50% 20%, black 20%, transparent 60%)", WebkitMaskImage: "radial-gradient(circle at 50% 20%, black 20%, transparent 60%)" }}
          animate={reduce ? undefined : { backgroundPositionX: ["0px", "140px"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}

export default DottedGlobe;
