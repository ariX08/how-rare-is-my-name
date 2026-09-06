"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { nameDataProvider } from "@/lib/name-data/sample-provider";
import type { NameReport } from "@/lib/name-data/types";
import { motion } from "framer-motion";

export default function ComparePage() {
  const router = useRouter();
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [reportA, setReportA] = useState<NameReport | null>(null);
  const [reportB, setReportB] = useState<NameReport | null>(null);
  const [loading, setLoading] = useState(false);

  const runCompare = async () => {
    if (!nameA.trim() || !nameB.trim()) return;
    setLoading(true);
    const [a, b] = await Promise.all([
      nameDataProvider.getReport(nameA),
      nameDataProvider.getReport(nameB),
    ]);
    setReportA(a);
    setReportB(b);
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Home
      </button>

      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Compare Names</h1>
      <p className="text-[var(--muted)] mb-8">Side-by-side rarity and characteristics.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] mb-1 block">First name</label>
          <input
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            placeholder="e.g. Aritra"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] mb-1 block">Second name</label>
          <input
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            placeholder="e.g. Alexander"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-violet-500"
          />
        </div>
      </div>

      <button
        onClick={runCompare}
        disabled={loading || !nameA.trim() || !nameB.trim()}
        className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 disabled:opacity-40 transition-colors"
      >
        {loading ? "Comparing..." : "Compare Names"}
      </button>

      {reportA && reportB && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 overflow-x-auto"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="py-3 pr-4 text-[var(--muted)] font-medium">Metric</th>
                <th className="py-3 px-4 font-display text-xl">{reportA.name}</th>
                <th className="py-3 px-4 font-display text-xl">{reportB.name}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-[var(--border)]">
                <td className="py-4 pr-4 text-[var(--muted)]">Rarity score</td>
                <td className="py-4 px-4 text-2xl font-bold text-violet-500">{reportA.rarity.score}</td>
                <td className="py-4 px-4 text-2xl font-bold text-violet-500">{reportB.rarity.score}</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-4 pr-4 text-[var(--muted)]">Label</td>
                <td className="py-4 px-4">{reportA.rarity.label}</td>
                <td className="py-4 px-4">{reportB.rarity.label}</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-4 pr-4 text-[var(--muted)]">Length</td>
                <td className="py-4 px-4">{reportA.name.length}</td>
                <td className="py-4 px-4">{reportB.name.length}</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-4 pr-4 text-[var(--muted)]">Variants</td>
                <td className="py-4 px-4">{reportA.variants.length}</td>
                <td className="py-4 px-4">{reportB.variants.length}</td>
              </tr>
              <tr>
                <td className="py-4 pr-4 text-[var(--muted)]">Origin</td>
                <td className="py-4 px-4">{reportA.origin?.origin ?? "—"}</td>
                <td className="py-4 px-4">{reportB.origin?.origin ?? "—"}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-xs text-[var(--muted)]">
            Comparison uses the same data sources and estimates as individual reports. Entertainment metrics omitted for clarity.
          </p>
        </motion.div>
      )}
    </div>
  );
}
