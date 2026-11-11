"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { SORTS } from "./catalogParams";
import { useCatalog } from "./CatalogProvider";

/** Sort order (?sort=). */
export function SortSelect() {
  const { get, update } = useCatalog();
  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-night-line bg-night-surface px-3 transition-colors focus-within:border-accent">
      <ArrowUpDown className="h-4 w-4 text-night-muted" />
      <span className="sr-only">Sort by</span>
      <select value={get("sort") || "popular"} onChange={(e) => update({ sort: e.target.value === "popular" ? null : e.target.value })} className="h-10 cursor-pointer bg-transparent pr-1 body-sm-medium text-white outline-none">
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SortSelect;
