"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Friendly "nothing here yet" panel: accent icon tile, title, one line, optional action. */
export function EmptyState({ icon, title, text, action, className }: { icon: React.ReactNode; title: string; text: string; action?: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-dash bg-white px-6 py-12 text-center", className)}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light text-accent">{icon}</span>
      <h3 className="heading-h5 mt-4 font-semibold text-primary-500">{title}</h3>
      <p className="body-sm-regular mt-1.5 text-primary-300">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}

export default EmptyState;
