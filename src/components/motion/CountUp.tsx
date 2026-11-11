"use client";

import React, { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Counts from 0 to `to` when it scrolls into view (en-US grouping, optional prefix / suffix). */
export function CountUp({ to, duration = 1.4, delay = 0, prefix = "", suffix = "", className }: { to: number; duration?: number; delay?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(to);
      return;
    }
    const controls = animate(0, to, { duration, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = format(v)) });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, duration, delay, reduce]);

  return (
    <span ref={ref} className={className}>
      {format(reduce ? to : 0)}
    </span>
  );
}

export default CountUp;
