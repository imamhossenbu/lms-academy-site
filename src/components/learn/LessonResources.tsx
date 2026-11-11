import React from "react";
import { Download, ExternalLink, FileText } from "lucide-react";
import type { LessonResource } from "@/types/academy";

/** Files and links attached to the lesson. */
export function LessonResources({ resources }: { resources: LessonResource[] }) {
  if (resources.length === 0) return null;
  return (
    <section>
      <h2 className="heading-h5 font-semibold text-white">Resources</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {resources.map((r) => (
          <li key={r.id}>
            <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" download={r.isDownloadable || undefined} className="group flex items-center gap-3 rounded-xl border border-night-line bg-night-surface p-4 transition-colors hover:border-accent/60">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">
                <FileText className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block body-sm-medium truncate text-white">{r.title}</span>
                <span className="block body-xsm-regular truncate text-night-muted">{[r.fileType, r.size].filter(Boolean).join(" · ") || r.description}</span>
              </span>
              {r.isDownloadable ? <Download className="h-4 w-4 text-night-muted group-hover:text-accent" /> : <ExternalLink className="h-4 w-4 text-night-muted group-hover:text-accent" />}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LessonResources;
