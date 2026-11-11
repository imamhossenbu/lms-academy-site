"use client";

import React from "react";
import { motion } from "framer-motion";
import type { AcademyCategory, AcademyCourseCard, AcademyCurrency, AcademyInstructorSummary, AcademyPage } from "@/types/academy";
import { ActiveFilters } from "./ActiveFilters";
import { CatalogResults } from "./CatalogResults";
import { FilterPanel } from "./FilterPanel";
import { MobileFilters } from "./MobileFilters";
import { SortSelect } from "./SortSelect";

/** Sidebar filters + toolbar (count, chips, sort) + results. */
export function CatalogBody({ result, currency, categories, levels, instructor }: { result: AcademyPage<AcademyCourseCard>; currency: AcademyCurrency; categories: AcademyCategory[]; levels: string[]; instructor: AcademyInstructorSummary | null }) {
  const { total, page, totalPages } = result.pagination;
  return (
    <motion.section id="catalog" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <FilterPanel categories={categories} levels={levels} />
        </div>
      </aside>
      <div className="min-w-0">
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="body-regular text-primary-400">
              <span className="font-semibold text-primary-500">{total.toLocaleString("en-US")}</span> {total === 1 ? "course" : "courses"}
            </p>
            <div className="flex items-center gap-2">
              <MobileFilters categories={categories} levels={levels} />
              <SortSelect />
            </div>
          </div>
          <ActiveFilters categories={categories} instructor={instructor} />
        </div>
        <CatalogResults courses={result.data} currency={currency} page={page} totalPages={totalPages} />
      </div>
    </motion.section>
  );
}

export default CatalogBody;
