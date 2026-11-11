const DEV = process.env.NODE_ENV !== "production";
const clean = (u: string) => u.replace(/\/$/, "");

/** Backend API (server-side fetches). Empty in production = not configured → the site shows "not found". */
export const API_URL = clean(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || (DEV ? "http://localhost:4077" : ""));

/** Academy sites are served at <slug>.<ACADEMY_ROOT_DOMAIN>; anything else is looked up as a custom domain. */
export const ACADEMY_ROOT_DOMAIN = (process.env.ACADEMY_ROOT_DOMAIN || "").trim().toLowerCase();

/** Academy used on localhost / preview hosts when the URL doesn't name one (development). */
export const DEFAULT_ACADEMY_SLUG = (process.env.DEFAULT_ACADEMY_SLUG || (DEV ? "edupro-academy" : "")).trim().toLowerCase();

/** `?academy=<slug>` switches the academy (kept in a cookie) — development and preview hosts only. */
export const ALLOW_ACADEMY_PARAM = DEV || process.env.ALLOW_ACADEMY_PARAM === "true";
export const ACADEMY_COOKIE = "academy_slug";

/** EduPro marketing site ("Powered by EduPro"). */
export const PLATFORM_URL = clean(process.env.NEXT_PUBLIC_PLATFORM_URL || (DEV ? "http://localhost:3002" : "https://edupro.com"));

/** How long server-rendered academy data may be reused (seconds). */
export const REVALIDATE = 60;
