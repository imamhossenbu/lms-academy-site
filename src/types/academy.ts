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
  /** Admin-edited website content (hero, mission, app, FAQ, socials, newsletter); null until set up. */
  site: AcademySiteContent | null;
}

export interface AcademySiteContent {
  hero: { title: string; subtitle: string } | null;
  mission: { why: string; what: string; how: string; imageUrl: string } | null;
  app: { title: string; text: string; appStoreUrl: string; playStoreUrl: string; screenshotUrl: string } | null;
  faqs: { question: string; answer: string }[];
  socials: { facebook: string; instagram: string; youtube: string; linkedin: string; tiktok: string };
  newsletter: { enabled: boolean; title: string; text: string };
  officeHours: string;
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

// ---------------------------------------------------------------- course player (/learn)

export interface PlayerLesson {
  id: string;
  title: string;
  type: string;
  durationMinutes: number;
  isPreview: boolean;
  completed: boolean;
  /** null = open; otherwise why it's locked. */
  lockedReason: string | null;
}

export interface PlayerOutline {
  course: { slug: string; title: string; thumbnail: string | null; instructor: { name: string; avatar: string | null; headline: string | null } };
  progress: number;
  completedLessons: number;
  totalLessons: number;
  completedAt: string | null;
  nextLessonId: string | null;
  modules: { id: string; title: string; lessons: PlayerLesson[] }[];
}

export interface LessonResource {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  size: string;
  description: string;
  isDownloadable: boolean;
}

export interface LessonDetail {
  id: string;
  title: string;
  type: string;
  content: string | null;
  videoUrl: string | null;
  durationMinutes: number;
  resources: LessonResource[];
  completed: boolean;
  lastPosition: number;
  quizId: string | null;
  /** ASSIGNMENT lessons: the attached assignment and this learner's latest submission. */
  assignment?: (Omit<AssignmentItem, "course"> & { course?: AssignmentItem["course"] }) | null;
  /** LIVE lessons: the course's next live class (join link only shortly before it starts). */
  live?: { id: string; title: string; startTime: string; endTime: string; status: "LIVE" | "UPCOMING"; joinUrl: string | null } | null;
}

export interface QuestionThread {
  id: string;
  title: string;
  bodyHtml: string;
  isResolved: boolean;
  isLocked: boolean;
  createdAt: string;
  author: { name: string; avatar: string | null; isInstructor: boolean; isMe: boolean };
  replies: { id: string; bodyHtml: string; isAccepted: boolean; createdAt: string; author: { name: string; avatar: string | null; isInstructor: boolean; isMe: boolean } }[];
}

export type QuizKind = "MULTIPLE_CHOICE" | "MULTIPLE_SELECT" | "TRUE_FALSE" | "SHORT_ANSWER";

export interface StudentQuiz {
  id: string;
  title: string;
  descriptionHtml: string;
  instructionsHtml: string;
  totalMarks: number;
  passingMarks: number;
  timeLimitMinutes: number | null;
  maxAttempts: number | null;
  questions: { id: string; kind: QuizKind; questionHtml: string; options: { id: string; text: string }[]; points: number; required: boolean }[];
}

export interface QuizSubmitResult {
  id: string;
  attemptNumber: number;
  score?: number;
  totalMarks?: number;
  percentage?: number;
  passed?: boolean;
  questions?: { questionId: string; correct: boolean; correctOptionIds?: string[]; acceptedAnswers?: string[]; explanationHtml?: string }[];
}

// ---------------------------------------------------------------- learner dashboard (/dashboard)

export interface LiveItem {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "LIVE" | "UPCOMING" | "ENDED";
  joinUrl: string | null;
  recordingUrl: string | null;
  platform: string;
  course: { slug: string; title: string };
  instructor: string;
}

export interface QuizResultItem {
  id: string;
  quizTitle: string;
  lessonId: string | null;
  course: { slug: string; title: string };
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  attemptNumber: number;
  submittedAt: string;
}

export interface DashboardOverview {
  stats: { courses: number; completedCourses: number; lessonsCompleted: number; averageProgress: number; certificates: number; pendingAssignments: number };
  continueLearning: { slug: string; title: string; thumbnail: string | null; instructor: string; progress: number } | null;
  upcomingLive: LiveItem[];
  recentQuizzes: QuizResultItem[];
}

export interface AssignmentItem {
  id: string;
  title: string;
  type: "FILE_UPLOAD" | "TEXT" | "LINK" | string;
  dueDate: string;
  marks: number;
  instructionsHtml: string;
  description: string | null;
  allowedFileTypes: string;
  maxFileSizeMb: number;
  maxAttempts: number | null;
  course: { slug: string; title: string };
  state: "TODO" | "OVERDUE" | "SUBMITTED" | "GRADED";
  attempts: number;
  attemptsLeft: number | null;
  canSubmit: boolean;
  lastSubmission: { id: string; status: string; submittedAt: string; marksObtained: number | null; feedback: string | null; attempt: number; isLate: boolean; fileUrl: string | null; fileName: string; textAnswer: string | null } | null;
}

export interface CertificateItem {
  id: string;
  certificateNumber: string;
  verificationCode: string;
  certificateUrl: string | null;
  verifyUrl: string;
  issuedAt: string;
  status: "VALID" | "REVOKED" | string;
  grade: number | null;
  expiresAt: string | null;
  course: { slug: string; title: string; thumbnail: string | null };
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  status: "PAID" | "PENDING" | "FAILED" | "CANCELLED" | "REFUNDED";
  totalAmount: number;
  discountAmount: number;
  currency: AcademyCurrency;
  paymentMethod: string | null;
  createdAt: string;
  paidAt: string | null;
  course: { slug: string; title: string; thumbnail: string | null };
  invoice: { invoiceUrl: string; invoiceNumber: string } | null;
}

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  bio: string | null;
  country: string | null;
  createdAt: string;
}
