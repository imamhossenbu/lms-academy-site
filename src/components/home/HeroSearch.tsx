"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

/** "What do you want to learn?" box → /courses?q=… */
export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const term = q.trim();
        router.push(term ? `/courses?q=${encodeURIComponent(term)}` : "/courses");
      }}
      className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-dash bg-white p-2 shadow-xl shadow-primary-500/5 transition-colors focus-within:border-accent"
    >
      <Search className="ml-2 h-5 w-5 shrink-0 text-primary-300" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="What do you want to learn?"
        aria-label="Search courses"
        maxLength={100}
        className="min-w-0 flex-1 bg-transparent py-2 body-regular text-primary-500 outline-none placeholder:text-primary-300"
      />
      <motion.button whileTap={{ scale: 0.95 }} type="submit" className="h-11 shrink-0 rounded-xl bg-accent px-5 body-sm-medium text-white transition-colors hover:bg-accent-hover academy-glow-btn">
        Search
      </motion.button>
    </form>
  );
}

export default HeroSearch;
