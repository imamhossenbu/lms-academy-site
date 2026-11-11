"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { postJson } from "@/lib/clientApi";

const schema = z.object({
  email: z.string().trim().min(1, "Enter your email address").email("Enter a valid email address").max(120),
  website: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

/** Email box + subscribe button. `compact` = footer size. Shows a thank-you state after subscribing. */
export function NewsletterForm({ source, compact = false }: { source: string; compact?: boolean }) {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "", website: "" } });

  const onSubmit = async (v: Values) => {
    const id = toast.loading("Subscribing…");
    const res = await postJson<{ message: string }>("/api/newsletter", { email: v.email, source, website: v.website });
    if (!res.ok) return toast.error("Couldn't subscribe", { id, description: res.message });
    toast.success("You're subscribed!", { id, description: res.data.message });
    reset();
    setDone(true);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {done ? (
        <motion.p key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={cn("flex items-center gap-2 text-green", compact ? "body-sm-medium" : "body-medium justify-center")}>
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Thanks! You&apos;re on the list.
        </motion.p>
      ) : (
        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          {/* Honeypot: hidden from people, filled by bots. */}
          <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />
          <div className={cn("flex gap-2", compact ? "flex-col" : "flex-col sm:flex-row")}>
            <div className="relative min-w-0 flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-night-muted" />
              <input
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                aria-label="Email address"
                aria-invalid={!!formState.errors.email}
                {...register("email")}
                className={cn(
                  "w-full rounded-xl border bg-night-raised pl-11 pr-4 text-white outline-none transition-all placeholder:text-night-muted focus:border-accent focus:ring-4 focus:ring-accent-10",
                  compact ? "h-11 body-sm-regular" : "h-13 body-regular",
                  formState.errors.email ? "border-red" : "border-night-line",
                )}
              />
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              disabled={formState.isSubmitting}
              className={cn("academy-gradient academy-glow-btn inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 font-semibold text-white disabled:opacity-60", compact ? "h-11 body-sm-medium" : "h-13 body-medium")}
            >
              {formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Subscribe
            </motion.button>
          </div>
          {formState.errors.email && <p className={cn("mt-1.5 body-xsm-regular text-red", !compact && "text-center sm:text-left")}>{formState.errors.email.message}</p>}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default NewsletterForm;
