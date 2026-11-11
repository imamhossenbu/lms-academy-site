import type { Transition, Variants } from "framer-motion";

/** Shared easing / timings so every entrance feels the same (a soft "expo out"). */
export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

/** Children fade up out of a slight blur, one after another. */
export const staggerParent = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT } },
};
