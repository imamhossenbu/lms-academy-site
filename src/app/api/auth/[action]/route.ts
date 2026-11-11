import { NextResponse, type NextRequest } from "next/server";
import { backend } from "@/lib/server/backend";
import { cookieOptions, TOKEN_COOKIE, USER_COOKIE } from "@/lib/session";
import { getAcademySlug } from "@/lib/tenant";

const ACTIONS = new Set(["login", "register", "verify", "resend", "forgot", "reset"]);

/** Proxies learner auth to the backend; a successful login / verify stores the session in httpOnly cookies. */
export async function POST(req: NextRequest, ctx: { params: Promise<{ action: string }> }) {
  const { action } = await ctx.params;
  if (!ACTIONS.has(action)) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const slug = await getAcademySlug();
  if (!slug) return NextResponse.json({ message: "Academy not found" }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  const res = await backend<{ token?: string; user?: { id: string; name: string; email: string; avatar: string | null } }>(`/academy/public/${encodeURIComponent(slug)}/auth/${action}`, {
    method: "POST",
    body,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  });
  if (!res.ok) return NextResponse.json({ message: res.message, code: res.code }, { status: res.status });

  const out = NextResponse.json(res.data?.user ? { user: res.data.user } : res.data);
  if (res.data?.token && res.data.user) {
    out.cookies.set(TOKEN_COOKIE, res.data.token, cookieOptions());
    out.cookies.set(USER_COOKIE, JSON.stringify({ slug, ...res.data.user }), cookieOptions());
  }
  return out;
}
