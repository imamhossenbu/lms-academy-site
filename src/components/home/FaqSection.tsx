"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AcademySiteContent } from "@/types/academy";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** "Questions_ answered": the academy's own FAQ as an accordion (first open). Hidden when it has none. */
export function FaqSection({ faqs }: { faqs: AcademySiteContent["faqs"] | undefined }) {
  const [open, setOpen] = useState(0);
  if (!faqs?.length) return null;
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <SectionHeading title="Questions_ answered" subtitle="Everything you might want to know before you start." />
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => {
          const on = open === i;
          return (
            <motion.div key={f.question} layout className={cn("overflow-hidden rounded-2xl border transition-colors", on ? "border-accent/50 bg-accent-soft" : "border-night-line bg-night-surface")}>
              <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="body-l-medium text-white">{f.question}</span>
                <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.2 }} className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", on ? "academy-gradient text-white" : "bg-white/5 text-night-soft")}>
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="px-6 pb-5 body-regular text-night-soft">
                    {f.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default FaqSection;
