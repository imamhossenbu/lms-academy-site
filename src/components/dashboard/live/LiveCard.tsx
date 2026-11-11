"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, PlayCircle, Radio, Video } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LiveItem } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";

const when = (iso: string) => new Date(iso).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const mins = (a: string, b: string) => Math.round((new Date(b).getTime() - new Date(a).getTime()) / 60000);

/** One live class: date tile, title, course, status; Join (when the link is released) or the recording. */
export function LiveCard({ item, compact = false }: { item: LiveItem; compact?: boolean }) {
  const d = new Date(item.startTime);
  return (
    <motion.div whileHover={{ y: -2 }} className={cn("flex flex-wrap items-center gap-4 rounded-2xl border bg-night-surface p-4", item.status === "LIVE" ? "border-red/50" : "border-night-line")}>
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-accent-light text-accent">
        <span className="body-2xsm-regular font-semibold uppercase">{d.toLocaleString("en-US", { month: "short" })}</span>
        <span className="heading-h4 font-bold leading-none">{d.getDate()}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {item.status === "LIVE" ? (
            <ToneBadge tone="red" size="sm" dot>
              Live now
            </ToneBadge>
          ) : item.status === "UPCOMING" ? (
            <ToneBadge tone="accent" size="sm">
              Upcoming
            </ToneBadge>
          ) : (
            <ToneBadge tone="gray" size="sm">
              Ended
            </ToneBadge>
          )}
          <span className="inline-flex items-center gap-1 body-xsm-regular text-night-muted">
            <CalendarClock className="h-3.5 w-3.5" />
            {when(item.startTime)} · {mins(item.startTime, item.endTime)} min
          </span>
        </div>
        <p className="body-medium mt-1 truncate font-semibold text-white">{item.title}</p>
        {!compact && (
          <Link href={`/courses/${item.course.slug}`} className="body-xsm-regular text-night-muted hover:text-accent">
            {item.course.title} · {item.instructor}
          </Link>
        )}
      </div>
      {item.joinUrl ? (
        <motion.a whileTap={{ scale: 0.96 }} href={item.joinUrl} target="_blank" rel="noopener noreferrer" className="academy-gradient academy-glow-btn inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 body-sm-medium font-semibold text-white">
          <Video className="h-4 w-4" />
          Join
        </motion.a>
      ) : item.recordingUrl ? (
        <a href={item.recordingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-accent px-4 body-sm-medium text-accent hover:bg-accent-10">
          <PlayCircle className="h-4 w-4" />
          Recording
        </a>
      ) : item.status === "UPCOMING" ? (
        <span className="inline-flex shrink-0 items-center gap-1.5 body-xsm-regular text-night-muted">
          <Radio className="h-3.5 w-3.5" />
          Link opens 15 min before
        </span>
      ) : null}
    </motion.div>
  );
}

export default LiveCard;
