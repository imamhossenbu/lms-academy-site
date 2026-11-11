"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Code2, FileQuestion, FileText, Lock, PenLine, PlayCircle, Radio, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatDuration, plural } from "@/lib/format";
import type { AcademyModuleOutline } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { DetailSection } from "./DetailSection";

const TYPE_ICON: Record<string, LucideIcon> = { VIDEO: PlayCircle, TEXT: FileText, QUIZ: FileQuestion, ASSIGNMENT: PenLine, CODING: Code2, LIVE: Radio };

/** Course outline: modules as an accordion (first one open), each lesson with its type, preview flag and length. */
export function Curriculum({ modules, lessons, durationMinutes }: { modules: AcademyModuleOutline[]; lessons: number; durationMinutes: number }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(modules[0] ? [modules[0].id] : []));
  if (modules.length === 0) return null;
  const allOpen = open.size === modules.length;
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <DetailSection
      id="curriculum"
      title="Course content"
      aside={
        <div className="flex items-center gap-4 body-sm-regular text-night-muted">
          <span>
            {plural(modules.length, "module")} · {plural(lessons, "lesson")}
            {formatDuration(durationMinutes) && ` · ${formatDuration(durationMinutes)}`}
          </span>
          <button type="button" onClick={() => setOpen(allOpen ? new Set() : new Set(modules.map((m) => m.id)))} className="body-sm-medium text-accent hover:underline">
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      }
    >
      <div className="divide-y divide-night-line overflow-hidden rounded-2xl border border-night-line">
        {modules.map((m, mi) => {
          const isOpen = open.has(m.id);
          return (
            <div key={m.id}>
              <motion.button type="button" whileTap={{ scale: 0.995 }} onClick={() => toggle(m.id)} aria-expanded={isOpen} className={cn("flex w-full items-center gap-4 px-5 py-4 text-left transition-colors", isOpen ? "bg-accent-soft" : "bg-night-surface hover:bg-night-skeleton")}>
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg body-xsm-medium font-bold", isOpen ? "bg-accent text-white" : "bg-night-skeleton-strong text-night-soft")}>{mi + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block body-medium font-semibold text-white">{m.title}</span>
                  <span className="block body-xsm-regular text-night-muted">
                    {plural(m.lessons.length, "lesson")}
                    {formatDuration(m.durationMinutes) && ` · ${formatDuration(m.durationMinutes)}`}
                  </span>
                </span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-5 w-5 text-night-muted" />
                </motion.span>
              </motion.button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} className="overflow-hidden bg-night-surface">
                    {m.description && <li className="px-5 pb-1 pt-3 body-sm-regular text-night-muted">{m.description}</li>}
                    {m.lessons.map((l) => {
                      const Icon = TYPE_ICON[l.type] ?? FileText;
                      return (
                        <li key={l.id} className="flex items-center gap-3 px-5 py-3">
                          <Icon className="h-4 w-4 shrink-0 text-night-muted" />
                          <span className="min-w-0 flex-1 truncate body-sm-regular text-night-soft">{l.title}</span>
                          {l.isPreview ? (
                            <ToneBadge tone="accent" size="sm" variant="pill">
                              Preview
                            </ToneBadge>
                          ) : (
                            <Lock className="h-3.5 w-3.5 shrink-0 text-night-muted" aria-label="Enrolled learners only" />
                          )}
                          {formatDuration(l.durationMinutes) && <span className="w-14 shrink-0 text-right body-xsm-regular text-night-muted">{formatDuration(l.durationMinutes)}</span>}
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </DetailSection>
  );
}

export default Curriculum;
