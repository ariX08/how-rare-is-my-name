"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2, Download, Copy, Check, Moon, Sun } from "lucide-react";
import { nameDataProvider } from "@/lib/name-data/sample-provider";
import type { NameReport } from "@/lib/name-data/types";
import { RarityScore } from "@/components/RarityScore";
import { PopularityChart } from "@/components/PopularityChart";
import { NameOrigin } from "@/components/NameOrigin";
import { NameVibe } from "@/components/NameVibe";
import { ShareCard } from "@/components/ShareCard";
import { NameSearch } from "@/components/NameSearch";
import { useTheme } from "@/components/ThemeProvider";
import { slugify } from "@/lib/utils";

const LOADING_MESSAGES = [
  "Checking name frequency...",
  "Looking through historical data...",
  "Finding variants...",
  "Mapping distribution...",
  "Building your report...",
];

export default function NameReportPage() {
  const params = useParams();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const rawSlug = decodeURIComponent((params.name as string) || "");
  const [report, setReport] = useState<NameReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const name = rawSlug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        const data = await nameDataProvider.getReport(name || rawSlug);
        if (!cancelled) {
          if (data) setReport(data);
          else setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [rawSlug]);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1200);
    return () => clearInterval(id);
  }, [loading]);

  const handleNewSearch = (name: string) => {
    router.push(`/name/${encodeURIComponent(slugify(name))}`);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          <h2 className="text-xl font-medium mb-2">Analyzing your name...</h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-[var(--muted)]"
            >
              {LOADING_MESSAGES[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-display font-bold mb-3">We couldn&apos;t find enough data</h2>
          <p className="text-[var(--muted)] mb-8">
            We don&apos;t have reliable statistics for this name yet. Try checking the spelling or exploring another name.
          </p>
          <NameSearch onSearch={handleNewSearch} size="compact" />
          <button
            onClick={() => router.push("/")}
            className="mt-6 text-sm text-violet-500 hover:underline"
          >
            ← Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 glass border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-violet-600 text-white hover:bg-violet-500 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--accent-soft)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-[var(--muted)] mb-2">Your Name Report</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-2">
            {report.name}
          </h1>
        </motion.div>

        <section className="mb-16">
          <RarityScore rarity={report.rarity} />
        </section>

        <section className="mb-16">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-4">How rare?</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-[var(--muted)] mb-2">
                <span>More common</span>
                <span>Rarer</span>
              </div>
              <div className="h-3 rounded-full bg-[var(--border)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${report.rarity.score}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-slate-400 via-violet-500 to-purple-600"
                />
              </div>
            </div>
            <p className="text-[var(--muted)] leading-relaxed">
              {report.rarity.confidence === "estimate" ? (
                <>Your name appears relatively {report.rarity.label.toLowerCase()} based on available signals. This is an estimate — we don&apos;t have a complete census count for every name worldwide.</>
              ) : (
                <>Your name is <strong className="text-[var(--foreground)]">{report.rarity.label.toLowerCase()}</strong> in the {report.rarity.source.geographicScope} dataset ({report.rarity.source.timePeriod}). Rarer than roughly {report.rarity.percentile}% of names in that collection.</>
              )}
            </p>
            {report.rarity.estimatedCount && (
              <p className="mt-3 text-sm text-[var(--muted)]">
                Estimated people with this name (scope: {report.rarity.source.geographicScope}): ~{report.rarity.estimatedCount.toLocaleString()}
              </p>
            )}
            <p className="mt-4 text-xs text-[var(--muted)]">
              Source: {report.rarity.source.name} · Confidence: {report.rarity.confidence}
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-display font-semibold mb-6">Your name through time</h2>
          {report.popularityOverTime ? (
            <>
              <PopularityChart data={report.popularityOverTime} peakYear={report.peakYear} />
              {report.peakYear && (
                <p className="mt-4 text-sm text-[var(--muted)] text-center">
                  Peak popularity around {report.peakYear}
                  {report.rarity.confidence === "estimate" && " (illustrative trend based on available patterns)"}
                </p>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--muted)]">
              We don&apos;t have enough reliable historical popularity data for this name yet.
            </div>
          )}
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-display font-semibold mb-6">Where is your name found?</h2>
          {report.geographic && report.geographic.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {report.geographic.map((g) => (
                <div
                  key={`${g.country}-${g.region}`}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{g.region}</p>
                      <p className="text-sm text-[var(--muted)]">{g.country}</p>
                    </div>
                    <span className="text-sm font-medium text-violet-500">{g.relativeFrequency}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-violet-500"
                      style={{ width: `${g.relativeFrequency}%` }}
                    />
                  </div>
                  {g.note && <p className="mt-2 text-xs text-[var(--muted)]">{g.note}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--muted)]">
              We don&apos;t have enough reliable geographic data for this name yet.
            </div>
          )}
        </section>

        <section className="mb-16">
          <NameOrigin origin={report.origin} variants={report.variants} />
        </section>

        {(report.famousPeople.length > 0 || report.fictional.length > 0) && (
          <section className="mb-16 grid gap-8 md:grid-cols-2">
            {report.famousPeople.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold mb-4">People who share your name</h2>
                <div className="space-y-3">
                  {report.famousPeople.map((p) => (
                    <div key={p.name} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-violet-500">{p.profession} · {p.country}</p>
                      <p className="text-sm text-[var(--muted)] mt-1">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {report.fictional.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-semibold mb-4">Your name exists in fiction too</h2>
                <div className="space-y-3">
                  {report.fictional.map((f) => (
                    <div key={f.name + f.media} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
                      <p className="font-medium">{f.name}</p>
                      <p className="text-sm text-violet-500">{f.media} · {f.type}</p>
                      <p className="text-sm text-[var(--muted)] mt-1">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <section className="mb-16">
          <NameVibe vibe={report.vibe} energy={report.energy} ifYourNameWere={report.ifYourNameWere} />
        </section>

        <section className="mb-16">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold mb-3">How we calculate this</h2>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {report.dataNotes.map((note, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-violet-500">·</span>
                  <span>{note}</span>
                </li>
              ))}
              <li className="flex gap-2">
                <span className="text-violet-500">·</span>
                <span>
                  Primary statistical sources include public datasets such as the US SSA baby name data where applicable. Geographic and etymology data draw from public knowledge bases. Entertainment sections are generated and labeled as such.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="text-center border-t border-[var(--border)] pt-12">
          <h2 className="text-xl font-display font-semibold mb-2">Curious about another name?</h2>
          <p className="text-[var(--muted)] mb-6">Search again or share this result with friends.</p>
          <NameSearch onSearch={handleNewSearch} size="compact" placeholder="Enter another name..." />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setShowShare(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--accent-soft)] transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" /> Share result
            </button>
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--accent-soft)] transition-colors text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showShare && (
          <ShareCard
            report={report}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
