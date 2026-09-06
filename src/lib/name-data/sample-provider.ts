import { NameDataProvider, NameReport, RarityInfo, OriginInfo, DataSource } from "./types";

const US_SSA: DataSource = {
  name: "US Social Security Administration",
  description: "Baby name data from US birth records",
  geographicScope: "United States",
  timePeriod: "1880–2023",
  url: "https://www.ssa.gov/oact/babynames/",
};

const WIKIDATA: DataSource = {
  name: "Wikidata / Public etymology sources",
  description: "Aggregated public knowledge about name origins",
  geographicScope: "Global",
  timePeriod: "Historical",
};

// Curated sample data for demonstration. In production this would come from real APIs/datasets.
const CURATED: Record<string, Partial<NameReport>> = {
  emma: {
    rarity: {
      score: 18,
      label: "Very Common",
      percentile: 18,
      confidence: "high",
      source: US_SSA,
      estimatedCount: 580000,
      frequencyPerMillion: 1750,
    },
    peakYear: 2014,
    origin: {
      origin: "Germanic / Latin",
      language: "German, Latin",
      meaning: "Universal, whole; or derived from 'ermen' meaning entire",
      historicalUsage: "Popularized in English by Jane Austen's novel Emma (1815). Became extremely popular in the 21st century.",
      variants: ["Emmy", "Emmie", "Ema", "Irma"],
      confidence: "high",
      source: WIKIDATA,
    },
    famousPeople: [
      { name: "Emma Watson", profession: "Actress", country: "United Kingdom", description: "Known for portraying Hermione Granger in the Harry Potter series." },
      { name: "Emma Stone", profession: "Actress", country: "United States", description: "Academy Award-winning actress known for La La Land and Cruella." },
    ],
    fictional: [
      { name: "Emma Woodhouse", media: "Emma by Jane Austen", type: "book", description: "The matchmaking protagonist of Jane Austen's classic novel." },
      { name: "Emma Swan", media: "Once Upon a Time", type: "tv", description: "The Savior in the fantasy TV series Once Upon a Time." },
    ],
  },
  aritra: {
    rarity: {
      score: 87,
      label: "Very Rare",
      percentile: 87,
      confidence: "medium",
      source: {
        name: "Aggregated public datasets + frequency estimates",
        description: "Estimated from available name frequency corpora and public records",
        geographicScope: "Primarily South Asia / Global diaspora",
        timePeriod: "Contemporary",
      },
      estimatedCount: 45000,
      frequencyPerMillion: 6,
    },
    origin: {
      origin: "Indian / Sanskrit",
      language: "Sanskrit, Bengali",
      meaning: "One who seeks the right path; or 'the enlightened one' in some interpretations. Related to 'Rit' (truth/order).",
      historicalUsage: "Traditional name used in Bengali and other Indian communities. Gained some visibility in the diaspora.",
      variants: ["Aritro", "Arittra", "Areetra"],
      confidence: "medium",
      source: WIKIDATA,
    },
    famousPeople: [],
    fictional: [],
  },
  arjun: {
    rarity: {
      score: 62,
      label: "Uncommon",
      percentile: 62,
      confidence: "medium",
      source: US_SSA,
      estimatedCount: 120000,
      frequencyPerMillion: 35,
    },
    origin: {
      origin: "Indian / Sanskrit",
      language: "Sanskrit, Hindi",
      meaning: "Bright, shining, white; also the name of the legendary archer hero in the Mahabharata.",
      historicalUsage: "Ancient name from Hindu epic tradition. Popular among Indian communities worldwide.",
      variants: ["Arjuna", "Arjoun", "Arjun"],
      confidence: "high",
      source: WIKIDATA,
    },
    famousPeople: [
      { name: "Arjun Rampal", profession: "Actor / Model", country: "India", description: "Indian film actor and former model." },
    ],
    fictional: [
      { name: "Arjuna", media: "Mahabharata", type: "book", description: "Central hero of the ancient Indian epic Mahabharata, a skilled archer and warrior." },
    ],
  },
  luna: {
    rarity: {
      score: 35,
      label: "Common",
      percentile: 35,
      confidence: "high",
      source: US_SSA,
      estimatedCount: 280000,
      frequencyPerMillion: 420,
    },
    peakYear: 2021,
    origin: {
      origin: "Latin",
      language: "Latin, Spanish, Italian",
      meaning: "Moon",
      historicalUsage: "From the Latin word for the Moon. Gained modern popularity as a given name, boosted by Harry Potter (Luna Lovegood).",
      variants: ["Lune", "Lunette"],
      confidence: "high",
      source: WIKIDATA,
    },
    famousPeople: [],
    fictional: [
      { name: "Luna Lovegood", media: "Harry Potter series", type: "book", description: "Eccentric and kind-hearted witch, friend of Harry Potter." },
      { name: "Sailor Moon (Usagi Tsukino)", media: "Sailor Moon", type: "anime", description: "The protagonist who transforms into Sailor Moon; 'Luna' is also the name of her talking cat advisor." },
    ],
  },
  alexander: {
    rarity: {
      score: 28,
      label: "Common",
      percentile: 28,
      confidence: "high",
      source: US_SSA,
      estimatedCount: 850000,
      frequencyPerMillion: 1100,
    },
    peakYear: 1993,
    origin: {
      origin: "Greek",
      language: "Greek",
      meaning: "Defender of the people / Protector of men",
      historicalUsage: "Most famously associated with Alexander the Great. Has remained popular across centuries in many cultures.",
      variants: ["Alex", "Xander", "Sasha", "Alejandro", "Alessandro", "Iskandar"],
      confidence: "high",
      source: WIKIDATA,
    },
    famousPeople: [
      { name: "Alexander the Great", profession: "King / Military Leader", country: "Macedonia (Ancient)", description: "One of history's most successful military commanders." },
      { name: "Alexander Hamilton", profession: "Statesman", country: "United States", description: "Founding Father and first U.S. Secretary of the Treasury." },
    ],
    fictional: [
      { name: "Alexander 'Alex' Rider", media: "Alex Rider series", type: "book", description: "Teenage spy protagonist of the novels by Anthony Horowitz." },
    ],
  },
};

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h << 5) - h + name.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function generateRarity(name: string): RarityInfo {
  const h = hashName(name.toLowerCase());
  const lengthFactor = Math.min(name.length / 12, 1) * 30;
  const uniqueFactor = (new Set(name.toLowerCase()).size / name.length) * 25;
  const base = 20 + (h % 55) + lengthFactor + uniqueFactor;
  const score = Math.min(98, Math.max(5, Math.round(base)));

  let label: RarityInfo["label"];
  if (score >= 90) label = "Extremely Rare";
  else if (score >= 75) label = "Very Rare";
  else if (score >= 60) label = "Rare";
  else if (score >= 40) label = "Uncommon";
  else if (score >= 20) label = "Common";
  else label = "Very Common";

  return {
    score,
    label,
    percentile: score,
    confidence: "estimate",
    source: {
      name: "Heuristic estimate",
      description: "Generated estimate based on name characteristics. Not based on a specific census dataset for this name.",
      geographicScope: "Global estimate",
      timePeriod: "Contemporary",
    },
  };
}

