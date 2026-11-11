import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CourseGrid } from "@/components/course/CourseGrid";
import { EmptyState } from "@/components/shared/EmptyState";

/** "Popular courses" grid (most enrolled first) with a link to the full catalogue; an invite to check back when there are none. */
export function FeaturedCourses({ courses, total, currency }: { courses: AcademyCourseCard[]; total: number; currency: AcademyCurrency }) {
  return (
    <section className="bg-gray-bg/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow="Courses" title="Popular courses" highlight="courses" subtitle="Our learners' favourite courses right now." className="max-w-2xl" />
          {total > courses.length && (
            <ButtonLink href="/courses" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
              View all {total} courses
            </ButtonLink>
          )}
        </div>
        <div className="mt-12">
          {courses.length > 0 ? (
            <CourseGrid courses={courses} currency={currency} />
          ) : (
            <EmptyState icon={<BookOpen className="h-7 w-7" />} title="New courses are on the way" text="We're preparing our first courses. Check back soon — or get in touch to hear when they open." action={<ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>} />
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCourses;
