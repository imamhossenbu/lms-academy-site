import { NextResponse } from "next/server";
import { TOKEN_COOKIE, USER_COOKIE } from "@/lib/session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(TOKEN_COOKIE);
  res.cookies.delete(USER_COOKIE);
  return res;
}
