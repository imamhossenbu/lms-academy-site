"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface SectionHeadingProps {
  /** Small pill above the title. */
  eyebrow?: string;
  /** Icon shown inside the pill, before the text. */
  eyebrowIcon?: React.ReactNode;
  title: string;
  /** A word / phrase of `title` to colour in the accent (first match). */
  highlight?: string;
  /** Put the highlighted phrase on its own line. */
  highlightOnNewLine?: boolean;
  /** Draw a hand-drawn orange stroke under the highlight. */
  underline?: boolean;
  subtitle?: string;
  align?: "center" | "left";
  /** Heading level: "h1" for a page hero. */
  as?: "h1" | "h2";
  /** Animate on mount instead of on scroll-in (for content at the top of a page). */
  onMount?: boolean;
  className?: string;
}

/** Accent swoosh under a word; draws itself in when the heading appears. */
function Swoosh() {
  return (
    <svg viewBox="0 0 300 16" preserveAspectRatio="none" className="absolute -bottom-2 left-1/4 h-3 w-3/4 text-accent" aria-hidden>
      <motion.path
        d="M2 12 C 80 2, 200 1, 298 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      />
    </svg>
  );
}

/** Pill eyebrow + large title (optional accent highlight / underline) + intro line, used at the top of each section. */
export function SectionHeading({ eyebrow, eyebrowIcon, title, highlight, highlightOnNewLine, underline, subtitle, align = "center", as = "h2", onMount = false, className }: SectionHeadingProps) {
  const at = highlight ? title.indexOf(highlight) : -1;
  return (
    <Stagger className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)} stagger={0.1} onMount={onMount}>
      {eyebrow && (
        <StaggerItem>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 body-sm-medium text-accent whitespace-nowrap">
            {eyebrowIcon}
            {eyebrow}
          </span>
        </StaggerItem>
      )}
      <StaggerItem as={as} className="heading-section text-primary-500 mt-4">
        {at >= 0 ? (
          <>
            {title.slice(0, at)}
            <span className={cn("relative text-accent", highlightOnNewLine ? "block" : "inline-block")}>
              {highlight}
              {underline && <Swoosh />}
            </span>
            {title.slice(at + highlight!.length)}
          </>
        ) : (
          title
        )}
      </StaggerItem>
      {subtitle && (
        <StaggerItem as="p" className="body-hero text-primary-300 mt-4">
          {subtitle}
        </StaggerItem>
      )}
    </Stagger>
  );
}

export default SectionHeading;
