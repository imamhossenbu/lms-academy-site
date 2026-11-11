"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowOrbs } from "@/components/decor/GlowOrbs";
import { PerspectiveGrid } from "@/components/decor/PerspectiveGrid";
import { Starfield } from "@/components/decor/Starfield";
import { SectionHeading } from "./SectionHeading";

interface PageHeroProps {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  /** "_" marks where the blinking cursor goes. */
  title: string;
  subtitle?: string;
  /** Content under the heading (search box, chips…). */
  children?: React.ReactNode;
  compact?: boolean;
}

/** Top of an inner page: night sky with accent glows, twinkling dots, neon grid floor, cursor-style h1. */
export function PageHero({ eyebrow, eyebrowIcon, title, subtitle, children, compact }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-night">
      <GlowOrbs intensity={0.8} />
      <Starfield />
      <PerspectiveGrid className="h-40 opacity-60" />
      <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 ${compact ? "pb-16 pt-14 sm:pt-16" : "pb-24 pt-20"}`}>
        <SectionHeading as="h1" onMount eyebrow={eyebrow} eyebrowIcon={eyebrowIcon} title={title} subtitle={subtitle} />
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} className="mt-8">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Faint accent dot pattern that fades out from the centre. */
export function DotGrid({ id = "hero-dots" }: { id?: string }) {
  return (
    <svg className="absolute inset-0 -z-10 h-full w-full text-accent opacity-25" aria-hidden>
      <defs>
        <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
        <radialGradient id={`${id}-fade`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} mask={`url(#${id}-mask)`} />
    </svg>
  );
}

export default PageHero;
