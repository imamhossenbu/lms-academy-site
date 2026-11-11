"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { riseIn, staggerParent } from "./presets";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between children. */
  stagger?: number;
  delay?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
  as?: "div" | "ul" | "ol";
}

/** Reveals its <StaggerItem> children one after another (on mount or when it scrolls into view). */
export function Stagger({ children, className, stagger = 0.08, delay = 0, onMount = false, as = "div" }: StaggerProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) return React.createElement(as, { className }, children);
  return (
    <Tag
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-60px" } })}
    >
      {children}
    </Tag>
  );
}

/** One child of <Stagger>: rises in out of a soft blur. */
export function StaggerItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "span" | "p" | "h1" | "h2" }) {
  const reduce = useReducedMotion();
  if (reduce) return React.createElement(as, { className }, children);
  const Tag = motion[as];
  return (
    <Tag className={className} variants={riseIn}>
      {children}
    </Tag>
  );
}
