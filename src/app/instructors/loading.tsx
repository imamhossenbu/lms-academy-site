/** Instructors skeleton: hero heading + cards with avatar circle, name, headline, tags and a stats row. */
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center px-4 pb-14 pt-14">
        <span className="h-8 w-36 rounded-full bg-night-skeleton" />
        <span className="mt-5 h-12 w-96 max-w-full rounded-xl bg-night-skeleton-strong" />
        <span className="mt-4 h-5 w-80 max-w-full rounded bg-night-skeleton" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex flex-col items-center rounded-2xl border border-night-line p-6">
            <span className="h-24 w-24 rounded-full bg-night-skeleton-strong" />
            <span className="mt-4 h-5 w-32 rounded bg-night-skeleton-strong" />
            <span className="mt-2 h-4 w-40 rounded bg-night-skeleton" />
            <div className="mt-3 flex gap-1.5">
              <span className="h-5 w-16 rounded-full bg-night-skeleton" />
              <span className="h-5 w-14 rounded-full bg-night-skeleton" />
            </div>
            <div className="mt-5 flex w-full justify-center gap-5 border-t border-night-line pt-4">
              <span className="h-4 w-16 rounded bg-night-skeleton" />
              <span className="h-4 w-12 rounded bg-night-skeleton" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
