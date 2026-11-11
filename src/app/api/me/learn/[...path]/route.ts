import { NextResponse, type NextRequest } from "next/server";
import { backend } from "@/lib/server/backend";
import { getSession } from "@/lib/session";
import { getAcademySlug } from "@/lib/tenant";

const COMPLETE = /^[a-z0-9-]{1,200}\/lessons\/[0-9a-f-]{36}\/complete$/i;

/** POST /api/me/learn/<course>/lessons/<id>/complete → backend, with the learner's token. */
export async function POST(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const path = (await ctx.params).path.join("/");
  if (!COMPLETE.test(path)) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const [session, slug] = await Promise.all([getSession(), getAcademySlug()]);
  if (!session || !slug) return NextResponse.json({ message: "Please sign in again.", code: "SIGNED_OUT" }, { status: 401 });
  const res = await backend(`/academy/${encodeURIComponent(slug)}/me/learn/${path}`, { method: "POST", token: session.token });
  return NextResponse.json(res.ok ? res.data : { message: res.message, code: res.code }, { status: res.status });
}
