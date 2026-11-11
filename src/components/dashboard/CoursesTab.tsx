import React from "react";
import type { MyCourse } from "@/types/academy";
import { MyCoursesGrid } from "@/components/account/MyCoursesGrid";
import { SegmentLinks } from "./SegmentLinks";
import { TabHeading } from "./TabHeading";

/** Enrolled courses with an All / In progress / Completed filter (?filter=). */
export function CoursesTab({ items, filter }: { items: MyCourse[]; filter: "all" | "active" | "done" }) {
  const done = (c: MyCourse) => !!c.completedAt || c.progress >= 100;
  const list = filter === "active" ? items.filter((c) => !done(c)) : filter === "done" ? items.filter(done) : items;
  return (
    <>
      <TabHeading
        title="My courses"
        text={`${items.length} enrolled course${items.length === 1 ? "" : "s"}.`}
        action={
          <SegmentLinks
            id="courses"
            active={filter}
            options={[
              { value: "all", label: "All", href: "/dashboard?tab=courses", count: items.length },
              { value: "active", label: "In progress", href: "/dashboard?tab=courses&filter=active", count: items.filter((c) => !done(c)).length },
              { value: "done", label: "Completed", href: "/dashboard?tab=courses&filter=done", count: items.filter(done).length },
            ]}
          />
        }
      />
      <MyCoursesGrid items={list} />
    </>
  );
}

export default CoursesTab;
