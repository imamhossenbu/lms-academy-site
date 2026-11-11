"use client";

import React from "react";
import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import type { AcademySiteContent } from "@/types/academy";
import { CursorTitle } from "@/components/shared/SectionHeading";
import { NewsletterForm } from "./NewsletterForm";

/** Newsletter band: neon envelope, cursor headline, the admin's copy (or a sensible default) and the form. */
export function NewsletterSection({ newsletter }: { newsletter: AcademySiteContent["newsletter"] | undefined }) {
  if (newsletter && !newsletter.enabled) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate grid items-center gap-8 overflow-hidden rounded-3xl border border-night-line bg-night-surface p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr]"
      >
        <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-accent-2 opacity-25 blur-[100px]" aria-hidden />
        <div className="absolute -bottom-24 -left-16 -z-10 h-72 w-72 rounded-full bg-accent opacity-20 blur-[100px]" aria-hidden />
        <div>
          <motion.span initial={{ rotate: -12, scale: 0.8 }} whileInView={{ rotate: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="academy-neon inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-accent text-accent">
            <MailOpen className="h-7 w-7" />
          </motion.span>
          <h2 className="heading-h1-bold mt-5 text-white">
            <CursorTitle text={newsletter?.title ? newsletter.title : "Stay in_ the loop"} />
          </h2>
          <p className="body-l-regular mt-3 text-night-soft">{newsletter?.text || "New courses, free live classes and early-bird offers — straight to your inbox. No spam, unsubscribe anytime."}</p>
        </div>
        <NewsletterForm source="home" />
      </motion.div>
    </section>
  );
}

export default NewsletterSection;
