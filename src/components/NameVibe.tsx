"use client";

import { motion } from "framer-motion";

interface NameVibeProps {
  vibe: {
    classic: number;
    modern: number;
    rare: number;
    memorable: number;
    unusual: number;
  };
  energy: string[];
  ifYourNameWere: {
    color: { name: string; hex: string };
    place: string;
    season: string;
    decade: string;
    genre: string;
  };
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm text-[var(--muted)] shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-[var(--border)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400"
        />
      </div>
      <span className="w-8 text-right text-xs tabular-nums text-[var(--muted)]">{value}</span>
    </div>
  );
}

export function NameVibe({ vibe, energy, ifYourNameWere }: NameVibeProps) {
  return (
    <div className="space-y-10">
      {/* Vibe meters */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-display font-semibold">Your name&apos;s vibe</h2>
          <span className="text-xs text-[var(--muted)]">For fun. This isn&apos;t a personality assessment.</span>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
          <Bar label="Classic" value={vibe.classic} />
          <Bar label="Modern" value={vibe.modern} />
          <Bar label="Rare" value={vibe.rare} />
          <Bar label="Memorable" value={vibe.memorable} />
          <Bar label="Unusual" value={vibe.unusual} />
        </div>
      </div>

      {/* Energy tags */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Your name energy</h3>
        <div className="flex flex-wrap gap-2">
          {energy.map((e) => (
            <span
              key={e}
              className="px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-sm font-medium"
            >
              {e}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">Entertainment descriptors only.</p>
      </div>

      {/* If your name were */}
      <div>
        <h3 className="text-lg font-semibold mb-4">If your name were...</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <p className="text-xs text-[var(--muted)] mb-2">A color</p>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border border-[var(--border)]"
                style={{ backgroundColor: ifYourNameWere.color.hex }}
              />
              <span className="font-medium text-sm">{ifYourNameWere.color.name}</span>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <p className="text-xs text-[var(--muted)] mb-2">A place</p>
            <p className="font-medium text-sm">{ifYourNameWere.place}</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <p className="text-xs text-[var(--muted)] mb-2">A season</p>
            <p className="font-medium text-sm">{ifYourNameWere.season}</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <p className="text-xs text-[var(--muted)] mb-2">A decade</p>
            <p className="font-medium text-sm">{ifYourNameWere.decade}</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 col-span-2 sm:col-span-1">
            <p className="text-xs text-[var(--muted)] mb-2">A fictional genre</p>
            <p className="font-medium text-sm">{ifYourNameWere.genre}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--muted)]">Purely for entertainment.</p>
      </div>
    </div>
  );
}
