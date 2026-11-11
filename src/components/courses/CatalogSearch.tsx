"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, X } from "lucide-react";
import { useCatalog } from "./CatalogProvider";

/** Search box for the catalogue; updates ?q= 350 ms after you stop typing. */
export function CatalogSearch() {
  const { get, update, pending } = useCatalog();
  const current = get("q");
  const [value, setValue] = useState(current);

  // Follow the URL when it changes elsewhere (chips, "clear all", back button).
  const [seen, setSeen] = useState(current);
  if (seen !== current) {
    setSeen(current);
    setValue(current);
  }

  useEffect(() => {
    if (value.trim() === current) return;
    const t = window.setTimeout(() => update({ q: value.trim() || null }), 350);
    return () => window.clearTimeout(t);
  }, [value, current, update]);

  return (
    <div className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-dash bg-white px-4 shadow-xl shadow-primary-500/5 transition-colors focus-within:border-accent">
      <Search className="h-5 w-5 shrink-0 text-primary-300" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search courses, skills or topics"
        aria-label="Search courses"
        maxLength={100}
        className="min-w-0 flex-1 bg-transparent py-4 body-regular text-primary-500 outline-none placeholder:text-primary-300"
      />
      <AnimatePresence mode="wait" initial={false}>
        {pending ? (
          <motion.span key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Loader2 className="h-4 w-4 animate-spin text-accent" />
          </motion.span>
        ) : value ? (
          <motion.button key="clear" type="button" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileTap={{ scale: 0.9 }} onClick={() => setValue("")} className="flex h-7 w-7 items-center justify-center rounded-full text-primary-300 hover:bg-slate-100 hover:text-primary-500" aria-label="Clear search">
            <X className="h-4 w-4" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default CatalogSearch;
