"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { QuizSubmitResult, StudentQuiz } from "@/types/academy";

type Q = StudentQuiz["questions"][number];
type Verdict = NonNullable<QuizSubmitResult["questions"]>[number];
export interface Answer {
  optionIds: string[];
  text: string;
}

/** One question: prompt, choices (radio / checkbox look) or a text box; after grading, right / wrong colours + explanation. */
export function QuizQuestion({ q, index, answer, onChange, verdict, locked }: { q: Q; index: number; answer: Answer; onChange: (a: Answer) => void; verdict?: Verdict; locked: boolean}) {
  const multi = q.kind === "MULTIPLE_SELECT";
  const toggle = (id: string) => onChange({ ...answer, optionIds: multi ? (answer.optionIds.includes(id) ? answer.optionIds.filter((x) => x !== id) : [...answer.optionIds, id]) : [id] });

  return (
    <fieldset className={cn("rounded-2xl border p-5 transition-colors", verdict ? (verdict.correct ? "border-green/50 bg-green/5" : "border-red/50 bg-red/5") : "border-night-line bg-night-surface")}>
      <legend className="sr-only">Question {index + 1}</legend>
      <div className="flex items-start justify-between gap-3">
        <p className="body-xsm-medium text-night-muted">
          Question {index + 1} · {q.points} {q.points === 1 ? "mark" : "marks"}
          {multi && " · select all that apply"}
        </p>
        {verdict && (
          <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 body-xsm-medium", verdict.correct ? "bg-green/15 text-green" : "bg-red/15 text-red")}>
            {verdict.correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            {verdict.correct ? "Correct" : "Incorrect"}
          </span>
        )}
      </div>
      <div className="academy-prose mt-2 heading-h5 text-white" dangerouslySetInnerHTML={{ __html: q.questionHtml }} />

      {q.kind === "SHORT_ANSWER" ? (
        <input
          value={answer.text}
          disabled={locked}
          onChange={(e) => onChange({ ...answer, text: e.target.value })}
          maxLength={200}
          placeholder="Type your answer"
          aria-label={`Answer to question ${index + 1}`}
          className="mt-4 h-12 w-full rounded-xl border border-night-line bg-night-raised px-4 body-regular text-white outline-none placeholder:text-night-muted focus:border-accent focus:ring-4 focus:ring-accent-10"
        />
      ) : (
        <div className="mt-4 grid gap-2.5">
          {q.options.map((o) => {
            const picked = answer.optionIds.includes(o.id);
            const right = verdict?.correctOptionIds?.includes(o.id);
            return (
              <motion.button
                key={o.id}
                type="button"
                role={multi ? "checkbox" : "radio"}
                aria-checked={picked}
                disabled={locked}
                whileTap={locked ? undefined : { scale: 0.98 }}
                onClick={() => toggle(o.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left body-regular transition-colors disabled:cursor-default",
                  right ? "border-green bg-green/10 text-white" : picked ? (verdict ? "border-red bg-red/10 text-white" : "border-accent bg-accent-10 text-white") : "border-night-line text-night-soft hover:border-night-line-strong",
                )}
              >
                <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center border-2", multi ? "rounded-md" : "rounded-full", picked ? "border-accent bg-accent" : "border-night-line-strong")}>
                  {picked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                {o.text}
              </motion.button>
            );
          })}
        </div>
      )}
      {verdict?.explanationHtml && (
        <div className="mt-4 rounded-xl bg-white/5 p-4">
          <p className="body-xsm-medium text-night-muted">Explanation</p>
          <div className="academy-prose mt-1" dangerouslySetInnerHTML={{ __html: verdict.explanationHtml }} />
        </div>
      )}
    </fieldset>
  );
}

export default QuizQuestion;
