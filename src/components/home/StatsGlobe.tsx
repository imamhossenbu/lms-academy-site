"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Star } from "lucide-react";
import type { AcademyProfile } from "@/types/academy";
import { CountUp } from "@/components/motion/CountUp";
import { CursorTitle } from "@/components/shared/SectionHeading";
import { DottedGlobe } from "@/components/decor/DottedGlobe";
import { AppPromo } from "./AppPromo";

/** Planet backdrop with a gradient stats card (learners, rating, courses — real numbers) and, when set up, the mobile app promo. */
export function StatsGlobe({ academy }: { academy: AcademyProfile }) {
  const s = academy.stats;
  const items = [
    s.students > 0 && { node: <CountUp to={s.students} suffix={s.students >= 10 ? "+" : ""} />, label: s.students === 1 ? "Learner" : "Learners" },
    s.rating > 0 && { node: <span className="inline-flex items-center gap-1">{s.rating.toFixed(1)}<Star className="h-7 w-7 fill-yellow text-yellow" /></span>, label: "Average rating" },
    s.courses > 0 && { node: <CountUp to={s.courses} />, label: s.courses === 1 ? "Course" : "Courses" },
    s.lessons > 0 && { node: <CountUp to={s.lessons} suffix={s.lessons >= 10 ? "+" : ""} />, label: "Lessons" },
  ].filter(Boolean).slice(0, 3) as { node: React.ReactNode; label: string }[];
  if (items.length === 0 && !academy.site?.app) return null;

  return (
    <section className="relative isolate overflow-hidden pb-32 pt-24">
      <DottedGlobe />
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h2 className="heading-section text-white">
          <CursorTitle text={`${academy.name}_ in numbers`} />
        </h2>
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn("academy-gradient academy-card-glow mx-auto mt-14 grid max-w-3xl divide-y divide-white/25 rounded-3xl px-6 py-8 sm:divide-x sm:divide-y-0", items.length === 3 ? "sm:grid-cols-3" : items.length === 2 ? "sm:grid-cols-2" : "")}
          >
            {items.map((it) => (
              <div key={it.label} className="px-4 py-4 sm:py-0">
                <p className="heading-display-h1 text-white">{it.node}</p>
                <p className="body-medium mt-2 font-semibold text-white/90">{it.label}</p>
              </div>
            ))}
          </motion.div>
        )}
        {academy.site?.app && <AppPromo app={academy.site.app} />}
      </div>
    </section>
  );
}

export default StatsGlobe;
