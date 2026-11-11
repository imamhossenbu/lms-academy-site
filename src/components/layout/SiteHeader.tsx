"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { AcademyLogo, type AcademyBrand } from "./AcademyLogo";
import { DesktopNav } from "./header/DesktopNav";
import { MobileMenu } from "./header/MobileMenu";
import { UserMenu, type HeaderUser } from "./header/UserMenu";

/**
 * Sticky full-width header: academy logo, nav (accent colour for the current page), Sign in / Sign up or the learner's menu.
 * Turns compact and glassy once you scroll; a thin accent line along the bottom shows reading progress.
 */
export function SiteHeader({ brand, user }: { brand: AcademyBrand; user: HeaderUser | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className={cn("sticky top-0 z-40 border-b border-dash transition-[background-color,box-shadow] duration-300", scrolled ? "bg-white/80 shadow-lg shadow-primary-500/5 backdrop-blur-xl" : "bg-white")}>
      <motion.div
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
        initial={false}
        animate={{ height: scrolled ? 62 : 74 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        <AcademyLogo brand={brand} />
        <DesktopNav />
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <ButtonLink href={`/login?next=${encodeURIComponent(pathname)}`} variant="ghost" className="text-primary-500">
                Sign in
              </ButtonLink>
              <ButtonLink href={`/signup?next=${encodeURIComponent(pathname)}`} icon={<ArrowRight className="h-4 w-4" />}>
                Get started
              </ButtonLink>
            </>
          )}
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-dash bg-white text-primary-500 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={open ? "x" : "menu"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <div className="mx-auto max-w-7xl px-3 sm:px-5">
        <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} user={user} />}</AnimatePresence>
      </div>

      <motion.span className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gradient-to-r from-accent-20 via-accent to-accent-hover" style={{ scaleX: progress }} aria-hidden />
    </header>
  );
}

export default SiteHeader;
