import React from "react";
import { Wrench } from "lucide-react";

/** Strip above the header while the academy has maintenance mode on (Settings › Maintenance). */
export function MaintenanceBar({ message, until }: { message: string; until: string }) {
  const when = until ? new Date(until) : null;
  return (
    <div className="border-b border-yellow bg-yellow/15">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center body-xsm-medium text-yellow sm:px-6">
        <Wrench className="h-3.5 w-3.5 shrink-0" />
        <span>
          {message || "We're doing some maintenance — learning may be briefly unavailable."}
          {when && !Number.isNaN(when.getTime()) && ` Back by ${when.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}.`}
        </span>
      </p>
    </div>
  );
}

export default MaintenanceBar;
