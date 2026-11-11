import React from "react";
import Link from "next/link";
import { BookOpen, Clock, Star, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { compact, formatDuration, formatPrice } from "@/lib/format";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";

/** Text beside a showcase card: gradient headline, summary, quick facts, price, Explore + Curriculum. */
export function ShowcaseCopy({ course, currency, alignRight }: { course: AcademyCourseCard; currency: AcademyCurrency; alignRight: boolean }) {
  const facts = [
    course.lessons > 0 && { icon: BookOpen, text: `${course.lessons} lessons` },
    formatDuration(course.durationMinutes) && { icon: Clock, text: formatDuration(course.durationMinutes) },
    course.students > 0 && { icon: Users, text: `${compact(course.students)} learners` },
    course.rating > 0 && { icon: Star, text: `${course.rating.toFixed(1)} rating` },
  ].filter(Boolean) as { icon: typeof BookOpen; text: string }[];

  return (
    <div className={cn(alignRight && "lg:text-right")}>
      <div className={cn("flex flex-wrap gap-2", alignRight && "lg:justify-end")}>
        {course.category && <ToneBadge tone="accent">{course.category.name}</ToneBadge>}
        {course.level && <ToneBadge tone="gray">{course.level}</ToneBadge>}
      </div>
      <h3 className="heading-h2-bold academy-gradient-text mt-4 line-clamp-3">{course.shortDescription.split(/(?<=[.!?])\s/)[0]}</h3>
      <p className="body-l-regular mt-4 text-night-soft">
        By <span className="font-semibold text-white">{course.instructor.name}</span>
        {course.instructor.headline && course.instructor.headline !== "Instructor" ? ` · ${course.instructor.headline}` : ""}
      </p>
      {facts.length > 0 && (
        <ul className={cn("mt-5 flex flex-wrap gap-x-5 gap-y-2 body-sm-medium text-night-soft", alignRight && "lg:justify-end")}>
          {facts.map((f) => (
            <li key={f.text} className="inline-flex items-center gap-1.5">
              <f.icon className="h-4 w-4 text-accent" />
              {f.text}
            </li>
          ))}
        </ul>
      )}
      <p className="heading-h2-bold mt-6 text-white">{formatPrice(course.price, currency, course.isFree)}</p>
      <div className={cn("mt-6 flex flex-wrap gap-3", alignRight && "lg:justify-end")}>
        <Link href={`/courses/${course.slug}`} className="academy-gradient academy-glow-btn inline-flex h-11 items-center rounded-xl px-6 body-sm-medium font-semibold text-white">
          Explore
        </Link>
        <Link href={`/courses/${course.slug}#curriculum`} className="inline-flex h-11 items-center rounded-xl border border-accent px-6 body-sm-medium font-semibold text-accent transition-colors hover:bg-accent-10">
          Curriculum
        </Link>
      </div>
    </div>
  );
}

export default ShowcaseCopy;
