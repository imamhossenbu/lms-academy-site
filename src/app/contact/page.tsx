import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { fetchCourse } from "@/lib/api";
import { requireAcademy } from "@/lib/tenant";
import { PageHero } from "@/components/shared/PageHero";
import { ContactCards } from "@/components/contact/ContactCards";
import { EnrollInterest } from "@/components/contact/EnrollInterest";

export const metadata: Metadata = { title: "Contact" };

type Props = { searchParams: Promise<{ course?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const academy = await requireAcademy();
  const raw = (await searchParams).course;
  const courseSlug = (Array.isArray(raw) ? raw[0] : raw)?.trim();
  const course = courseSlug ? await fetchCourse(academy.slug, courseSlug) : null;

  return (
    <>
      <PageHero compact eyebrow="Contact" eyebrowIcon={<MessageCircle className="h-4 w-4" />} title="We're here to help" highlight="help" subtitle={`Questions about a course, enrolling or your account? Reach the ${academy.name} team.`} />
      <section className="mx-auto max-w-5xl space-y-8 px-4 pb-20 sm:px-6">
        {course && <EnrollInterest course={course} currency={academy.currency} />}
        <ContactCards email={academy.supportEmail} phone={academy.supportPhone} address={academy.address} website={academy.websiteUrl} courseTitle={course?.title} />
      </section>
    </>
  );
}
