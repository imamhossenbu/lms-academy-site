/** Browser → this site's own /api routes (which talk to the backend). */
export interface ClientResult<T> {
  ok: boolean;
  status: number;
  data: T;
  message: string;
  code?: string;
}

export async function postJson<T = unknown>(url: string, body?: unknown): Promise<ClientResult<T>> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) });
    const data = (await res.json().catch(() => ({}))) as T & { message?: string; code?: string };
    return { ok: res.ok, status: res.status, data, message: data?.message || (res.ok ? "" : "Something went wrong. Please try again."), code: data?.code };
  } catch {
    return { ok: false, status: 0, data: {} as T, message: "You seem to be offline. Check your connection and try again." };
  }
}
