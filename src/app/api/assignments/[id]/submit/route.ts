import { NextResponse, type NextRequest } from "next/server";
import { API_URL } from "@/lib/config";
import { getSession } from "@/lib/session";

const ID = /^[0-9a-f-]{36}$/i;

/** Assignment submission (multipart: file / textAnswer / link) → backend /assignment/:id/submit with the learner's token. */
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!ID.test(id)) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Please sign in again.", code: "SIGNED_OUT" }, { status: 401 });
  const incoming = await req.formData().catch(() => null);
  if (!incoming) return NextResponse.json({ message: "Nothing to submit." }, { status: 400 });
  const form = new FormData();
  for (const key of ["textAnswer", "link", "file"]) {
    const v = incoming.get(key);
    if (v !== null && v !== "") form.append(key, v);
  }
  try {
    const res = await fetch(`${API_URL}/assignment/${id}/submit`, { method: "POST", headers: { Authorization: `Bearer ${session.token}` }, body: form, cache: "no-store" });
    const data = (await res.json().catch(() => ({}))) as { message?: string | string[] };
    const message = Array.isArray(data.message) ? data.message[0] : data.message;
    return NextResponse.json(res.ok ? { ok: true } : { message: message || "Couldn't submit your work." }, { status: res.status });
  } catch {
    return NextResponse.json({ message: "We couldn't reach the academy service. Please try again." }, { status: 503 });
  }
}
