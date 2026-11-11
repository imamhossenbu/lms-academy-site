"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Globe, Signal, Users } from "lucide-react";
import { compact } from "@/lib/format";
import type { AcademyCourseDetail } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { ToneBadge } from "@/components/ui/ToneBadge";

/** Dark band at the top of a course page: breadcrumbs, title, summary, rating, learners, instructor, level and language. */
export function CourseHeader({ course }: { course: AcademyCourseDetail }) {
  return (
    <section className="relative isolate overflow-hidden bg-night-deep text-white">
      <div className="absolute -left-40 -top-40 -z-10 h-112 w-112 rounded-full bg-accent-20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-accent-10 blur-3xl" aria-hidden />
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:pb-16">
        <div className="lg:max-w-[calc(100%-400px)]">
          <nav className="flex flex-wrap items-center gap-1.5 body-xsm-medium text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/courses" className="hover:text-white">
              Courses
            </Link>
            {course.category && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href={`/courses?category=${course.category.slug}`} className="hover:text-white">
                  {course.category.name}
                </Link>
              </>
            )}
          </nav>

          <div className="mt-5 flex flex-wrap gap-2">
            {course.category && (
              <ToneBadge tone="accent" variant="pill">
                {course.category.name}
              </ToneBadge>
            )}
            {course.isFree && (
              <ToneBadge tone="green" variant="pill">
                Free course
              </ToneBadge>
            )}
          </div>
          <h1 className="heading-section mt-4 text-white">{course.title}</h1>
          {course.shortDescription && <p className="body-hero mt-4 text-white/70">{course.shortDescription}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 body-sm-regular text-white/70">
            {course.rating > 0 && course.reviewCount > 0 && (
              <a href="#reviews" className="inline-flex items-center gap-2 hover:text-white">
                <span className="body-sm-medium font-semibold text-yellow">{course.rating.toFixed(1)}</span>
                <StarRating value={course.rating} />
                <span>({course.reviewCount.toLocaleString("en-US")} {course.reviewCount === 1 ? "review" : "reviews"})</span>
              </a>
            )}
            {course.students > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {compact(course.students)} {course.students === 1 ? "learner" : "learners"}
              </span>
            )}
            {course.level && (
              <span className="inline-flex items-center gap-1.5">
                <Signal className="h-4 w-4" />
                {course.level}
              </span>
            )}
            {course.language && (
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-4 w-4" />
                {course.language}
              </span>
            )}
          </div>

          <a href="#instructor" className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/5 py-1.5 pl-1.5 pr-4 ring-1 ring-white/10 transition-colors hover:bg-white/10">
            <Avatar name={course.instructor.name} src={course.instructor.avatar} size="sm" />
            <span className="body-sm-regular text-white/70">
              Created by <span className="font-semibold text-white">{course.instructor.name}</span>
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default CourseHeader;
