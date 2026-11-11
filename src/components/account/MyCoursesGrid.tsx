import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import type { MyCourse } from "@/types/academy";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/shared/EmptyState";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { MyCourseCard } from "./MyCourseCard";

/** The learner's courses, or an invite to browse the catalogue. */
export function MyCoursesGrid({ items }: { items: MyCourse[] }) {
  if (items.length === 0)
    return (
      <EmptyState
        icon={<BookOpen className="h-7 w-7" />}
        title="No courses yet"
        text="Courses you enrol in will show up here."
        action={
          <ButtonLink href="/courses" icon={<ArrowRight className="h-4 w-4" />}>
            Browse courses
          </ButtonLink>
        }
      />
    );
  return (
    <Stagger onMount className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
      {items.map((i) => (
        <StaggerItem key={i.course.slug} className="h-full">
          <MyCourseCard item={i} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default MyCoursesGrid;
