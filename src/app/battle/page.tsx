"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Swords } from "lucide-react";
import { nameDataProvider } from "@/lib/name-data/sample-provider";
import type { NameReport } from "@/lib/name-data/types";
import { motion } from "framer-motion";

export default function BattlePage() {
  const router = useRouter();
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [results, setResults] = useState<{ category: string; winner: string; a: number; b: number }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<[NameReport, NameReport] | null>(null);

  const battle = async () => {
    if (!nameA.trim() || !nameB.trim()) return;
    setLoading(true);
    const [a, b] = await Promise.all([
      nameDataProvider.getReport(nameA),
      nameDataProvider.getReport(nameB),
    ]);
    if (!a || !b) {
      setLoading(false);
      return;
    }
    setReports([a, b]);

    const cats = [
      { category: "Rarity", a: a.rarity.score, b: b.rarity.score },
      { category: "Name length", a: a.name.length * 10, b: b.name.length * 10 },
      { category: "Variants", a: a.variants.length * 15, b: b.variants.length * 15 },
      { category: "Memorability (vibe)", a: a.vibe.memorable, b: b.vibe.memorable },
      { category: "Historical depth", a: a.origin?.confidence === "high" ? 80 : a.origin?.confidence === "medium" ? 50 : 20, b: b.origin?.confidence === "high" ? 80 : b.origin?.confidence === "medium" ? 50 : 20 },
      { category: "Global reach (estimate)", a: a.geographic ? a.geographic.length * 25 : 30, b: b.geographic ? b.geographic.length * 25 : 30 },
    ];

    setResults(
      cats.map((c) => ({
        category: c.category,
        winner: c.a === c.b ? "Tie" : c.a > c.b ? a.name : b.name,
        a: Math.round(c.a),
        b: Math.round(c.b),
      }))
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-3xl mx-auto">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Home
      </button>

      <div className="flex items-center gap-3 mb-2">
        <Swords className="w-8 h-8 text-violet-500" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Name Battle</h1>
      </div>
      <p className="text-[var(--muted)] mb-8">
        Enter two names and see who wins across playful categories. Purely for entertainment.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <input
          value={nameA}
          onChange={(e) => setNameA(e.target.value)}
          placeholder="Name A"
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-violet-500"
        />
        <input
          value={nameB}
          onChange={(e) => setNameB(e.target.value)}
          placeholder="Name B"
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] outline-none focus:border-violet-500"
        />
      </div>

      <button
        onClick={battle}
        disabled={loading || !nameA.trim() || !nameB.trim()}
        className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 disabled:opacity-40 transition-colors"
      >
        {loading ? "Battling..." : "Start Battle ⚔️"}
      </button>

      {results && reports && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 space-y-4">
          {results.map((r) => (
            <div
              key={r.category}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm text-[var(--muted)]">{r.category}</p>
                <p className="font-medium">
                  {r.winner === "Tie" ? "It's a tie!" : `${r.winner} wins`}
                </p>
              </div>
              <div className="text-right text-sm tabular-nums">
                <span className={r.winner === reports[0].name ? "text-violet-500 font-bold" : ""}>
                  {r.a}
                </span>
                {" vs "}
                <span className={r.winner === reports[1].name ? "text-violet-500 font-bold" : ""}>
                  {r.b}
                </span>
              </div>
            </div>
          ))}
          <p className="text-xs text-[var(--muted)] pt-4">
            These categories are playful and not objective scientific measurements.
          </p>
        </motion.div>
      )}
    </div>
  );
}
