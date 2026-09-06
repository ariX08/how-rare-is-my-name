export type DataConfidence = "high" | "medium" | "low" | "estimate" | "unavailable";

export interface DataSource {
  name: string;
  description: string;
  geographicScope: string;
  timePeriod: string;
  url?: string;
}

export interface RarityInfo {
  score: number; // 0-100, higher = rarer
  label: "Extremely Rare" | "Very Rare" | "Rare" | "Uncommon" | "Common" | "Very Common";
  percentile: number; // rarer than X% of names
  confidence: DataConfidence;
  source: DataSource;
  estimatedCount?: number;
  frequencyPerMillion?: number;
}

export interface PopularityPoint {
  year: number;
  rank?: number;
  count?: number;
  score: number; // normalized 0-100 popularity
}

export interface GeographicInfo {
  region: string;
  country: string;
  relativeFrequency: number; // 0-100
  note?: string;
}

export interface OriginInfo {
  origin: string;
  language: string;
  meaning: string;
  historicalUsage?: string;
  variants: string[];
  confidence: DataConfidence;
  source: DataSource;
}

export interface FamousPerson {
  name: string;
  profession: string;
  country: string;
  description: string;
  knownFor?: string;
}

export interface FictionalCharacter {
  name: string;
  media: string;
  type: "movie" | "tv" | "book" | "game" | "anime" | "comics" | "other";
  description: string;
}

export interface NameReport {
  name: string;
  normalizedName: string;
  rarity: RarityInfo;
  popularityOverTime: PopularityPoint[] | null;
  peakYear?: number;
  geographic: GeographicInfo[] | null;
  origin: OriginInfo | null;
  variants: { name: string; similarity: number; popularityHint?: string }[];
  famousPeople: FamousPerson[];
  fictional: FictionalCharacter[];
  // Entertainment only
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
  dataNotes: string[];
}

export interface NameDataProvider {
  getReport(name: string): Promise<NameReport | null>;
  searchSuggestions(query: string): Promise<string[]>;
}
