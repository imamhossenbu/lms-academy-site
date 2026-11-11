import { Award, BookOpen, ClipboardList, FileQuestion, LayoutDashboard, Radio, Receipt, UserCog, type LucideIcon } from "lucide-react";

export type DashboardTab = "overview" | "courses" | "live" | "assignments" | "quizzes" | "certificates" | "orders" | "profile";

export const DASHBOARD_TABS: { id: DashboardTab; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "My courses", icon: BookOpen },
  { id: "live", label: "Live classes", icon: Radio },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "quizzes", label: "Quiz results", icon: FileQuestion },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "orders", label: "Orders", icon: Receipt },
  { id: "profile", label: "Profile & security", icon: UserCog },
];

export const parseDashboardTab = (v: string | undefined): DashboardTab => (DASHBOARD_TABS.some((t) => t.id === v) ? (v as DashboardTab) : "overview");
export const tabHref = (tab: DashboardTab) => (tab === "overview" ? "/dashboard" : `/dashboard?tab=${tab}`);
