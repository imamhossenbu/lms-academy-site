import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface AcademyBrand {
  name: string;
  initials: string;
  logoUrl: string;
  logoDarkUrl: string;
}

/** The academy's uploaded logo (light / dark version), or an accent tile with its initials + name. */
export function AcademyLogo({ brand, tone = "dark", asLink = true, className }: { brand: AcademyBrand; tone?: "dark" | "light"; asLink?: boolean; className?: string }) {
  const src = tone === "light" ? brand.logoDarkUrl || brand.logoUrl : brand.logoUrl;
  const content = src ? (
    <Image src={src} alt={brand.name} width={160} height={40} className="h-9 w-auto max-w-40 object-contain" priority />
  ) : (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover body-sm-medium font-bold text-white shadow-md shadow-accent-20">
        {brand.initials}
      </span>
      <span className={cn("heading-h5 max-w-52 truncate font-bold tracking-tight", tone === "light" ? "text-white" : "text-primary-500")}>{brand.name}</span>
    </>
  );
  const cls = cn("inline-flex min-w-0 items-center gap-2.5", className);
  return asLink ? (
    <Link href="/" className={cls} aria-label={`${brand.name} home`}>
      {content}
    </Link>
  ) : (
    <span className={cls}>{content}</span>
  );
}

export default AcademyLogo;
