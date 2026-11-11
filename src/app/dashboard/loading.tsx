/** Dashboard skeleton: profile card + nav rows, heading, four stat tiles, continue-learning card, two list panels. */
export default function Loading() {
  return (
    <div className="mx-auto grid max-w-7xl animate-pulse gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-2xl border border-night-line p-4">
          <span className="h-11 w-11 rounded-full bg-night-skeleton-strong" />
          <div className="flex-1 space-y-2">
            <span className="block h-4 w-28 rounded bg-night-skeleton-strong" />
            <span className="block h-3 w-36 rounded bg-night-skeleton" />
          </div>
        </div>
        <div className="hidden space-y-1 lg:block">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 px-3.5 py-2.5">
              <span className="h-4 w-4 rounded bg-night-skeleton-strong" />
              <span className="h-4 w-28 rounded bg-night-skeleton" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="block h-8 w-64 rounded-xl bg-night-skeleton-strong" />
          <span className="block h-4 w-80 max-w-full rounded bg-night-skeleton" />
        </div>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-night-line p-5">
              <span className="block h-10 w-10 rounded-xl bg-night-skeleton-strong" />
              <span className="mt-4 block h-7 w-16 rounded-lg bg-night-skeleton-strong" />
              <span className="mt-2 block h-4 w-28 rounded bg-night-skeleton" />
            </div>
          ))}
        </div>
        <div className="grid overflow-hidden rounded-3xl border border-night-line sm:grid-cols-[260px_1fr]">
          <span className="aspect-video bg-night-skeleton sm:aspect-auto" />
          <div className="space-y-3 p-6">
            <span className="block h-3 w-28 rounded bg-night-skeleton-strong" />
            <span className="block h-6 w-3/4 rounded-lg bg-night-skeleton-strong" />
            <span className="block h-2 w-full rounded-full bg-night-skeleton" />
            <span className="ml-auto block h-10 w-28 rounded-xl bg-night-skeleton-strong" />
          </div>
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          {[0, 1].map((p) => (
            <div key={p} className="space-y-3 rounded-3xl border border-night-line p-5">
              <span className="block h-5 w-44 rounded bg-night-skeleton-strong" />
              {[0, 1, 2].map((r) => (
                <div key={r} className="flex items-center gap-3 rounded-2xl border border-night-line p-4">
                  <span className="h-12 w-12 rounded-xl bg-night-skeleton-strong" />
                  <span className="h-4 flex-1 rounded bg-night-skeleton" />
                  <span className="h-6 w-16 rounded-md bg-night-skeleton" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
