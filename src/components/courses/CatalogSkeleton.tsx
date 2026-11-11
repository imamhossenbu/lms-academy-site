import React from "react";
import { CourseCardSkeleton } from "@/components/course/CourseCardSkeleton";

/** Catalogue skeleton: search box, filter sidebar (3 groups), toolbar and a 6-card grid. */
export function CatalogSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gradient-to-b from-accent-soft to-white px-4 pb-14 pt-14">
        <span className="mx-auto block h-8 w-28 rounded-full bg-slate-100" />
        <span className="mx-auto mt-5 block h-12 w-80 max-w-full rounded-xl bg-slate-200" />
        <span className="mx-auto mt-4 block h-5 w-96 max-w-full rounded bg-slate-100" />
        <span className="mx-auto mt-8 block h-14 w-full max-w-2xl rounded-2xl border border-dash bg-white" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr]">
        <div className="hidden space-y-7 lg:block">
          {[6, 4, 3].map((n, g) => (
            <div key={g}>
              <span className="block h-3 w-20 rounded bg-slate-200" />
              <div className="mt-3 space-y-2">
                {Array.from({ length: n }, (_, i) => (
                  <div key={i} className="flex justify-between px-3 py-1.5">
                    <span className="h-4 w-28 rounded bg-slate-100" />
                    <span className="h-4 w-5 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <span className="h-5 w-40 rounded bg-slate-200" />
            <span className="h-10 w-44 rounded-xl border border-dash bg-white" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogSkeleton;
