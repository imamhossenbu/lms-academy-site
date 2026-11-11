/** Lesson area placeholder: video frame, badges, title, paragraph lines, nav buttons. */
export function LessonSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse space-y-8 px-4 py-8 sm:px-6 lg:py-10">
      <div className="aspect-video rounded-2xl border border-night-line bg-night-skeleton" />
      <div className="space-y-3">
        <div className="flex gap-2">
          <span className="h-6 w-20 rounded-md bg-night-skeleton-strong" />
          <span className="h-6 w-14 rounded-md bg-night-skeleton" />
        </div>
        <span className="block h-10 w-2/3 rounded-xl bg-night-skeleton-strong" />
      </div>
      <div className="space-y-2.5">
        {[100, 92, 96, 70].map((w, i) => (
          <span key={i} className="block h-4 rounded bg-night-skeleton" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex justify-between border-t border-night-line pt-6">
        <span className="h-11 w-28 rounded-xl border border-night-line" />
        <span className="h-11 w-48 rounded-xl bg-night-skeleton-strong" />
      </div>
    </div>
  );
}

export default LessonSkeleton;
