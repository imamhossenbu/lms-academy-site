import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/shared/EmptyState";
import { Reveal } from "@/components/shared/Reveal";
import { ShowcaseCard } from "./showcase/ShowcaseCard";
import { ShowcaseCopy } from "./showcase/ShowcaseCopy";

/** "Our Courses_": the most popular courses as big alternating rows (card on one side, story on the other). */
export function CourseShowcase({ courses, total, currency }: { courses: AcademyCourseCard[]; total: number; currency: AcademyCurrency }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading title="Our Courses_" subtitle="Hand-picked, practical courses — start with the one that fits your goal." />
      <div className="mt-16 space-y-20">
        {courses.length === 0 && (
          <EmptyState icon={<BookOpen className="h-7 w-7" />} title="New courses are on the way" text="We're preparing our first courses. Check back soon — or get in touch to hear when they open." action={<ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>} />
        )}
        {courses.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={c.id}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={cn(flip && "lg:order-2")}>
                  <ShowcaseCard course={c} flip={flip} />
                </div>
                <div className={cn(flip && "lg:order-1")}>
                  <ShowcaseCopy course={c} currency={currency} alignRight={flip} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      {total > courses.length && (
        <div className="mt-16 text-center">
          <ButtonLink href="/courses" variant="secondary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            View all {total} courses
          </ButtonLink>
        </div>
      )}
    </section>
  );
}

export default CourseShowcase;
