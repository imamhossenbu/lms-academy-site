import { NextResponse } from "next/server";
import { API_URL } from "@/lib/config";
import { getSession } from "@/lib/session";
import { getAcademySlug } from "@/lib/tenant";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Streams the signed-in learner's certificate PDF from the backend (rendered on demand). */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const [{ id }, session, slug] = await Promise.all([params, getSession(), getAcademySlug()]);
  if (!session || !slug) return NextResponse.json({ message: "Please sign in again.", code: "SIGNED_OUT" }, { status: 401 });
  if (!UUID.test(id)) return NextResponse.json({ message: "Certificate not found" }, { status: 404 });
  try {
    const res = await fetch(`${API_URL}/academy/${encodeURIComponent(slug)}/me/certificates/${id}/pdf`, { cache: "no-store", headers: { Authorization: `Bearer ${session.token}` } });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
      const raw = data?.message;
      return NextResponse.json({ message: (Array.isArray(raw) ? raw[0] : raw) || "We couldn't prepare your certificate." }, { status: res.status });
    }
    return new NextResponse(res.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": res.headers.get("content-disposition") ?? 'attachment; filename="certificate.pdf"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ message: "We couldn't reach the academy service. Please try again in a moment." }, { status: 503 });
  }
}
