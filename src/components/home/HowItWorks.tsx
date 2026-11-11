"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Search, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const STEPS = [
  { icon: Search, title: "Find your course", text: "Browse by category or search for the skill you want to learn." },
  { icon: ShoppingBag, title: "Enroll", text: "Join the course and get instant access to its lessons." },
  { icon: GraduationCap, title: "Learn & grow", text: "Watch, practise and track your progress lesson by lesson." },
];

/** Three numbered steps from finding a course to learning, joined by a dashed line on desktop. */
export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-accent-soft">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="How it works" title="Start learning in three steps" highlight="three steps" />
        <Stagger className="relative mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          <svg className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-2 md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden>
            <motion.line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 2" className="text-accent" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
          </svg>
          {STEPS.map((s, i) => (
            <StaggerItem key={s.title} className="relative text-center">
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-accent shadow-lg shadow-primary-500/5">
                <s.icon className="h-7 w-7" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent body-2xsm-regular font-bold text-white">{i + 1}</span>
              </span>
              <h3 className="heading-h5 mt-5 font-semibold text-primary-500">{s.title}</h3>
              <p className="body-sm-regular mx-auto mt-1.5 max-w-xs text-primary-300">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default HowItWorks;
