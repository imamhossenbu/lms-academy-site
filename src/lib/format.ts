import type { AcademyCurrency } from "@/types/academy";

const SYMBOL: Record<AcademyCurrency, string> = { BDT: "৳", USD: "$", EUR: "€", GBP: "£", INR: "₹" };

/** "৳1,500" / "Free". */
export function formatPrice(amount: number, currency: AcademyCurrency, isFree = false): string {
  if (isFree || amount <= 0) return "Free";
  const n = amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: amount % 1 ? 2 : 0 });
  return `${SYMBOL[currency] ?? ""}${n}`;
}

/** 95 → "1h 35m", 40 → "40m", 0 → "". */
export function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** 1250 → "1.3K". */
export const compact = (n: number) => (n >= 1000 ? new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n) : String(n));

export const plural = (n: number, word: string, many = `${word}s`) => `${n.toLocaleString("en-US")} ${n === 1 ? word : many}`;

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("") || "A";

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** Lesson types from the course builder. */
export const LESSON_TYPE_LABEL: Record<string, string> = {
  VIDEO: "Video",
  TEXT: "Reading",
  QUIZ: "Quiz",
  ASSIGNMENT: "Assignment",
  CODING: "Coding exercise",
  LIVE: "Live class",
};
