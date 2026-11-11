import { cache } from "react";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { fetchProfile, resolveHost } from "./api";
import { ACADEMY_COOKIE, ACADEMY_ROOT_DOMAIN, ALLOW_ACADEMY_PARAM, DEFAULT_ACADEMY_SLUG } from "./config";

const LOCAL_HOST = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$|\.local$|\.vercel\.app$/;

/**
 * Which academy this request is for:
 *  1. dev / preview: the `academy_slug` cookie (set by `?academy=<slug>`, see proxy.ts)
 *  2. `<slug>.<ACADEMY_ROOT_DOMAIN>`
 *  3. localhost / preview hosts → DEFAULT_ACADEMY_SLUG
 *  4. anything else → a verified custom domain (backend lookup)
 */
export const getAcademySlug = cache(async (): Promise<string | null> => {
  const h = await headers();
  const host = (h.get("x-forwarded-host") ?? h.get("host") ?? "").split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");

  if (ALLOW_ACADEMY_PARAM) {
    const picked = (await cookies()).get(ACADEMY_COOKIE)?.value;
    if (picked) return picked;
  }
  if (ACADEMY_ROOT_DOMAIN && host.endsWith(`.${ACADEMY_ROOT_DOMAIN}`)) {
    const sub = host.slice(0, -(ACADEMY_ROOT_DOMAIN.length + 1));
    if (sub && !sub.includes(".")) return sub;
  }
  if (!host || LOCAL_HOST.test(host)) return DEFAULT_ACADEMY_SLUG || null;
  return (await resolveHost(host))?.slug ?? null;
});

/** The current academy's profile (null = no academy at this address). Deduplicated per request. */
export const getAcademy = cache(async () => {
  const slug = await getAcademySlug();
  return slug ? fetchProfile(slug) : null;
});

/** For pages: the root layout already shows the "no academy" / "unavailable" screens, so this only guards types. */
export async function requireAcademy() {
  const academy = await getAcademy();
  if (!academy || !academy.available) notFound();
  return academy;
}
