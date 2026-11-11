import React from "react";

/** Placeholder with the course card's exact geometry: cover, badges, title lines, instructor, meta row + price. */
export function CourseCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border border-night-line bg-night-surface">
      <div className="relative aspect-video bg-night-skeleton">
        <span className="absolute left-3 top-3 h-5 w-20 rounded-full bg-night-skeleton-strong" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex gap-2">
          <span className="h-5 w-16 rounded-md bg-night-skeleton-strong" />
          <span className="h-5 w-24 rounded-md bg-night-skeleton" />
        </div>
        <span className="mt-4 h-5 w-11/12 rounded-lg bg-night-skeleton-strong" />
        <span className="mt-2 h-5 w-2/3 rounded-lg bg-night-skeleton-strong" />
        <span className="mt-3 h-3.5 w-full rounded bg-night-skeleton" />
        <span className="mt-1.5 h-3.5 w-4/5 rounded bg-night-skeleton" />
        <div className="mt-4 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-night-skeleton-strong" />
          <span className="h-3.5 w-28 rounded bg-night-skeleton" />
        </div>
        <div className="mt-5 flex items-center gap-4 border-t border-night-line pt-4">
          <span className="h-3.5 w-16 rounded bg-night-skeleton" />
          <span className="h-3.5 w-12 rounded bg-night-skeleton" />
          <span className="ml-auto h-6 w-16 rounded-lg bg-night-skeleton-strong" />
        </div>
      </div>
    </div>
  );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default CourseCardSkeleton;
