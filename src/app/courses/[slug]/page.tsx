import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCourse } from "@/lib/api";
import { getAcademy, requireAcademy } from "@/lib/tenant";
import { CourseHeader } from "@/components/course/detail/CourseHeader";
import { EnrollCard } from "@/components/course/detail/EnrollCard";
import { LearningOutcomes } from "@/components/course/detail/LearningOutcomes";
import { Curriculum } from "@/components/course/detail/Curriculum";
import { CourseDescription } from "@/components/course/detail/CourseDescription";
import { InstructorBlock } from "@/components/course/detail/InstructorBlock";
import { CourseReviews } from "@/components/course/detail/CourseReviews";
import { RelatedCourses } from "@/components/course/detail/RelatedCourses";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const academy = await getAcademy().catch(() => null);
  if (!academy?.available) return {};
  const course = await fetchCourse(academy.slug, (await params).slug).catch(() => null);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.shortDescription,
    openGraph: { title: course.title, description: course.shortDescription, images: course.thumbnail ? [course.thumbnail] : undefined },
  };
}

export default async function CoursePage({ params }: Props) {
  const academy = await requireAcademy();
  const course = await fetchCourse(academy.slug, (await params).slug);
  if (!course) notFound();

  return (
    <>
      <CourseHeader course={course} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div className="order-2 min-w-0 space-y-12 lg:order-1 lg:pt-12">
          <LearningOutcomes outcomes={course.outcomes} />
          <Curriculum modules={course.modules} lessons={course.lessons} durationMinutes={course.durationMinutes} />
          <CourseDescription description={course.description} requirements={course.requirements} tags={course.tags} />
          <InstructorBlock instructor={course.instructorProfile} />
          <CourseReviews course={course} />
        </div>
        <div className="order-1 -mt-6 lg:order-2 lg:-mt-72">
          <div className="lg:sticky lg:top-24">
            <EnrollCard course={course} currency={academy.currency} />
          </div>
        </div>
      </div>
      <RelatedCourses courses={course.related} currency={academy.currency} />
    </>
  );
}
