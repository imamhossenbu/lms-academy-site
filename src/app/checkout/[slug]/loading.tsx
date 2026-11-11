/** Checkout skeleton: header, course row, coupon box, payment method and the summary card. */
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 pb-20 pt-10 sm:px-6">
      <span className="block h-4 w-28 rounded bg-night-skeleton" />
      <span className="mt-4 block h-10 w-48 rounded-xl bg-night-skeleton-strong" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <div className="flex gap-4 rounded-2xl border border-night-line p-4">
            <span className="aspect-video w-44 rounded-xl bg-night-skeleton" />
            <div className="flex-1 space-y-2 pt-2">
              <span className="block h-5 w-20 rounded-md bg-night-skeleton" />
              <span className="block h-5 w-3/4 rounded bg-night-skeleton-strong" />
              <span className="block h-4 w-32 rounded bg-night-skeleton" />
            </div>
          </div>
          <div className="rounded-2xl border border-night-line p-5">
            <span className="block h-5 w-36 rounded bg-night-skeleton-strong" />
            <div className="mt-3 flex gap-2">
              <span className="h-11 flex-1 rounded-xl border border-night-line" />
              <span className="h-11 w-20 rounded-xl border border-night-line" />
            </div>
          </div>
          <div className="rounded-2xl border border-night-line p-5">
            <span className="block h-5 w-40 rounded bg-night-skeleton-strong" />
            <span className="mt-3 block h-28 rounded-xl bg-night-skeleton" />
          </div>
        </div>
        <div className="rounded-3xl border border-night-line p-6">
          <span className="block h-6 w-36 rounded bg-night-skeleton-strong" />
          <div className="mt-5 space-y-3">
            <div className="flex justify-between">
              <span className="h-4 w-24 rounded bg-night-skeleton" />
              <span className="h-4 w-16 rounded bg-night-skeleton" />
            </div>
            <div className="flex justify-between border-t border-night-line pt-4">
              <span className="h-5 w-12 rounded bg-night-skeleton-strong" />
              <span className="h-8 w-24 rounded-lg bg-night-skeleton-strong" />
            </div>
          </div>
          <span className="mt-6 block h-12 rounded-xl bg-night-skeleton-strong" />
        </div>
      </div>
    </div>
  );
}
