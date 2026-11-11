import type { Metadata } from "next";
import { Info } from "lucide-react";
import { fetchInstructors } from "@/lib/api";
import { requireAcademy } from "@/lib/tenant";
import { PageHero } from "@/components/shared/PageHero";
import { MissionSection } from "@/components/home/MissionSection";
import { StatsGlobe } from "@/components/home/StatsGlobe";
import { WhatYouGet } from "@/components/home/WhatYouGet";
import { InstructorsPreview } from "@/components/home/InstructorsPreview";
import { NewsletterSection } from "@/components/newsletter/NewsletterSection";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = { title: "About us" };

/** About: mission (when written), real numbers, the learning experience, instructors, newsletter, CTA. */
export default async function AboutPage() {
  const academy = await requireAcademy();
  const instructors = await fetchInstructors(academy.slug);
  return (
    <>
      <PageHero compact eyebrow={academy.name} eyebrowIcon={<Info className="h-4 w-4" />} title="About_ Us" subtitle={academy.tagline || `${academy.name} helps people learn practical, career-ready skills online — at their own pace, with real projects and real support.`} />
      <MissionSection mission={academy.site?.mission} />
      <StatsGlobe academy={academy} />
      <WhatYouGet />
      <InstructorsPreview instructors={instructors} />
      <NewsletterSection newsletter={academy.site?.newsletter} />
      <FinalCta academyName={academy.name} />
    </>
  );
}
