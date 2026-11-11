"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotGrid } from "@/components/shared/PageHero";

/** Full-screen message used when there is no academy to show (not found, unavailable, service down). */
export function StateScreen({ icon, eyebrow, title, text, children }: { icon: React.ReactNode; eyebrow: string; title: string; text: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-accent-soft via-night to-night px-4">
      <DotGrid id="state-dots" />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="max-w-lg text-center">
        <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-accent">
          {icon}
        </motion.span>
        <p className="body-sm-medium mt-6 text-accent">{eyebrow}</p>
        <h1 className="heading-h1-bold mt-2 text-white">{title}</h1>
        <p className="body-regular mt-3 text-night-muted">{text}</p>
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </motion.div>
    </section>
  );
}

export default StateScreen;
