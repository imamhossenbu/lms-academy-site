"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ClipboardCheck, Headphones, MonitorPlay, Radio, Smartphone, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MonitorPlay, title: "Short, focused lessons", text: "Bite-sized videos and readings you can finish on a lunch break." },
  { icon: Radio, title: "Live sessions", text: "Ask questions and get reviews in scheduled live classes — recorded if you miss one." },
  { icon: ClipboardCheck, title: "Real assignments", text: "Quizzes and projects with instructor feedback, so you learn by doing." },
  { icon: Headphones, title: "Help when stuck", text: "Course discussions where instructors and classmates answer your questions." },
  { icon: Award, title: "Verified certificate", text: "Finish a course to earn a certificate employers can check online." },
  { icon: Smartphone, title: "Learn anywhere", text: "Phone, tablet or laptop — your progress follows you." },
];

/** "What you_ get": six neon feature tiles describing the learning experience. */
export function WhatYouGet() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading title="What you_ get" subtitle="Everything you need to actually finish a course — and use what you learned." />
      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {FEATURES.map((f) => (
          <StaggerItem key={f.title} className="h-full">
            <motion.div whileHover={{ y: -6 }} className="group relative h-full overflow-hidden rounded-3xl border border-night-line bg-night-surface p-7 transition-colors hover:border-accent/50">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" aria-hidden />
              <span className="academy-neon relative inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-accent text-accent">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="heading-h5 relative mt-5 font-semibold text-white">{f.title}</h3>
              <p className="body-sm-regular relative mt-2 text-night-muted">{f.text}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export default WhatYouGet;
