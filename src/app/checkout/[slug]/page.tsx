import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { fetchQuote, requireLearner } from "@/lib/learner";
import { requireAcademy } from "@/lib/tenant";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutCourse } from "@/components/checkout/CheckoutCourse";
import { CouponForm } from "@/components/checkout/CouponForm";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { AlreadyEnrolled } from "@/components/checkout/AlreadyEnrolled";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ coupon?: string }> };

export default async function CheckoutPage({ params, searchParams }: Props) {
  await requireAcademy();
  const { slug } = await params;
  const coupon = ((await searchParams).coupon ?? "").trim().slice(0, 40);
  const here = `/checkout/${slug}${coupon ? `?coupon=${encodeURIComponent(coupon)}` : ""}`;
  await requireLearner(here);

  const res = await fetchQuote(slug, coupon || undefined);
  if (!res || (!res.ok && res.status === 401)) redirect(`/login?next=${encodeURIComponent(here)}`);
  if (!res.ok) notFound();
  const quote = res.data;

  return (
    <>
      <CheckoutHeader courseSlug={slug} />
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {quote.enrolled ? (
          <AlreadyEnrolled course={quote.course} />
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-5">
              <CheckoutCourse course={quote.course} />
              {!quote.course.isFree && <CouponForm applied={quote.coupon} error={quote.couponError} attempted={coupon} />}
              {quote.total > 0 && <PaymentMethods />}
            </div>
            <div className="lg:sticky lg:top-24">
              <OrderSummary quote={quote} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
