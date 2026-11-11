"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { CourseCard } from "./CourseCard";

/** Responsive grid of course cards; cards stagger in and re-flow smoothly when filters change. */
export function CourseGrid({ courses, currency, className, cols = 3 }: { courses: AcademyCourseCard[]; currency: AcademyCurrency; className?: string; cols?: 3 | 4 }) {
  return (
    <motion.div layout className={cn("grid gap-6 sm:grid-cols-2", cols === 4 ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-3", className)}>
      <AnimatePresence mode="popLayout">
        {courses.map((c, i) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: Math.min(i, 8) * 0.05 }}
          >
            <CourseCard course={c} currency={currency} priority={i < 3} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default CourseGrid;
