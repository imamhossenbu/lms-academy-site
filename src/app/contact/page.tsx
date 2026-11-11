import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { getSession } from "@/lib/session";
import { requireAcademy } from "@/lib/tenant";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { FaqSection } from "@/components/home/FaqSection";

export const metadata: Metadata = { title: "Contact" };

/** Contact: form (stored + emailed to the academy) beside the academy's channels, then the FAQ. */
export default async function ContactPage() {
  const academy = await requireAcademy();
  const session = await getSession();
  return (
    <>
      <PageHero compact eyebrow="Contact" eyebrowIcon={<MessageCircle className="h-4 w-4" />} title="Get in_ touch" subtitle={`Questions about a course, enrolling or your account? Send the ${academy.name} team a message.`} />
      <section className="mx-auto grid max-w-7xl items-start gap-8 px-4 pb-8 pt-12 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:pt-16">
        <ContactForm defaults={{ name: session?.user.name ?? "", email: session?.user.email ?? "" }} />
        <ContactInfo email={academy.supportEmail} phone={academy.supportPhone} address={academy.address} website={academy.websiteUrl} site={academy.site} stats={academy.stats} signedIn={!!session} />
      </section>
      <div id="faq" className="scroll-mt-20">
        <FaqSection faqs={academy.site?.faqs} />
      </div>
    </>
  );
}
