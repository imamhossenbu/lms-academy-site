import React from "react";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, CheckCircle2, ClipboardList, Gauge, GraduationCap, PlayCircle } from "lucide-react";
import type { DashboardOverview } from "@/types/academy";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ToneBadge } from "@/components/ui/ToneBadge";
import { CourseThumb } from "@/components/course/CourseThumb";
import { EmptyState } from "@/components/shared/EmptyState";
import { LiveCard } from "../live/LiveCard";
import { StatTile } from "../StatTile";
import { TabHeading } from "../TabHeading";

/** Overview: stats, Continue learning, next live classes, recent quiz results. */
export function OverviewTab({ data, firstName }: { data: DashboardOverview; firstName: string }) {
  const s = data.stats;
  return (
    <>
      <TabHeading title={`Welcome back, ${firstName}`} text="Here's where you are in your learning." action={<ButtonLink href="/courses" variant="secondary" size="sm" icon={<ArrowRight className="h-4 w-4" />}>Browse courses</ButtonLink>} />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatTile icon={<BookOpen className="h-5 w-5" />} label="Enrolled courses" value={s.courses} index={0} />
        <StatTile icon={<CheckCircle2 className="h-5 w-5" />} label="Lessons completed" value={s.lessonsCompleted} index={1} />
        <StatTile icon={<Gauge className="h-5 w-5" />} label="Average progress" value={s.averageProgress} suffix="%" index={2} />
        <StatTile icon={<Award className="h-5 w-5" />} label="Certificates" value={s.certificates} index={3} />
      </div>

      {data.continueLearning ? (
        <Link href={`/learn/${data.continueLearning.slug}`} className="academy-card-glow group mt-6 grid overflow-hidden rounded-3xl border border-accent/30 bg-night-surface sm:grid-cols-[260px_1fr]">
          <CourseThumb src={data.continueLearning.thumbnail} title={data.continueLearning.title} sizes="260px" className="h-full sm:aspect-auto" />
          <div className="flex flex-col justify-center p-6">
            <p className="body-xsm-medium text-accent">Continue learning</p>
            <h2 className="heading-h4 mt-1 font-bold text-white">{data.continueLearning.title}</h2>
            <p className="body-sm-regular text-night-muted">By {data.continueLearning.instructor}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-night-skeleton-strong">
              <span className="academy-gradient block h-full rounded-full" style={{ width: `${data.continueLearning.progress}%` }} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="body-sm-medium text-night-soft">{data.continueLearning.progress}% complete</span>
              <span className="academy-gradient inline-flex h-10 items-center gap-2 rounded-xl px-4 body-sm-medium font-semibold text-white">
                <PlayCircle className="h-4 w-4" />
                Resume
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <div className="mt-6">
          <EmptyState icon={<GraduationCap className="h-7 w-7" />} title="Start your first course" text="Enrol in a course and it will show up here, ready to continue." action={<ButtonLink href="/courses">Browse courses</ButtonLink>} />
        </div>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-night-line bg-night-surface/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="heading-h5 font-semibold text-white">Upcoming live classes</h2>
            <Link href="/dashboard?tab=live" className="body-sm-medium text-accent hover:underline">
              See all
            </Link>
          </div>
          {data.upcomingLive.length ? (
            <div className="space-y-3">
              {data.upcomingLive.map((l) => (
                <LiveCard key={l.id} item={l} compact />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-night-line p-5 text-center body-sm-regular text-night-muted">No live classes scheduled.</p>
          )}
        </section>
        <section className="rounded-3xl border border-night-line bg-night-surface/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="heading-h5 font-semibold text-white">Recent quiz results</h2>
            <Link href="/dashboard?tab=quizzes" className="body-sm-medium text-accent hover:underline">
              See all
            </Link>
          </div>
          {data.recentQuizzes.length ? (
            <ul className="divide-y divide-night-line">
              {data.recentQuizzes.map((q) => (
                <li key={q.id} className="flex items-center gap-3 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="block body-sm-medium truncate text-white">{q.quizTitle}</span>
                    <span className="block body-xsm-regular truncate text-night-muted">{q.course.title}</span>
                  </span>
                  <span className="body-sm-medium text-white">{q.percentage}%</span>
                  <ToneBadge tone={q.passed ? "green" : "red"} size="sm">
                    {q.passed ? "Passed" : "Not passed"}
                  </ToneBadge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-night-line p-5 text-center body-sm-regular text-night-muted">No quizzes taken yet.</p>
          )}
          {s.pendingAssignments > 0 && (
            <Link href="/dashboard?tab=assignments" className="mt-4 flex items-center gap-3 rounded-xl border border-yellow/30 bg-yellow/10 p-3 body-sm-medium text-yellow">
              <ClipboardList className="h-4 w-4" />
              {s.pendingAssignments} assignment{s.pendingAssignments === 1 ? "" : "s"} waiting for you
              <ArrowRight className="ml-auto h-4 w-4" />
            </Link>
          )}
        </section>
      </div>
    </>
  );
}

export default OverviewTab;
