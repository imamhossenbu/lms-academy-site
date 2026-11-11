import React from "react";
import { ArrowRight } from "lucide-react";
import type { AcademyInstructor } from "@/types/academy";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { InstructorCard } from "@/components/instructors/InstructorCard";

/** Up to four instructors with a link to all of them. Hidden until someone has a published course. */
export function InstructorsPreview({ instructors }: { instructors: AcademyInstructor[] }) {
  if (instructors.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading align="left" title="Our_ Instructors" subtitle="The people behind our courses." className="max-w-2xl" />
        {instructors.length > 4 && (
          <ButtonLink href="/instructors" variant="secondary" icon={<ArrowRight className="h-4 w-4" />}>
            All instructors
          </ButtonLink>
        )}
      </div>
      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {instructors.slice(0, 4).map((i) => (
          <StaggerItem key={i.id} className="h-full">
            <InstructorCard instructor={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export default InstructorsPreview;
