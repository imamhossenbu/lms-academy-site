"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { NAV_LINKS, isActive } from "@/lib/nav";

/** Centre navigation: a soft accent pill slides to the hovered item, the current page is in the accent colour. */
export function DesktopNav() {
  const pathname = usePathname();
  const [hover, setHover] = useState<string | null>(null);
  const active = NAV_LINKS.find((l) => isActive(pathname, l.href))?.href ?? null;
  const pillAt = hover ?? active;

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main" onMouseLeave={() => setHover(null)}>
      {NAV_LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onMouseEnter={() => setHover(l.href)}
          aria-current={active === l.href ? "page" : undefined}
          className={cn("relative rounded-xl px-4 py-2 body-sm-medium transition-colors", active === l.href ? "text-accent" : "text-white hover:text-accent")}
        >
          {pillAt === l.href && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-xl bg-accent-light" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

export default DesktopNav;
