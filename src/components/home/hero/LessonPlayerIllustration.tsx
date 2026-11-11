"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Play } from "lucide-react";

const STEPS = ["Welcome & overview", "Core concepts", "Hands-on practice", "Quiz & feedback"];

/** Decorative lesson player (video area, progress bar, module checklist) shown before the academy has published courses. */
export function LessonPlayerIllustration({ academyName }: { academyName: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-dash bg-white shadow-2xl shadow-primary-500/10" aria-hidden>
      <div className="flex items-center gap-1.5 border-b border-dash px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green/60" />
        <span className="ml-3 body-xsm-medium truncate text-primary-300">{academyName} · Classroom</span>
      </div>
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-accent via-accent-hover to-brand-navy">
        <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity }} className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-accent shadow-xl">
          <Play className="ml-1 h-7 w-7 fill-current" />
        </motion.span>
        <div className="absolute inset-x-5 bottom-4 h-1.5 overflow-hidden rounded-full bg-white/25">
          <motion.span className="block h-full rounded-full bg-white" initial={{ width: "8%" }} animate={{ width: "62%" }} transition={{ duration: 2.4, ease: "easeOut", delay: 0.6 }} />
        </div>
      </div>
      <ul className="divide-y divide-dash">
        {STEPS.map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.12 }} className="flex items-center gap-3 px-5 py-3">
            {i < 2 ? <CheckCircle2 className="h-4 w-4 text-green" /> : <Circle className="h-4 w-4 text-slate-300" />}
            <span className={`body-sm-medium ${i === 2 ? "text-accent" : "text-primary-400"}`}>{s}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default LessonPlayerIllustration;
