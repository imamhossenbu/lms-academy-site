/** Result skeleton: status circle, title, message, course card with order rows, two buttons. */
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-xl animate-pulse flex-col items-center px-4 py-16">
      <span className="h-20 w-20 rounded-full bg-slate-200" />
      <span className="mt-6 h-9 w-72 max-w-full rounded-xl bg-slate-200" />
      <span className="mt-3 h-4 w-80 max-w-full rounded bg-slate-100" />
      <div className="mt-8 w-full rounded-2xl border border-dash">
        <div className="flex items-center gap-4 p-4">
          <span className="aspect-video w-28 rounded-xl bg-slate-100" />
          <span className="h-5 flex-1 rounded bg-slate-200" />
        </div>
        <div className="space-y-2 border-t border-dash p-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex justify-between">
              <span className="h-4 w-16 rounded bg-slate-100" />
              <span className="h-4 w-28 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <span className="h-11 w-40 rounded-xl bg-slate-200" />
        <span className="h-11 w-32 rounded-xl border border-dash" />
      </div>
    </div>
  );
}
