import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import { compact } from "@/lib/format";
import type { AcademyInstructor } from "@/types/academy";
import { Avatar } from "@/components/ui/Avatar";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { DetailSection } from "./DetailSection";

/** "Your instructor": photo, name, headline, stats, expertise and bio, with a link to their other courses. */
export function InstructorBlock({ instructor }: { instructor: AcademyInstructor }) {
  const stats = [
    instructor.rating > 0 && { icon: Star, text: `${instructor.rating.toFixed(1)} rating` },
    instructor.students > 0 && { icon: Users, text: `${compact(instructor.students)} learners` },
    { icon: BookOpen, text: `${instructor.courses} ${instructor.courses === 1 ? "course" : "courses"}` },
  ].filter(Boolean) as { icon: typeof Star; text: string }[];

  return (
    <DetailSection id="instructor" title="Your instructor">
      <div className="rounded-2xl border border-dash bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar name={instructor.name} src={instructor.avatar} size="xl" />
          <div className="min-w-0 flex-1">
            <h3 className="heading-h4 font-bold text-primary-500">{instructor.name}</h3>
            <p className="body-sm-regular text-primary-300">{instructor.headline}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 body-sm-medium text-primary-400">
              {stats.map((s) => (
                <span key={s.text} className="inline-flex items-center gap-1.5">
                  <s.icon className="h-4 w-4 text-accent" />
                  {s.text}
                </span>
              ))}
            </div>
          </div>
        </div>
        {instructor.expertise.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {instructor.expertise.map((e) => (
              <ToneBadge key={e} tone="accent" size="sm" variant="pill">
                {e}
              </ToneBadge>
            ))}
          </div>
        )}
        {instructor.bio && <p className="body-regular mt-5 whitespace-pre-line text-primary-400">{instructor.bio}</p>}
        {instructor.courses > 1 && (
          <Link href={`/courses?instructor=${instructor.id}`} className="mt-5 inline-flex items-center gap-1.5 body-sm-medium text-accent hover:underline">
            See all courses by {instructor.name}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </DetailSection>
  );
}

export default InstructorBlock;
