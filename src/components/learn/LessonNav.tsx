"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { postJson } from "@/lib/clientApi";
import type { PlayerOutline } from "@/types/academy";

/** Previous / Mark as complete / Next. Completing refreshes the outline (progress ring, ticks) and offers the next lesson. */
export function LessonNav({ courseSlug, lessonId, completed, prevId, nextId, canComplete }: { courseSlug: string; lessonId: string; completed: boolean; prevId: string | null; nextId: string | null; canComplete: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const complete = async () => {
    setBusy(true);
    const id = toast.loading("Saving your progress…");
    const res = await postJson<PlayerOutline>(`/api/me/learn/${courseSlug}/lessons/${lessonId}/complete`);
    setBusy(false);
    if (!res.ok) return toast.error("Couldn't mark it complete", { id, description: res.message });
    const p = res.data;
    toast.success(p.progress === 100 ? "Course complete! 🎉" : "Lesson complete", { id, description: p.progress === 100 ? "You've finished every lesson." : `${p.progress}% of the course done.` });
    if (nextId) router.push(`?lesson=${nextId}`, { scroll: false });
    router.refresh();
  };

  const navBtn = "inline-flex h-11 items-center gap-1.5 rounded-xl border border-night-line px-4 body-sm-medium text-white transition-colors hover:border-night-line-strong";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-night-line pt-6">
      {prevId ? (
        <Link href={`?lesson=${prevId}`} scroll={false} className={navBtn}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
      ) : (
        <span />
      )}
      <div className="flex flex-wrap gap-3">
        {completed ? (
          <span className="inline-flex h-11 items-center gap-2 rounded-xl bg-green/15 px-4 body-sm-medium text-green">
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </span>
        ) : (
          canComplete && (
            <motion.button type="button" whileTap={{ scale: 0.96 }} disabled={busy} onClick={complete} className="academy-gradient academy-glow-btn inline-flex h-11 items-center gap-2 rounded-xl px-5 body-sm-medium font-semibold text-white disabled:opacity-60">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {nextId ? "Complete & continue" : "Mark as complete"}
            </motion.button>
          )
        )}
        {nextId && (
          <Link href={`?lesson=${nextId}`} scroll={false} className={cn(navBtn, completed && "border-accent text-accent")}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default LessonNav;
