"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { EmptyState } from "@/components/shared/EmptyState";

interface Card {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
  hint: string;
}

/** One card per contact channel the academy has filled in (Settings › General). */
export function ContactCards({ email, phone, address, website }: { email: string; phone: string; address: string; website: string }) {
  const cards = [
    email && { icon: Mail, title: "Email", value: email, href: `mailto:${email}`, hint: "We usually reply within a working day." },
    phone && { icon: Phone, title: "Phone", value: phone, href: `tel:${phone.replace(/\s+/g, "")}`, hint: "Call or message us during office hours." },
    address && { icon: MapPin, title: "Visit us", value: address, hint: "Drop by our office." },
    website && { icon: Globe, title: "Website", value: website.replace(/^https?:\/\//, ""), href: /^https?:\/\//.test(website) ? website : `https://${website}`, hint: "More about us." },
  ].filter(Boolean) as Card[];

  if (cards.length === 0)
    return <EmptyState icon={<Mail className="h-7 w-7" />} title="Contact details coming soon" text="This academy hasn't added its contact details yet. Please check back shortly." />;

  return (
    <Stagger onMount className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
      {cards.map((c) => {
        const body = (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <c.icon className="h-5 w-5" />
            </span>
            <span className="mt-4 block body-sm-medium text-primary-300">{c.title}</span>
            <span className="mt-1 block heading-h5 break-words font-semibold text-primary-500">{c.value}</span>
            <span className="mt-2 block body-sm-regular text-primary-300">{c.hint}</span>
          </>
        );
        return (
          <StaggerItem key={c.title} className="h-full">
            <motion.div whileHover={{ y: -4 }} className="h-full">
              {c.href ? (
                <a href={c.href} target={c.title === "Website" ? "_blank" : undefined} rel="noopener noreferrer" className="group block h-full rounded-2xl border border-dash bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-primary-500/5">
                  {body}
                </a>
              ) : (
                <div className="group h-full rounded-2xl border border-dash bg-white p-6">{body}</div>
              )}
            </motion.div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export default ContactCards;
