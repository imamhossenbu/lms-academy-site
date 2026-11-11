import React from "react";
import Link from "next/link";
import type { CheckoutQuote } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { CourseThumb } from "@/components/course/CourseThumb";

/** The course being bought: cover, title, instructor and level. */
export function CheckoutCourse({ course }: { course: CheckoutQuote["course"] }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-dash bg-white p-4 sm:flex-row sm:items-center">
      <Link href={`/courses/${course.slug}`} className="w-full shrink-0 overflow-hidden rounded-xl sm:w-44">
        <CourseThumb src={course.thumbnail} title={course.title} sizes="176px" />
      </Link>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-1.5">
          {course.level && (
            <ToneBadge tone="accent" size="sm">
              {course.level.charAt(0).toUpperCase() + course.level.slice(1).toLowerCase()}
            </ToneBadge>
          )}
          {course.isFree && (
            <ToneBadge tone="green" size="sm">
              Free
            </ToneBadge>
          )}
        </div>
        <Link href={`/courses/${course.slug}`} className="heading-h5 mt-2 block font-semibold text-primary-500 hover:text-accent">
          {course.title}
        </Link>
        <p className="body-sm-regular mt-1 text-primary-300">By {course.instructor}</p>
      </div>
    </div>
  );
}

export default CheckoutCourse;
