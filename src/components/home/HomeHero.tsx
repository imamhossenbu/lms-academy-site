"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { AcademyCourseCard, AcademyCurrency, AcademyProfile } from "@/types/academy";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { DotGrid } from "@/components/shared/PageHero";
import { Waves } from "@/components/shared/Waves";
import { HeroSearch } from "./HeroSearch";
import { HeroStats } from "./HeroStats";
import { HeroVisual } from "./hero/HeroVisual";

/** Home hero: welcome pill, headline with the academy's name, tagline, course search, popular categories, live stats, course collage. */
export function HomeHero({ academy, courses, currency }: { academy: AcademyProfile; courses: AcademyCourseCard[]; currency: AcademyCurrency }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent-soft via-white to-white">
      <motion.div className="absolute -left-40 -top-32 -z-10 h-120 w-120 rounded-full bg-accent-20 blur-3xl" animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 24, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} aria-hidden />
      <motion.div className="absolute -right-24 top-24 -z-10 h-96 w-96 rounded-full bg-accent-10 blur-3xl" animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} aria-hidden />
      <DotGrid id="home-dots" />
      <Waves className="opacity-50" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <Stagger onMount stagger={0.1}>
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 body-sm-medium text-accent whitespace-nowrap">
              <Sparkles className="h-4 w-4" />
              Welcome to {academy.name}
            </span>
          </StaggerItem>
          <StaggerItem as="h1" className="heading-hero mt-6 text-primary-500">
            Learn the skills that <span className="text-accent">move you forward</span>
          </StaggerItem>
          <StaggerItem as="p" className="body-hero mt-5 max-w-xl text-primary-300">
            {academy.tagline || `Practical courses and hands-on practice from ${academy.name} — learn at your own pace, on any device.`}
          </StaggerItem>
          <StaggerItem className="mt-8">
            <HeroSearch />
          </StaggerItem>
          {academy.categories.length > 0 && (
            <StaggerItem className="mt-5 flex flex-wrap items-center gap-2">
              <span className="body-xsm-medium text-primary-300">Popular:</span>
              {academy.categories.slice(0, 4).map((c) => (
                <motion.span key={c.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href={`/courses?category=${c.slug}`} className="inline-flex whitespace-nowrap rounded-full border border-dash bg-white px-3 py-1 body-xsm-medium text-primary-400 transition-colors hover:border-accent hover:text-accent">
                    {c.name}
                  </Link>
                </motion.span>
              ))}
            </StaggerItem>
          )}
          <StaggerItem className="mt-10">
            <HeroStats stats={academy.stats} />
          </StaggerItem>
        </Stagger>

        <HeroVisual courses={courses} currency={currency} academyName={academy.name} />
      </div>
    </section>
  );
}

export default HomeHero;
