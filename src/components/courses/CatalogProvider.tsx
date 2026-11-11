"use client";

import React, { createContext, useCallback, useContext, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CatalogCtx {
  /** Current value of a URL param. */
  get: (key: string) => string;
  /** Set / clear params (empty string or null clears) — resets to page 1 unless `page` is part of the patch. */
  update: (patch: Record<string, string | null>) => void;
  clearAll: () => void;
  pending: boolean;
}

const Ctx = createContext<CatalogCtx | null>(null);

/** Keeps every catalogue filter in the URL (so reloads and shared links keep them) and exposes the pending state while the server re-renders. */
export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const go = useCallback(
    (next: URLSearchParams) => {
      const s = next.toString();
      startTransition(() => router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false }));
    },
    [pathname, router],
  );

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v) next.set(k, v);
        else next.delete(k);
      }
      if (!("page" in patch)) next.delete("page");
      go(next);
    },
    [go, params],
  );

  const value: CatalogCtx = {
    get: (key) => params.get(key) ?? "",
    update,
    clearAll: () => go(new URLSearchParams()),
    pending,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCatalog() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCatalog must be used inside <CatalogProvider>");
  return ctx;
}
