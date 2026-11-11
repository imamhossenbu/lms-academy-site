"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Circle, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import type { PlayerOutline } from "@/types/academy";
import { LessonTypeIcon } from "./lessonIcons";

/** Course content list: modules (the current one open) → lessons with done / locked / current state and length. */
export function CurriculumSidebar({ outline, currentId, onNavigate }: { outline: PlayerOutline; currentId: string | null; onNavigate?: () => void }) {
  const currentModule = outline.modules.find((m) => m.lessons.some((l) => l.id === currentId))?.id ?? outline.modules[0]?.id;
  const [open, setOpen] = useState<Set<string>>(() => new Set(currentModule ? [currentModule] : []));
  const toggle = (id: string) => setOpen((s) => (s.has(id) ? new Set([...s].filter((x) => x !== id)) : new Set([...s, id])));

  return (
    <nav aria-label="Course content" className="divide-y divide-night-line">
      {outline.modules.map((m, mi) => {
        const done = m.lessons.filter((l) => l.completed).length;
        const isOpen = open.has(m.id);
        return (
          <div key={m.id}>
            <button type="button" onClick={() => toggle(m.id)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/5">
              <span className="min-w-0 flex-1">
                <span className="block body-xsm-medium text-night-muted">Module {mi + 1}</span>
                <span className="block body-sm-medium truncate font-semibold text-white">{m.title}</span>
              </span>
              <span className="shrink-0 body-xsm-medium text-night-muted">
                {done}/{m.lessons.length}
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4 text-night-muted" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden pb-2">
                  {m.lessons.map((l) => {
                    const current = l.id === currentId;
                    const locked = !!l.lockedReason;
                    const row = (
                      <>
                        <span className="mt-0.5 shrink-0">
                          {l.completed ? <CheckCircle2 className="h-4 w-4 text-green" /> : locked ? <Lock className="h-4 w-4 text-night-muted" /> : <Circle className={cn("h-4 w-4", current ? "text-accent" : "text-night-muted")} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block body-sm-regular", current ? "font-semibold text-white" : locked ? "text-night-muted" : "text-night-soft")}>{l.title}</span>
                          <span className="mt-0.5 flex items-center gap-1.5 body-2xsm-regular text-night-muted">
                            <LessonTypeIcon type={l.type} className="h-3 w-3" />
                            {formatDuration(l.durationMinutes) || l.type.toLowerCase()}
                          </span>
                        </span>
                      </>
                    );
                    const cls = cn("relative mx-2 flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors", current ? "bg-accent-10" : "hover:bg-white/5");
                    return (
                      <li key={l.id}>
                        <Link href={`?lesson=${l.id}`} scroll={false} onClick={onNavigate} className={cls} aria-current={current ? "page" : undefined} title={l.lockedReason ?? undefined}>
                          {current && <motion.span layoutId="current-lesson" className="absolute inset-y-2 left-0 w-1 rounded-full bg-accent" />}
                          {row}
                        </Link>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

export default CurriculumSidebar;
