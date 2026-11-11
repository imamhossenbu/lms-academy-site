"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import type { AcademyCourseDetail } from "@/types/academy";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { DetailSection } from "./DetailSection";

/** Average + 5→1 star bars beside the latest approved reviews. */
export function CourseReviews({ course }: { course: Pick<AcademyCourseDetail, "rating" | "reviewCount" | "ratingBreakdown" | "reviews"> }) {
  const total = course.ratingBreakdown.reduce((s, r) => s + r.count, 0);
  return (
    <DetailSection id="reviews" title="Learner reviews">
      {total === 0 ? (
        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-night-line p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent">
            <MessageSquareText className="h-5 w-5" />
          </span>
          <p className="body-sm-regular text-night-muted">No reviews yet. Learners can rate this course once they&apos;ve enrolled.</p>
        </div>
      ) : (
        <>
          <div className="grid items-center gap-6 rounded-2xl border border-night-line bg-night-surface p-6 sm:grid-cols-[160px_1fr]">
            <div className="text-center">
              <p className="heading-display-h1 text-white">{course.rating.toFixed(1)}</p>
              <StarRating value={course.rating} size="md" className="mt-1" />
              <p className="body-xsm-regular mt-1 text-night-muted">
                {total.toLocaleString("en-US")} {total === 1 ? "review" : "reviews"}
              </p>
            </div>
            <ul className="space-y-2">
              {course.ratingBreakdown.map((r) => {
                const pct = total ? Math.round((r.count / total) * 100) : 0;
                return (
                  <li key={r.stars} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 body-xsm-medium text-night-soft">{r.stars} star</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-night-skeleton-strong">
                      <motion.span className="block h-full rounded-full bg-yellow" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} />
                    </span>
                    <span className="w-10 shrink-0 text-right body-xsm-regular text-night-muted">{pct}%</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {course.reviews.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {course.reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          )}
        </>
      )}
    </DetailSection>
  );
}

export default CourseReviews;
