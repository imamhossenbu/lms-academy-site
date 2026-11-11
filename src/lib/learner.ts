import { redirect } from "next/navigation";
import type { CheckoutQuote, CheckoutResult, LessonDetail, MyCourse, PlayerOutline } from "@/types/academy";
import { backend } from "./server/backend";
import { getSession } from "./session";
import { getAcademySlug } from "./tenant";

/** Signed-in learner reads (server components). Each returns null when signed out. */

async function me<T>(path: string): Promise<{ ok: true; data: T } | { ok: false; status: number; message: string } | null> {
  const [session, slug] = await Promise.all([getSession(), getAcademySlug()]);
  if (!session || !slug) return null;
  const res = await backend<T>(`/academy/${encodeURIComponent(slug)}/me${path}`, { token: session.token });
  return res.ok ? { ok: true, data: res.data } : { ok: false, status: res.status, message: res.message };
}

/** Pages that need a learner: sends visitors to sign in and come back here. */
export async function requireLearner(returnTo: string) {
  const session = await getSession();
  if (!session) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  return session;
}

export async function fetchAccess(courseSlug: string) {
  const r = await me<{ enrolled: boolean }>(`/courses/${encodeURIComponent(courseSlug)}/access`);
  return r?.ok ? r.data.enrolled : false;
}

export const fetchQuote = (courseSlug: string, coupon?: string) => me<CheckoutQuote>(`/checkout/${encodeURIComponent(courseSlug)}${coupon ? `?coupon=${encodeURIComponent(coupon)}` : ""}`);
export const fetchOrderResult = (orderId: string) => me<CheckoutResult>(`/orders/${encodeURIComponent(orderId)}`);
export const fetchMyCourses = () => me<MyCourse[]>("/courses");

export const fetchOutline = (courseSlug: string) => me<PlayerOutline>(`/learn/${encodeURIComponent(courseSlug)}`);
export const fetchLesson = (courseSlug: string, lessonId: string) => me<LessonDetail>(`/learn/${encodeURIComponent(courseSlug)}/lessons/${encodeURIComponent(lessonId)}`);
