import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { requireAcademy } from "@/lib/tenant";
import { PageHero } from "@/components/shared/PageHero";
import { ContactCards } from "@/components/contact/ContactCards";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const academy = await requireAcademy();

  return (
    <>
      <PageHero compact eyebrow="Contact" eyebrowIcon={<MessageCircle className="h-4 w-4" />} title="Get in_ touch" subtitle={`Questions about a course, enrolling or your account? Reach the ${academy.name} team.`} />
      <section className="mx-auto max-w-5xl space-y-8 px-4 pb-20 sm:px-6">
        <ContactCards email={academy.supportEmail} phone={academy.supportPhone} address={academy.address} website={academy.websiteUrl} />
      </section>
    </>
  );
}
