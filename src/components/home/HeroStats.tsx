import React from "react";
import type { AcademyProfile } from "@/types/academy";
import { CountUp } from "@/components/motion/CountUp";

/** Real academy numbers under the hero (only the ones above zero). */
export function HeroStats({ stats }: { stats: AcademyProfile["stats"] }) {
  const items = [
    { value: stats.courses, label: stats.courses === 1 ? "Course" : "Courses" },
    { value: stats.students, label: stats.students === 1 ? "Learner" : "Learners" },
    { value: stats.instructors, label: stats.instructors === 1 ? "Instructor" : "Instructors" },
    { value: stats.lessons, label: "Lessons" },
  ].filter((s) => s.value > 0);
  if (items.length === 0) return null;
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-4">
      {items.slice(0, 3).map((s) => (
        <div key={s.label}>
          <dt className="sr-only">{s.label}</dt>
          <dd className="heading-h2-bold text-primary-500">
            <CountUp to={s.value} suffix={s.value >= 10 ? "+" : ""} />
          </dd>
          <p className="body-sm-regular text-primary-300">{s.label}</p>
        </div>
      ))}
    </dl>
  );
}

export default HeroStats;
