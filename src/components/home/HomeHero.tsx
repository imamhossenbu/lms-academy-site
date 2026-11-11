"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpenCheck, Code2, Lightbulb, Rocket } from "lucide-react";
import type { AcademyProfile } from "@/types/academy";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CursorTitle } from "@/components/shared/SectionHeading";
import { GlowOrbs } from "@/components/decor/GlowOrbs";
import { NeonIcon } from "@/components/decor/NeonIcon";
import { NeonSkyline } from "@/components/decor/NeonSkyline";
import { PerspectiveGrid } from "@/components/decor/PerspectiveGrid";
import { Starfield } from "@/components/decor/Starfield";

/** Home hero: night sky, floating neon icons, cursor headline, tagline, angled Explore button, popular categories, neon city + grid floor. */
export function HomeHero({ academy, signedIn }: { academy: AcademyProfile; signedIn: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-night">
      <GlowOrbs />
      <Starfield />
      <PerspectiveGrid className="bottom-24 h-56 opacity-70 sm:bottom-32" />
      <NeonSkyline />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-4 pb-64 pt-20 text-center sm:px-6 sm:pb-80 sm:pt-28">
        <NeonIcon icon={Code2} className="left-[6%] top-16 hidden sm:flex" rotate={-12} delay={0.4} />
        <NeonIcon icon={Lightbulb} className="right-[8%] top-12 hidden sm:flex" rotate={10} delay={0.6} />
        <NeonIcon icon={BookOpenCheck} className="left-[12%] top-64 hidden md:flex" rotate={8} delay={0.8} />
        <NeonIcon icon={Rocket} className="right-[12%] top-60 hidden md:flex" rotate={-8} delay={1} />

        <Stagger onMount stagger={0.12}>
          <StaggerItem>
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-accent/30 bg-accent-10 px-4 py-1.5 body-sm-medium text-accent">Welcome to {academy.name}</span>
          </StaggerItem>
          <StaggerItem as="h1" className="heading-hero mt-6 text-white">
            <CursorTitle text="Learn Today_ Lead Tomorrow" />
          </StaggerItem>
          <StaggerItem as="p" className="body-hero mx-auto mt-5 max-w-2xl text-night-soft">
            {academy.tagline || `Practical courses and hands-on practice from ${academy.name} — learn at your own pace and build skills that get you hired.`}
          </StaggerItem>
          <StaggerItem className="mt-9 flex flex-wrap justify-center gap-3">
            <ExploreButton href="/courses" label="Explore courses" />
            {!signedIn && (
              <Link href="/signup" className="inline-flex h-12 items-center rounded-xl border border-night-line-strong px-6 body-medium text-white transition-colors hover:border-accent hover:text-accent">
                Create free account
              </Link>
            )}
          </StaggerItem>
          {academy.categories.length > 0 && (
            <StaggerItem className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {academy.categories.slice(0, 5).map((c) => (
                <motion.span key={c.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href={`/courses?category=${c.slug}`} className="inline-flex whitespace-nowrap rounded-full border border-night-line bg-white/5 px-3.5 py-1 body-xsm-medium text-night-soft backdrop-blur transition-colors hover:border-accent hover:text-accent">
                    {c.name}
                  </Link>
                </motion.span>
              ))}
            </StaggerItem>
          )}
        </Stagger>
      </div>
    </section>
  );
}

/** Angled neon gradient button (clipped corner), the hero's main call to action. */
export function ExploreButton({ href, label }: { href: string; label: string }) {
  return (
    <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className="inline-flex">
      <Link
        href={href}
        className="academy-gradient academy-glow-btn group inline-flex h-12 items-center gap-2 px-8 body-medium font-semibold text-white"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 62%, 90% 100%, 0 100%)", borderRadius: "10px 10px 10px 10px" }}
      >
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.span>
  );
}

export default HomeHero;
