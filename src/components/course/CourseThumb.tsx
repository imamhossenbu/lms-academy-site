import React from "react";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/cn";

/** Course cover (16:9), or an accent gradient with a cap and the course title when there is no image. */
export function CourseThumb({ src, title, className, priority, sizes = "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" }: { src: string | null; title: string; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={cn("relative aspect-video overflow-hidden bg-accent-light", className)}>
      {src ? (
        <Image src={src} alt={title} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent-light via-accent-soft to-accent-20 p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-night-surface text-accent shadow-sm">
            <GraduationCap className="h-6 w-6" />
          </span>
          <span className="body-sm-medium line-clamp-2 text-night-soft">{title}</span>
        </div>
      )}
    </div>
  );
}

export default CourseThumb;
