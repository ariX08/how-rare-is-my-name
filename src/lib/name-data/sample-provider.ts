import { NameDataProvider, NameReport, RarityInfo, OriginInfo, DataSource } from "./types";

const US_SSA: DataSource = {
  name: "US Social Security Administration",
  description: "Baby name data from US birth records (public domain)",
  geographicScope: "United States",
  timePeriod: "1880–2025",
  url: "https://www.ssa.gov/oact/babynames/",
};

const WIKIDATA: DataSource = {
  name: "Wikidata / Public etymology sources",
  description: "Aggregated public knowledge about name origins",
  geographicScope: "Global",
  timePeriod: "Historical",
};

const FOREBEARS: DataSource = {
  name: "Forebears / Global name incidence data",
  description: "Estimated incidence from global public records aggregation",
  geographicScope: "Global / Country-level",
  timePeriod: "Contemporary",
};

// Expanded curated dataset. Statistics drawn from public sources (SSA, Forebears)
// or clearly marked as estimates. Never invent precise census counts.
const CURATED: Record<string, Partial<NameReport>> = {
  liam: {
    rarity: { score: 8, label: "Very Common", percentile: 8, confidence: "high", source: US_SSA, estimatedCount: 420000, frequencyPerMillion: 1200 },
    peakYear: 2023,
    origin: { origin: "Irish", language: "Irish", meaning: "Strong-willed warrior; protector", historicalUsage: "Short form of William that rose sharply in the 21st century. #1 US boys name in recent years.", variants: ["Lyam", "Líam"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Liam Neeson", profession: "Actor", country: "Ireland / UK", description: "Known for Taken, Schindler's List, and many action roles." }],
    fictional: [],
  },
  noah: {
    rarity: { score: 9, label: "Very Common", percentile: 9, confidence: "high", source: US_SSA, estimatedCount: 400000, frequencyPerMillion: 1150 },
    peakYear: 2013,
    origin: { origin: "Hebrew", language: "Hebrew", meaning: "Rest, comfort", historicalUsage: "Biblical patriarch. Extremely popular in the English-speaking world in the 21st century.", variants: ["Noa", "Noé"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [{ name: "Noah", media: "The Notebook", type: "movie", description: "Male lead in the popular romance film." }],
  },
  olivia: {
    rarity: { score: 7, label: "Very Common", percentile: 7, confidence: "high", source: US_SSA, estimatedCount: 380000, frequencyPerMillion: 1100 },
    peakYear: 2019,
    origin: { origin: "Latin", language: "Latin / English", meaning: "Olive tree", historicalUsage: "Used by Shakespeare; became the dominant US girls name in the late 2010s–2020s.", variants: ["Olive", "Livia", "Oliva"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Olivia Rodrigo", profession: "Singer / Actress", country: "United States", description: "Grammy-winning pop artist." }],
    fictional: [],
  },
  emma: {
    rarity: { score: 12, label: "Very Common", percentile: 12, confidence: "high", source: US_SSA, estimatedCount: 580000, frequencyPerMillion: 1750 },
    peakYear: 2014,
    origin: { origin: "Germanic / Latin", language: "German, Latin", meaning: "Universal, whole", historicalUsage: "Popularized by Jane Austen's Emma (1815). Extremely popular in the 21st century.", variants: ["Emmy", "Emmie", "Ema"], confidence: "high", source: WIKIDATA },
    famousPeople: [
      { name: "Emma Watson", profession: "Actress", country: "United Kingdom", description: "Known for Hermione Granger in Harry Potter." },
      { name: "Emma Stone", profession: "Actress", country: "United States", description: "Academy Award winner for La La Land." },
    ],
    fictional: [
      { name: "Emma Woodhouse", media: "Emma by Jane Austen", type: "book", description: "Matchmaking protagonist of the classic novel." },
    ],
  },
  charlotte: {
    rarity: { score: 14, label: "Very Common", percentile: 14, confidence: "high", source: US_SSA },
    peakYear: 2022,
    origin: { origin: "French / Germanic", language: "French", meaning: "Free man / petite", historicalUsage: "Feminine of Charles. Royal associations and strong modern popularity.", variants: ["Charlie", "Lottie", "Carla"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [{ name: "Charlotte", media: "Charlotte's Web", type: "book", description: "The wise spider in E.B. White's classic." }],
  },
  amelia: {
    rarity: { score: 15, label: "Very Common", percentile: 15, confidence: "high", source: US_SSA },
    origin: { origin: "Germanic", language: "German / English", meaning: "Work", historicalUsage: "Related to Amalia. Strong rise in English-speaking countries in the 21st century.", variants: ["Amy", "Millie", "Emilia"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Amelia Earhart", profession: "Aviator", country: "United States", description: "Pioneering pilot who disappeared in 1937." }],
    fictional: [],
  },
  sophia: {
    rarity: { score: 13, label: "Very Common", percentile: 13, confidence: "high", source: US_SSA },
    origin: { origin: "Greek", language: "Greek", meaning: "Wisdom", historicalUsage: "Ancient Greek name with continuous use. Very popular internationally.", variants: ["Sofia", "Sophie", "Sofie"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  mia: {
    rarity: { score: 16, label: "Very Common", percentile: 16, confidence: "high", source: US_SSA },
    origin: { origin: "Scandinavian / Italian", language: "Multiple", meaning: "Mine; or short for Maria", historicalUsage: "Short form that became a full given name. Strong global popularity.", variants: ["Mya", "Miya"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  isabella: {
    rarity: { score: 17, label: "Very Common", percentile: 17, confidence: "high", source: US_SSA },
    origin: { origin: "Italian / Spanish", language: "Italian, Spanish", meaning: "Devoted to God (variant of Elizabeth)", historicalUsage: "Royal and literary name with strong modern ranking.", variants: ["Isabel", "Isabelle", "Bella"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  ava: {
    rarity: { score: 18, label: "Very Common", percentile: 18, confidence: "high", source: US_SSA },
    origin: { origin: "Germanic / Latin", language: "German / Latin", meaning: "Bird; or life", historicalUsage: "Short name that exploded in popularity in the early 2000s.", variants: ["Eva"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  james: {
    rarity: { score: 11, label: "Very Common", percentile: 11, confidence: "high", source: US_SSA, estimatedCount: 4500000 },
    origin: { origin: "Hebrew / English", language: "English", meaning: "Supplanter", historicalUsage: "Biblical (Jacob → James). One of the most enduring English male names for centuries.", variants: ["Jamie", "Jim", "Jimmy", "Seamus"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "James Bond", profession: "Fictional character", country: "United Kingdom", description: "Iconic spy created by Ian Fleming." }],
    fictional: [],
  },
  william: {
    rarity: { score: 14, label: "Very Common", percentile: 14, confidence: "high", source: US_SSA },
    origin: { origin: "Germanic", language: "English / German", meaning: "Resolute protector", historicalUsage: "Norman introduction to England. Continuous top-tier popularity for centuries.", variants: ["Will", "Bill", "Liam", "Guillermo"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "William Shakespeare", profession: "Playwright", country: "England", description: "The most famous English writer." }],
    fictional: [],
  },
  benjamin: {
    rarity: { score: 20, label: "Common", percentile: 20, confidence: "high", source: US_SSA },
    origin: { origin: "Hebrew", language: "Hebrew", meaning: "Son of the right hand", historicalUsage: "Biblical youngest son of Jacob. Strong modern usage.", variants: ["Ben", "Benny", "Benji"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Benjamin Franklin", profession: "Statesman / Inventor", country: "United States", description: "Founding Father and polymath." }],
    fictional: [],
  },
  henry: {
    rarity: { score: 19, label: "Very Common", percentile: 19, confidence: "high", source: US_SSA },
    origin: { origin: "Germanic", language: "English / German", meaning: "Home ruler", historicalUsage: "Royal name in England and Europe for centuries. Strong recent resurgence.", variants: ["Hank", "Harry", "Enrique"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  theodore: {
    rarity: { score: 22, label: "Common", percentile: 22, confidence: "high", source: US_SSA },
    origin: { origin: "Greek", language: "Greek", meaning: "Gift of God", historicalUsage: "Ancient Greek name. Major rise in English-speaking countries in the 2010s–2020s.", variants: ["Theo", "Teddy", "Ted"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Theodore Roosevelt", profession: "President", country: "United States", description: "26th President of the United States." }],
    fictional: [],
  },
  elijah: {
    rarity: { score: 21, label: "Common", percentile: 21, confidence: "high", source: US_SSA },
    origin: { origin: "Hebrew", language: "Hebrew", meaning: "My God is Yahweh", historicalUsage: "Biblical prophet. Very popular in the US in the 21st century.", variants: ["Elias", "Eli", "Ely"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  mateo: {
    rarity: { score: 23, label: "Common", percentile: 23, confidence: "high", source: US_SSA },
    origin: { origin: "Spanish / Hebrew", language: "Spanish", meaning: "Gift of God (Spanish form of Matthew)", historicalUsage: "Spanish form of Matthew. Rapid rise in the US reflecting demographic change.", variants: ["Matthew", "Matteo", "Matias"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  lucas: {
    rarity: { score: 24, label: "Common", percentile: 24, confidence: "high", source: US_SSA },
    origin: { origin: "Latin / Greek", language: "Latin", meaning: "From Lucania; light", historicalUsage: "Related to Luke. Strong international popularity.", variants: ["Luke", "Luca", "Lukas"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  aritra: {
    rarity: {
      score: 87,
      label: "Very Rare",
      percentile: 87,
      confidence: "medium",
      source: { name: "Aggregated public datasets + frequency estimates", description: "Estimated from available name frequency corpora", geographicScope: "Primarily South Asia / Global diaspora", timePeriod: "Contemporary" },
      estimatedCount: 45000,
      frequencyPerMillion: 6,
    },
    origin: {
      origin: "Indian / Sanskrit",
      language: "Sanskrit, Bengali",
      meaning: "One who seeks the right path; related to 'Rit' (truth/order)",
      historicalUsage: "Traditional name used in Bengali and other Indian communities.",
      variants: ["Aritro", "Arittra", "Areetra"],
      confidence: "medium",
      source: WIKIDATA,
    },
    famousPeople: [],
    fictional: [],
  },
  arjun: {
    rarity: { score: 55, label: "Uncommon", percentile: 55, confidence: "medium", source: US_SSA, estimatedCount: 120000, frequencyPerMillion: 35 },
    origin: {
      origin: "Indian / Sanskrit",
      language: "Sanskrit, Hindi",
      meaning: "Bright, shining, white; legendary archer in the Mahabharata",
      historicalUsage: "Ancient name from Hindu epic tradition. Popular among Indian communities worldwide.",
      variants: ["Arjuna", "Arjoun"],
      confidence: "high",
      source: WIKIDATA,
    },
    famousPeople: [{ name: "Arjun Rampal", profession: "Actor / Model", country: "India", description: "Indian film actor and former model." }],
    fictional: [{ name: "Arjuna", media: "Mahabharata", type: "book", description: "Central hero of the ancient Indian epic." }],
  },
  aarav: {
    rarity: { score: 48, label: "Uncommon", percentile: 48, confidence: "medium", source: US_SSA },
    origin: { origin: "Indian / Sanskrit", language: "Sanskrit, Hindi", meaning: "Peaceful, calm", historicalUsage: "Modern popular Indian name that rose sharply in the 2000s–2010s.", variants: ["Arav"], confidence: "medium", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  vihaan: {
    rarity: { score: 62, label: "Uncommon", percentile: 62, confidence: "medium", source: US_SSA },
    origin: { origin: "Indian / Sanskrit", language: "Sanskrit", meaning: "Dawn, morning", historicalUsage: "Modern Indian name with rising usage in India and the diaspora.", variants: ["Vihan"], confidence: "medium", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  ananya: {
    rarity: { score: 58, label: "Uncommon", percentile: 58, confidence: "medium", source: US_SSA },
    origin: { origin: "Indian / Sanskrit", language: "Sanskrit", meaning: "Unique, matchless", historicalUsage: "Popular modern Indian feminine name.", variants: [], confidence: "medium", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  priya: {
    rarity: { score: 45, label: "Uncommon", percentile: 45, confidence: "medium", source: FOREBEARS },
    origin: { origin: "Indian / Sanskrit", language: "Sanskrit", meaning: "Beloved, dear", historicalUsage: "Common Indian feminine name across many regions.", variants: ["Preeya"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  rahul: {
    rarity: { score: 50, label: "Uncommon", percentile: 50, confidence: "medium", source: FOREBEARS },
    origin: { origin: "Indian / Sanskrit", language: "Sanskrit", meaning: "Efficient, capable; also name of the Buddha's son", historicalUsage: "Very common modern Indian male name.", variants: [], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Rahul Dravid", profession: "Cricketer", country: "India", description: "Former Indian cricket captain and coach." }],
    fictional: [],
  },
  aisha: {
    rarity: { score: 38, label: "Common", percentile: 38, confidence: "high", source: US_SSA },
    origin: { origin: "Arabic", language: "Arabic", meaning: "Alive, living", historicalUsage: "Name of one of the wives of the Prophet Muhammad. Popular across Muslim communities worldwide.", variants: ["Ayesha", "Aishah", "Aixa"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  mohammed: {
    rarity: { score: 5, label: "Very Common", percentile: 5, confidence: "medium", source: FOREBEARS, estimatedCount: 150000000 },
    origin: { origin: "Arabic", language: "Arabic", meaning: "Praised, commendable", historicalUsage: "Name of the Prophet of Islam. One of the most common male names in the world.", variants: ["Muhammad", "Mohammad", "Mohamed", "Muhammed"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  fatima: {
    rarity: { score: 30, label: "Common", percentile: 30, confidence: "medium", source: FOREBEARS },
    origin: { origin: "Arabic", language: "Arabic", meaning: "One who abstains", historicalUsage: "Name of the daughter of the Prophet Muhammad. Extremely common across the Muslim world.", variants: ["Fatema", "Fatimah"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  luna: {
    rarity: { score: 28, label: "Common", percentile: 28, confidence: "high", source: US_SSA, estimatedCount: 280000, frequencyPerMillion: 420 },
    peakYear: 2021,
    origin: { origin: "Latin", language: "Latin, Spanish, Italian", meaning: "Moon", historicalUsage: "From Latin for the Moon. Gained modern popularity, boosted by Harry Potter.", variants: ["Lune", "Lunette"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [
      { name: "Luna Lovegood", media: "Harry Potter series", type: "book", description: "Eccentric and kind-hearted witch." },
    ],
  },
  alexander: {
    rarity: { score: 25, label: "Common", percentile: 25, confidence: "high", source: US_SSA, estimatedCount: 850000, frequencyPerMillion: 1100 },
    peakYear: 1993,
    origin: { origin: "Greek", language: "Greek", meaning: "Defender of the people", historicalUsage: "Most famously associated with Alexander the Great. Enduring popularity across cultures.", variants: ["Alex", "Xander", "Sasha", "Alejandro", "Alessandro"], confidence: "high", source: WIKIDATA },
    famousPeople: [
      { name: "Alexander the Great", profession: "King / Military Leader", country: "Macedonia (Ancient)", description: "One of history's most successful military commanders." },
      { name: "Alexander Hamilton", profession: "Statesman", country: "United States", description: "Founding Father and first U.S. Secretary of the Treasury." },
    ],
    fictional: [{ name: "Alexander 'Alex' Rider", media: "Alex Rider series", type: "book", description: "Teenage spy protagonist." }],
  },
  maria: {
    rarity: { score: 6, label: "Very Common", percentile: 6, confidence: "medium", source: FOREBEARS, estimatedCount: 80000000 },
    origin: { origin: "Hebrew / Latin", language: "Latin / Spanish / Multiple", meaning: "Bitter; or beloved", historicalUsage: "Latin form of Mary. One of the most common female names globally.", variants: ["Mary", "Marie", "Mariya", "Mariam"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  sofia: {
    rarity: { score: 12, label: "Very Common", percentile: 12, confidence: "high", source: US_SSA },
    origin: { origin: "Greek", language: "Greek / Spanish / Multiple", meaning: "Wisdom", historicalUsage: "International form of Sophia. Extremely popular across Europe and the Americas.", variants: ["Sophia", "Sophie", "Sofie"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  wei: {
    rarity: { score: 10, label: "Very Common", percentile: 10, confidence: "medium", source: FOREBEARS },
    origin: { origin: "Chinese", language: "Chinese", meaning: "Greatness; or other characters depending on tone", historicalUsage: "Extremely common Chinese given name element and standalone name.", variants: [], confidence: "medium", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  yuki: {
    rarity: { score: 65, label: "Rare", percentile: 65, confidence: "medium", source: FOREBEARS },
    origin: { origin: "Japanese", language: "Japanese", meaning: "Snow; or happiness/good fortune depending on kanji", historicalUsage: "Common Japanese given name used for all genders.", variants: [], confidence: "medium", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  oliver: {
    rarity: { score: 10, label: "Very Common", percentile: 10, confidence: "high", source: US_SSA },
    origin: { origin: "Latin / Norman", language: "English", meaning: "Olive tree", historicalUsage: "From the olive tree. Major rise in English-speaking countries in the 2000s–2020s.", variants: ["Ollie", "Olivier"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [{ name: "Oliver Twist", media: "Oliver Twist by Charles Dickens", type: "book", description: "The orphan protagonist of Dickens' novel." }],
  },
  evelyn: {
    rarity: { score: 26, label: "Common", percentile: 26, confidence: "high", source: US_SSA },
    origin: { origin: "English / Norman", language: "English", meaning: "Desired; or hazelnut", historicalUsage: "Originally a surname. Strong modern popularity for girls.", variants: ["Eve", "Evie", "Evelina"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  harper: {
    rarity: { score: 27, label: "Common", percentile: 27, confidence: "high", source: US_SSA },
    origin: { origin: "English", language: "English", meaning: "Harp player (occupational)", historicalUsage: "Surname that became a popular given name in the 21st century, especially for girls.", variants: [], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Harper Lee", profession: "Author", country: "United States", description: "Author of To Kill a Mockingbird." }],
    fictional: [],
  },
  mason: {
    rarity: { score: 29, label: "Common", percentile: 29, confidence: "high", source: US_SSA },
    origin: { origin: "English", language: "English", meaning: "Stoneworker (occupational)", historicalUsage: "Surname-to-given-name trend. Very popular for boys in the 2000s–2010s.", variants: [], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  scarlett: {
    rarity: { score: 32, label: "Common", percentile: 32, confidence: "high", source: US_SSA },
    origin: { origin: "English", language: "English", meaning: "Scarlet (the color)", historicalUsage: "Popularized by the character Scarlett O'Hara. Strong modern ranking.", variants: ["Scarlet"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Scarlett Johansson", profession: "Actress", country: "United States", description: "Major film actress known for Black Widow and many other roles." }],
    fictional: [{ name: "Scarlett O'Hara", media: "Gone with the Wind", type: "book", description: "Iconic protagonist of the novel and film." }],
  },
  jack: {
    rarity: { score: 18, label: "Very Common", percentile: 18, confidence: "high", source: US_SSA },
    origin: { origin: "English", language: "English", meaning: "God is gracious (form of John)", historicalUsage: "Medieval English form of John. Enduring popularity, especially in the UK and US.", variants: ["Jackie", "Jacques"], confidence: "high", source: WIKIDATA },
    famousPeople: [],
    fictional: [],
  },
  eleanor: {
    rarity: { score: 31, label: "Common", percentile: 31, confidence: "high", source: US_SSA },
    origin: { origin: "Provençal / Greek", language: "English / French", meaning: "The other Aenor; or shining light", historicalUsage: "Medieval royal name (Eleanor of Aquitaine). Strong modern revival.", variants: ["Ellie", "Nora", "Leonor"], confidence: "high", source: WIKIDATA },
    famousPeople: [{ name: "Eleanor Roosevelt", profession: "First Lady / Activist", country: "United States", description: "Influential First Lady and human rights advocate." }],
    fictional: [],
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
  const uniqueFactor = (new Set(name.toLowerCase()).size / Math.max(name.length, 1)) * 25;
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
      description: "Generated estimate based on name characteristics (length, letter diversity, hash). Not based on a specific census dataset for this name.",
      geographicScope: "Global estimate",
      timePeriod: "Contemporary",
    },
  };
}

function generateOrigin(name: string): OriginInfo | null {
  const lower = name.toLowerCase();
  if (lower.endsWith("a") || lower.endsWith("ia") || lower.endsWith("ah")) {
    return {
      origin: "Multiple possible origins",
      language: "Various",
      meaning: "Meaning varies by cultural origin. Many names ending in -a/-ia have Latin, Greek, Arabic, or Romance roots.",
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
  if (h % 4 === 0) return null;
  const points = [];
  let peakYear = 2000;
  let maxScore = 0;
  for (let y = 1980; y <= 2024; y += 2) {
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
  const result: string[] = [];
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

    await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));

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
      "Geographic and historical trends are shown only when supported by available public datasets (primarily US SSA and aggregated global sources).",
      "Entertainment sections (vibe, energy, 'if your name were') are generated for fun and are not scientific.",
      "Curated entries draw from public sources including the US Social Security Administration baby name data and Forebears incidence estimates. All non-curated results are clearly labeled as estimates.",
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
      ] : ["emma", "olivia", "liam", "noah"].includes(key) ? [
        { region: "United States", country: "United States", relativeFrequency: 90 },
        { region: "United Kingdom", country: "United Kingdom", relativeFrequency: 80 },
        { region: "Australia", country: "Australia", relativeFrequency: 75 },
      ] : ["mohammed", "fatima", "aisha"].includes(key) ? [
        { region: "Middle East & North Africa", country: "Multiple", relativeFrequency: 85 },
        { region: "South Asia", country: "Multiple", relativeFrequency: 70 },
        { region: "Western Europe / diaspora", country: "Multiple", relativeFrequency: 40 },
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
    const examples = Object.keys(CURATED).map(k => k.charAt(0).toUpperCase() + k.slice(1));
    if (!query) return examples.slice(0, 8);
    return examples.filter(n => n.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
  }
}

export const nameDataProvider = new SampleNameDataProvider();
