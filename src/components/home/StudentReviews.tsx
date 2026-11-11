"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AcademyReview } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/** Card tints, cycled (warm, indigo, teal, violet) so the wall of stories feels lively. */
const TINTS = ["from-story-amber to-story-amber-deep", "from-story-indigo to-story-indigo-deep", "from-story-teal to-story-teal-deep", "from-story-violet to-story-violet-deep"];

/** "Success_ Story": approved learner reviews as colourful gradient cards; hidden when there are none. */
export function StudentReviews({ reviews, rating, total }: { reviews: AcademyReview[]; rating: number; total: number }) {
  if (reviews.length === 0) return null;
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading title="Success_ Story" subtitle={total > 0 && rating > 0 ? `Rated ${rating.toFixed(1)} out of 5 across ${total.toLocaleString("en-US")} ${total === 1 ? "review" : "reviews"}.` : undefined} />
      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {reviews.map((r, i) => (
          <StaggerItem key={r.id} className="h-full">
            <motion.figure whileHover={{ y: -6 }} className={cn("flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b p-6", TINTS[i % TINTS.length])}>
              <div className="flex items-center justify-between">
                <Quote className="h-8 w-8 fill-white text-white" />
                <StarRating value={r.rating} size="xs" />
              </div>
              <blockquote className="body-regular mt-5 line-clamp-6 flex-1 text-white/90">{r.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar name={r.student.name} src={r.student.avatar} size="md" className="ring-2 ring-white/20" />
                <span className="min-w-0">
                  <span className="block body-sm-medium truncate font-semibold text-white">{r.student.name}</span>
                  {r.course && (
                    <Link href={`/courses/${r.course.slug}`} className="block body-xsm-regular truncate text-white/60 hover:text-white">
                      {r.course.title}
                    </Link>
                  )}
                </span>
              </figcaption>
            </motion.figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export default StudentReviews;
