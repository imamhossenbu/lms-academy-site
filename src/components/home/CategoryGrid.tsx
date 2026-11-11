"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookMarked, Briefcase, Code2, FlaskConical, Languages, Lightbulb, Music, Palette, PenTool, Sigma, type LucideIcon } from "lucide-react";
import type { AcademyCategory } from "@/types/academy";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/** Icon by keyword in the category name; falls back to a rotating set. */
const KEYWORDS: [RegExp, LucideIcon][] = [
  [/code|program|develop|web|software|data|tech|computer|it\b/i, Code2],
  [/design|ui|ux|graphic|art/i, Palette],
  [/business|market|finance|account|manage|career/i, Briefcase],
  [/math|statistic|physics/i, Sigma],
  [/science|chem|bio/i, FlaskConical],
  [/language|english|bangla|arabic|ielts/i, Languages],
  [/music|audio/i, Music],
  [/writ|content|blog/i, PenTool],
];
const FALLBACK = [BookMarked, Lightbulb, Code2, Palette, Briefcase, Languages];

const iconFor = (name: string, i: number) => KEYWORDS.find(([re]) => re.test(name))?.[1] ?? FALLBACK[i % FALLBACK.length];

/** "Explore by category": one card per category that has published courses, with its course count. */
export function CategoryGrid({ categories }: { categories: AcademyCategory[] }) {
  if (categories.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading title="Explore by_ category" subtitle="Pick a subject and see every course we offer in it." />
      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {categories.slice(0, 8).map((c, i) => {
          const Icon = iconFor(c.name, i);
          return (
            <StaggerItem key={c.id}>
              <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
                <Link href={`/courses?category=${c.slug}`} className="group flex items-center gap-4 rounded-2xl border border-night-line bg-night-surface p-5 transition-all hover:border-accent/60 hover:bg-accent-soft">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block body-medium truncate font-semibold text-white">{c.name}</span>
                    <span className="block body-xsm-regular text-night-muted">
                      {c.courses} {c.courses === 1 ? "course" : "courses"}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-night-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

export default CategoryGrid;
