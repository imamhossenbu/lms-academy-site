import React from "react";
import Link from "next/link";
import { FileQuestion } from "lucide-react";
import type { QuizResultItem } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { TabHeading } from "../TabHeading";

const date = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** Every quiz attempt in a bordered table (columns divided), with a link back to the quiz lesson. */
export function QuizResultsTab({ items }: { items: QuizResultItem[] }) {
  const passed = items.filter((q) => q.passed).length;
  return (
    <>
      <TabHeading title="Quiz results" text={items.length ? `${items.length} attempt${items.length === 1 ? "" : "s"} · ${passed} passed` : "Your quiz attempts show up here."} />
      {items.length ? (
        <div className="overflow-x-auto rounded-2xl border border-night-line bg-night-surface">
          <table className="w-full min-w-170 table-fixed">
            <thead className="border-b border-night-line bg-white/5">
              <tr className="divide-x divide-night-line text-left">
                {["Quiz", "Course", "Score", "Result", "Date", ""].map((h, i) => (
                  <th key={i} className={`px-3.5 py-3 body-xsm-medium font-semibold text-night-soft ${i === 0 ? "w-1/3" : i === 1 ? "w-1/4" : i === 5 ? "w-24" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-night-line">
              {items.map((q) => (
                <tr key={q.id} className="divide-x divide-night-line transition-colors hover:bg-white/5">
                  <td className="px-3.5 py-3">
                    <p className="truncate body-sm-medium text-white">{q.quizTitle}</p>
                    <p className="body-xsm-regular text-night-muted">Attempt {q.attemptNumber}</p>
                  </td>
                  <td className="truncate px-3.5 py-3 body-sm-regular text-night-soft">{q.course.title}</td>
                  <td className="px-3.5 py-3 body-sm-medium text-white">
                    {q.score}/{q.totalMarks} <span className="text-night-muted">· {q.percentage}%</span>
                  </td>
                  <td className="px-3.5 py-3">
                    <ToneBadge tone={q.passed ? "green" : "red"} size="sm" dot>
                      {q.passed ? "Passed" : "Not passed"}
                    </ToneBadge>
                  </td>
                  <td className="px-3.5 py-3 body-sm-regular text-night-soft">{date(q.submittedAt)}</td>
                  <td className="px-3.5 py-3 text-center">
                    {q.lessonId ? (
                      <Link href={`/learn/${q.course.slug}?lesson=${q.lessonId}`} className="body-sm-medium text-accent hover:underline">
                        Open
                      </Link>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={<FileQuestion className="h-7 w-7" />} title="No quiz attempts yet" text="Quizzes are part of your course lessons — take one and your score appears here." />
      )}
    </>
  );
}

export default QuizResultsTab;
