"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { formatDate, plural } from "@/lib/format";
import type { MyCourse } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { CourseThumb } from "@/components/course/CourseThumb";

/** An enrolled course: cover, title, instructor, animated progress bar and status. */
export function MyCourseCard({ item }: { item: MyCourse }) {
  const done = !!item.completedAt || item.progress >= 100;
  const status = done ? { tone: "green" as const, label: "Completed" } : item.progress > 0 ? { tone: "accent" as const, label: "In progress" } : { tone: "gray" as const, label: "Not started" };
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="h-full">
      <Link href={`/learn/${item.course.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-night-line bg-night-surface transition-shadow hover:shadow-xl hover:shadow-black/40">
        <div className="relative">
          <CourseThumb src={item.course.thumbnail} title={item.course.title} />
          <ToneBadge tone={status.tone} size="sm" variant="pill" className="absolute left-3 top-3" dot>
            {status.label}
          </ToneBadge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="heading-h5 line-clamp-2 font-semibold text-white group-hover:text-accent">{item.course.title}</h3>
          <div className="mt-3 flex items-center gap-2">
            <Avatar name={item.course.instructor.name} src={item.course.instructor.avatar} size="xs" />
            <span className="body-xsm-medium truncate text-night-soft">{item.course.instructor.name}</span>
          </div>
          <div className="mt-auto pt-5">
            <div className="flex items-center justify-between body-xsm-medium">
              <span className="text-night-soft">{done ? "Finished" : `${item.progress}% complete`}</span>
              {item.lessons > 0 && (
                <span className="inline-flex items-center gap-1 text-night-muted">
                  <BookOpen className="h-3.5 w-3.5" />
                  {plural(item.lessons, "lesson")}
                </span>
              )}
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-night-skeleton-strong">
              <motion.span className={`block h-full rounded-full ${done ? "bg-green" : "bg-accent"}`} initial={{ width: 0 }} animate={{ width: `${Math.min(100, Math.max(done ? 100 : item.progress, 0))}%` }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} />
            </div>
            <p className="mt-3 flex items-center gap-1.5 body-xsm-regular text-night-muted">
              {done && <CheckCircle2 className="h-3.5 w-3.5 text-green" />}
              Enrolled {formatDate(item.enrolledAt)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default MyCourseCard;
