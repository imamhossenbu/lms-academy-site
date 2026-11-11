"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { BookOpen, ChevronDown, LogOut } from "lucide-react";
import { postJson } from "@/lib/clientApi";
import { Avatar } from "@/components/ui/Avatar";

export interface HeaderUser {
  name: string;
  email: string;
  avatar: string | null;
}

/** Signed-in learner: avatar button → dropdown with My courses and Sign out. */
export function UserMenu({ user }: { user: HeaderUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const signOut = async () => {
    setOpen(false);
    const id = toast.loading("Signing you out…");
    const res = await postJson("/api/auth/logout");
    if (!res.ok) return toast.error("Couldn't sign you out", { id, description: res.message });
    toast.success("Signed out", { id, description: "See you soon!" });
    router.push("/");
    router.refresh();
  };

  return (
    <div ref={ref} className="relative">
      <motion.button type="button" whileTap={{ scale: 0.96 }} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu" className="flex items-center gap-2 rounded-full border border-night-line bg-night-surface py-1 pl-1 pr-3 transition-colors hover:border-night-line-strong">
        <Avatar name={user.name} src={user.avatar} size="sm" />
        <span className="max-w-28 truncate body-sm-medium text-white">{user.name.split(" ")[0]}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-night-muted" />
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-night-line bg-night-surface shadow-xl shadow-black/40"
          >
            <div className="border-b border-night-line px-4 py-3">
              <p className="body-sm-medium truncate font-semibold text-white">{user.name}</p>
              <p className="body-xsm-regular truncate text-night-muted">{user.email}</p>
            </div>
            <div className="p-1.5">
              <Link href="/my-courses" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 body-sm-medium text-white hover:bg-accent-soft hover:text-accent">
                <BookOpen className="h-4 w-4" />
                My courses
              </Link>
              <button type="button" role="menuitem" onClick={signOut} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 body-sm-medium text-red hover:bg-red-14">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserMenu;
