/**
 * Shapes returned by the backend's /academy/public/* endpoints — a copy of
 * lms-ai-backend/src/academy-site/academy-site.types.ts (dates arrive as ISO strings). Change both.
 */

export type AcademyAccent = "orange" | "blue" | "green" | "purple" | "navy";
export type AcademyCurrency = "USD" | "BDT" | "EUR" | "GBP" | "INR";

export interface AcademyCategory {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  courses: number;
}

export interface AcademyProfile {
  /** false = subscription cancelled / suspended: the site shows a "temporarily unavailable" page. */
  available: boolean;
  slug: string;
  name: string;
  logoInitials: string;
  tone: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  websiteUrl: string;
  currency: AcademyCurrency;
  timezone: string;
  branding: { logoUrl: string; logoDarkUrl: string; faviconUrl: string; accent: AcademyAccent; footerText: string; showPoweredBy: boolean };
  maintenance: { enabled: boolean; message: string; until: string };
  stats: { courses: number; students: number; instructors: number; lessons: number; rating: number; reviews: number };
  categories: AcademyCategory[];
}

export interface AcademyInstructorSummary {
  id: string;
  name: string;
  avatar: string | null;
  headline: string;
}

export interface AcademyCourseCard {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  thumbnail: string | null;
  level: string;
  language: string;
  price: number;
  isFree: boolean;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  students: number;
  lessons: number;
  category: { slug: string; name: string } | null;
  instructor: AcademyInstructorSummary;
}

export interface AcademyLessonOutline {
  id: string;
  title: string;
  type: string;
  durationMinutes: number;
  isPreview: boolean;
}

export interface AcademyModuleOutline {
  id: string;
  title: string;
  description: string | null;
  durationMinutes: number;
  lessons: AcademyLessonOutline[];
}

export interface AcademyReview {
  id: string;
  rating: number;
  text: string;
  createdAt: string;
  student: { name: string; avatar: string | null };
  course?: { slug: string; title: string };
}

export interface AcademyInstructor extends AcademyInstructorSummary {
  bio: string;
  expertise: string[];
  courses: number;
  students: number;
  rating: number;
}

export interface AcademyCourseDetail extends AcademyCourseCard {
  description: string;
  requirements: string[];
  outcomes: string[];
  tags: string[];
  modules: AcademyModuleOutline[];
  lessonTypes: Record<string, number>;
  instructorProfile: AcademyInstructor;
  ratingBreakdown: { stars: number; count: number }[];
  reviews: AcademyReview[];
  related: AcademyCourseCard[];
}

export interface AcademyPage<T> {
  data: T[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

// ---------------------------------------------------------------- signed-in learner (/academy/:slug/me/*)

export interface CheckoutQuote {
  course: { id: string; slug: string; title: string; thumbnail: string | null; instructor: string; level: string; isFree: boolean };
  currency: AcademyCurrency;
  price: number;
  discount: number;
  total: number;
  coupon: { code: string; label: string } | null;
  couponError: string | null;
  enrolled: boolean;
}

export interface CheckoutResult {
  orderId: string;
  orderNumber: string;
  status: "PAID" | "PENDING" | "FAILED" | "CANCELLED" | "REFUNDED";
  total: number;
  currency: AcademyCurrency;
  paidAt: string | null;
  method: string | null;
  course: { slug: string; title: string; thumbnail: string | null };
}

export interface MyCourse {
  course: { slug: string; title: string; thumbnail: string | null; level: string; available: boolean; instructor: { name: string; avatar: string | null } };
  lessons: number;
  progress: number;
  completedAt: string | null;
  enrolledAt: string;
  lastAccessedAt: string | null;
}
