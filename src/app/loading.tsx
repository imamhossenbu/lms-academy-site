import { CourseGridSkeleton } from "@/components/course/CourseCardSkeleton";

/** Home skeleton: hero copy + search + stats beside a course card, then the popular courses grid. */
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="block h-8 w-56 rounded-full bg-slate-100" />
          <span className="mt-6 block h-14 w-full rounded-xl bg-slate-200" />
          <span className="mt-3 block h-14 w-3/4 rounded-xl bg-slate-200" />
          <span className="mt-6 block h-5 w-5/6 rounded bg-slate-100" />
          <span className="mt-2 block h-5 w-2/3 rounded bg-slate-100" />
          <span className="mt-8 block h-16 w-full max-w-xl rounded-2xl border border-dash bg-white" />
          <div className="mt-10 flex gap-10">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <span className="block h-8 w-16 rounded-lg bg-slate-200" />
                <span className="mt-2 block h-4 w-20 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-dash">
          <div className="aspect-video bg-slate-100" />
          <div className="p-5">
            <span className="block h-5 w-24 rounded-md bg-slate-200" />
            <span className="mt-3 block h-6 w-4/5 rounded-lg bg-slate-200" />
            <div className="mt-4 flex items-center justify-between">
              <span className="h-8 w-32 rounded-full bg-slate-100" />
              <span className="h-7 w-16 rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <CourseGridSkeleton count={3} />
      </div>
    </div>
  );
}
