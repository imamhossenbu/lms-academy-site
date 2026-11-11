"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, ChevronDown, FileText, MessageSquareText, Trophy } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AssignmentItem } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { SubmitAssignmentForm } from "./SubmitAssignmentForm";

const STATE = {
  TODO: { label: "To do", tone: "accent" as const },
  OVERDUE: { label: "Overdue", tone: "red" as const },
  SUBMITTED: { label: "Submitted", tone: "blue" as const },
  GRADED: { label: "Graded", tone: "green" as const },
};
const due = (iso: string) => new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

/** Assignment row that expands into instructions (sanitised on the server), the last submission, feedback and the submit form. */
export function AssignmentCard({ a, defaultOpen }: { a: AssignmentItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const s = STATE[a.state];
  const last = a.lastSubmission;
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-night-surface transition-colors", open ? "border-accent/40" : "border-night-line")}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full flex-wrap items-center gap-3 p-5 text-left">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
          <FileText className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block body-medium truncate font-semibold text-white">{a.title}</span>
          <span className="block body-xsm-regular truncate text-night-muted">{a.course.title}</span>
        </span>
        <span className="inline-flex items-center gap-1 body-xsm-regular text-night-muted">
          <CalendarClock className="h-3.5 w-3.5" />
          Due {due(a.dueDate)}
        </span>
        <ToneBadge tone={s.tone} size="sm" dot>
          {s.label}
        </ToneBadge>
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4 text-night-muted" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="space-y-5 border-t border-night-line p-5">
              {a.instructionsHtml && <div className="academy-prose" dangerouslySetInnerHTML={{ __html: a.instructionsHtml }} />}
              <p className="body-xsm-regular text-night-muted">
                {a.marks} marks · {a.attempts} attempt{a.attempts === 1 ? "" : "s"} used{a.attemptsLeft !== null ? ` · ${a.attemptsLeft} left` : ""}
              </p>
              {last && (
                <div className="rounded-xl border border-night-line bg-night-raised p-4">
                  <p className="body-sm-medium font-semibold text-white">
                    Your attempt {last.attempt} · {new Date(last.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    {last.isLate && <span className="ml-2 text-yellow">(late)</span>}
                  </p>
                  {last.fileUrl && (
                    <a href={last.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block body-sm-regular text-accent hover:underline">
                      {last.fileName || "Your file"}
                    </a>
                  )}
                  {last.textAnswer && <p className="mt-1 line-clamp-3 whitespace-pre-line body-sm-regular text-night-soft">{last.textAnswer}</p>}
                  {last.status === "GRADED" && (
                    <p className="mt-3 inline-flex items-center gap-2 body-sm-medium text-green">
                      <Trophy className="h-4 w-4" />
                      {last.marksObtained ?? 0} / {a.marks} marks
                    </p>
                  )}
                  {last.feedback && (
                    <p className="mt-2 flex gap-2 body-sm-regular text-night-soft">
                      <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {last.feedback}
                    </p>
                  )}
                </div>
              )}
              {a.canSubmit ? <SubmitAssignmentForm a={a} /> : <p className="body-sm-regular text-night-muted">Submissions are closed for this assignment.</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AssignmentCard;
