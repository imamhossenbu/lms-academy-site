"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, Star } from "lucide-react";
import { formatPrice, plural } from "@/lib/format";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { CourseThumb } from "@/components/course/CourseThumb";

/** The top course as a big card, the next two peeking out behind it, plus floating rating / lessons chips. */
export function HeroCourseStack({ courses, currency }: { courses: AcademyCourseCard[]; currency: AcademyCurrency }) {
  const [top, ...rest] = courses;
  return (
    <div className="relative pb-6 pt-6">
      {rest.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: i === 0 ? 6 : -6 }}
          transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 120, damping: 16 }}
          className={`absolute inset-x-10 top-0 overflow-hidden rounded-3xl border border-dash bg-white shadow-lg ${i === 0 ? "translate-x-6" : "-translate-x-6"}`}
          aria-hidden
        >
          <CourseThumb src={c.thumbnail} title={c.title} sizes="400px" />
        </motion.div>
      ))}

      <Link href={`/courses/${top.slug}`} className="group relative block overflow-hidden rounded-3xl border border-dash bg-white shadow-2xl shadow-primary-500/10">
        <div className="relative">
          <CourseThumb src={top.thumbnail} title={top.title} priority sizes="520px" />
          <span className="absolute inset-0 flex items-center justify-center bg-primary-500/0 transition-colors group-hover:bg-primary-500/10">
            <motion.span whileHover={{ scale: 1.08 }} className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-accent shadow-lg">
              <PlayCircle className="h-7 w-7" />
            </motion.span>
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2">
            {top.category && (
              <ToneBadge tone="accent" size="sm">
                {top.category.name}
              </ToneBadge>
            )}
            {top.level && (
              <ToneBadge tone="gray" size="sm">
                {top.level}
              </ToneBadge>
            )}
          </div>
          <h3 className="heading-h5 mt-3 line-clamp-2 font-semibold text-primary-500">{top.title}</h3>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <Avatar name={top.instructor.name} src={top.instructor.avatar} size="sm" />
              <span className="body-sm-medium truncate text-primary-400">{top.instructor.name}</span>
            </span>
            <span className="heading-h4 shrink-0 font-bold text-primary-500">{formatPrice(top.price, currency, top.isFree)}</span>
          </div>
        </div>
      </Link>

      {top.rating > 0 && (
        <FloatingChip className="-left-4 top-16 sm:-left-10" delay={0.8}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-bg text-yellow">
            <Star className="h-4 w-4 fill-yellow" />
          </span>
          <span>
            <span className="block body-sm-medium font-semibold text-primary-500">{top.rating.toFixed(1)} rating</span>
            <span className="block body-2xsm-regular text-primary-300">{plural(top.reviewCount, "review")}</span>
          </span>
        </FloatingChip>
      )}
      {top.lessons > 0 && (
        <FloatingChip className="-right-2 bottom-24 sm:-right-8" delay={1}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light text-accent">
            <PlayCircle className="h-4 w-4" />
          </span>
          <span>
            <span className="block body-sm-medium font-semibold text-primary-500">{plural(top.lessons, "lesson")}</span>
            <span className="block body-2xsm-regular text-primary-300">Learn at your pace</span>
          </span>
        </FloatingChip>
      )}
    </div>
  );
}

function FloatingChip({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
      className={`absolute z-10 flex items-center gap-2.5 rounded-2xl border border-dash bg-white/95 px-3.5 py-2.5 shadow-xl shadow-primary-500/10 backdrop-blur ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default HeroCourseStack;
