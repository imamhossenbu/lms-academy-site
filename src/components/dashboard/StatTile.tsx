"use client";

import React from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";

/** Dashboard number tile: neon icon, animated count, label. */
export function StatTile({ icon, label, value, suffix = "", index = 0 }: { icon: React.ReactNode; label: string; value: number; suffix?: string; index?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }} whileHover={{ y: -3 }} className="rounded-2xl border border-night-line bg-night-surface p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent">
        {icon}
      </span>
      <p className="heading-h2-bold mt-4 text-white">
        <CountUp to={value} suffix={suffix} />
      </p>
      <p className="body-sm-regular text-night-muted">{label}</p>
    </motion.div>
  );
}

export default StatTile;
