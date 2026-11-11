/** Course page skeleton: dark header (breadcrumb, title, meta, instructor), enrol card, outcomes box and module rows. */
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="bg-brand-navy">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
          <div className="space-y-4 lg:max-w-[calc(100%-400px)]">
            <span className="block h-4 w-48 rounded bg-white/10" />
            <span className="block h-6 w-28 rounded-full bg-white/10" />
            <span className="block h-12 w-full rounded-xl bg-white/15" />
            <span className="block h-12 w-2/3 rounded-xl bg-white/15" />
            <span className="block h-5 w-5/6 rounded bg-white/10" />
            <div className="flex gap-6">
              <span className="h-4 w-32 rounded bg-white/10" />
              <span className="h-4 w-24 rounded bg-white/10" />
              <span className="h-4 w-20 rounded bg-white/10" />
            </div>
            <span className="block h-11 w-56 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div className="order-2 space-y-10 lg:order-1 lg:pt-12">
          <div>
            <span className="block h-7 w-52 rounded-lg bg-slate-200" />
            <div className="mt-5 grid gap-3 rounded-2xl border border-dash p-6 sm:grid-cols-2">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="h-5 w-5 rounded-full bg-slate-200" />
                  <span className="h-4 flex-1 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="block h-7 w-44 rounded-lg bg-slate-200" />
            <div className="mt-5 divide-y divide-dash rounded-2xl border border-dash">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <span className="h-8 w-8 rounded-lg bg-slate-200" />
                  <div className="flex-1 space-y-2">
                    <span className="block h-4 w-1/2 rounded bg-slate-200" />
                    <span className="block h-3 w-24 rounded bg-slate-100" />
                  </div>
                  <span className="h-5 w-5 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 -mt-6 lg:order-2 lg:-mt-72">
          <div className="overflow-hidden rounded-3xl border border-dash bg-white">
            <div className="aspect-video bg-slate-100" />
            <div className="space-y-3 p-6">
              <span className="block h-9 w-28 rounded-lg bg-slate-200" />
              <span className="block h-12 w-full rounded-xl bg-slate-200" />
              <span className="block h-11 w-full rounded-xl border border-dash" />
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="h-4 w-4 rounded bg-slate-200" />
                  <span className="h-4 w-40 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
