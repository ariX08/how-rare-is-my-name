"use client";

import { useState, FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface NameSearchProps {
  onSearch: (name: string) => void;
  isLoading?: boolean;
  initialValue?: string;
  size?: "large" | "compact";
  placeholder?: string;
}

export function NameSearch({
  onSearch,
  isLoading = false,
  initialValue = "",
  size = "large",
  placeholder = "Enter your name...",
}: NameSearchProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSearch(value.trim());
    }
  };

  const isLarge = size === "large";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div
        className={`
          relative flex items-center gap-2 rounded-2xl border border-[var(--border)]
          bg-[var(--card)] shadow-lg shadow-violet-500/5
          focus-within:border-violet-500/60 focus-within:ring-2 focus-within:ring-violet-500/20
          transition-all duration-200
          ${isLarge ? "p-2" : "p-1.5"}
        `}
      >
        <div className={`pl-3 text-[var(--muted)] ${isLarge ? "" : "pl-2"}`}>
          {isLoading ? (
            <Loader2 className={`${isLarge ? "w-5 h-5" : "w-4 h-4"} animate-spin`} />
          ) : (
            <Search className={isLarge ? "w-5 h-5" : "w-4 h-4"} />
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className={`
            flex-1 bg-transparent outline-none placeholder:text-[var(--muted)]
            ${isLarge ? "text-lg py-3" : "text-base py-2"}
          `}
          aria-label="Enter a name to search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <motion.button
          type="submit"
          disabled={!value.trim() || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            rounded-xl font-medium transition-all
            bg-violet-600 hover:bg-violet-500 text-white
            disabled:opacity-40 disabled:cursor-not-allowed
            ${isLarge ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"}
          `}
        >
          {isLoading ? "Analyzing..." : "Discover"}
        </motion.button>
      </div>
    </form>
  );
}
