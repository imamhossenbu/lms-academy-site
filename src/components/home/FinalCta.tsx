"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Accent banner before the footer: one line pitch, browse + contact buttons. */
export function FinalCta({ academyName }: { academyName: string }) {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-hover px-6 py-14 text-center sm:px-12"
      >
        <motion.div className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-white/15 blur-2xl" animate={reduce ? undefined : { scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} aria-hidden />
        <motion.div className="absolute -bottom-24 -right-16 -z-10 h-80 w-80 rounded-full bg-white/10 blur-2xl" animate={reduce ? undefined : { scale: [1.1, 1, 1.1] }} transition={{ duration: 9, repeat: Infinity }} aria-hidden />
        <h2 className="heading-section text-white">Ready to start learning?</h2>
        <p className="body-hero mx-auto mt-4 max-w-2xl text-white/80">Find the course that fits your goals and take the first step with {academyName} today.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/courses" variant="light" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Browse courses
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" size="lg" className="border border-white/40 text-white hover:bg-white/10 hover:text-white">
            Talk to us
          </ButtonLink>
        </div>
      </motion.div>
    </section>
  );
}

export default FinalCta;
