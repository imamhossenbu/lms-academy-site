"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ListVideo } from "lucide-react";
import type { PlayerOutline } from "@/types/academy";
import { ProgressRing } from "./ProgressRing";

/** Back to My courses, course title, lesson count and the progress ring; on small screens a "Contents" button. */
export function PlayerTopBar({ outline, onOpenContents }: { outline: PlayerOutline; onOpenContents: () => void }) {
  return (
    <div className="flex items-center gap-4 border-b border-night-line bg-night-surface/60 px-4 py-3 sm:px-6">
      <Link href="/dashboard?tab=courses" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-night-line text-night-soft transition-colors hover:border-accent hover:text-white" aria-label="Back to my dashboard">
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <div className="min-w-0 flex-1">
        <p className="body-xsm-medium text-night-muted">
          {outline.completedLessons} of {outline.totalLessons} lessons done
        </p>
        <h1 className="body-l-medium truncate font-semibold text-white">{outline.course.title}</h1>
      </div>
      <ProgressRing value={outline.progress} />
      <button type="button" onClick={onOpenContents} className="flex h-10 items-center gap-2 rounded-xl border border-night-line px-3 body-sm-medium text-white lg:hidden">
        <ListVideo className="h-4 w-4" />
        Contents
      </button>
    </div>
  );
}

export default PlayerTopBar;
