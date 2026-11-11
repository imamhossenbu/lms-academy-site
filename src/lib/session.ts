import { cache } from "react";
import { cookies } from "next/headers";
import { getAcademySlug } from "./tenant";

/** Learner session cookies (httpOnly — the browser's JavaScript never sees the token). */
export const TOKEN_COOKIE = "academy_token";
export const USER_COOKIE = "academy_user";
/** Matches the backend's access-token lifetime (1 day). */
export const SESSION_MAX_AGE = 60 * 60 * 24;

export interface SessionUser {
  slug: string;
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export const cookieOptions = () => ({ httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_MAX_AGE });

/** The signed-in learner of THIS academy (a session from another academy on the same host is ignored). */
export const getSession = cache(async (): Promise<{ token: string; user: SessionUser } | null> => {
  const jar = await cookies();
  const token = jar.get(TOKEN_COOKIE)?.value;
  const raw = jar.get(USER_COOKIE)?.value;
  if (!token || !raw) return null;
  try {
    const user = JSON.parse(raw) as SessionUser;
    const slug = await getAcademySlug();
    if (!slug || user.slug !== slug) return null;
    // Expired JWT → treat as signed out.
    const payload = JSON.parse(Buffer.from(token.split(".")[1] ?? "", "base64url").toString("utf8")) as { exp?: number };
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return { token, user };
  } catch {
    return null;
  }
});

/** Same-site path to return to after signing in (never an absolute / protocol-relative URL). */
export const safeNext = (next: string | null | undefined, fallback = "/") =>
  next && next.startsWith("/") && !next.startsWith("//") && !/^\/(login|signup)(\/|\?|$)/.test(next) ? next : fallback;
