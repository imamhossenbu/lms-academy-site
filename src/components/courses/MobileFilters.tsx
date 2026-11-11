"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { AcademyCategory } from "@/types/academy";
import { FilterPanel } from "./FilterPanel";

/** Small screens: a "Filters" button that opens the filter panel in a bottom sheet. */
export function MobileFilters({ categories, levels }: { categories: AcademyCategory[]; levels: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={() => setOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-night-line bg-night-surface px-3.5 body-sm-medium text-white lg:hidden">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} aria-label="Close filters" />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-night-surface p-5"
              role="dialog"
              aria-label="Filters"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="heading-h5 font-semibold text-white">Filters</h2>
                <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-night-line" aria-label="Close">
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
              <FilterPanel categories={categories} levels={levels} scope="sheet" />
              <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={() => setOpen(false)} className="mt-6 h-11 w-full rounded-xl bg-accent body-sm-medium text-white">
                Show results
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileFilters;
