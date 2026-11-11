"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { DotGrid } from "@/components/shared/PageHero";

const POINTS = ["Learn at your own pace, on any device", "Pick up right where you left off", "Practice with quizzes and assignments"];

/** Sign-in / sign-up layout: form card on the left, the academy's welcome panel on the right (desktop). */
export function AuthShell({ academyName, title, subtitle, children, footer }: { academyName: string; title: string; subtitle: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent-soft via-white to-white">
      <DotGrid id="auth-dots" />
      <div className="mx-auto grid min-h-[calc(100vh-74px)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-dash bg-white p-6 shadow-2xl shadow-primary-500/5 sm:p-8">
            <h1 className="heading-h2-bold text-primary-500">{title}</h1>
            <p className="body-regular mt-2 text-primary-300">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
          {footer && <div className="mt-5 text-center body-sm-regular text-primary-300">{footer}</div>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-hover p-10 text-white lg:block"
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <p className="body-sm-medium relative text-white/80">{academyName}</p>
          <h2 className="heading-h1-bold relative mt-3">Your learning, all in one place.</h2>
          <ul className="relative mt-8 space-y-4">
            {POINTS.map((p, i) => (
              <motion.li key={p} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3 body-regular text-white/90">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default AuthShell;
