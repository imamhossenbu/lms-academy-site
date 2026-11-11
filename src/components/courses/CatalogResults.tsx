"use client";

import React from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import type { AcademyCourseCard, AcademyCurrency } from "@/types/academy";
import { CourseGrid } from "@/components/course/CourseGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { useCatalog } from "./CatalogProvider";
import { Pagination } from "./Pagination";

/** The result grid (dims while new results load), its empty state and the pager. */
export function CatalogResults({ courses, currency, page, totalPages }: { courses: AcademyCourseCard[]; currency: AcademyCurrency; page: number; totalPages: number }) {
  const { pending, clearAll } = useCatalog();
  return (
    <motion.div animate={{ opacity: pending ? 0.55 : 1 }} transition={{ duration: 0.15 }} aria-busy={pending}>
      {courses.length > 0 ? (
        <>
          <CourseGrid courses={courses} currency={currency} cols={3} className="lg:grid-cols-2 xl:grid-cols-3" />
          <Pagination page={page} totalPages={totalPages} />
        </>
      ) : (
        <EmptyState
          icon={<SearchX className="h-7 w-7" />}
          title="No courses match"
          text="Try a different search or remove a filter to see more courses."
          action={
            <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={clearAll} className="h-10 rounded-xl border border-dash bg-white px-4 body-sm-medium text-primary-500 hover:border-primary-300">
              Clear filters
            </motion.button>
          }
        />
      )}
    </motion.div>
  );
}

export default CatalogResults;
