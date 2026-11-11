/** About skeleton: hero heading, mission photo + three paragraphs, stats card. */
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center px-4 pb-16 pt-16">
        <span className="h-8 w-40 rounded-full bg-night-skeleton" />
        <span className="mt-5 h-12 w-64 rounded-xl bg-night-skeleton-strong" />
        <span className="mt-5 h-1.5 w-20 rounded-full bg-night-skeleton-strong" />
        <span className="mt-5 h-5 w-[32rem] max-w-full rounded bg-night-skeleton" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <span className="aspect-[4/3] rounded-3xl bg-night-skeleton" />
        <div className="space-y-5 pt-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <span className="block h-4 w-full rounded bg-night-skeleton-strong" />
              <span className="block h-4 w-11/12 rounded bg-night-skeleton" />
              <span className="block h-4 w-3/4 rounded bg-night-skeleton" />
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mb-20 grid h-40 max-w-3xl grid-cols-3 gap-4 rounded-3xl bg-night-skeleton px-6 py-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <span className="h-10 w-20 rounded-lg bg-night-skeleton-strong" />
            <span className="h-4 w-24 rounded bg-night-skeleton-strong" />
          </div>
        ))}
      </div>
    </div>
  );
}
