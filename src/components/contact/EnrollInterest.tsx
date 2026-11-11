"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { CourseThumb } from "@/components/course/CourseThumb";

/** Shown when you arrive from a course's "Enroll now": the course, its price and how to enrol for now. */
export function EnrollInterest({ course, currency }: { course: AcademyCourseCard; currency: AcademyCurrency }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden rounded-2xl border border-accent-20 bg-accent-soft">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
        <Link href={`/courses/${course.slug}`} className="w-full shrink-0 overflow-hidden rounded-xl sm:w-48">
          <CourseThumb src={course.thumbnail} title={course.title} sizes="192px" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="body-xsm-medium text-accent">You&apos;re enrolling in</p>
          <Link href={`/courses/${course.slug}`} className="heading-h5 mt-1 block font-semibold text-primary-500 hover:text-accent">
            {course.title}
          </Link>
          <p className="heading-h4 mt-1 font-bold text-primary-500">{formatPrice(course.price, currency, course.isFree)}</p>
          <p className="mt-3 flex items-start gap-2 body-sm-regular text-primary-400">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Online enrolment is opening soon. For now, contact us by email or phone below and we&apos;ll get you set up.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default EnrollInterest;
