"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, MessageCircleQuestion, Plus, Send } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import type { QuestionThread } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { InputField } from "@/components/ui/InputField";
import { SubmitButton } from "@/components/ui/SubmitButton";

const askSchema = z.object({
  title: z.string().trim().min(5, "Give your question a short title").max(150, "Keep the title under 150 characters"),
  body: z.string().trim().min(10, "Describe your question (at least 10 characters)").max(5000, "Your question is too long"),
});
const when = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

/** Course Q&A under every lesson: questions + answers (instructors highlighted), ask a question, reply. */
export function CourseQuestions({ courseSlug }: { courseSlug: string }) {
  const [items, setItems] = useState<QuestionThread[] | null>(null);
  const [asking, setAsking] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [nonce, setNonce] = useState(0);
  const load = useCallback(() => setNonce((n) => n + 1), []);
  useEffect(() => {
    let alive = true;
    fetch(`/api/me/learn/${courseSlug}/questions`)
      .then(async (r) => (r.ok ? ((await r.json()) as QuestionThread[]) : []))
      .catch(() => [] as QuestionThread[])
      .then((d) => alive && setItems(d));
    return () => {
      alive = false;
    };
  }, [courseSlug, nonce]);

  const form = useForm<z.infer<typeof askSchema>>({ resolver: zodResolver(askSchema), defaultValues: { title: "", body: "" } });
  const ask = form.handleSubmit(async (v) => {
    const id = toast.loading("Posting your question…");
    const res = await postJson(`/api/me/learn/${courseSlug}/questions`, v);
    if (!res.ok) return toast.error("Couldn't post your question", { id, description: res.message });
    toast.success("Question posted", { id, description: "Your instructor will be notified in their Q&A." });
    form.reset();
    setAsking(false);
    load();
  });
  const sendReply = async (threadId: string) => {
    if (reply.trim().length < 2) return toast.error("Write your reply first");
    const id = toast.loading("Posting your reply…");
    const res = await postJson(`/api/me/learn/${courseSlug}/questions/${threadId}/reply`, { body: reply });
    if (!res.ok) return toast.error("Couldn't post your reply", { id, description: res.message });
    toast.success("Reply posted", { id });
    setReply("");
    load();
  };

  return (
    <section className="space-y-4 border-t border-night-line pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="heading-h4 inline-flex items-center gap-2 font-bold text-white">
          <MessageCircleQuestion className="h-5 w-5 text-accent" />
          Course Q&amp;A
        </h2>
        <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => setAsking((v) => !v)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-accent px-4 body-sm-medium text-accent hover:bg-accent-10">
          <Plus className="h-4 w-4" />
          Ask a question
        </motion.button>
      </div>
      <AnimatePresence initial={false}>
        {asking && (
          <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={ask} noValidate className="space-y-3 overflow-hidden rounded-2xl border border-night-line bg-night-surface p-5">
            <InputField id="ask-title" label="Question" placeholder="What are you stuck on?" error={form.formState.errors.title?.message} {...form.register("title")} />
            <div>
              <textarea rows={4} placeholder="Add details — what you tried, where you got stuck…" aria-label="Details" {...form.register("body")} className={`w-full rounded-xl border bg-night-raised px-4 py-3 body-regular text-white outline-none placeholder:text-night-muted focus:border-accent focus:ring-4 focus:ring-accent-10 ${form.formState.errors.body ? "border-red" : "border-night-line"}`} />
              {form.formState.errors.body && <p className="mt-1.5 body-xsm-regular text-red">{form.formState.errors.body.message}</p>}
            </div>
            <SubmitButton size="md" loading={form.formState.isSubmitting} loadingText="Posting…" icon={<Send className="h-4 w-4" />} className="sm:w-auto">
              Post question
            </SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
      {items === null ? (
        <div className="animate-pulse space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-3 rounded-2xl border border-night-line p-4">
              <span className="h-8 w-8 rounded-full bg-night-skeleton-strong" />
              <div className="flex-1 space-y-2">
                <span className="block h-4 w-2/3 rounded bg-night-skeleton-strong" />
                <span className="block h-3 w-1/3 rounded bg-night-skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-night-line p-5 text-center body-sm-regular text-night-muted">No questions yet — be the first to ask.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((q) => {
            const isOpen = open === q.id;
            const answeredByInstructor = q.replies.some((r) => r.author.isInstructor);
            return (
              <li key={q.id} className="overflow-hidden rounded-2xl border border-night-line bg-night-surface">
                <button type="button" onClick={() => setOpen(isOpen ? null : q.id)} aria-expanded={isOpen} className="flex w-full items-start gap-3 p-4 text-left">
                  <Avatar name={q.author.name} src={q.author.avatar} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block body-sm-medium font-semibold text-white">{q.title}</span>
                    <span className="block body-xsm-regular text-night-muted">
                      {q.author.isMe ? "You" : q.author.name} · {when(q.createdAt)} · {q.replies.length} repl{q.replies.length === 1 ? "y" : "ies"}
                    </span>
                  </span>
                  {answeredByInstructor && (
                    <ToneBadge tone="green" size="sm" icon={<CheckCircle2 className="h-3 w-3" />}>
                      Instructor answered
                    </ToneBadge>
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-3 border-t border-night-line p-4">
                        <div className="academy-prose" dangerouslySetInnerHTML={{ __html: q.bodyHtml }} />
                        {q.replies.map((r) => (
                          <div key={r.id} className={`rounded-xl border p-3 ${r.author.isInstructor ? "border-accent/40 bg-accent-10" : "border-night-line bg-night-raised"}`}>
                            <p className="mb-1 body-xsm-medium text-night-muted">
                              {r.author.isMe ? "You" : r.author.name}
                              {r.author.isInstructor && <span className="ml-2 text-accent">Instructor</span>} · {when(r.createdAt)}
                            </p>
                            <div className="academy-prose" dangerouslySetInnerHTML={{ __html: r.bodyHtml }} />
                          </div>
                        ))}
                        {!q.isLocked && (
                          <div className="flex gap-2">
                            <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a reply…" aria-label="Reply" className="h-11 min-w-0 flex-1 rounded-xl border border-night-line bg-night-raised px-4 body-sm-regular text-white outline-none placeholder:text-night-muted focus:border-accent" />
                            <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={() => sendReply(q.id)} className="academy-gradient inline-flex h-11 items-center rounded-xl px-4 text-white" aria-label="Send reply">
                              <Send className="h-4 w-4" />
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default CourseQuestions;
