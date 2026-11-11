import React from "react";

/** Title + one line at the top of each dashboard tab, with an optional action on the right. */
export function TabHeading({ title, text, action }: { title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="heading-h2-bold text-white">{title}</h1>
        {text && <p className="body-regular mt-1 text-night-muted">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export default TabHeading;
