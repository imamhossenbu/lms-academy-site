"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import { formatPrice } from "@/lib/format";
import type { CheckoutQuote } from "@/types/academy";
import { SubmitButton } from "@/components/ui/SubmitButton";

/** Price breakdown + the pay / enrol button. Paid → off to SSLCommerz; free or fully discounted → enrolled here. */
export function OrderSummary({ quote }: { quote: CheckoutQuote }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const free = quote.total <= 0;
  const money = (n: number) => formatPrice(n, quote.currency);

  const pay = async () => {
    setBusy(true);
    const id = toast.loading(free ? "Enrolling you…" : "Opening the secure payment page…");
    const res = await postJson<{ status: "ENROLLED" | "REDIRECT"; gatewayUrl?: string; orderId?: string | null }>("/api/checkout", { courseSlug: quote.course.slug, coupon: quote.coupon?.code });
    if (!res.ok) {
      setBusy(false);
      if (res.code === "SIGNED_OUT") {
        toast.error("Please sign in again", { id, description: "Your session has ended." });
        router.push(`/login?next=${encodeURIComponent(`/checkout/${quote.course.slug}`)}`);
        return;
      }
      toast.error(free ? "Couldn't enrol you" : "Couldn't start the payment", { id, description: res.message });
      return;
    }
    if (res.data.status === "REDIRECT" && res.data.gatewayUrl) {
      toast.success("Redirecting to payment", { id, description: "Complete the payment on SSLCommerz." });
      window.location.assign(res.data.gatewayUrl);
      return;
    }
    toast.success("You're enrolled!", { id, description: quote.course.title });
    router.push(res.data.orderId ? `/checkout/result?order=${res.data.orderId}` : `/checkout/result?course=${encodeURIComponent(quote.course.slug)}`);
  };

  return (
    <div className="rounded-3xl border border-night-line bg-night-surface p-6 shadow-2xl shadow-black/40">
      <h2 className="heading-h5 font-semibold text-white">Order summary</h2>
      <dl className="mt-5 space-y-3 body-sm-regular">
        <div className="flex justify-between gap-3">
          <dt className="text-night-soft">Course price</dt>
          <dd className="font-medium text-white">{quote.course.isFree ? "Free" : money(quote.price)}</dd>
        </div>
        <AnimatePresence initial={false}>
          {quote.discount > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex justify-between gap-3 overflow-hidden">
              <dt className="text-green">Coupon ({quote.coupon?.code})</dt>
              <dd className="font-medium text-green">−{money(quote.discount)}</dd>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-end justify-between gap-3 border-t border-night-line pt-4">
          <dt className="body-medium font-semibold text-white">Total</dt>
          <dd className="heading-h2-bold text-white">{free ? "Free" : money(quote.total)}</dd>
        </div>
      </dl>
      <SubmitButton type="button" onClick={pay} loading={busy} loadingText={free ? "Enrolling…" : "Opening payment…"} className="mt-6" icon={free ? undefined : <Lock className="h-4 w-4" />}>
        {free ? "Enroll now" : `Pay ${money(quote.total)}`}
      </SubmitButton>
      <p className="body-xsm-regular mt-3 text-center text-night-muted">{free ? "You'll get access straight away." : "You'll get access as soon as the payment is confirmed."}</p>
    </div>
  );
}

export default OrderSummary;
