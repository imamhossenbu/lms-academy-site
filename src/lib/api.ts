import { API_URL, REVALIDATE } from "./config";
import type { AcademyCourseCard, AcademyCourseDetail, AcademyInstructor, AcademyPage, AcademyProfile, AcademyReview } from "@/types/academy";

/** Server-side reads of the backend's public academy endpoints (`/academy/public/*`), cached for REVALIDATE seconds. */

export class AcademyApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function get<T>(path: string): Promise<T> {
  if (!API_URL) throw new AcademyApiError(503, "The academy service is not configured.");
  let res: Response;
  try {
    res = await fetch(`${API_URL}/academy/public${path}`, { next: { revalidate: REVALIDATE } });
  } catch {
    throw new AcademyApiError(503, "We couldn't reach the academy service. Please try again in a moment.");
  }
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    throw new AcademyApiError(res.status, message || "Something went wrong.");
  }
  return (await res.json()) as T;
}

/** null when the resource doesn't exist (404) or the academy is unavailable (403). */
async function orNull<T>(p: Promise<T>): Promise<T | null> {
  try {
    return await p;
  } catch (e) {
    if (e instanceof AcademyApiError && (e.status === 404 || e.status === 403)) return null;
    throw e;
  }
}

const enc = encodeURIComponent;

export const resolveHost = (host: string) => orNull(get<{ slug: string }>(`/resolve?host=${enc(host)}`));
export const fetchProfile = (slug: string) => orNull(get<AcademyProfile>(`/${enc(slug)}`));

export interface CourseQuery {
  q?: string;
  category?: string;
  level?: string;
  price?: "free" | "paid";
  instructor?: string;
  sort?: "popular" | "newest" | "rating" | "priceAsc" | "priceDesc";
  page?: number;
  limit?: number;
}

export function fetchCourses(slug: string, query: CourseQuery = {}) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) if (v !== undefined && v !== "" && v !== null) qs.set(k, String(v));
  const s = qs.toString();
  return get<AcademyPage<AcademyCourseCard>>(`/${enc(slug)}/courses${s ? `?${s}` : ""}`);
}

export const fetchLevels = (slug: string) => get<string[]>(`/${enc(slug)}/levels`);
export const fetchCourse = (slug: string, courseSlug: string) => orNull(get<AcademyCourseDetail>(`/${enc(slug)}/courses/${enc(courseSlug)}`));
export const fetchInstructors = (slug: string) => get<AcademyInstructor[]>(`/${enc(slug)}/instructors`);
export const fetchReviews = (slug: string, limit = 6) => get<AcademyReview[]>(`/${enc(slug)}/reviews?limit=${limit}`);
