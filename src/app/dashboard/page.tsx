import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchAssignments, fetchCertificates, fetchDashboard, fetchLiveClasses, fetchMyCourses, fetchOrders, fetchProfile, fetchQuizResults, requireLearner } from "@/lib/learner";
import { requireAcademy } from "@/lib/tenant";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { parseDashboardTab, tabHref } from "@/components/dashboard/dashboardTabs";
import { OverviewTab } from "@/components/dashboard/overview/OverviewTab";
import { CoursesTab } from "@/components/dashboard/CoursesTab";
import { LiveTab } from "@/components/dashboard/live/LiveTab";
import { AssignmentsTab } from "@/components/dashboard/assignments/AssignmentsTab";
import { QuizResultsTab } from "@/components/dashboard/quizzes/QuizResultsTab";
import { CertificatesTab } from "@/components/dashboard/certificates/CertificatesTab";
import { OrdersTab } from "@/components/dashboard/orders/OrdersTab";
import { ProfileTab } from "@/components/dashboard/profile/ProfileTab";
import { LoadError } from "@/components/dashboard/LoadError";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

type SP = { tab?: string; when?: string; show?: string; filter?: string };

/** One read for the active tab; signed out → sign in and come back to the same tab. */
async function TabContent({ tab, sp, firstName }: { tab: ReturnType<typeof parseDashboardTab>; sp: SP; firstName: string }) {
  const unwrap = async <T,>(p: Promise<{ ok: true; data: T } | { ok: false; status: number; message: string } | null>) => {
    const r = await p;
    if (!r || (!r.ok && r.status === 401)) redirect(`/login?next=${encodeURIComponent(tabHref(tab))}`);
    return r;
  };
  switch (tab) {
    case "courses": {
      const r = await unwrap(fetchMyCourses());
      return r.ok ? <CoursesTab items={r.data} filter={sp.filter === "active" || sp.filter === "done" ? sp.filter : "all"} /> : <LoadError message={r.message} />;
    }
    case "live": {
      const when = sp.when === "past" ? "past" : "upcoming";
      const r = await unwrap(fetchLiveClasses(when));
      return r.ok ? <LiveTab items={r.data} when={when} /> : <LoadError message={r.message} />;
    }
    case "assignments": {
      const r = await unwrap(fetchAssignments());
      return r.ok ? <AssignmentsTab items={r.data} show={sp.show === "done" || sp.show === "all" ? sp.show : "todo"} /> : <LoadError message={r.message} />;
    }
    case "quizzes": {
      const r = await unwrap(fetchQuizResults());
      return r.ok ? <QuizResultsTab items={r.data} /> : <LoadError message={r.message} />;
    }
    case "certificates": {
      const r = await unwrap(fetchCertificates());
      return r.ok ? <CertificatesTab items={r.data} /> : <LoadError message={r.message} />;
    }
    case "orders": {
      const r = await unwrap(fetchOrders());
      return r.ok ? <OrdersTab items={r.data} /> : <LoadError message={r.message} />;
    }
    case "profile": {
      const r = await unwrap(fetchProfile());
      return r.ok ? <ProfileTab profile={r.data} /> : <LoadError message={r.message} />;
    }
    default: {
      const r = await unwrap(fetchDashboard());
      return r.ok ? <OverviewTab data={r.data} firstName={firstName} /> : <LoadError message={r.message} />;
    }
  }
}

/** /dashboard?tab=… — the learner's home: overview, courses, live classes, assignments, quizzes, certificates, orders, profile. */
export default async function DashboardPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireAcademy();
  const sp = await searchParams;
  const tab = parseDashboardTab(sp.tab);
  const session = await requireLearner(tabHref(tab));
  const overview = tab === "overview" ? null : await fetchDashboard();
  const pending = overview?.ok ? overview.data.stats.pendingAssignments : undefined;
  return (
    <DashboardShell active={tab} user={{ name: session.user.name, email: session.user.email, avatar: session.user.avatar }} badges={{ assignments: pending }}>
      <TabContent tab={tab} sp={sp} firstName={session.user.name.split(" ")[0]} />
    </DashboardShell>
  );
}
