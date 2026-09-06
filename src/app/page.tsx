"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { NameSearch } from "@/components/NameSearch";
import { slugify } from "@/lib/utils";

const EXAMPLES = ["Aritra", "Emma", "Arjun", "Luna", "Alexander"];

export default function HomePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    (name: string) => {
      if (!name.trim()) return;
      setIsSearching(true);
      const slug = slugify(name);
      // Small delay for polish
      setTimeout(() => {
        router.push(`/name/${encodeURIComponent(slug)}`);
      }, 300);
    },
    [router]
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <span>How Rare Is My Name?</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[var(--accent-soft)] transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-balance">
            How Rare Is{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Your Name?
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--muted)] mb-12 max-w-xl mx-auto text-balance">
            One name. A surprisingly deep story.
          </p>

          <NameSearch onSearch={handleSearch} isLoading={isSearching} />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--muted)]">
            <span className="mr-1">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleSearch(ex)}
                className="px-3 py-1 rounded-full border border-[var(--border)] hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
              >
                {ex}
              </button>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-[var(--muted)]">
        <p>No account required · Privacy-first · <a href="/compare" className="underline hover:text-violet-500">Compare</a> · <a href="/battle" className="underline hover:text-violet-500">Battle</a></p>
      </footer>
    </div>
  );
}
