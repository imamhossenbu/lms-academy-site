"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Award, Loader2, RotateCcw, Send, XCircle } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import type { QuizSubmitResult, StudentQuiz } from "@/types/academy";
import { QuizQuestion, type Answer } from "./QuizQuestion";

/** Loads the lesson's quiz, lets the learner answer, submits for server grading and shows the result; a pass completes the lesson. */
export function QuizRunner({ quizId, courseSlug, lessonId, completed }: { quizId: string; courseSlug: string; lessonId: string; completed: boolean}) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<StudentQuiz | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [result, setResult] = useState<QuizSubmitResult | null>(null);
  const [busy, setBusy] = useState(false);
  const started = useRef(0);

  useEffect(() => {
    let alive = true;
    fetch(`/api/quiz/${quizId}`)
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!alive) return;
        if (r.ok) {
          started.current = Date.now();
          setQuiz(d as StudentQuiz);
        }
        else setError((d as { message?: string }).message || "Couldn't load this quiz.");
      })
      .catch(() => alive && setError("Couldn't load this quiz. Check your connection."));
    return () => {
      alive = false;
    };
  }, [quizId]);

  if (error) return <p className="rounded-xl border border-red/40 bg-red/10 p-4 body-sm-regular text-red">{error}</p>;
  if (!quiz)
    return (
      <div className="animate-pulse space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-night-line p-5">
            <span className="block h-3 w-28 rounded bg-night-skeleton" />
            <span className="mt-3 block h-5 w-3/4 rounded bg-night-skeleton-strong" />
            {[0, 1, 2].map((o) => (
              <span key={o} className="mt-3 block h-11 rounded-xl border border-night-line" />
            ))}
          </div>
        ))}
      </div>
    );

  const get = (id: string): Answer => answers[id] ?? { optionIds: [], text: "" };
  const unanswered = quiz.questions.filter((q) => q.required && !(q.kind === "SHORT_ANSWER" ? get(q.id).text.trim() : get(q.id).optionIds.length)).length;

  const submit = async () => {
    if (unanswered) return toast.error("Answer every question", { description: `${unanswered} question${unanswered === 1 ? "" : "s"} still need an answer.` });
    setBusy(true);
    const id = toast.loading("Submitting your answers…");
    const res = await postJson<QuizSubmitResult>(`/api/quiz/${quizId}/submit`, {
      answers: quiz.questions.map((q) => ({ questionId: q.id, ...(q.kind === "SHORT_ANSWER" ? { text: get(q.id).text.trim() } : { optionIds: get(q.id).optionIds }) })),
      timeTakenSeconds: Math.round((Date.now() - started.current) / 1000),
    });
    setBusy(false);
    if (!res.ok) return toast.error("Couldn't submit the quiz", { id, description: res.message });
    setResult(res.data);
    const passed = res.data.passed;
    const description = res.data.percentage !== undefined ? `You scored ${res.data.percentage}%.` : "Your instructor will see your answers.";
    if (passed === false) toast.warning("Not passed yet", { id, description: `${description} Review the answers and try again.` });
    else toast.success(passed ? "You passed!" : "Quiz submitted", { id, description });
    if (passed !== false && !completed) {
      await postJson(`/api/me/learn/${courseSlug}/lessons/${lessonId}/complete`);
      router.refresh();
    }
  };

  const retry = () => {
    setResult(null);
    setAnswers({});
    started.current = Date.now();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      {quiz.instructionsHtml && <div className="academy-prose rounded-2xl border border-night-line bg-night-surface p-5" dangerouslySetInnerHTML={{ __html: quiz.instructionsHtml }} />}
      <p className="body-sm-regular text-night-muted">
        {quiz.questions.length} questions · {quiz.totalMarks} marks · pass with {quiz.passingMarks}
        {quiz.timeLimitMinutes ? ` · ${quiz.timeLimitMinutes} min` : ""}
      </p>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className={`flex flex-wrap items-center gap-4 rounded-2xl p-5 ${result.passed === false ? "border border-red/40 bg-red/10" : "academy-gradient"}`}>
            {result.passed === false ? <XCircle className="h-10 w-10 text-red" /> : <Award className="h-10 w-10 text-white" />}
            <div className="min-w-0 flex-1">
              <p className="heading-h4 font-bold text-white">{result.passed === false ? "Not passed this time" : result.passed ? "You passed!" : "Answers submitted"}</p>
              {result.percentage !== undefined && (
                <p className="body-sm-regular text-white/85">
                  {result.score}/{result.totalMarks} marks · {result.percentage}% · attempt {result.attemptNumber}
                </p>
              )}
            </div>
            <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={retry} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/40 px-4 body-sm-medium text-white hover:bg-white/10">
              <RotateCcw className="h-4 w-4" />
              Try again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {quiz.questions.map((q, i) => (
        <QuizQuestion key={q.id} q={q} index={i} answer={get(q.id)} onChange={(a) => setAnswers((s) => ({ ...s, [q.id]: a }))} verdict={result?.questions?.find((v) => v.questionId === q.id)} locked={!!result} />
      ))}

      {!result && (
        <motion.button type="button" whileTap={{ scale: 0.97 }} disabled={busy} onClick={submit} className="academy-gradient academy-glow-btn inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl body-medium font-semibold text-white disabled:opacity-60 sm:w-auto sm:px-8">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Submit answers
        </motion.button>
      )}
    </div>
  );
}

export default QuizRunner;
