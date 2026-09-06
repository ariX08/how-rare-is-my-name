"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { X, Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { NameReport } from "@/lib/name-data/types";

interface ShareCardProps {
  report: NameReport;
  onClose: () => void;
}

export function ShareCard({ report, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCard = async () => {
    // Simple approach: open print dialog or use canvas if available
    // For production you'd use html-to-image or similar
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm"
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* The shareable card */}
        <div
          ref={cardRef}
          className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-violet-950 text-white p-8 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300/80 mb-6">
            How Rare Is My Name?
          </p>
          <h2 className="font-display text-4xl font-bold mb-6 tracking-tight">
            {report.name.toUpperCase()}
          </h2>
          <div className="mb-2">
            <span className="text-6xl font-bold tabular-nums">{report.rarity.score}</span>
            <span className="text-2xl text-white/50"> / 100</span>
          </div>
          <p className="text-xl font-medium text-violet-300 mb-4">
            {report.rarity.label.toUpperCase()}
          </p>
          <p className="text-sm text-white/60 mb-8">
            Rarer than {report.rarity.percentile}% of names
            {report.rarity.confidence === "estimate" ? " (estimate)" : ""}
            <br />
            in the selected dataset.
          </p>
          <p className="text-xs text-white/40 tracking-wide">howrareismy.name</p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={copyLink}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-zinc-900 font-medium text-sm hover:bg-white/90 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button
            onClick={downloadCard}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-500 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
