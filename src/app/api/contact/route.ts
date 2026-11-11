import { NextResponse, type NextRequest } from "next/server";
import { backend } from "@/lib/server/backend";
import { getAcademySlug } from "@/lib/tenant";

/** Contact form → backend (stored for Admin › Website › Messages + emailed to the academy). */
export async function POST(req: NextRequest) {
  const slug = await getAcademySlug();
  if (!slug) return NextResponse.json({ message: "Academy not found" }, { status: 404 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const res = await backend<{ message: string }>(`/academy/public/${encodeURIComponent(slug)}/contact`, {
    method: "POST",
    body: { name: String(b.name ?? ""), email: String(b.email ?? ""), phone: String(b.phone ?? ""), topic: String(b.topic ?? ""), message: String(b.message ?? ""), website: String(b.website ?? "") },
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  });
  if (!res.ok) return NextResponse.json({ message: res.status === 429 ? "Too many messages — please wait a minute and try again." : res.message }, { status: res.status });
  return NextResponse.json(res.data);
}
