export interface PlatformMetrics {
  google: number; // Google search volume / 100 max
  twitter: number; // Twitter/X posts
  threads: number; // Threads activity
  tiktok: number; // TikTok view count index
  news: number; // Portal news volume
}

export interface TrendSignal {
  id: string;
  rank: number;
  keyword: string;
  category: "Politik" | "Ekonomi" | "Am" | "Budaya" | "Bencana" | "Suara Rakyat" | "Teknologi" | "Sosial";
  vertical?: string; // WEH Money, WEH Siasat, WEH Borneo, WEH Check, etc.
  score: number; // Trend Heat Score (0-100)
  growthRate?: string; // e.g. "+68% dalam 60 minit"
  mentionCount?: string; // e.g. "18,450 sebutan"
  platformUtama?: string; // e.g. "TikTok", "Threads", "X", etc.
  confidenceScore?: number; // e.g. 85
  statusPengesahan?: "Disahkan" | "Sebahagian Disahkan" | "Belum Disahkan" | "Dipertikaikan" | "Palsu";
  risiko?: "Luar Biasa" | "Tinggi" | "Sederhana" | "Rendah";
  waktuKemasKini?: string;
  velocity: "Meningkat Tegak" | "Sederhana" | "Stabil" | "Menurun";
  risk3R: "Rendah" | "Sederhana" | "Tinggi"; // Race, Religion, Royalty, Sensationalism
  newsValue: "Sangat Tinggi" | "Tinggi" | "Sederhana" | "Biasa";
  sourceDiversity: number; // Number of unique source domains sharing
  sources: string[]; // Headlines / summaries of mentions
  fullIntelBrief: string; // The Hourly Intelligence summary
  radarData: { name: string; value: number }[]; // custom radar metrics
  newsLinks?: { label: string; url: string }[]; // Specific sources/portals references for scraping
  
  // Micropage elements
  apaYangBerlaku?: string; // 150-300 words BM narrative
  faktaDisahkan?: string[];
  dakwaanBelumDisahkan?: string[];
  responsRasmi?: string[];
  apaYangBelumDiketahui?: string[];
  sentimenMetrics?: { name: string; value: number }[]; // Positive, Negative, neutral, angry, worried, confused etc
  sentimenKonteks?: string[];
  keywordsBerkaitan?: string[];
  entitiBerkaitan?: string[];
  cadanganKandungan?: { format: string; title: string }[];
  rankingHistory?: { capturedAt: string; rank: number; trendHeatScore: number }[];
}

export interface CostVariable {
  id: string;
  name: string;
  inputCostPerM_USD: number;
  outputCostPerM_USD: number;
  searchCostPer1k_USD: number;
}

export interface ModelPreset {
  id: string;
  name: string;
  modelCode: string;
  provider: "Anthropic" | "Google / Gemini" | "Perplexity";
  inputCostPerM: number; // in USD
  outputCostPerM: number; // in USD
}

export interface GenerationOutput {
  title: string;
  standfirst: string;
  article?: string;
  wekKenapaPenting?: string;
  wehCheck?: string;
  wehData?: string;
  videoScript?: string;
  carousel?: { step: number; title: string; desc: string }[];
  caption?: string;
  seoKeywords?: string[];
  sourcesUsed?: string[];
}
