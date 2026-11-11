"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CursorTitle } from "@/components/shared/SectionHeading";
import { PerspectiveGrid } from "@/components/decor/PerspectiveGrid";
import { ExploreButton } from "./HomeHero";

/** Neon closing banner: cursor headline, one line, Explore + Talk to us, grid floor glowing underneath. */
export function FinalCta({ academyName }: { academyName: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="academy-card-glow relative isolate overflow-hidden rounded-3xl border border-accent/30 bg-night-surface px-6 pb-28 pt-16 text-center sm:px-12"
      >
        <div className="absolute inset-x-0 -top-24 -z-10 mx-auto h-64 w-2/3 rounded-full bg-accent opacity-25 blur-[100px]" aria-hidden />
        <PerspectiveGrid className="h-36" />
        <h2 className="heading-section text-white">
          <CursorTitle text="Ready to start_ learning?" />
        </h2>
        <p className="body-hero mx-auto mt-4 max-w-2xl text-night-soft">Find the course that fits your goals and take the first step with {academyName} today.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ExploreButton href="/courses" label="Browse courses" />
          <Link href="/contact" className="inline-flex h-12 items-center rounded-xl border border-night-line-strong px-6 body-medium text-white transition-colors hover:border-accent hover:text-accent">
            Talk to us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default FinalCta;
