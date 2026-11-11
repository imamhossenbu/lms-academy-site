"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Search, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const STEPS = [
  { icon: Search, title: "Find your course", text: "Browse by category or search for the skill you want to learn." },
  { icon: ShoppingBag, title: "Enroll in minutes", text: "Create a free account, pay securely and get instant access." },
  { icon: GraduationCap, title: "Learn & grow", text: "Watch, practise and track your progress lesson by lesson." },
];

/** "Absolute_ beginner?": three neon step cards joined by a glowing dashed line. */
export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading title="Absolute_ beginner?" subtitle="No experience needed — here's how you get started." />
      <Stagger className="relative mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
        <svg className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-2 md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden>
          <motion.line x1="0" y1="1" x2="100" y2="1" stroke="var(--academy-accent)" strokeWidth="0.5" strokeDasharray="2 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
        </svg>
        {STEPS.map((s, i) => (
          <StaggerItem key={s.title} className="relative">
            <motion.div whileHover={{ y: -6 }} className="h-full rounded-3xl border border-night-line bg-night-surface p-7 text-center transition-colors hover:border-accent/50">
              <span className="academy-gradient academy-glow-btn relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-white">
                <s.icon className="h-7 w-7" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-night bg-white body-xsm-medium font-bold text-night">{i + 1}</span>
              </span>
              <h3 className="heading-h4 mt-6 font-bold text-white">{s.title}</h3>
              <p className="body-sm-regular mx-auto mt-2 max-w-xs text-night-muted">{s.text}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export default HowItWorks;
