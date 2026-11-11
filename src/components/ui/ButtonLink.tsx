"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  /** Open in a new tab (external links). */
  external?: boolean;
}

const VARIANTS = {
  primary: "academy-gradient text-white academy-glow-btn",
  secondary: "bg-transparent text-accent border border-accent hover:bg-accent-10",
  ghost: "text-night-soft hover:text-white hover:bg-night-skeleton",
  light: "bg-white text-night hover:bg-white/90",
  dark: "bg-night-raised text-white border border-night-line hover:border-night-line-strong",
};
const SIZES = { sm: "h-9 px-3.5 body-sm-medium", md: "h-11 px-5 body-sm-medium", lg: "h-12 px-6 body-medium" };
const MotionLink = motion.create(Link);

/** A link styled as a button: neon accent gradient (primary) or accent outline (secondary). Presses in on tap; the trailing icon nudges forward on hover. */
export function ButtonLink({ href, children, variant = "primary", size = "md", icon, className, external }: ButtonLinkProps) {
  const filled = variant === "primary" || variant === "light" || variant === "dark";
  const cls = cn("group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl whitespace-nowrap transition-colors", VARIANTS[variant], SIZES[size], className);
  const body = (
    <>
      {filled && (
        <span
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100"
          aria-hidden
        />
      )}
      <span className="relative inline-flex items-center gap-2">
        {children}
        {icon && <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
      </span>
    </>
  );
  const tap = { whileTap: { scale: 0.96 }, transition: { type: "spring" as const, stiffness: 500, damping: 30 } };
  return href.startsWith("/") || href.startsWith("#") ? (
    <MotionLink href={href} className={cls} {...tap}>
      {body}
    </MotionLink>
  ) : (
    <motion.a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...tap}>
      {body}
    </motion.a>
  );
}

export default ButtonLink;
