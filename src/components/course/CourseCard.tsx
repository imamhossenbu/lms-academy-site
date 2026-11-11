"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users } from "lucide-react";
import { compact, formatDuration, formatPrice } from "@/lib/format";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { CourseThumb } from "./CourseThumb";

/** Catalogue card: cover with category / level badges, title, instructor, lessons + duration, rating, students and price. */
export function CourseCard({ course, currency, priority }: { course: AcademyCourseCard; currency: AcademyCurrency; priority?: boolean }) {
  const duration = formatDuration(course.durationMinutes);
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="h-full">
      <Link
        href={`/courses/${course.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-dash bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-primary-500/5"
      >
        <div className="relative">
          <CourseThumb src={course.thumbnail} title={course.title} priority={priority} />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {course.category && (
              <ToneBadge tone="white" size="sm" variant="pill">
                {course.category.name}
              </ToneBadge>
            )}
          </div>
          {course.isFree && (
            <ToneBadge tone="green" size="sm" variant="pill" className="absolute right-3 top-3">
              Free
            </ToneBadge>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            {course.level && (
              <ToneBadge tone="accent" size="sm">
                {course.level}
              </ToneBadge>
            )}
            {course.rating > 0 && (
              <span className="inline-flex items-center gap-1.5 body-xsm-medium text-primary-500">
                <StarRating value={course.rating} size="xs" />
                {course.rating.toFixed(1)}
                <span className="text-primary-300">({course.reviewCount})</span>
              </span>
            )}
          </div>

          <h3 className="heading-h5 mt-3 line-clamp-2 font-semibold text-primary-500 transition-colors group-hover:text-accent">{course.title}</h3>
          <p className="body-sm-regular mt-1.5 line-clamp-2 text-primary-300">{course.shortDescription}</p>

          <div className="mt-4 flex items-center gap-2">
            <Avatar name={course.instructor.name} src={course.instructor.avatar} size="xs" />
            <span className="body-xsm-medium truncate text-primary-400">{course.instructor.name}</span>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-dash pt-4 body-xsm-regular text-primary-300">
              {course.lessons > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {course.lessons} lessons
                </span>
              )}
              {duration && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {duration}
                </span>
              )}
              {course.students > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {compact(course.students)}
                </span>
              )}
              <span className="ml-auto heading-h5 font-bold text-primary-500">{formatPrice(course.price, currency, course.isFree)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CourseCard;
