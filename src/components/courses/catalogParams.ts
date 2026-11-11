import type { CourseQuery } from "@/lib/api";

/** Catalogue URL params (?q, category, level, price, instructor, sort, page) ↔ API query. */
export const SORTS = [
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest rated" },
  { value: "priceAsc", label: "Price: low to high" },
  { value: "priceDesc", label: "Price: high to low" },
] as const;

export type CatalogParams = Record<string, string | string[] | undefined>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

export function toCourseQuery(sp: CatalogParams): CourseQuery {
  const sort = one(sp.sort);
  const price = one(sp.price);
  const page = Number(one(sp.page));
  return {
    q: one(sp.q)?.slice(0, 100),
    category: one(sp.category),
    level: one(sp.level),
    instructor: one(sp.instructor),
    price: price === "free" || price === "paid" ? price : undefined,
    sort: SORTS.some((s) => s.value === sort) ? (sort as CourseQuery["sort"]) : undefined,
    page: Number.isInteger(page) && page > 1 ? page : undefined,
    limit: 12,
  };
}
