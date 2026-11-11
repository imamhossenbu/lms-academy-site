import { LessonSkeleton } from "@/components/learn/LessonSkeleton";

/** Player skeleton: top bar (back, title, progress ring), lesson area, course content sidebar rows. */
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4 border-b border-night-line px-4 py-3 sm:px-6">
        <span className="h-10 w-10 rounded-xl border border-night-line" />
        <div className="flex-1 space-y-2">
          <span className="block h-3 w-32 rounded bg-night-skeleton" />
          <span className="block h-5 w-72 max-w-full rounded bg-night-skeleton-strong" />
        </div>
        <span className="h-11 w-11 rounded-full border-4 border-night-skeleton-strong" />
      </div>
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,1fr)_360px]">
        <LessonSkeleton />
        <div className="hidden space-y-1 border-l border-night-line p-4 lg:block">
          <span className="block h-4 w-32 rounded bg-night-skeleton-strong" />
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              <span className="h-4 w-4 rounded-full bg-night-skeleton-strong" />
              <span className="h-4 flex-1 rounded bg-night-skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
