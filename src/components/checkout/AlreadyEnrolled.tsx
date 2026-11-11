import React from "react";
import { BadgeCheck } from "lucide-react";
import type { CheckoutQuote } from "@/types/academy";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EmptyState } from "@/components/shared/EmptyState";

/** Shown instead of the checkout when the learner already has the course. */
export function AlreadyEnrolled({ course }: { course: CheckoutQuote["course"] }) {
  return (
    <EmptyState
      icon={<BadgeCheck className="h-7 w-7" />}
      title="You're already enrolled"
      text={`"${course.title}" is already in your courses — no need to buy it again.`}
      action={
        <div className="flex flex-wrap justify-center gap-2">
          <ButtonLink href="/my-courses">Go to my courses</ButtonLink>
          <ButtonLink href={`/courses/${course.slug}`} variant="secondary">
            View course
          </ButtonLink>
        </div>
      }
    />
  );
}

export default AlreadyEnrolled;
