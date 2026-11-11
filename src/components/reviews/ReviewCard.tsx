import React from "react";
import Link from "next/link";
import { Quote } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { AcademyReview } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";

/** One approved student review: stars, text, student and (on the home page) the course it's about. */
export function ReviewCard({ review }: { review: AcademyReview }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-dash bg-white p-6">
      <div className="flex items-center justify-between">
        <StarRating value={review.rating} />
        <Quote className="h-6 w-6 text-accent-20" />
      </div>
      <blockquote className="body-regular mt-4 line-clamp-5 flex-1 text-primary-400">“{review.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-dash pt-4">
        <Avatar name={review.student.name} src={review.student.avatar} size="sm" />
        <span className="min-w-0">
          <span className="block body-sm-medium truncate font-semibold text-primary-500">{review.student.name}</span>
          {review.course ? (
            <Link href={`/courses/${review.course.slug}`} className="block body-xsm-regular truncate text-primary-300 hover:text-accent">
              {review.course.title}
            </Link>
          ) : (
            <span className="block body-xsm-regular text-primary-300">{formatDate(review.createdAt)}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export default ReviewCard;
