"use client";

import React from "react";
import { usePathname } from "next/navigation";

/** Hides the site footer inside the course player (/learn), where the page is a full-height app. */
export function FooterGate({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith("/learn/") ? null : <>{children}</>;
}

export default FooterGate;
