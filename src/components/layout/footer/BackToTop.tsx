"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Small round button that scrolls smoothly back to the top. */
export function BackToTop() {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-white"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}

export default BackToTop;
