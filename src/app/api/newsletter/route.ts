import { NextResponse, type NextRequest } from "next/server";
import { backend } from "@/lib/server/backend";
import { getAcademySlug } from "@/lib/tenant";

/** Newsletter sign-up → backend (keeps the API URL server-side). */
export async function POST(req: NextRequest) {
  const slug = await getAcademySlug();
  if (!slug) return NextResponse.json({ message: "Academy not found" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const res = await backend<{ message: string }>(`/academy/public/${encodeURIComponent(slug)}/newsletter`, {
    method: "POST",
    body: { email: String(body.email ?? ""), name: String(body.name ?? ""), source: String(body.source ?? "website"), website: String(body.website ?? "") },
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  });
  if (!res.ok) return NextResponse.json({ message: res.status === 429 ? "Too many tries — please wait a minute and try again." : res.message }, { status: res.status });
  return NextResponse.json(res.data);
}
