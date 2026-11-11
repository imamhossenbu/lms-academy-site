import React from "react";
import { Check } from "lucide-react";
import { DetailSection } from "./DetailSection";

/** "What you'll learn" — two-column checklist in an accent-tinted box. */
export function LearningOutcomes({ outcomes }: { outcomes: string[] }) {
  if (outcomes.length === 0) return null;
  return (
    <DetailSection title="What you'll learn">
      <ul className="grid gap-x-8 gap-y-3 rounded-2xl border border-accent-20 bg-accent-soft p-6 sm:grid-cols-2">
        {outcomes.map((o) => (
          <li key={o} className="flex items-start gap-3 body-sm-regular text-night-soft">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {o}
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

export default LearningOutcomes;
