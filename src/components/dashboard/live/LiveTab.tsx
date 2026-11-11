import React from "react";
import { Radio } from "lucide-react";
import type { LiveItem } from "@/types/academy";
import { EmptyState } from "@/components/shared/EmptyState";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SegmentLinks } from "../SegmentLinks";
import { TabHeading } from "../TabHeading";
import { LiveCard } from "./LiveCard";

/** Live classes: Upcoming / Past switch (?when=) and the class cards. */
export function LiveTab({ items, when }: { items: LiveItem[]; when: "upcoming" | "past" }) {
  return (
    <>
      <TabHeading
        title="Live classes"
        text="Join from here when a class starts — recordings appear after it ends."
        action={<SegmentLinks id="live" active={when} options={[{ value: "upcoming", label: "Upcoming", href: "/dashboard?tab=live" }, { value: "past", label: "Past", href: "/dashboard?tab=live&when=past" }]} />}
      />
      {items.length ? (
        <Stagger onMount className="space-y-3" stagger={0.05}>
          {items.map((l) => (
            <StaggerItem key={l.id}>
              <LiveCard item={l} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <EmptyState icon={<Radio className="h-7 w-7" />} title={when === "upcoming" ? "No upcoming live classes" : "No past live classes"} text={when === "upcoming" ? "When your instructors schedule a live class, it shows up here." : "Classes you could join appear here after they end."} />
      )}
    </>
  );
}

export default LiveTab;
