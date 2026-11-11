import { fetchCourses, fetchInstructors, fetchReviews } from "@/lib/api";
import { requireAcademy } from "@/lib/tenant";
import { HomeHero } from "@/components/home/HomeHero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { WhyLearn } from "@/components/home/WhyLearn";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstructorsPreview } from "@/components/home/InstructorsPreview";
import { StudentReviews } from "@/components/home/StudentReviews";
import { FinalCta } from "@/components/home/FinalCta";

export default async function HomePage() {
  const academy = await requireAcademy();
  const [popular, instructors, reviews] = await Promise.all([fetchCourses(academy.slug, { sort: "popular", limit: 6 }), fetchInstructors(academy.slug), fetchReviews(academy.slug, 6)]);

  return (
    <>
      <HomeHero academy={academy} courses={popular.data} currency={academy.currency} />
      <CategoryGrid categories={academy.categories} />
      <FeaturedCourses courses={popular.data} total={popular.pagination.total} currency={academy.currency} />
      <WhyLearn academyName={academy.name} />
      <HowItWorks />
      <InstructorsPreview instructors={instructors} />
      <StudentReviews reviews={reviews} rating={academy.stats.rating} total={academy.stats.reviews} />
      <FinalCta academyName={academy.name} />
    </>
  );
}