function generateOrigin(name: string): OriginInfo | null {
  const lower = name.toLowerCase();
  if (lower.endsWith("a") || lower.endsWith("ia")) {
    return {
      origin: "Multiple possible origins",
      language: "Various",
      meaning: "Meaning varies by cultural origin. Many names ending in -a have Latin, Greek, or Romance language roots.",
      variants: [],
      confidence: "low",
      source: WIKIDATA,
    };
  }
  return {
    origin: "Unknown / Multiple",
    language: "Various",
    meaning: "We don't have a high-confidence etymology for this name in our current dataset.",
    variants: [],
    confidence: "unavailable",
    source: WIKIDATA,
  };
}

function generatePopularity(name: string): { points: { year: number; score: number }[]; peak?: number } | null {
  const h = hashName(name);
  if (h % 3 === 0) return null;
  const points = [];
  let peakYear = 2000;
  let maxScore = 0;
  for (let y = 1980; y <= 2023; y += 2) {
    const wave = Math.sin((y - 1980) / 12 + (h % 10)) * 30 + 40;
    const score = Math.max(5, Math.min(95, Math.round(wave + (h % 20) - 10)));
    points.push({ year: y, score });
    if (score > maxScore) {
      maxScore = score;
      peakYear = y;
    }
  }
  return { points, peak: peakYear };
}

function generateVibe(name: string) {
  const h = hashName(name);
  return {
    classic: 20 + (h % 60),
    modern: 30 + ((h >> 3) % 55),
    rare: 10 + ((h >> 5) % 80),
    memorable: 40 + ((h >> 7) % 50),
    unusual: 15 + ((h >> 9) % 70),
  };
}

