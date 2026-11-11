import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

/** Five stars filled to `value` (halves rounded), amber like every course marketplace. */
export function StarRating({ value, size = "sm", className }: { value: number; size?: "xs" | "sm" | "md"; className?: string }) {
  const px = size === "xs" ? "h-3 w-3" : size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  const rounded = Math.round(value * 2) / 2;
  return (
    <span className={cn("inline-flex items-center gap-0.5 shrink-0", className)} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = rounded >= i ? 1 : rounded >= i - 0.5 ? 0.5 : 0;
        return (
          <span key={i} className={cn("relative inline-flex", px)}>
            <Star className={cn("absolute inset-0 text-slate-200 fill-slate-200", px)} />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={cn("text-yellow fill-yellow", px)} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export default StarRating;
