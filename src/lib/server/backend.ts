import { API_URL } from "@/lib/config";

export interface BackendResult<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
  /** First human-readable error message (validation arrays are flattened). */
  message: string;
  code?: string;
}

/** Server-side call to the backend API (no caching) — used by route handlers and signed-in pages. */
export async function backend<T = unknown>(path: string, init: { method?: string; body?: unknown; token?: string | null; ip?: string | null; userAgent?: string | null } = {}): Promise<BackendResult<T>> {
  if (!API_URL) return { ok: false, status: 503, data: null as T, message: "The academy service is not configured." };
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: init.method ?? "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
        ...(init.ip ? { "X-Forwarded-For": init.ip } : {}),
        ...(init.userAgent ? { "User-Agent": init.userAgent } : {}),
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
    });
    const data = (await res.json().catch(() => null)) as (T & { message?: string | string[]; code?: string }) | null;
    const raw = data && typeof data === "object" ? data.message : undefined;
    const message = Array.isArray(raw) ? raw[0] : raw || (res.ok ? "" : "Something went wrong. Please try again.");
    return { ok: res.ok, status: res.status, data: data as T, message: String(message), code: data && typeof data === "object" ? data.code : undefined };
  } catch {
    return { ok: false, status: 503, data: null as T, message: "We couldn't reach the academy service. Please try again in a moment." };
  }
}
