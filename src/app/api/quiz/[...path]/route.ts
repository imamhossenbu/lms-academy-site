import { NextResponse, type NextRequest } from "next/server";
import { backend } from "@/lib/server/backend";
import { safeLessonHtml } from "@/lib/richText";
import { getSession } from "@/lib/session";

const ID = "[0-9a-f-]{36}";
const GET_OK = new RegExp(`^${ID}(/my-attempts)?$`, "i");
const POST_OK = new RegExp(`^${ID}/submit$`, "i");

/** Quiz texts are rich HTML written in the panel: sanitise every *Html field before it reaches the browser. */
function cleanHtml<T>(v: T): T {
  if (Array.isArray(v)) return v.map(cleanHtml) as T;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k.endsWith("Html") && typeof x === "string" ? safeLessonHtml(x) : cleanHtml(x)])) as T;
  return v;
}

async function forward(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }, method: "GET" | "POST") {
  const path = (await ctx.params).path.join("/");
  if (!(method === "GET" ? GET_OK : POST_OK).test(path)) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Please sign in again.", code: "SIGNED_OUT" }, { status: 401 });
  const body = method === "POST" ? await req.json().catch(() => ({})) : undefined;
  const res = await backend<Record<string, unknown>>(`/quiz/${path}`, { method, token: session.token, body });
  return NextResponse.json(res.ok ? cleanHtml(res.data) : { message: res.message, code: res.code }, { status: res.status });
}

/** Learner quiz calls (take, own attempts, submit) → backend /quiz/*, with the learner's token. */
export const GET = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => forward(req, ctx, "GET");
export const POST = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) => forward(req, ctx, "POST");
