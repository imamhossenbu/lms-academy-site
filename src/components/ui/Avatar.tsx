import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

const SIZES = { xs: "h-6 w-6 body-2xsm-regular", sm: "h-8 w-8 body-xsm-medium", md: "h-11 w-11 body-sm-medium", lg: "h-16 w-16 heading-h5", xl: "h-24 w-24 heading-h3" };
const PX = { xs: 24, sm: 32, md: 44, lg: 64, xl: 96 };

/** Round photo, or the person's initials on the academy's accent tint. */
export function Avatar({ name, src, size = "md", className }: { name: string; src?: string | null; size?: keyof typeof SIZES; className?: string }) {
  const cls = cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full", SIZES[size], className);
  if (src)
    return (
      <span className={cls}>
        <Image src={src} alt={name} width={PX[size]} height={PX[size]} className="h-full w-full object-cover" />
      </span>
    );
  return (
    <span className={cn(cls, "bg-accent-light font-semibold text-accent")} aria-label={name}>
      {initials(name)}
    </span>
  );
}

export default Avatar;
