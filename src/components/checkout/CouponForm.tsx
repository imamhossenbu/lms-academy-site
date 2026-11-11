"use client";

import React, { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, TicketPercent, X } from "lucide-react";
import { ToneBadge } from "@/components/ui/ToneBadge";

const schema = z.object({ code: z.string().trim().min(2, "Enter a coupon code").max(40, "That code is too long").regex(/^[A-Za-z0-9_-]+$/, "Letters, numbers, - and _ only") });
type Values = z.infer<typeof schema>;

/** Coupon box. The code goes in the URL (?coupon=) so the server re-prices and a reload keeps it; its error comes back from the quote. */
export function CouponForm({ applied, error, attempted }: { applied: { code: string; label: string } | null; error: string | null; attempted: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, start] = useTransition();
  const { register, handleSubmit, formState, reset } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { code: applied ? "" : attempted } });

  const go = (code: string | null) => start(() => router.replace(code ? `${pathname}?coupon=${encodeURIComponent(code.toUpperCase())}` : pathname, { scroll: false }));
  const fieldError = formState.errors.code?.message ?? (!applied ? error : null);

  return (
    <div className="rounded-2xl border border-dash bg-white p-5">
      <h2 className="body-medium flex items-center gap-2 font-semibold text-primary-500">
        <TicketPercent className="h-4 w-4 text-accent" />
        Have a coupon?
      </h2>
      <AnimatePresence mode="wait" initial={false}>
        {applied ? (
          <motion.div key="applied" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-green bg-green-bg px-4 py-3">
            <span className="flex min-w-0 items-center gap-2">
              <ToneBadge tone="green" size="sm">
                {applied.code}
              </ToneBadge>
              <span className="truncate body-sm-medium text-green">{applied.label}</span>
            </span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              disabled={pending}
              onClick={() => {
                reset({ code: "" });
                go(null);
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-primary-400 hover:bg-white"
              aria-label="Remove coupon"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </motion.button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} onSubmit={handleSubmit((v) => go(v.code))} noValidate className="mt-3">
            <div className="flex gap-2">
              <input
                {...register("code")}
                placeholder="Enter code"
                aria-label="Coupon code"
                aria-invalid={!!fieldError}
                className={`h-11 min-w-0 flex-1 rounded-xl border px-4 body-sm-regular uppercase text-primary-500 outline-none transition-all placeholder:normal-case placeholder:text-primary-300 focus:border-accent focus:ring-4 focus:ring-accent-10 ${fieldError ? "border-red bg-red-14" : "border-dash bg-white"}`}
              />
              <motion.button type="submit" whileTap={{ scale: 0.96 }} disabled={pending} className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-dash bg-white px-4 body-sm-medium text-primary-500 hover:border-primary-300 disabled:opacity-60">
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                Apply
              </motion.button>
            </div>
            {fieldError && <p className="mt-1.5 body-xsm-regular text-red">{fieldError}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CouponForm;
