import { NextResponse, type NextRequest } from "next/server";
import { ACADEMY_COOKIE, ALLOW_ACADEMY_PARAM } from "@/lib/config";

/** Dev / preview: `?academy=<slug>` picks the academy to show (remembered in a cookie), then drops the param. */
export function proxy(req: NextRequest) {
  if (!ALLOW_ACADEMY_PARAM) return NextResponse.next();
  const raw = req.nextUrl.searchParams.get("academy");
  if (raw === null) return NextResponse.next();
  const slug = raw.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 63);
  const url = req.nextUrl.clone();
  url.searchParams.delete("academy");
  const res = NextResponse.redirect(url);
  if (slug) res.cookies.set(ACADEMY_COOKIE, slug, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  else res.cookies.delete(ACADEMY_COOKIE);
  return res;
}

export const config = { matcher: ["/((?!_next/|favicon|icon|images/|.*\\.[a-z0-9]+$).*)"] };
