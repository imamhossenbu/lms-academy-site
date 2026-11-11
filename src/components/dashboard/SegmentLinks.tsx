"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Capsule switch whose options are links (state lives in the URL). */
export function SegmentLinks({ id, options, active }: { id: string; options: { value: string; label: string; href: string; count?: number }[]; active: string }) {
  return (
    <div className="inline-flex rounded-xl border border-night-line bg-night-surface p-1">
      {options.map((o) => (
        <Link key={o.value} href={o.href} scroll={false} className={cn("relative rounded-lg px-4 py-1.5 body-sm-medium transition-colors", o.value === active ? "text-white" : "text-night-muted hover:text-white")}>
          {o.value === active && <motion.span layoutId={`seg-${id}`} className="academy-gradient absolute inset-0 -z-10 rounded-lg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
          {o.label}
          {o.count !== undefined && <span className="ml-1.5 opacity-75">{o.count}</span>}
        </Link>
      ))}
    </div>
  );
}

export default SegmentLinks;
