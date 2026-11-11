"use client";

import React from "react";
import { motion } from "framer-motion";
import { Inbox, MailCheck, MessagesSquare } from "lucide-react";

const STEPS = [
  { icon: Inbox, title: "We read every message", text: "Your message goes straight to our support team." },
  { icon: MessagesSquare, title: "The right person answers", text: "Course, payment or technical questions reach the person who can help." },
  { icon: MailCheck, title: "Reply by email", text: "Usually within one working day — check your spam folder just in case." },
];

/** "What happens next": three numbered steps with a glowing connector line. */
export function NextSteps() {
  return (
    <div className="rounded-2xl border border-night-line bg-night-surface p-5">
      <p className="body-medium font-semibold text-white">What happens next</p>
      <ol className="relative mt-4 space-y-5">
        <span className="absolute bottom-3 left-[19px] top-3 w-px bg-gradient-to-b from-accent to-accent-2 opacity-60" aria-hidden />
        {STEPS.map((s, i) => (
          <motion.li key={s.title} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="relative flex gap-4">
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-night-surface text-accent">
              <s.icon className="h-4 w-4" />
            </span>
            <span>
              <span className="block body-sm-medium font-semibold text-white">{s.title}</span>
              <span className="block body-xsm-regular mt-0.5 text-night-muted">{s.text}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default NextSteps;
