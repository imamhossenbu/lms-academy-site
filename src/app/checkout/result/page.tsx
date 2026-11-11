import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { fetchCourse } from "@/lib/api";
import { fetchAccess, fetchOrderResult, requireLearner } from "@/lib/learner";
import { requireAcademy } from "@/lib/tenant";
import { ResultView } from "@/components/checkout/result/ResultView";

export const metadata: Metadata = { title: "Checkout result", robots: { index: false } };

type Props = { searchParams: Promise<{ order?: string; course?: string }> };

/** Where SSLCommerz sends the learner back (?order=) and where free enrolments land (?course=). */
export default async function CheckoutResultPage({ searchParams }: Props) {
  const academy = await requireAcademy();
  const { order, course } = await searchParams;
  const here = `/checkout/result?${order ? `order=${encodeURIComponent(order)}` : `course=${encodeURIComponent(course ?? "")}`}`;
  await requireLearner(here);

  if (order) {
    const res = await fetchOrderResult(order.slice(0, 64));
    if (!res || (!res.ok && res.status === 401)) redirect(`/login?next=${encodeURIComponent(here)}`);
    if (!res.ok) notFound();
    const o = res.data;
    return <ResultView status={o.status} course={o.course} order={{ number: o.orderNumber, total: o.total, currency: o.currency, paidAt: o.paidAt, method: o.method }} />;
  }

  if (!course) notFound();
  const [detail, enrolled] = await Promise.all([fetchCourse(academy.slug, course), fetchAccess(course)]);
  if (!detail) notFound();
  if (!enrolled) redirect(`/checkout/${detail.slug}`);
  return <ResultView status="ENROLLED" course={{ slug: detail.slug, title: detail.title, thumbnail: detail.thumbnail }} />;
}
