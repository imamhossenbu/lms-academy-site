import React from "react";
import { CalendarClock, Video } from "lucide-react";
import type { LessonDetail } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";

/** LIVE lesson: the course's next live class with Join (link released 15 minutes before it starts). */
export function LessonLive({ live }: { live: LessonDetail["live"] }) {
  if (!live) return <p className="rounded-2xl border border-dashed border-night-line p-5 body-sm-regular text-night-muted">No live class is scheduled for this course right now — your instructor will announce the next one.</p>;
  return (
    <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-accent/30 bg-night-surface p-5">
      <div className="min-w-0 flex-1">
        <ToneBadge tone={live.status === "LIVE" ? "red" : "accent"} size="sm" dot>
          {live.status === "LIVE" ? "Live now" : "Next live class"}
        </ToneBadge>
        <p className="mt-2 body-l-medium font-semibold text-white">{live.title}</p>
        <p className="inline-flex items-center gap-1.5 body-sm-regular text-night-muted">
          <CalendarClock className="h-4 w-4" />
          {new Date(live.startTime).toLocaleString("en-US", { weekday: "long", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
        </p>
      </div>
      {live.joinUrl ? (
        <a href={live.joinUrl} target="_blank" rel="noopener noreferrer" className="academy-gradient academy-glow-btn inline-flex h-11 items-center gap-2 rounded-xl px-5 body-sm-medium font-semibold text-white">
          <Video className="h-4 w-4" />
          Join class
        </a>
      ) : (
        <span className="body-xsm-regular text-night-muted">The join link appears 15 minutes before the start.</span>
      )}
    </section>
  );
}

export default LessonLive;
