"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Globe, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import type { AcademyProfile, AcademySiteContent } from "@/types/academy";
import { NextSteps } from "./NextSteps";
import { QuickHelp } from "./QuickHelp";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SocialIcon, type SocialNetwork } from "@/components/layout/footer/SocialIcon";

interface Channel {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
}

/** Right column: the academy's contact channels and office hours, socials, what happens next, quick links + real numbers, FAQ pointer. */
export function ContactInfo({ email, phone, address, website, site, stats, signedIn }: { email: string; phone: string; address: string; website: string; site: AcademySiteContent | null; stats: AcademyProfile["stats"]; signedIn: boolean }) {
  const channels = [
    email && { icon: Mail, title: "Email us", value: email, href: `mailto:${email}` },
    phone && { icon: Phone, title: "Call us", value: phone, href: `tel:${phone.replace(/\s+/g, "")}` },
    site?.officeHours && { icon: Clock, title: "Office hours", value: site.officeHours },
    address && { icon: MapPin, title: "Visit us", value: address },
    website && { icon: Globe, title: "Website", value: website.replace(/^https?:\/\//, ""), href: /^https?:\/\//.test(website) ? website : `https://${website}` },
  ].filter(Boolean) as Channel[];
  const socials = (Object.entries(site?.socials ?? {}) as [SocialNetwork, string][]).filter(([, href]) => href);

  return (
    <Stagger onMount className="space-y-4" stagger={0.07}>
      {channels.map((c) => {
        const body = (
          <>
            <span className="academy-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
              <c.icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block body-sm-medium text-night-muted">{c.title}</span>
              <span className="block body-l-medium break-words text-white">{c.value}</span>
            </span>
          </>
        );
        return (
          <StaggerItem key={c.title}>
            <motion.div whileHover={{ x: 4 }}>
              {c.href ? (
                <a href={c.href} target={c.title === "Website" ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-night-line bg-night-surface p-5 transition-colors hover:border-accent/60">
                  {body}
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-2xl border border-night-line bg-night-surface p-5">{body}</div>
              )}
            </motion.div>
          </StaggerItem>
        );
      })}

      {socials.length > 0 && (
        <StaggerItem>
          <div className="rounded-2xl border border-night-line bg-night-surface p-5">
            <p className="body-sm-medium text-night-muted">Follow us</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socials.map(([net, href]) => (
                <a key={net} href={href} target="_blank" rel="noopener noreferrer" aria-label={net} className="flex h-10 w-10 items-center justify-center rounded-full border border-night-line text-night-soft transition-colors hover:border-accent hover:bg-accent hover:text-white">
                  <SocialIcon network={net} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </StaggerItem>
      )}

      <StaggerItem>
        <NextSteps />
      </StaggerItem>

      <StaggerItem>
        <QuickHelp stats={stats} signedIn={signedIn} />
      </StaggerItem>

      {(site?.faqs.length ?? 0) > 0 && (
        <StaggerItem>
          <Link href="#faq" className="group flex items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent-soft p-5">
            <span>
              <span className="block body-medium font-semibold text-white">Looking for a quick answer?</span>
              <span className="block body-sm-regular text-night-muted">Most questions are answered in our FAQ.</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </StaggerItem>
      )}
    </Stagger>
  );
}

export default ContactInfo;
