import React from "react";
import { Reveal } from "@/components/shared/Reveal";

/** Titled block in the course page's main column. */
export function DetailSection({ id, title, aside, children }: { id?: string; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="scroll-mt-24">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <h2 className="heading-h3 font-bold text-primary-500">{title}</h2>
          {aside}
        </div>
        {children}
      </section>
    </Reveal>
  );
}

export default DetailSection;
