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
  category: "Politik" | "Ekonomi" | "Am" | "Budaya" | "Bencana" | "Suara Rakyat";
  score: number; // Total WEH Treng Score (out of 100)
  velocity: "Meningkat Tegak" | "Sederhana" | "Stabil" | "Menurun";
  risk3R: "Rendah" | "Sederhana" | "Tinggi"; // Race, Religion, Royalty, Sensationalism
  newsValue: "Sangat Tinggi" | "Tinggi" | "Sederhana" | "Biasa";
  sourceDiversity: number; // Number of unique source domains sharing
  sources: string[]; // Headlines / summaries of mentions
  fullIntelBrief: string; // The Hourly Intelligence summary
  radarData: { name: string; value: number }[]; // custom radar metrics
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
