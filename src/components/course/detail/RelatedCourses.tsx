import React from "react";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CourseGrid } from "@/components/course/CourseGrid";

/** "You might also like": up to three courses from the same category or instructor. */
export function RelatedCourses({ courses, currency }: { courses: AcademyCourseCard[]; currency: AcademyCurrency }) {
  if (courses.length === 0) return null;
  return (
    <section className="bg-night-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading align="left" eyebrow="Keep learning" title="You might_ also like" />
        <CourseGrid courses={courses} currency={currency} className="mt-10" />
      </div>
    </section>
  );
}

export default RelatedCourses;
