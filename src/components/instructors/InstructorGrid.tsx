import React from "react";
import { Users } from "lucide-react";
import type { AcademyInstructor } from "@/types/academy";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { EmptyState } from "@/components/shared/EmptyState";
import { InstructorCard } from "./InstructorCard";

/** All instructors with a published course (bio shown), or an empty state. */
export function InstructorGrid({ instructors }: { instructors: AcademyInstructor[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      {instructors.length === 0 ? (
        <EmptyState icon={<Users className="h-7 w-7" />} title="Instructors coming soon" text="Our instructors will appear here as soon as their first course is published." />
      ) : (
        <Stagger onMount className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.06}>
          {instructors.map((i) => (
            <StaggerItem key={i.id} className="h-full">
              <InstructorCard instructor={i} showBio />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  );
}

export default InstructorGrid;