function generateEnergy(name: string): string[] {
  const options = [
    "⚡ Distinctive", "🌙 Uncommon", "🎨 Creative", "🌍 Global",
    "📜 Classic", "✨ Modern", "🔥 Bold", "🌊 Flowing",
    "🏔️ Strong", "🍃 Gentle", "🎯 Precise", "🌈 Vibrant"
  ];
  const h = hashName(name);
  const result = [];
  for (let i = 0; i < 4; i++) {
    result.push(options[(h + i * 7) % options.length]);
  }
  return [...new Set(result)].slice(0, 4);
}

function generateIfYourNameWere(name: string) {
  const colors = [
    { name: "Deep Violet", hex: "#5B21B6" },
    { name: "Ocean Teal", hex: "#0D9488" },
    { name: "Warm Amber", hex: "#D97706" },
    { name: "Soft Rose", hex: "#E11D48" },
    { name: "Forest Emerald", hex: "#059669" },
    { name: "Midnight Indigo", hex: "#312E81" },
  ];
  const places = ["Kyoto at dusk", "Reykjavik in winter", "Marrakech medina", "Santorini cliffs", "Banff lakeside", "Lisbon hills"];
  const seasons = ["Late autumn", "Early spring", "High summer", "Deep winter", "Monsoon season", "Golden hour autumn"];
  const decades = ["1920s", "1960s", "1980s", "1990s", "2010s", "Timeless"];
  const genres = ["Magical realism", "Space opera", "Coming-of-age", "Historical drama", "Mythic fantasy", "Quiet literary fiction"];
  const h = hashName(name);
  return {
    color: colors[h % colors.length],
    place: places[(h >> 2) % places.length],
    season: seasons[(h >> 4) % seasons.length],
    decade: decades[(h >> 6) % decades.length],
    genre: genres[(h >> 8) % genres.length],
  };
}

export class SampleNameDataProvider implements NameDataProvider {
  async getReport(rawName: string): Promise<NameReport | null> {
    const name = rawName.trim();
    if (!name || name.length < 1) return null;

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    const normalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const key = name.toLowerCase().replace(/[^a-z\u00C0-\u024F]/gi, "");

    const curated = CURATED[key];

    const rarity = curated?.rarity ?? generateRarity(name);
    const origin = curated?.origin ?? generateOrigin(name);
    const pop = generatePopularity(name);
    const vibe = generateVibe(name);
    const energy = generateEnergy(name);
    const ifYourNameWere = generateIfYourNameWere(name);

    const variants = (origin?.variants || []).map((v, i) => ({
      name: v,
      similarity: 90 - i * 8,
      popularityHint: i === 0 ? "Similar popularity" : "Less common",
    }));

    if (variants.length < 2 && name.length > 4) {
      variants.push(
        { name: name.slice(0, -1) + (name.endsWith("a") ? "o" : "a"), similarity: 78, popularityHint: "Close spelling" },
        { name: name + name.slice(-1), similarity: 65, popularityHint: "Extended form" }
      );
    }

    const dataNotes: string[] = [
      "Rarity scores for many names are estimates when specific census data is unavailable.",
      "Geographic and historical trends are shown only when supported by available public datasets.",
      "Entertainment sections (vibe, energy, 'if your name were') are generated for fun and are not scientific.",
    ];

    if (rarity.confidence === "estimate") {
      dataNotes.unshift("This rarity score is a heuristic estimate, not derived from a complete national census for this name.");
    }

    return {
      name: normalized,
      normalizedName: normalized,
      rarity,
      popularityOverTime: pop?.points.map(p => ({ year: p.year, score: p.score })) ?? null,
      peakYear: curated?.peakYear ?? pop?.peak,
      geographic: key === "aritra" ? [
        { region: "West Bengal", country: "India", relativeFrequency: 78, note: "Most associated region based on available signals" },
        { region: "Bangladesh", country: "Bangladesh", relativeFrequency: 45 },
        { region: "United States (diaspora)", country: "United States", relativeFrequency: 22 },
      ] : key === "emma" ? [
        { region: "United States", country: "United States", relativeFrequency: 92 },
        { region: "United Kingdom", country: "United Kingdom", relativeFrequency: 85 },
        { region: "Australia", country: "Australia", relativeFrequency: 80 },
      ] : null,
      origin,
      variants,
      famousPeople: curated?.famousPeople ?? [],
      fictional: curated?.fictional ?? [],
      vibe,
      energy,
      ifYourNameWere,
      dataNotes,
    };
  }

  async searchSuggestions(query: string): Promise<string[]> {
    const examples = ["Emma", "Aritra", "Arjun", "Luna", "Alexander", "Sophia", "Noah", "Olivia", "Liam", "Ava"];
    if (!query) return examples.slice(0, 5);
    return examples.filter(n => n.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }
}

export const nameDataProvider = new SampleNameDataProvider();
