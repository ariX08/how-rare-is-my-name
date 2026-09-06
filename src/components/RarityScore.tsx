"use client";

import { motion } from "framer-motion";
import type { RarityInfo } from "@/lib/name-data/types";

interface RarityScoreProps {
  rarity: RarityInfo;
}

export function RarityScore({ rarity }: RarityScoreProps) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (rarity.score / 100) * circumference;

  const color =
    rarity.score >= 75
      ? "#8b5cf6"
      : rarity.score >= 50
      ? "#6366f1"
      : rarity.score >= 30
      ? "#64748b"
      : "#94a3b8";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth="10"
          />
          {/* Progress */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold tabular-nums tracking-tight"
          >
            {rarity.score}
          </motion.span>
          <span className="text-sm text-[var(--muted)] mt-1">/ 100</span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-center"
      >
        <p className="text-2xl font-display font-semibold" style={{ color }}>
          {rarity.label}
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">
          Rarer than {rarity.percentile}% of names
          {rarity.confidence === "estimate" && " (estimate)"}
        </p>
      </motion.div>
    </div>
  );
}
