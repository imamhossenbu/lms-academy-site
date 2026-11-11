import type { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen } from "lucide-react";
import { fetchCourses, fetchInstructors, fetchLevels } from "@/lib/api";
import { requireAcademy } from "@/lib/tenant";
import { PageHero } from "@/components/shared/PageHero";
import { CatalogProvider } from "@/components/courses/CatalogProvider";
import { CatalogSearch } from "@/components/courses/CatalogSearch";
import { CatalogBody } from "@/components/courses/CatalogBody";
import { CatalogSkeleton } from "@/components/courses/CatalogSkeleton";
import { toCourseQuery, type CatalogParams } from "@/components/courses/catalogParams";

export const metadata: Metadata = { title: "Courses" };

async function Catalog({ searchParams }: { searchParams: Promise<CatalogParams> }) {
  const academy = await requireAcademy();
  const query = toCourseQuery(await searchParams);
  const [result, levels, instructors] = await Promise.all([fetchCourses(academy.slug, query), fetchLevels(academy.slug), query.instructor ? fetchInstructors(academy.slug) : Promise.resolve([])]);

  return (
    <CatalogProvider>
      <PageHero compact eyebrow="Course catalogue" eyebrowIcon={<BookOpen className="h-4 w-4" />} title="Find your next course" highlight="next course" subtitle={`Browse ${academy.stats.courses === 1 ? "our course" : `all ${academy.stats.courses} courses`} from ${academy.name}.`}>
        <CatalogSearch />
      </PageHero>
      <CatalogBody
        result={result}
        currency={academy.currency}
        categories={academy.categories}
        levels={levels}
        instructor={instructors.find((i) => i.id === query.instructor) ?? null}
      />
    </CatalogProvider>
  );
}

export default function CoursesPage({ searchParams }: { searchParams: Promise<CatalogParams> }) {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <Catalog searchParams={searchParams} />
    </Suspense>
  );
}
