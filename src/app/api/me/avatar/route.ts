import { NextResponse, type NextRequest } from "next/server";
import { API_URL } from "@/lib/config";
import { cookieOptions, getSession, USER_COOKIE } from "@/lib/session";

async function finish(res: Response, session: NonNullable<Awaited<ReturnType<typeof getSession>>>) {
  const data = (await res.json().catch(() => ({}))) as { avatar?: string | null; message?: string | string[] };
  if (!res.ok) {
    const message = res.status === 413 ? "The image must be 3 MB or smaller." : Array.isArray(data.message) ? data.message[0] : data.message;
    return NextResponse.json({ message: message || "Couldn't update your photo." }, { status: res.status });
  }
  const out = NextResponse.json({ avatar: data.avatar ?? null });
  // Keep the header's avatar in sync.
  out.cookies.set(USER_COOKIE, JSON.stringify({ ...session.user, avatar: data.avatar ?? null }), cookieOptions());
  return out;
}

/** Upload a profile photo (multipart "avatar") → backend /user/avatar. */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("avatar");
  if (!(file instanceof File)) return NextResponse.json({ message: "Choose an image to upload." }, { status: 400 });
  if (file.size > 3 * 1024 * 1024) return NextResponse.json({ message: "The image must be 3 MB or smaller." }, { status: 413 });
  const out = new FormData();
  out.append("avatar", file);
  try {
    return finish(await fetch(`${API_URL}/user/avatar`, { method: "POST", headers: { Authorization: `Bearer ${session.token}` }, body: out, cache: "no-store" }), session);
  } catch {
    return NextResponse.json({ message: "We couldn't reach the academy service." }, { status: 503 });
  }
}

/** Remove the profile photo. */
export async function DELETE() {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
  try {
    return finish(await fetch(`${API_URL}/user/avatar`, { method: "DELETE", headers: { Authorization: `Bearer ${session.token}` }, cache: "no-store" }), session);
  } catch {
    return NextResponse.json({ message: "We couldn't reach the academy service." }, { status: 503 });
  }
}
