"use client";

import type { OriginInfo } from "@/lib/name-data/types";

interface NameOriginProps {
  origin: OriginInfo | null;
  variants: { name: string; similarity: number; popularityHint?: string }[];
}

export function NameOrigin({ origin, variants }: NameOriginProps) {
  if (!origin) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--muted)]">
        Origin information is not available for this name in our current dataset.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">The story behind your name</h2>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <div className="grid sm:grid-cols-2 gap-px bg-[var(--border)]">
          <div className="bg-[var(--card)] p-6">
            <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">Origin</p>
            <p className="text-lg font-medium">{origin.origin}</p>
          </div>
          <div className="bg-[var(--card)] p-6">
            <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">Language</p>
            <p className="text-lg font-medium">{origin.language}</p>
          </div>
        </div>
        <div className="p-6 border-t border-[var(--border)]">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">Meaning</p>
          <p className="leading-relaxed">{origin.meaning}</p>
          {origin.historicalUsage && (
            <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
              {origin.historicalUsage}
            </p>
          )}
          <p className="mt-4 text-xs text-[var(--muted)]">
            Confidence: {origin.confidence} · Source: {origin.source.name}
          </p>
        </div>
        {variants.length > 0 && (
          <div className="p-6 border-t border-[var(--border)]">
            <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-3">Variants & related spellings</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <span
                  key={v.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] text-sm"
                >
                  {v.name}
                  <span className="text-xs text-[var(--muted)]">{v.similarity}%</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
