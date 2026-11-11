import React from "react";
import { Code2, FileQuestion, FileText, PenLine, PlayCircle, Radio, type LucideIcon } from "lucide-react";

const LESSON_ICON: Record<string, LucideIcon> = { VIDEO: PlayCircle, TEXT: FileText, QUIZ: FileQuestion, ASSIGNMENT: PenLine, CODING: Code2, LIVE: Radio };

/** Icon for a lesson type (video, reading, quiz…). */
export function LessonTypeIcon({ type, className }: { type: string; className?: string }) {
  return React.createElement(LESSON_ICON[type] ?? FileText, { className });
}
