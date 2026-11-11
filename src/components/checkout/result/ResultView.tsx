"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, RefreshCw, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatDate, formatPrice } from "@/lib/format";
import type { AcademyCurrency } from "@/types/academy";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CourseThumb } from "@/components/course/CourseThumb";

export type ResultStatus = "PAID" | "ENROLLED" | "PENDING" | "FAILED" | "CANCELLED" | "REFUNDED";

const COPY: Record<ResultStatus, { icon: typeof CheckCircle2; tone: string; title: string; text: string }> = {
  PAID: { icon: CheckCircle2, tone: "bg-green/15 text-green", title: "Payment successful!", text: "You're enrolled. Your course is ready whenever you are." },
  ENROLLED: { icon: CheckCircle2, tone: "bg-green/15 text-green", title: "You're enrolled!", text: "Your course is ready whenever you are." },
  PENDING: { icon: Clock, tone: "bg-yellow/15 text-yellow", title: "Confirming your payment…", text: "This usually takes a few seconds. If you were charged, your access will appear shortly." },
  FAILED: { icon: XCircle, tone: "bg-red-14 text-red", title: "Payment didn't go through", text: "Nothing was charged. You can try again — or use a different payment method." },
  CANCELLED: { icon: XCircle, tone: "bg-yellow/15 text-yellow", title: "Payment cancelled", text: "You left the payment page before paying. Your order is saved — try again whenever you're ready." },
  REFUNDED: { icon: RefreshCw, tone: "bg-blue-14 text-blue", title: "This order was refunded", text: "The payment was returned and course access was removed." },
};

interface Props {
  status: ResultStatus;
  course: { slug: string; title: string; thumbnail: string | null };
  order?: { number: string; total: number; currency: AcademyCurrency; paidAt: string | null; method: string | null };
}

/** Outcome of a checkout: animated status icon, message, order details and the next step. */
export function ResultView({ status, course, order }: Props) {
  const router = useRouter();
  const c = COPY[status];
  const success = status === "PAID" || status === "ENROLLED";
  const retry = status === "FAILED" || status === "CANCELLED";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }} className={cn("relative mx-auto flex h-20 w-20 items-center justify-center rounded-full", c.tone)}>
        {success && <motion.span className="absolute inset-0 rounded-full bg-green/15" initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 1.2, repeat: 2 }} aria-hidden />}
        <c.icon className={cn("relative h-10 w-10", status === "PENDING" && "animate-pulse")} />
      </motion.span>
      <h1 className="heading-h1-bold mt-6 text-white">{c.title}</h1>
      <p className="body-regular mt-3 text-night-muted">{c.text}</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-night-line bg-night-surface text-left">
        <div className="flex items-center gap-4 p-4">
          <span className="w-28 shrink-0 overflow-hidden rounded-xl">
            <CourseThumb src={course.thumbnail} title={course.title} sizes="112px" />
          </span>
          <p className="body-medium min-w-0 font-semibold text-white">{course.title}</p>
        </div>
        {order && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-night-line bg-night-raised/60 p-4 body-sm-regular">
            <dt className="text-night-muted">Order</dt>
            <dd className="text-right font-medium text-white">{order.number}</dd>
            <dt className="text-night-muted">Total</dt>
            <dd className="text-right font-medium text-white">{formatPrice(order.total, order.currency)}</dd>
            {order.paidAt && (
              <>
                <dt className="text-night-muted">Paid on</dt>
                <dd className="text-right font-medium text-white">
                  {formatDate(order.paidAt)}
                  {order.method ? ` · ${order.method}` : ""}
                </dd>
              </>
            )}
          </dl>
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {success && <ButtonLink href="/my-courses">Go to my courses</ButtonLink>}
        {retry && <ButtonLink href={`/checkout/${course.slug}`}>Try again</ButtonLink>}
        {status === "PENDING" && (
          <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => router.refresh()} className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 body-sm-medium text-white academy-glow-btn">
            <RefreshCw className="h-4 w-4" />
            Check again
          </motion.button>
        )}
        <ButtonLink href={`/courses/${course.slug}`} variant="secondary">
          View course
        </ButtonLink>
      </div>
    </motion.div>
  );
}

export default ResultView;
