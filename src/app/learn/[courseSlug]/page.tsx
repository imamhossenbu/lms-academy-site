import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { fetchLesson, fetchOutline, requireLearner } from "@/lib/learner";
import { requireAcademy } from "@/lib/tenant";
import { PlayerShell } from "@/components/learn/PlayerShell";
import { LessonView } from "@/components/learn/LessonView";
import { LessonSkeleton } from "@/components/learn/LessonSkeleton";
import { LockedLesson } from "@/components/learn/LockedLesson";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = { title: "Learning", robots: { index: false } };

type Props = { params: Promise<{ courseSlug: string }>; searchParams: Promise<{ lesson?: string }> };

async function Lesson({ courseSlug, lessonId, prevId, nextId, lockedReason, title }: { courseSlug: string; lessonId: string; prevId: string | null; nextId: string | null; lockedReason: string | null; title: string }) {
  if (lockedReason) return <div className="px-4 py-10 sm:px-6"><LockedLesson title={title} reason={lockedReason} /></div>;
  const res = await fetchLesson(courseSlug, lessonId);
  if (!res || !res.ok) return <div className="px-4 py-10 sm:px-6"><LockedLesson title={title} reason={res && !res.ok ? res.message : "Please sign in again."} /></div>;
  return <LessonView lesson={res.data} courseSlug={courseSlug} prevId={prevId} nextId={nextId} />;
}

/** /learn/<course>?lesson=<id> — the course player (the lesson lives in the URL so a reload stays on it). */
export default async function LearnPage({ params, searchParams }: Props) {
  await requireAcademy();
  const { courseSlug } = await params;
  const requested = (await searchParams).lesson;
  const here = `/learn/${courseSlug}${requested ? `?lesson=${requested}` : ""}`;
  await requireLearner(here);

  const res = await fetchOutline(courseSlug);
  if (!res || (!res.ok && res.status === 401)) redirect(`/login?next=${encodeURIComponent(here)}`);
  if (!res.ok && res.status === 403) redirect(`/courses/${courseSlug}`);
  if (!res.ok) notFound();
  const outline = res.data;

  const flat = outline.modules.flatMap((m) => m.lessons);
  const current = flat.find((l) => l.id === requested) ?? flat.find((l) => l.id === outline.nextLessonId) ?? flat[0] ?? null;
  const i = current ? flat.indexOf(current) : -1;

  return (
    <PlayerShell outline={outline} currentId={current?.id ?? null}>
      {current ? (
        <Suspense key={current.id} fallback={<LessonSkeleton />}>
          <Lesson courseSlug={courseSlug} lessonId={current.id} title={current.title} lockedReason={current.lockedReason} prevId={flat[i - 1]?.id ?? null} nextId={flat[i + 1]?.id ?? null} />
        </Suspense>
      ) : (
        <div className="px-4 py-16">
          <EmptyState icon={<BookOpen className="h-7 w-7" />} title="Lessons are on the way" text="Your instructor hasn't published any lessons yet. You'll find them here as soon as they're ready." />
        </div>
      )}
    </PlayerShell>
  );
}
