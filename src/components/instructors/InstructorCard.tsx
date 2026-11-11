"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Star, Users } from "lucide-react";
import { compact } from "@/lib/format";
import type { AcademyInstructor } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { ToneBadge } from "@/components/ui/ToneBadge";

/** Instructor profile card: photo, name, headline, expertise tags, courses / learners / rating, link to their courses. */
export function InstructorCard({ instructor, showBio = false }: { instructor: AcademyInstructor; showBio?: boolean }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="h-full">
      <Link href={`/courses?instructor=${instructor.id}`} className="group flex h-full flex-col items-center rounded-2xl border border-night-line bg-night-surface p-6 text-center transition-shadow hover:shadow-xl hover:shadow-black/40">
        <span className="rounded-full p-1 ring-2 ring-accent-20 transition-all group-hover:ring-accent">
          <Avatar name={instructor.name} src={instructor.avatar} size="xl" />
        </span>
        <h3 className="heading-h5 mt-4 font-semibold text-white transition-colors group-hover:text-accent">{instructor.name}</h3>
        <p className="body-sm-regular mt-0.5 line-clamp-1 text-night-muted">{instructor.headline}</p>
        {instructor.expertise.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {instructor.expertise.slice(0, 3).map((e) => (
              <ToneBadge key={e} tone="accent" size="sm" variant="pill">
                {e}
              </ToneBadge>
            ))}
          </div>
        )}
        {showBio && instructor.bio && <p className="body-sm-regular mt-3 line-clamp-3 text-night-soft">{instructor.bio}</p>}
        <div className="mt-auto w-full pt-5">
        <div className="flex w-full items-center justify-center gap-5 border-t border-night-line pt-4 body-xsm-medium text-night-soft">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-accent" />
            {instructor.courses} {instructor.courses === 1 ? "course" : "courses"}
          </span>
          {instructor.students > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-accent" />
              {compact(instructor.students)}
            </span>
          )}
          {instructor.rating > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-yellow text-yellow" />
              {instructor.rating.toFixed(1)}
            </span>
          )}
        </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default InstructorCard;
