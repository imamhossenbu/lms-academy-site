import { CourseCardSkeleton } from "@/components/course/CourseCardSkeleton";

/** My courses skeleton: heading + course cards. */
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center px-4 pb-14 pt-14">
        <span className="h-8 w-32 rounded-full bg-night-skeleton" />
        <span className="mt-5 h-12 w-96 max-w-full rounded-xl bg-night-skeleton-strong" />
        <span className="mt-4 h-5 w-64 rounded bg-night-skeleton" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
