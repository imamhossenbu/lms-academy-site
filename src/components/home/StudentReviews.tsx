import React from "react";
import type { AcademyReview } from "@/types/academy";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ReviewCard } from "@/components/reviews/ReviewCard";

/** "What our learners say" — real approved reviews only; hidden when there are none. */
export function StudentReviews({ reviews, rating, total }: { reviews: AcademyReview[]; rating: number; total: number }) {
  if (reviews.length === 0) return null;
  return (
    <section className="bg-gray-bg/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Reviews"
          title="What our learners say"
          highlight="learners"
          subtitle={total > 0 && rating > 0 ? `Rated ${rating.toFixed(1)} out of 5 across ${total.toLocaleString("en-US")} ${total === 1 ? "review" : "reviews"}.` : undefined}
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {reviews.map((r) => (
            <StaggerItem key={r.id} className="h-full">
              <ReviewCard review={r} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default StudentReviews;
