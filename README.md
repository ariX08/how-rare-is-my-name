# How Rare Is My Name?

A polished, production-quality web experience for discovering the rarity, origin, popularity, and story behind any name.

## Features

- **Name Report**: Rarity score with animated visualization, plain-English explanation, data confidence labels
- **Popularity over time**: Interactive chart (when data available)
- **Geographic distribution**: Regional signals when supported
- **Origin & meaning**: Etymology with confidence levels
- **Variants**: Related spellings
- **Famous & fictional associations**: Public figures and characters
- **Entertainment sections**: Name vibe meters, energy tags, "If your name were..."
- **Shareable result card**: Beautiful card for social sharing + copy link
- **Compare Names** & **Name Battle** modes
- Dark / Light mode
- Fully responsive
- Accessibility considerations (semantic HTML, focus states, reduced motion)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data Architecture

All name statistics flow through a `NameDataProvider` abstraction (`src/lib/name-data/`).

The included `SampleNameDataProvider` ships with:

- Curated high-quality data for example names (Emma, Aritra, Arjun, Luna, Alexander)
- Transparent heuristic estimates for other names (clearly labeled as estimates)
- Entertainment-only sections always labeled as such

**Never invent real-world statistics.** When data is missing the UI says so.

To connect real datasets later, implement the `NameDataProvider` interface and swap the provider.

## Project Structure

```
src/
  app/
    page.tsx              # Landing
    name/[name]/page.tsx  # Individual name report
    compare/page.tsx      # Side-by-side comparison
    battle/page.tsx       # Fun name battle
  components/
    NameSearch.tsx
    RarityScore.tsx
    PopularityChart.tsx
    NameOrigin.tsx
    NameVibe.tsx
    ShareCard.tsx
    ThemeProvider.tsx
  lib/
    name-data/
      types.ts
      sample-provider.ts
    utils.ts
```

## Design Principles

- Real data looks authoritative; fun sections feel playful and are clearly labeled
- No fake precision
- Premium typography, subtle motion, excellent mobile experience
- Shareable results that people actually want to send to friends

## Privacy

No authentication required. Searched names are not treated as personal data about the searcher. No unnecessary storage of searches.
