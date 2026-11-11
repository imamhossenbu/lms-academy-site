import { fetchCourses, fetchInstructors, fetchReviews } from "@/lib/api";
import { getSession } from "@/lib/session";
import { requireAcademy } from "@/lib/tenant";
import { HomeHero } from "@/components/home/HomeHero";
import { CourseShowcase } from "@/components/home/CourseShowcase";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsGlobe } from "@/components/home/StatsGlobe";
import { StudentReviews } from "@/components/home/StudentReviews";
import { InstructorsPreview } from "@/components/home/InstructorsPreview";
import { MissionSection } from "@/components/home/MissionSection";
import { FinalCta } from "@/components/home/FinalCta";

export default async function HomePage() {
  const academy = await requireAcademy();
  const [popular, instructors, reviews, session] = await Promise.all([fetchCourses(academy.slug, { sort: "popular", limit: 4 }), fetchInstructors(academy.slug), fetchReviews(academy.slug, 8), getSession()]);

  return (
    <>
      <HomeHero academy={academy} signedIn={!!session} />
      <CourseShowcase courses={popular.data} total={popular.pagination.total} currency={academy.currency} />
      <CategoryGrid categories={academy.categories} />
      <HowItWorks />
      <StatsGlobe academy={academy} />
      <StudentReviews reviews={reviews} rating={academy.stats.rating} total={academy.stats.reviews} />
      <InstructorsPreview instructors={instructors} />
      <MissionSection mission={academy.site?.mission} />
      <FinalCta academyName={academy.name} />
    </>
  );
}
