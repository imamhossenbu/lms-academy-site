"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Clock3, MessagesSquare, MonitorSmartphone } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const POINTS = [
  { icon: Clock3, title: "Learn at your own pace", text: "Lessons are broken into short, focused modules you can take whenever it suits you." },
  { icon: MessagesSquare, title: "Help when you need it", text: "Ask questions in the course discussion and get guidance from your instructor." },
  { icon: ClipboardCheck, title: "Practice with feedback", text: "Quizzes and assignments help you check what you've learned and where to improve." },
  { icon: MonitorSmartphone, title: "Any device", text: "Pick up where you left off on your phone, tablet or computer." },
];

/** Four reasons to learn here, beside a short intro. */
export function WhyLearn({ academyName }: { academyName: string }) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
      <SectionHeading align="left" eyebrow="Why learn with us" title={`A better way to learn at ${academyName}`} highlight={academyName} subtitle="Everything you need to learn properly — clear lessons, real practice and people who help you along the way." />
      <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {POINTS.map((p) => (
          <StaggerItem key={p.title}>
            <motion.div whileHover={{ y: -4 }} className="h-full rounded-2xl border border-dash bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-primary-500/5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="heading-h5 mt-4 font-semibold text-primary-500">{p.title}</h3>
              <p className="body-sm-regular mt-1.5 text-primary-300">{p.text}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export default WhyLearn;
