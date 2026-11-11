"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_LINKS, isActive } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Slide-down menu for small screens. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  return (
    <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden lg:hidden" aria-label="Mobile">
      <div className="space-y-1 px-1 pb-4 pt-2">
        {NAV_LINKS.map((l, i) => (
          <motion.div key={l.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
            <Link href={l.href} onClick={onClose} className={cn("block rounded-xl px-3 py-2.5 body-medium", isActive(pathname, l.href) ? "bg-accent-light text-accent" : "text-primary-500")}>
              {l.label}
            </Link>
          </motion.div>
        ))}
        <div className="pt-3">
          <ButtonLink href="/courses" className="w-full" icon={<ArrowRight className="h-4 w-4" />}>
            Browse courses
          </ButtonLink>
        </div>
      </div>
    </motion.nav>
  );
}

export default MobileMenu;
