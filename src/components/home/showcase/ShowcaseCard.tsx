"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AcademyCourseCard } from "@/types/academy";
import { CourseThumb } from "@/components/course/CourseThumb";

/** Big tinted course card: cover with a pulsing play button, title and the enrol button. Alternate cards flip the gradient. */
export function ShowcaseCard({ course, flip }: { course: AcademyCourseCard; flip: boolean }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className={cn("academy-card-glow rounded-3xl p-5 sm:p-6", flip ? "bg-gradient-to-bl" : "bg-gradient-to-br", "from-accent/60 via-accent-2/35 to-night-surface")}>
      <Link href={`/courses/${course.slug}`} className="group relative block overflow-hidden rounded-2xl">
        <CourseThumb src={course.thumbnail} title={course.title} sizes="(min-width: 1024px) 520px, 100vw" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
          <motion.span className="academy-gradient flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.2, repeat: Infinity }}>
            <Play className="ml-1 h-7 w-7 fill-current" />
          </motion.span>
        </span>
      </Link>
      <h3 className="heading-h3 mt-5 font-bold text-white">{course.title}</h3>
      <motion.span whileTap={{ scale: 0.96 }} className="mt-4 inline-flex">
        <Link href={`/checkout/${course.slug}`} className="inline-flex h-11 items-center rounded-xl bg-white px-5 body-sm-medium font-semibold text-night transition-colors hover:bg-white/90">
          {course.isFree ? "Start for free" : "Enroll now"}
        </Link>
      </motion.span>
    </motion.div>
  );
}

export default ShowcaseCard;
