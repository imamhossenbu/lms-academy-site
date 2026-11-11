import { NextResponse, type NextRequest } from "next/server";
import { backend } from "@/lib/server/backend";
import { getSession } from "@/lib/session";
import { getAcademySlug } from "@/lib/tenant";

/** Change password (current password required). */
export async function POST(req: NextRequest) {
  const [session, slug] = await Promise.all([getSession(), getAcademySlug()]);
  if (!session || !slug) return NextResponse.json({ message: "Please sign in again.", code: "SIGNED_OUT" }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const res = await backend(`/academy/${encodeURIComponent(slug)}/me/password`, { method: "POST", token: session.token, body: { currentPassword: String(b.currentPassword ?? ""), newPassword: String(b.newPassword ?? "") } });
  return NextResponse.json(res.ok ? { ok: true } : { message: res.message, code: res.code }, { status: res.ok ? 200 : res.status });
}
