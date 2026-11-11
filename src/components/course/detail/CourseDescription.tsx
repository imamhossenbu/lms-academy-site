import React from "react";
import { Check } from "lucide-react";
import { isBlankRichText, safeRichText } from "@/lib/richText";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { DetailSection } from "./DetailSection";

/** Requirements list, the sanitised rich-text description and topic tags. */
export function CourseDescription({ description, requirements, tags }: { description: string; requirements: string[]; tags: string[] }) {
  const hasDescription = description && !isBlankRichText(description);
  return (
    <>
      {requirements.length > 0 && (
        <DetailSection title="Requirements">
          <ul className="space-y-2.5">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-3 body-regular text-primary-400">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                {r}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}
      {hasDescription && (
        <DetailSection title="About this course">
          <div className="academy-prose" dangerouslySetInnerHTML={{ __html: safeRichText(description) }} />
          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <ToneBadge key={t} tone="gray" variant="pill">
                  #{t}
                </ToneBadge>
              ))}
            </div>
          )}
        </DetailSection>
      )}
    </>
  );
}

export default CourseDescription;
