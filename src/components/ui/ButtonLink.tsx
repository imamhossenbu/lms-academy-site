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
  primary: "bg-accent text-white hover:bg-accent-hover academy-glow-btn",
  secondary: "bg-white text-primary-500 border border-dash hover:border-primary-300",
  ghost: "text-primary-400 hover:text-primary-500 hover:bg-slate-100",
  light: "bg-white text-accent hover:bg-accent-light",
  dark: "bg-primary-500 text-white hover:bg-primary-400",
};
const SIZES = { sm: "h-9 px-3.5 body-sm-medium", md: "h-11 px-5 body-sm-medium", lg: "h-12 px-6 body-medium" };
const MotionLink = motion.create(Link);

/** A link styled as a button in the academy's accent colour. Presses in on tap; the trailing icon nudges forward on hover. */
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
