"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { AcademyCategory, AcademyInstructorSummary } from "@/types/academy";
import { useCatalog } from "./CatalogProvider";

/** Removable chips for each active filter + "Clear all". */
export function ActiveFilters({ categories, instructor }: { categories: AcademyCategory[]; instructor: AcademyInstructorSummary | null }) {
  const { get, update, clearAll } = useCatalog();
  const chips = [
    get("q") && { key: "q", label: `“${get("q")}”` },
    get("category") && { key: "category", label: categories.find((c) => c.slug === get("category"))?.name ?? get("category") },
    get("level") && { key: "level", label: get("level") },
    get("price") && { key: "price", label: get("price") === "free" ? "Free" : "Paid" },
    get("instructor") && { key: "instructor", label: instructor ? `By ${instructor.name}` : "Instructor" },
  ].filter(Boolean) as { key: string; label: string }[];

  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence initial={false}>
        {chips.map((c) => (
          <motion.button
            key={c.key}
            layout
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => update({ [c.key]: null })}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-accent-20 bg-accent-light px-3 py-1 body-xsm-medium text-accent"
          >
            {c.label}
            <X className="h-3 w-3" />
          </motion.button>
        ))}
      </AnimatePresence>
      <button type="button" onClick={clearAll} className="body-xsm-medium text-primary-300 underline-offset-2 hover:text-primary-500 hover:underline">
        Clear all
      </button>
    </div>
  );
}

export default ActiveFilters;
