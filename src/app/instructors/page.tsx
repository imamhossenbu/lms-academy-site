import type { Metadata } from "next";
import { Users } from "lucide-react";
import { fetchInstructors } from "@/lib/api";
import { requireAcademy } from "@/lib/tenant";
import { PageHero } from "@/components/shared/PageHero";
import { InstructorGrid } from "@/components/instructors/InstructorGrid";

export const metadata: Metadata = { title: "Instructors" };

export default async function InstructorsPage() {
  const academy = await requireAcademy();
  const instructors = await fetchInstructors(academy.slug);
  return (
    <>
      <PageHero compact eyebrow="Our instructors" eyebrowIcon={<Users className="h-4 w-4" />} title="Meet the people who teach" highlight="who teach" subtitle={`Every course at ${academy.name} is built and taught by the instructors below.`} />
      <InstructorGrid instructors={instructors} />
    </>
  );
}
