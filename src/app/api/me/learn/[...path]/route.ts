import { NextResponse, type NextRequest } from "next/server";
import { safeLessonHtml } from "@/lib/richText";
import { backend } from "@/lib/server/backend";
import { getSession } from "@/lib/session";
import { getAcademySlug } from "@/lib/tenant";

const C = "[a-z0-9-]{1,200}";
const ID = "[0-9a-f-]{36}";
const ROUTES: Record<string, RegExp[]> = {
  POST: [new RegExp(`^${C}/lessons/${ID}/complete$`, "i"), new RegExp(`^${C}/questions$`, "i"), new RegExp(`^${C}/questions/${ID}/reply$`, "i")],
  PATCH: [new RegExp(`^${C}/lessons/${ID}/position$`, "i")],
  GET: [new RegExp(`^${C}/questions$`, "i")],
};

/** Q&A bodies are rich HTML: sanitise every *Html field before it reaches the browser. */
function cleanHtml<T>(v: T): T {
  if (Array.isArray(v)) return v.map(cleanHtml) as T;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k.endsWith("Html") && typeof x === "string" ? safeLessonHtml(x) : cleanHtml(x)])) as T;
  return v;
}

/** Player calls (complete, video position, course Q&A) → /academy/:slug/me/learn/*, with the learner's token. */
async function forward(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }, method: "GET" | "POST" | "PATCH") {
  const path = (await ctx.params).path.join("/");
  if (!ROUTES[method].some((r) => r.test(path))) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const [session, slug] = await Promise.all([getSession(), getAcademySlug()]);
  if (!session || !slug) return NextResponse.json({ message: "Please sign in again.", code: "SIGNED_OUT" }, { status: 401 });
  const body = method === "GET" ? undefined : await req.json().catch(() => ({}));
  const res = await backend(`/academy/${encodeURIComponent(slug)}/me/learn/${path}`, { method, token: session.token, body });
  return NextResponse.json(res.ok ? cleanHtml(res.data) : { message: res.message, code: res.code }, { status: res.status });
}

export const GET = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => forward(req, ctx, "GET");
export const POST = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => forward(req, ctx, "POST");
export const PATCH = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => forward(req, ctx, "PATCH");
