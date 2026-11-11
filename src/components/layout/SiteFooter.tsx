import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PLATFORM_URL } from "@/lib/config";
import { NAV_LINKS } from "@/lib/nav";
import type { AcademyProfile } from "@/types/academy";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { AcademyLogo } from "./AcademyLogo";
import { FooterColumn } from "./footer/FooterColumn";
import { BackToTop } from "./footer/BackToTop";
import { SocialIcon, type SocialNetwork } from "./footer/SocialIcon";

const PAYMENTS = [
  { src: "/images/payments/bkash.png", alt: "bKash" },
  { src: "/images/payments/nagad.png", alt: "Nagad" },
  { src: "/images/payments/sslcommerz.png", alt: "SSLCommerz" },
];

/** Footer: brand + socials, explore, categories, contact, newsletter; then "Pay with", copyright and Powered by EduPro. */
export function SiteFooter({ academy }: { academy: AcademyProfile }) {
  const brand = { name: academy.name, initials: academy.logoInitials, logoUrl: academy.branding.logoUrl, logoDarkUrl: academy.branding.logoDarkUrl };
  const socials = (Object.entries(academy.site?.socials ?? {}) as [SocialNetwork, string][]).filter(([, href]) => href);
  const contact = [
    academy.supportEmail && { icon: <Mail className="h-4 w-4" />, label: academy.supportEmail, href: `mailto:${academy.supportEmail}` },
    academy.supportPhone && { icon: <Phone className="h-4 w-4" />, label: academy.supportPhone, href: `tel:${academy.supportPhone.replace(/\s+/g, "")}` },
    academy.address && { icon: <MapPin className="h-4 w-4" />, label: academy.address },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href?: string }[];
  const newsletterOn = academy.site?.newsletter.enabled !== false;

  return (
    <footer className="relative overflow-hidden border-t border-night-line bg-night-deep text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent-20 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr_1.4fr]">
        <div>
          <AcademyLogo brand={brand} tone="light" />
          <p className="body-sm-regular mt-4 max-w-xs text-night-muted">{academy.tagline || `Learn new skills online with ${academy.name} — at your own pace, from anywhere.`}</p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-2">
              {socials.map(([net, href]) => (
                <a key={net} href={href} target="_blank" rel="noopener noreferrer" aria-label={net} className="flex h-9 w-9 items-center justify-center rounded-full border border-night-line text-night-soft transition-colors hover:border-accent hover:bg-accent hover:text-white">
                  <SocialIcon network={net} className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
        <FooterColumn title="Explore" links={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))} />
        {academy.categories.length > 0 && <FooterColumn title="Top categories" links={academy.categories.slice(0, 5).map((c) => ({ label: c.name, href: `/courses?category=${c.slug}` }))} />}
        {contact.length > 0 && (
          <div>
            <h3 className="body-sm-medium font-semibold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3">
              {contact.map((c) => (
                <li key={c.label} className="flex items-start gap-2.5 body-sm-regular text-night-muted">
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
        {newsletterOn && (
          <div>
            <h3 className="body-sm-medium font-semibold text-white">Newsletter</h3>
            <p className="body-sm-regular mt-4 text-night-muted">New courses and offers, once a month.</p>
            <div className="mt-4">
              <NewsletterForm source="footer" compact />
            </div>
          </div>
        )}
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 pb-8 sm:px-6">
        <span className="body-xsm-medium text-night-muted">Pay with</span>
        {PAYMENTS.map((p) => (
          <span key={p.alt} className="flex h-8 items-center rounded-lg bg-white px-2.5">
            <Image src={p.src} alt={p.alt} width={64} height={20} className="h-4 w-auto object-contain" />
          </span>
        ))}
        <span className="body-xsm-regular text-night-muted">· cards, mobile banking & net banking</span>
      </div>

      <div className="relative border-t border-night-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
          <p className="body-xsm-regular text-night-muted">{academy.branding.footerText || `© ${new Date().getFullYear()} ${academy.name}. All rights reserved.`}</p>
          <div className="flex items-center gap-4">
            {academy.branding.showPoweredBy && (
              <Link href={PLATFORM_URL} className="body-xsm-regular text-night-muted transition-colors hover:text-white">
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
