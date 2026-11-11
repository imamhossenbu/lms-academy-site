"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { PlayerOutline } from "@/types/academy";
import { CurriculumSidebar } from "./CurriculumSidebar";
import { PlayerTopBar } from "./PlayerTopBar";

/** Player layout: top bar, lesson area, course content sidebar (a slide-in drawer on small screens). */
export function PlayerShell({ outline, currentId, children }: { outline: PlayerOutline; currentId: string | null; children: React.ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="min-h-[calc(100vh-74px)] bg-night">
      <PlayerTopBar outline={outline} onOpenContents={() => setDrawer(true)} />
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">{children}</div>
        <aside className="hidden border-l border-night-line lg:block">
          <div className="sticky top-[74px] max-h-[calc(100vh-74px)] overflow-y-auto">
            <p className="px-4 pb-1 pt-4 body-sm-medium font-semibold text-white">Course content</p>
            <CurriculumSidebar outline={outline} currentId={currentId} />
          </div>
        </aside>
      </div>
      <AnimatePresence>
        {drawer && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="absolute inset-0 bg-black/70" onClick={() => setDrawer(false)} aria-label="Close course content" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }} className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto border-l border-night-line bg-night-surface" role="dialog" aria-label="Course content">
              <div className="flex items-center justify-between px-4 py-4">
                <p className="body-medium font-semibold text-white">Course content</p>
                <button type="button" onClick={() => setDrawer(false)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-night-line text-white" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <CurriculumSidebar outline={outline} currentId={currentId} onNavigate={() => setDrawer(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PlayerShell;
