import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PLATFORM_URL } from "@/lib/config";
import { NAV_LINKS } from "@/lib/nav";
import type { AcademyProfile } from "@/types/academy";
import { AcademyLogo } from "./AcademyLogo";
import { FooterColumn } from "./footer/FooterColumn";
import { BackToTop } from "./footer/BackToTop";

/** Dark footer: brand + tagline, explore links, top categories, contact details, copyright and "Powered by EduPro". */
export function SiteFooter({ academy }: { academy: AcademyProfile }) {
  const brand = { name: academy.name, initials: academy.logoInitials, logoUrl: academy.branding.logoUrl, logoDarkUrl: academy.branding.logoDarkUrl };
  const contact = [
    academy.supportEmail && { icon: <Mail className="h-4 w-4" />, label: academy.supportEmail, href: `mailto:${academy.supportEmail}` },
    academy.supportPhone && { icon: <Phone className="h-4 w-4" />, label: academy.supportPhone, href: `tel:${academy.supportPhone.replace(/\s+/g, "")}` },
    academy.address && { icon: <MapPin className="h-4 w-4" />, label: academy.address },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href?: string }[];

  return (
    <footer className="relative overflow-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent-20 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <AcademyLogo brand={brand} tone="light" />
          <p className="body-sm-regular mt-4 max-w-xs text-white/60">{academy.tagline || `Learn new skills online with ${academy.name} — at your own pace, from anywhere.`}</p>
        </div>
        <FooterColumn title="Explore" links={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))} />
        {academy.categories.length > 0 && (
          <FooterColumn title="Top categories" links={academy.categories.slice(0, 5).map((c) => ({ label: c.name, href: `/courses?category=${c.slug}` }))} />
        )}
        {contact.length > 0 && (
          <div>
            <h3 className="body-sm-medium font-semibold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3">
              {contact.map((c) => (
                <li key={c.label} className="flex items-start gap-2.5 body-sm-regular text-white/60">
                  <span className="mt-0.5 text-accent">{c.icon}</span>
                  {c.href ? (
                    <a href={c.href} className="break-all transition-colors hover:text-white">
                      {c.label}
                    </a>
                  ) : (
                    <span>{c.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
          <p className="body-xsm-regular text-white/50">
            {academy.branding.footerText || `© ${new Date().getFullYear()} ${academy.name}. All rights reserved.`}
          </p>
          <div className="flex items-center gap-4">
            {academy.branding.showPoweredBy && (
              <Link href={PLATFORM_URL} className="body-xsm-regular text-white/50 transition-colors hover:text-white">
                Powered by <span className="font-semibold text-white/80">EduPro</span>
              </Link>
            )}
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
