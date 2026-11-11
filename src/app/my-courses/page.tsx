import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { fetchMyCourses, requireLearner } from "@/lib/learner";
import { requireAcademy } from "@/lib/tenant";
import { PageHero } from "@/components/shared/PageHero";
import { MyCoursesGrid } from "@/components/account/MyCoursesGrid";

export const metadata: Metadata = { title: "My courses", robots: { index: false } };

export default async function MyCoursesPage() {
  await requireAcademy();
  const session = await requireLearner("/my-courses");
  const res = await fetchMyCourses();
  if (!res || (!res.ok && res.status === 401)) redirect("/login?next=/my-courses");
  const items = res.ok ? res.data : [];
  return (
    <>
      <PageHero compact eyebrow="My learning" eyebrowIcon={<GraduationCap className="h-4 w-4" />} title={`My_ Courses`} subtitle={items.length ? `Welcome back, ${session.user.name.split(" ")[0]}! You're enrolled in ${items.length} ${items.length === 1 ? "course" : "courses"}.` : `Welcome, ${session.user.name.split(" ")[0]}! Let's find your first course.`} />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <MyCoursesGrid items={items} />
      </section>
    </>
  );
}
