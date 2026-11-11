import React from "react";

export type SocialNetwork = "facebook" | "instagram" | "youtube" | "linkedin" | "tiktok";

/** Simple brand marks (24 × 24, currentColor) — lucide has no brand icons. */
export function SocialIcon({ network, className }: { network: SocialNetwork; className?: string }) {
  switch (network) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4zm4 4v6l5-3z" fillRule="evenodd" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <circle cx="5" cy="5" r="2.2" />
          <rect x="3" y="9" width="4" height="12" rx="0.5" />
          <path d="M10 9h3.8v1.8C14.4 9.7 15.8 8.7 18 8.7c3.4 0 4 2.3 4 5.3V21h-4v-6.2c0-1.5-.1-3.1-2-3.1s-2.1 1.5-2.1 3V21H10z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M16.5 2h-3.6v13.3a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V8.8a6.6 6.6 0 1 0 5.6 6.5V8.6a8 8 0 0 0 4.5 1.4V6.4a4.6 4.6 0 0 1-4.5-4.4z" />
        </svg>
      );
  }
}

export default SocialIcon;
