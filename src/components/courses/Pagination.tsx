"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCatalog } from "./CatalogProvider";

/** 1 … 4 5 6 … 12 pager (?page=); scrolls back to the top of the results. */
export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const { update } = useCatalog();
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);
  const go = (p: number) => {
    update({ page: p > 1 ? String(p) : null });
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const btn = "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 body-sm-medium transition-colors disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <motion.button whileTap={{ scale: 0.92 }} type="button" disabled={page <= 1} onClick={() => go(page - 1)} className={cn(btn, "border-night-line bg-night-surface text-white hover:border-night-line-strong")} aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </motion.button>
      {pages.map((p, i) => (
        <React.Fragment key={p}>
          {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-night-muted">…</span>}
          <motion.button whileTap={{ scale: 0.92 }} type="button" onClick={() => go(p)} aria-current={p === page ? "page" : undefined} className={cn(btn, p === page ? "border-accent bg-accent text-white" : "border-night-line bg-night-surface text-white hover:border-night-line-strong")}>
            {p}
          </motion.button>
        </React.Fragment>
      ))}
      <motion.button whileTap={{ scale: 0.92 }} type="button" disabled={page >= totalPages} onClick={() => go(page + 1)} className={cn(btn, "border-night-line bg-night-surface text-white hover:border-night-line-strong")} aria-label="Next page">
        <ChevronRight className="h-4 w-4" />
      </motion.button>
    </nav>
  );
}

export default Pagination;
