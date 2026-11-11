import { NextResponse, type NextRequest } from "next/server";
import { backend } from "@/lib/server/backend";
import { cookieOptions, getSession, USER_COOKIE } from "@/lib/session";
import { getAcademySlug } from "@/lib/tenant";
import type { LearnerProfile } from "@/types/academy";

/** Save the learner's profile; the header's name is refreshed in the session cookie. */
export async function PATCH(req: NextRequest) {
  const [session, slug] = await Promise.all([getSession(), getAcademySlug()]);
  if (!session || !slug) return NextResponse.json({ message: "Please sign in again.", code: "SIGNED_OUT" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const res = await backend<LearnerProfile>(`/academy/${encodeURIComponent(slug)}/me/profile`, {
    method: "PATCH",
    token: session.token,
    body: { name: String(b.name ?? ""), phone: String(b.phone ?? ""), bio: String(b.bio ?? ""), country: String(b.country ?? "") },
  });
  if (!res.ok) return NextResponse.json({ message: res.message, code: res.code }, { status: res.status });
  const out = NextResponse.json(res.data);
  out.cookies.set(USER_COOKIE, JSON.stringify({ ...session.user, name: res.data.name, avatar: res.data.avatar }), cookieOptions());
  return out;
}
