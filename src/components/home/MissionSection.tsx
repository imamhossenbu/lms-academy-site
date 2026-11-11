import React from "react";
import Image from "next/image";
import type { AcademySiteContent } from "@/types/academy";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

type Mission = NonNullable<AcademySiteContent["mission"]>;

/** "Our Mission_": team photo beside Why / What / How (only when the admin has written it). */
export function MissionSection({ mission }: { mission: Mission | null | undefined }) {
  if (!mission || !(mission.why || mission.what || mission.how)) return null;
  const rows = [
    ["Why", mission.why],
    ["What", mission.what],
    ["How", mission.how],
  ].filter(([, t]) => t);
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading title="Our Mission_" />
      <Reveal className="mt-14 grid items-center gap-10 lg:grid-cols-2">
        {mission.imageUrl && (
          <div className="academy-card-glow relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={mission.imageUrl} alt="Our team" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
        )}
        <div className="space-y-6">
          {rows.map(([k, t]) => (
            <p key={k} className="body-l-regular text-night-soft">
              <span className="academy-gradient-text font-bold">{k}: </span>
              {t}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default MissionSection;
