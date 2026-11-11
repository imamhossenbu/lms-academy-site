"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";

/** Back to the course + page title + "secure checkout" note. */
export function CheckoutHeader({ courseSlug }: { courseSlug: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6">
      <Link href={`/courses/${courseSlug}`} className="inline-flex items-center gap-1.5 body-sm-medium text-night-muted hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to course
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <h1 className="heading-h1-bold text-white">Checkout</h1>
        <span className="inline-flex items-center gap-1.5 body-sm-medium text-green">
          <ShieldCheck className="h-4 w-4" />
          Secure checkout
        </span>
      </div>
    </motion.div>
  );
}

export default CheckoutHeader;
