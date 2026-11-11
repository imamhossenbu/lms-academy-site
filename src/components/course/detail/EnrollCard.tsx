"use client";

import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Award, BookOpen, ClipboardCheck, Clock, FileQuestion, Link2, MonitorSmartphone, Video } from "lucide-react";
import { formatDuration, formatPrice, plural } from "@/lib/format";
import type { AcademyCourseDetail, AcademyCurrency } from "@/types/academy";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CourseThumb } from "@/components/course/CourseThumb";

/**
 * Sticky purchase card: cover, price, enrol button and what's included. Until online checkout ships, "Enroll now"
 * goes to the contact page with this course pre-selected.
 */
export function EnrollCard({ course, currency }: { course: AcademyCourseDetail; currency: AcademyCurrency }) {
  const t = course.lessonTypes;
  const includes = [
    course.lessons > 0 && { icon: BookOpen, text: plural(course.lessons, "lesson") },
    formatDuration(course.durationMinutes) && { icon: Clock, text: `${formatDuration(course.durationMinutes)} of content` },
    t.VIDEO && { icon: Video, text: plural(t.VIDEO, "video lesson") },
    t.QUIZ && { icon: FileQuestion, text: plural(t.QUIZ, "quiz", "quizzes") },
    (t.ASSIGNMENT || t.CODING) && { icon: ClipboardCheck, text: plural((t.ASSIGNMENT ?? 0) + (t.CODING ?? 0), "hands-on exercise") },
    t.LIVE && { icon: Video, text: plural(t.LIVE, "live class", "live classes") },
    { icon: MonitorSmartphone, text: "Learn on mobile and desktop" },
    { icon: Award, text: `${course.level || "All"} level` },
  ].filter(Boolean) as { icon: typeof BookOpen; text: string }[];

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied", { description: "Share it with a friend who'd like this course." });
    } catch {
      toast.error("Couldn't copy the link", { description: "Copy it from your browser's address bar instead." });
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="overflow-hidden rounded-3xl border border-dash bg-white shadow-2xl shadow-primary-500/10"
      id="enroll"
    >
      <CourseThumb src={course.thumbnail} title={course.title} priority sizes="380px" />
      <div className="p-6">
        <p className="heading-h1-bold text-primary-500">{formatPrice(course.price, currency, course.isFree)}</p>
        <ButtonLink href={`/contact?course=${encodeURIComponent(course.slug)}`} size="lg" className="mt-5 w-full" icon={<ArrowRight className="h-4 w-4" />}>
          {course.isFree ? "Join for free" : "Enroll now"}
        </ButtonLink>
        <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={share} className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dash body-sm-medium text-primary-500 transition-colors hover:border-primary-300">
          <Link2 className="h-4 w-4" />
          Share course
        </motion.button>

        <h3 className="body-sm-medium mt-6 font-semibold text-primary-500">This course includes</h3>
        <ul className="mt-3 space-y-2.5">
          {includes.map((i) => (
            <li key={i.text} className="flex items-center gap-2.5 body-sm-regular text-primary-400">
              <i.icon className="h-4 w-4 shrink-0 text-accent" />
              {i.text}
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}

export default EnrollCard;
