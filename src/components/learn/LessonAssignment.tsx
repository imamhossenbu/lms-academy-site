import React from "react";
import { CalendarClock, MessageSquareText, Trophy } from "lucide-react";
import { safeLessonHtml } from "@/lib/richText";
import type { LessonDetail } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { SubmitAssignmentForm } from "@/components/dashboard/assignments/SubmitAssignmentForm";

const STATE = { TODO: ["To do", "accent"], OVERDUE: ["Overdue", "red"], SUBMITTED: ["Submitted", "blue"], GRADED: ["Graded", "green"] } as const;

/** ASSIGNMENT lesson: brief (sanitised here on the server), due date, last submission + feedback, submit form. */
export function LessonAssignment({ a }: { a: NonNullable<LessonDetail["assignment"]> }) {
  const [label, tone] = STATE[a.state];
  const brief = a.instructionsHtml || a.description ? safeLessonHtml(a.instructionsHtml || `<p>${a.description ?? ""}</p>`) : "";
  const last = a.lastSubmission;
  return (
    <section className="space-y-4 rounded-2xl border border-accent/30 bg-night-surface p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="heading-h5 font-semibold text-white">{a.title}</h2>
        <ToneBadge tone={tone} size="sm" dot>
          {label}
        </ToneBadge>
        <span className="ml-auto inline-flex items-center gap-1 body-xsm-regular text-night-muted">
          <CalendarClock className="h-3.5 w-3.5" />
          Due {new Date(a.dueDate).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })} · {a.marks} marks
        </span>
      </div>
      {brief && <div className="academy-prose" dangerouslySetInnerHTML={{ __html: brief }} />}
      {last && (
        <div className="rounded-xl border border-night-line bg-night-raised p-4 body-sm-regular text-night-soft">
          <p className="font-semibold text-white">Your attempt {last.attempt}{last.isLate ? " (late)" : ""}</p>
          {last.fileUrl && <a href={last.fileUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{last.fileName || "Your file"}</a>}
          {last.textAnswer && <p className="mt-1 line-clamp-3 whitespace-pre-line">{last.textAnswer}</p>}
          {last.status === "GRADED" && <p className="mt-2 inline-flex items-center gap-2 text-green"><Trophy className="h-4 w-4" />{last.marksObtained ?? 0} / {a.marks} marks</p>}
          {last.feedback && <p className="mt-2 flex gap-2"><MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{last.feedback}</p>}
        </div>
      )}
      {a.canSubmit ? <SubmitAssignmentForm a={a} /> : <p className="body-sm-regular text-night-muted">Submissions are closed for this assignment.</p>}
    </section>
  );
}

export default LessonAssignment;
