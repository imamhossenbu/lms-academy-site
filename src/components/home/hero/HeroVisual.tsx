"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { HeroCourseStack } from "./HeroCourseStack";
import { LessonPlayerIllustration } from "./LessonPlayerIllustration";

/** Right side of the hero: the academy's top courses as a floating stack, or a lesson-player illustration before any course is published. */
export function HeroVisual({ courses, currency, academyName }: { courses: AcademyCourseCard[]; currency: AcademyCurrency; academyName: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative mx-auto w-full max-w-lg"
    >
      <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        {courses.length > 0 ? <HeroCourseStack courses={courses.slice(0, 3)} currency={currency} /> : <LessonPlayerIllustration academyName={academyName} />}
      </motion.div>
    </motion.div>
  );
}

export default HeroVisual;
