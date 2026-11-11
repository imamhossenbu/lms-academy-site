"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Waves } from "./Waves";

interface PageHeroProps {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  /** Phrase of the title in the accent colour with the hand-drawn underline. */
  highlight?: string;
  subtitle?: string;
  /** Content under the heading (search box, chips…). */
  children?: React.ReactNode;
  compact?: boolean;
}

/** Top of an inner page: soft accent gradient, drifting glows, dot grid, h1 with eyebrow + highlight, waves below. */
export function PageHero({ eyebrow, eyebrowIcon, title, highlight, subtitle, children, compact }: PageHeroProps) {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent-soft via-white to-white">
      <motion.div
        className="absolute -left-32 -top-24 -z-10 h-112 w-112 rounded-full bg-accent-20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-accent-10 blur-3xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <DotGrid />
      <Waves className="opacity-60" />
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${compact ? "pb-14 pt-12 sm:pt-14" : "pb-20 pt-16 sm:pt-20"}`}>
        <SectionHeading as="h1" onMount eyebrow={eyebrow} eyebrowIcon={eyebrowIcon} title={title} highlight={highlight} underline={!!highlight} subtitle={subtitle} />
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
    <svg className="absolute inset-0 -z-10 h-full w-full text-accent opacity-20" aria-hidden>
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
