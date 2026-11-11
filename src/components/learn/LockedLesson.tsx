"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

/** Shown instead of the lesson when the drip / prerequisite / schedule rules keep it closed. */
export function LockedLesson({ title, reason }: { title: string; reason: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center rounded-2xl border border-dashed border-night-line bg-night-surface px-6 py-16 text-center">
      <span className="academy-neon flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-accent text-accent">
        <Lock className="h-7 w-7" />
      </span>
      <h2 className="heading-h3 mt-6 font-bold text-white">{title}</h2>
      <p className="body-regular mt-2 max-w-md text-night-soft">{reason}</p>
    </motion.div>
  );
}

export default LockedLesson;
