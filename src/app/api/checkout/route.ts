import { NextResponse, type NextRequest } from "next/server";
import { backend } from "@/lib/server/backend";
import { getSession } from "@/lib/session";
import { getAcademySlug } from "@/lib/tenant";

/** Starts a checkout for the signed-in learner → { status: "ENROLLED" | "REDIRECT", gatewayUrl?, orderId? }. */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Please sign in to continue.", code: "SIGNED_OUT" }, { status: 401 });
  const slug = await getAcademySlug();
  const body = (await req.json().catch(() => ({}))) as { courseSlug?: string; coupon?: string };
  const res = await backend(`/academy/${encodeURIComponent(slug!)}/me/checkout`, {
    method: "POST",
    token: session.token,
    body: { courseSlug: String(body.courseSlug ?? ""), ...(body.coupon ? { coupon: String(body.coupon) } : {}) },
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    userAgent: req.headers.get("user-agent"),
  });
  if (!res.ok) return NextResponse.json({ message: res.message, code: res.status === 401 ? "SIGNED_OUT" : res.code }, { status: res.status });
  return NextResponse.json(res.data);
}
