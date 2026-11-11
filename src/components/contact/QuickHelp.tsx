import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, GraduationCap, Info, Star, Users } from "lucide-react";
import { compact } from "@/lib/format";
import type { AcademyProfile } from "@/types/academy";

/** Quick links (courses, my courses / sign in, about) and a strip of the academy's real numbers. */
export function QuickHelp({ stats, signedIn }: { stats: AcademyProfile["stats"]; signedIn: boolean }) {
  const links = [
    { href: "/courses", icon: BookOpen, label: "Browse all courses" },
    signedIn ? { href: "/my-courses", icon: GraduationCap, label: "Go to my courses" } : { href: "/login?next=/my-courses", icon: GraduationCap, label: "Sign in to your account" },
    { href: "/about", icon: Info, label: "About us" },
  ];
  const facts = [
    stats.rating > 0 && { icon: Star, value: stats.rating.toFixed(1), label: "rating" },
    stats.students > 0 && { icon: Users, value: compact(stats.students), label: stats.students === 1 ? "learner" : "learners" },
    stats.courses > 0 && { icon: BookOpen, value: String(stats.courses), label: stats.courses === 1 ? "course" : "courses" },
  ].filter(Boolean) as { icon: typeof Star; value: string; label: string }[];

  return (
    <div className="overflow-hidden rounded-2xl border border-night-line bg-night-surface">
      <p className="px-5 pt-5 body-medium font-semibold text-white">Quick help</p>
      <ul className="mt-3 divide-y divide-night-line">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-center gap-3 px-5 py-3.5 body-sm-medium text-night-soft transition-colors hover:bg-accent-soft hover:text-white">
              <l.icon className="h-4 w-4 text-accent" />
              <span className="flex-1">{l.label}</span>
              <ArrowUpRight className="h-4 w-4 text-night-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
      {facts.length > 0 && (
        <div className="academy-gradient grid grid-cols-3 divide-x divide-white/25 py-4 text-center text-white">
          {facts.map((f) => (
            <div key={f.label} className="px-2">
              <p className="heading-h4 inline-flex items-center gap-1 font-bold">
                {f.value}
                {f.icon === Star && <Star className="h-4 w-4 fill-current" />}
              </p>
              <p className="body-xsm-medium text-white/85">{f.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuickHelp;
