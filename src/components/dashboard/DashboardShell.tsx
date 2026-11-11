"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { DASHBOARD_TABS, tabHref, type DashboardTab } from "./dashboardTabs";

/** Learner dashboard frame: profile header, side navigation (horizontal scroller on small screens) and the active tab. */
export function DashboardShell({ active, user, badges, children }: { active: DashboardTab; user: { name: string; email: string; avatar: string | null }; badges: Partial<Record<DashboardTab, number>>; children: React.ReactNode }) {
  return (
    <section className="relative isolate min-h-[calc(100vh-74px)] overflow-hidden bg-night">
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-accent opacity-15 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-96 w-96 rounded-full bg-accent-2 opacity-10 blur-[120px]" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-10">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-3 rounded-2xl border border-night-line bg-night-surface p-4">
            <Avatar name={user.name} src={user.avatar} size="md" />
            <div className="min-w-0">
              <p className="body-sm-medium truncate font-semibold text-white">{user.name}</p>
              <p className="body-xsm-regular truncate text-night-muted">{user.email}</p>
            </div>
          </div>
          <nav aria-label="Dashboard" className="mt-4 flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {DASHBOARD_TABS.map((t) => {
              const on = t.id === active;
              const n = badges[t.id];
              return (
                <Link key={t.id} href={tabHref(t.id)} scroll={false} aria-current={on ? "page" : undefined} className={cn("relative flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 body-sm-medium transition-colors", on ? "text-white" : "text-night-soft hover:bg-white/5 hover:text-white")}>
                  {on && <motion.span layoutId="dash-nav" className="absolute inset-0 -z-10 rounded-xl border border-accent/40 bg-accent-10" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <t.icon className={cn("h-4 w-4", on ? "text-accent" : "")} />
                  <span className="flex-1">{t.label}</span>
                  {!!n && <span className="academy-gradient rounded-full px-2 py-0.5 body-2xsm-regular font-semibold text-white">{n}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>
        <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="min-w-0">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default DashboardShell;
