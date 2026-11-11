"use client";

import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Mail, Phone, Send, User } from "lucide-react";
import { cn } from "@/lib/cn";
import { postJson } from "@/lib/clientApi";
import { InputField } from "@/components/ui/InputField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { CONTACT_TOPICS, MESSAGE_MAX, contactSchema, type ContactValues } from "./contactSchema";

/** Contact form card: name, email, optional phone, topic chips, message with counter; thank-you state after sending. */
export function ContactForm({ defaults }: { defaults: { name: string; email: string } }) {
  const [sent, setSent] = useState(false);
  const { register, control, handleSubmit, reset, formState } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: defaults.name, email: defaults.email, phone: "", topic: "COURSE", message: "", website: "" },
  });
  const message = useWatch({ control, name: "message" }) ?? "";
  const e = formState.errors;

  const onSubmit = async (v: ContactValues) => {
    const id = toast.loading("Sending your message…");
    const res = await postJson<{ message: string }>("/api/contact", v);
    if (!res.ok) return toast.error("Couldn't send your message", { id, description: res.message });
    toast.success("Message sent!", { id, description: res.data.message });
    setSent(true);
  };

  return (
    <div className="academy-card-glow rounded-3xl border border-night-line bg-night-surface p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-12 text-center">
            <motion.span initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-green/15 text-green">
              <CheckCircle2 className="h-10 w-10" />
            </motion.span>
            <h2 className="heading-h2-bold mt-6 text-white">Message sent!</h2>
            <p className="body-regular mt-2 max-w-sm text-night-soft">Thanks for reaching out. We usually reply within one working day — keep an eye on your inbox.</p>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                reset({ name: defaults.name, email: defaults.email, phone: "", topic: "COURSE", message: "", website: "" });
                setSent(false);
              }}
              className="mt-7 inline-flex h-11 items-center rounded-xl border border-accent px-5 body-sm-medium font-semibold text-accent hover:bg-accent-10"
            >
              Send another message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <h2 className="heading-h3 font-bold text-white">Send us a message</h2>
              <p className="body-sm-regular mt-1 text-night-muted">Fill in the form and our team will get back to you by email.</p>
            </div>
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField id="contact-name" label="Your name" autoComplete="name" placeholder="Full name" leftElement={<User className="h-4 w-4" />} error={e.name?.message} {...register("name")} />
              <InputField id="contact-email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" leftElement={<Mail className="h-4 w-4" />} error={e.email?.message} {...register("email")} />
            </div>
            <InputField id="contact-phone" label="Phone (optional)" type="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" leftElement={<Phone className="h-4 w-4" />} error={e.phone?.message} {...register("phone")} />

            <fieldset>
              <legend className="mb-2 body-sm-medium text-night-soft">What&apos;s it about?</legend>
              <Controller
                control={control}
                name="topic"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2" role="radiogroup">
                    {CONTACT_TOPICS.map((t) => {
                      const on = field.value === t.value;
                      return (
                        <motion.button
                          key={t.value}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => field.onChange(t.value)}
                          className={cn("relative isolate inline-flex h-9 items-center whitespace-nowrap rounded-full border px-4 body-sm-medium transition-colors", on ? "border-accent text-white" : "border-night-line text-night-soft hover:border-night-line-strong")}
                        >
                          {on && <motion.span layoutId="contact-topic" className="academy-gradient absolute inset-0 -z-10 rounded-full" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                          {t.label}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              />
              {e.topic && <p className="mt-1.5 body-xsm-regular text-red">{e.topic.message}</p>}
            </fieldset>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block body-sm-medium text-night-soft">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                placeholder="How can we help?"
                aria-invalid={!!e.message}
                {...register("message")}
                className={cn(
                  "w-full resize-y rounded-xl border bg-night-surface px-4 py-3 body-regular text-white outline-none transition-all placeholder:text-night-muted focus:border-accent focus:ring-4 focus:ring-accent-10",
                  e.message ? "border-red bg-red-14" : "border-night-line",
                )}
              />
              <div className="mt-1.5 flex justify-between gap-3 body-xsm-regular">
                <span className="text-red">{e.message?.message}</span>
                <span className={cn(message.length > MESSAGE_MAX ? "text-red" : "text-night-muted")}>
                  {message.length.toLocaleString("en-US")}/{MESSAGE_MAX.toLocaleString("en-US")}
                </span>
              </div>
            </div>

            <SubmitButton loading={formState.isSubmitting} loadingText="Sending…" icon={<Send className="h-4 w-4" />}>
              Send message
            </SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContactForm;
