"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Neon perspective grid floor (synthwave style) that slowly scrolls toward the viewer, fading at the horizon. */
export function PerspectiveGrid({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden [perspective:420px]", className)} aria-hidden>
      <motion.div
        className="absolute -inset-x-1/2 bottom-0 h-[200%] origin-bottom [transform:rotateX(62deg)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--academy-accent) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--academy-accent-2) 45%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to top, black 10%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 85%)",
        }}
        animate={reduce ? undefined : { backgroundPositionY: ["0px", "56px"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default PerspectiveGrid;
