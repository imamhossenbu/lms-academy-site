"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/** A titled list of single-choice options; the selected one gets a sliding accent background. */
export function FilterGroup({ id, title, options, value, onChange }: { id: string; title: string; options: FilterOption[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="body-xsm-medium mb-2 font-semibold uppercase tracking-wide text-night-muted">{title}</legend>
      <div className="space-y-0.5">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <motion.button
              key={o.value || "all"}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(o.value)}
              aria-pressed={on}
              className={cn("relative flex w-full min-w-0 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left body-sm-medium transition-colors", on ? "text-accent" : "text-night-soft hover:bg-night-skeleton hover:text-white")}
            >
              {on && <motion.span layoutId={`filter-${id}`} className="absolute inset-0 rounded-xl bg-accent-light" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="relative min-w-0 truncate">{o.label}</span>
              {o.count !== undefined && <span className={cn("relative body-xsm-regular", on ? "text-accent" : "text-night-muted")}>{o.count}</span>}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default FilterGroup;
