import React from "react";
import { ClipboardList } from "lucide-react";
import { safeLessonHtml } from "@/lib/richText";
import type { AssignmentItem } from "@/types/academy";
import { EmptyState } from "@/components/shared/EmptyState";
import { SegmentLinks } from "../SegmentLinks";
import { TabHeading } from "../TabHeading";
import { AssignmentCard } from "./AssignmentCard";

/** Assignments: To do / Submitted / All (?show=), each card expands to submit. Instructions are sanitised here (server). */
export function AssignmentsTab({ items, show }: { items: AssignmentItem[]; show: "todo" | "done" | "all" }) {
  const todo = items.filter((a) => a.state === "TODO" || a.state === "OVERDUE");
  const done = items.filter((a) => a.state === "SUBMITTED" || a.state === "GRADED");
  const list = (show === "todo" ? todo : show === "done" ? done : items).map((a) => ({ ...a, instructionsHtml: a.instructionsHtml || a.description ? safeLessonHtml(a.instructionsHtml || `<p>${a.description ?? ""}</p>`) : "" }));
  return (
    <>
      <TabHeading
        title="Assignments"
        text="Submit your work and read your instructor's feedback."
        action={
          <SegmentLinks
            id="assign"
            active={show}
            options={[
              { value: "todo", label: "To do", href: "/dashboard?tab=assignments", count: todo.length },
              { value: "done", label: "Submitted", href: "/dashboard?tab=assignments&show=done", count: done.length },
              { value: "all", label: "All", href: "/dashboard?tab=assignments&show=all", count: items.length },
            ]}
          />
        }
      />
      {list.length ? (
        <div className="space-y-3">
          {list.map((a, i) => (
            <AssignmentCard key={a.id} a={a} defaultOpen={i === 0 && show === "todo"} />
          ))}
        </div>
      ) : (
        <EmptyState icon={<ClipboardList className="h-7 w-7" />} title={show === "todo" ? "You're all caught up" : "Nothing here yet"} text={show === "todo" ? "No assignments are waiting for you right now." : "Assignments you submit appear here with your marks and feedback."} />
      )}
    </>
  );
}

export default AssignmentsTab;
