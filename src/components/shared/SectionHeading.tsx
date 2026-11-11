"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface SectionHeadingProps {
  /** Small pill above the title. */
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  /** Use "_" where the blinking terminal cursor goes, e.g. "Our Courses_" or "Success_ Story". */
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  /** Animate on mount instead of on scroll-in (top of a page). */
  onMount?: boolean;
  /** Gradient bar under the title. */
  bar?: boolean;
  className?: string;
}

/** Accent "_" terminal cursor (gently pulsing — never fully disappears, so the words never look split). */
export function Cursor() {
  return (
    <motion.span className="academy-gradient-text" animate={{ opacity: [1, 0.45, 1] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} aria-hidden>
      _
    </motion.span>
  );
}

/** Title with each "_" rendered as the accent cursor (the academy site's signature heading style). */
export function CursorTitle({ text }: { text: string }) {
  const parts = text.split("_");
  return (
    <>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {p}
          {i < parts.length - 1 && <Cursor />}
        </React.Fragment>
      ))}
    </>
  );
}

/** Eyebrow pill + big white title with the cursor motif + accent gradient bar + intro line. */
export function SectionHeading({ eyebrow, eyebrowIcon, title, subtitle, align = "center", as = "h2", onMount = false, bar = true, className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Stagger className={cn("max-w-3xl", center ? "mx-auto text-center" : "text-left", className)} stagger={0.1} onMount={onMount}>
      {eyebrow && (
        <StaggerItem>
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-accent/30 bg-accent-10 px-4 py-1.5 body-sm-medium text-accent">
            {eyebrowIcon}
            {eyebrow}
          </span>
        </StaggerItem>
      )}
      <StaggerItem as={as} className={cn("heading-section text-white", eyebrow && "mt-4")}>
        <CursorTitle text={title} />
      </StaggerItem>
      {bar && (
        <StaggerItem>
          <motion.span
            className={cn("academy-gradient mt-5 block h-1.5 w-20 rounded-full", center && "mx-auto")}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            aria-hidden
          />
        </StaggerItem>
      )}
      {subtitle && (
        <StaggerItem as="p" className="body-hero mt-5 text-night-muted">
          {subtitle}
        </StaggerItem>
      )}
    </Stagger>
  );
}

export default SectionHeading;
