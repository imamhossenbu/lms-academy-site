import React from "react";
import { Clock } from "lucide-react";
import { formatDuration, LESSON_TYPE_LABEL } from "@/lib/format";
import { isBlankRichText, safeLessonHtml } from "@/lib/richText";
import type { LessonDetail } from "@/types/academy";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { VideoPlayer } from "./VideoPlayer";
import { LessonResources } from "./LessonResources";
import { LessonNav } from "./LessonNav";
import { QuizRunner } from "./quiz/QuizRunner";
import { LessonTypeIcon } from "./lessonIcons";

/** One lesson: video (if any), title + type, sanitised body, quiz (QUIZ lessons), resources, prev / complete / next. */
export function LessonView({ lesson, courseSlug, prevId, nextId }: { lesson: LessonDetail; courseSlug: string; prevId: string | null; nextId: string | null }) {
  const body = lesson.content && !isBlankRichText(lesson.content) ? safeLessonHtml(lesson.content) : null;
  const isQuiz = lesson.type === "QUIZ" && !!lesson.quizId;
  return (
    <article className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:py-10">
      {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} title={lesson.title} />}
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <ToneBadge tone="accent" icon={<LessonTypeIcon type={lesson.type} className="h-3.5 w-3.5" />}>
            {LESSON_TYPE_LABEL[lesson.type] ?? lesson.type}
          </ToneBadge>
          {formatDuration(lesson.durationMinutes) && (
            <span className="inline-flex items-center gap-1 body-sm-regular text-night-muted">
              <Clock className="h-4 w-4" />
              {formatDuration(lesson.durationMinutes)}
            </span>
          )}
          {lesson.completed && <ToneBadge tone="green">Completed</ToneBadge>}
        </div>
        <h2 className="heading-h1-bold mt-3 text-white">{lesson.title}</h2>
      </header>
      {body && <div className="academy-prose" dangerouslySetInnerHTML={{ __html: body }} />}
      {isQuiz && <QuizRunner quizId={lesson.quizId!} courseSlug={courseSlug} lessonId={lesson.id} completed={lesson.completed} />}
      {lesson.type === "QUIZ" && !lesson.quizId && <p className="rounded-xl border border-night-line bg-night-surface p-4 body-sm-regular text-night-soft">The quiz for this lesson isn&apos;t published yet — check back soon.</p>}
      <LessonResources resources={lesson.resources} />
      <LessonNav courseSlug={courseSlug} lessonId={lesson.id} completed={lesson.completed} prevId={prevId} nextId={nextId} canComplete={!isQuiz} />
    </article>
  );
}

export default LessonView;
