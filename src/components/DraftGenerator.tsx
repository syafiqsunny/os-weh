import React, { useState } from "react";
import { 
  CheckCircle, 
  Search, 
  Terminal, 
  Copy, 
  HelpCircle, 
  RefreshCw, 
  Check, 
  ArrowRight,
  Sparkles,
  DollarSign,
  Plus
} from "lucide-react";

interface DraftGeneratorProps {
  prefilledTopic: string;
}

interface WebSearchResponse {
  summary: string;
  sources: Array<{ title: string; url: string }>;
  metadata: {
    tokensIn: number;
    tokensOut: number;
    searchesRun: number;
    costUSD: number;
    costRM: number;
    durationMs: number;
    fallbackActive?: boolean;
  };
}

interface DraftResponse {
  output: {
    title: string;
    standfirst: string;
    article?: string;
    wekKenapaPenting?: string;
    wehCheck?: string;
    wehData?: string;
    videoScript?: string;
    caption?: string;
  };
  metadata: {
    tokensIn: number;
    tokensOut: number;
    costUSD: number;
    costRM: number;
    model: string;
    fallbackActive?: boolean;
    durationMs: number;
  };
}

export default function DraftGenerator({ prefilledTopic }: DraftGeneratorProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>(prefilledTopic || "");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<WebSearchResponse | null>(null);

  // Generator State
  const [draftTopic, setDraftTopic] = useState<string>(prefilledTopic || "");
  const [context, setContext] = useState<string>("");
  const [pricingModel, setPricingModel] = useState<"gemini_lite" | "gemini_standard" | "claude">("gemini_lite");
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["article", "wehKenapaPenting", "caption"]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationResult, setGenerationResult] = useState<DraftResponse | null>(null);
  
  // Clipboard copied status
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // ScrapingBee state
  const [scrapeUrl, setScrapeUrl] = useState<string>("");
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scrapeSuccess, setScrapeSuccess] = useState<boolean>(false);

  // Dynamic scraping handler powered by ScrapingBee
  const handleScrapeUrl = async () => {
    if (!scrapeUrl.trim()) return;
    setIsScraping(true);
    setScrapeError(null);
    setScrapeSuccess(false);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": localStorage.getItem("weh_gemini_api_key") || "",
          "x-scrapingbee-key": localStorage.getItem("weh_scrapingbee_api_key") || ""
        },
        body: JSON.stringify({ url: scrapeUrl.trim() })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal mengekstrak kandungan.");
      }

      // Append extracted text to the background context area with a header label
      const prefix = context.trim() 
        ? `${context}\n\n[Kandungan dari: ${scrapeUrl.trim()}]\n${data.text}`
        : `[Kandungan dari: ${scrapeUrl.trim()}]\n${data.text}`;
      
      setContext(prefix);
      setScrapeSuccess(true);
      setScrapeUrl("");
      setTimeout(() => setScrapeSuccess(false), 3000);
    } catch (err: any) {
      setScrapeError(err.message || "Ralat tidak dijangka ketika mengekstrak.");
    } finally {
      setIsScraping(false);
    }
  };

  // Toggle format checklist
  const handleToggleFormat = (fmt: string) => {
    if (selectedFormats.includes(fmt)) {
      setSelectedFormats(selectedFormats.filter((f) => f !== fmt));
    } else {
      setSelectedFormats([...selectedFormats, fmt]);
    }
  };

  // Perform web carian berita
  const handleWebSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResult(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": localStorage.getItem("weh_gemini_api_key") || "",
          "x-scrapingbee-key": localStorage.getItem("weh_scrapingbee_api_key") || ""
        },
        body: JSON.stringify({
          query: searchQuery,
          pricingModel: pricingModel === "claude" ? "claude" : "gemini",
          customSystemPrompt: localStorage.getItem("weh_system_prompt") || ""
        })
      });
      const data = await response.json();
      setSearchResult(data);
      
      // Auto pre-fill topic in draf generation if empty
      if (!draftTopic) {
        setDraftTopic(searchQuery);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  // Perform Draft generation
  const handleGenerateDraft = async () => {
    if (!draftTopic.trim()) return;
    setIsGenerating(true);
    setGenerationResult(null);

    // Map client model selection to real server parameters
    let activeModel = "gemini-3.5-flash"; 
    if (pricingModel === "gemini_lite") {
      activeModel = "gemini-3.1-flash-lite";
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-gemini-key": localStorage.getItem("weh_gemini_api_key") || "",
          "x-scrapingbee-key": localStorage.getItem("weh_scrapingbee_api_key") || ""
        },
        body: JSON.stringify({
          topic: draftTopic,
          context: context,
          formats: selectedFormats,
          model: activeModel,
          pricingModel: pricingModel === "claude" ? "claude" : "gemini",
          customSystemPrompt: localStorage.getItem("weh_system_prompt") || ""
        })
      });
      const data = await response.json();
      setGenerationResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Transfer search summary directly into context area
  const handleTransferToContext = () => {
    if (searchResult) {
      setContext(
        `[HASIL CARIAN WEB BERITA - ${searchQuery}]\n` +
        searchResult.summary + 
        `\n\n[SUMBER RUJUKAN DISAMPAIKAN]\n` +
        searchResult.sources.map((s) => `${s.title}: ${s.url}`).join("\n")
      );
      setDraftTopic(searchQuery);
    }
  };

  // Clipboard copies
  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6">

      {/* Grid: Search facts on Left / Setup Generator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left column: Deep Fact Search */}
        <div className="lg:col-span-5 bg-panel border border-line p-4 rounded-lg flex flex-col space-y-4">
          <div className="border-b border-line pb-2 flex justify-between items-center">
            <h3 className="text-sm font-display font-bold text-white flex items-center space-x-2">
              <Search size={16} className="text-purple-primary" />
              <span>Carian Berita Pintar (Search Grounding)</span>
            </h3>
            <span className="text-[10px] font-mono bg-purple-primary/10 text-purple-primary border border-purple-primary/20 px-1.5 py-0.2 rounded">
              GOOGLE SEARCH
            </span>
          </div>

          <p className="text-xs text-muted-active leading-relaxed font-sans">
            Gunakan keupayaan carian bersepadu Google Search Grounding untuk merujuk fakta terkini sebelum mula melakar berita.
          </p>

          <div className="flex space-x-2">
            <input 
              type="text"
              placeholder="E.g. PRN Johor Ke-16"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-field border border-line rounded px-3 py-1.5 text-sm font-sans focus:outline-none focus:border-purple-primary text-white"
            />
            <button 
              onClick={handleWebSearch}
              disabled={isSearching}
              className="px-4 py-1.5 bg-purple-primary hover:bg-purple-primary/90 disabled:bg-purple-primary/40 text-white rounded text-xs font-bold font-sans transition flex items-center space-x-1 whitespace-nowrap cursor-pointer"
            >
              {isSearching ? <RefreshCw className="animate-spin" size={14} /> : null}
              <span>{isSearching ? "CARIAN RAPI..." : "DEEP SEARCH"}</span>
            </button>
          </div>

          {/* Search Result view */}
          <div className="flex-1 border border-line-soft bg-field/40 rounded p-3 min-h-[220px] overflow-y-auto space-y-3 font-mono text-xs">
            {isSearching ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-muted-active">
                <RefreshCw className="animate-spin text-purple-primary" size={24} />
                <span>Melakukan penapisan carian Google Search...</span>
                <span className="text-[10px] text-muted-inactive">Mengumpulkan rilis berita & blog tular</span>
              </div>
            ) : searchResult ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] text-muted-inactive border-b border-line-soft pb-1">
                  <span>DISAHKAN OLEH GEMINI PINTAR</span>
                  <span className="text-emerald-400 font-bold">KOS : RM {searchResult.metadata.costRM.toFixed(4)}</span>
                </div>

                <div className="text-text-2 space-y-2 font-sans text-sm leading-relaxed whitespace-pre-line">
                  {searchResult.summary}
                </div>

                {searchResult.sources.length > 0 && (
                  <div className="space-y-1 pt-2 font-mono text-[11px] border-t border-line-soft">
                    <span className="text-muted-active block">SUMBER UTAMA DIKESAN ({searchResult.sources.length})</span>
                    <div className="space-y-1 text-muted-inactive">
                      {searchResult.sources.map((s, idx) => (
                        <a 
                          key={idx}
                          href={s.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="block hover:text-purple-primary truncate transition"
                        >
                          🔗 {idx + 1}. {s.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transfer factual values in context trigger */}
                <button 
                  onClick={handleTransferToContext}
                  className="w-full mt-2 flex justify-center items-center space-x-1.5 py-1.5 bg-panel-hover hover:bg-line border border-line rounded text-purple-primary text-[11px] font-bold transition font-mono cursor-pointer"
                >
                  <ArrowRight size={12} />
                  <span>PINDAHKAN SUMMARY KE EDITOR DRAFT</span>
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-inactive p-8">
                <Terminal size={24} className="mb-2 text-muted-inactive opacity-40 animate-pulse" />
                <span>Kotak terminal sedia untuk menerima input carian...</span>
                <span className="text-[10px] mt-1">Isi kata kunci, klik 'DEEP SEARCH'</span>
              </div>
            )}
          </div>

        </div>

        {/* Right column: Editorial Draft Settings */}
        <div className="lg:col-span-7 bg-panel border border-line p-4 rounded-lg flex flex-col space-y-4">
          <div className="border-b border-line pb-2 flex justify-between items-center">
            <h3 className="text-sm font-display font-bold text-white flex items-center space-x-2">
              <Sparkles size={16} className="text-orange-primary" />
              <span>Penyusunan Atribut & Tetapan Generator Draf</span>
            </h3>
            <span className="text-[10px] font-mono bg-orange-primary/10 text-orange-primary border border-orange-primary/20 px-1.5 py-0.2 rounded">
              PROMPT SETUP
            </span>
          </div>

          {/* Form setup */}
          <div className="space-y-3 font-sans text-sm">
            
            {/* Topic Input */}
            <div className="space-y-1">
              <label className="text-text-2 font-medium">Tajuk / Subjek Berita Utama</label>
              <input 
                type="text"
                placeholder="E.g. Isu Subsidi Ron95 Bersasar"
                value={draftTopic}
                onChange={(e) => setDraftTopic(e.target.value)}
                className="w-full bg-field border border-line rounded px-3 py-1.5 text-sm focus:outline-none focus:border-orange-primary text-white"
              />
            </div>

            {/* Context manual / search summary */}
            <div className="space-y-1">
              <label className="text-text-2 font-medium flex justify-between">
                <span>Konteks Tambahan / Raw Mentahan</span>
                <span className="text-[10px] text-muted-inactive font-mono">Pilihan: Teks galian / Rujukan</span>
              </label>
              <textarea 
                rows={3}
                placeholder="Letakkan fakta ringkas kementerian, hantaran yang ingin diringkas, atau huraian berkaitan..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full bg-field border border-line rounded px-3 py-1.5 text-sm focus:outline-none focus:border-orange-primary text-white resize-none"
              />
            </div>

            {/* ScrapingBee URL Extraction Tool */}
            <div className="bg-panel-dark/50 border border-line rounded p-2.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-primary">🐝 EKSTRAKTOR PORTAL (SCRAPINGBEE)</span>
                <span className="text-[10px] text-muted-inactive font-mono">Auto-gali teks dari rujukan url</span>
              </div>
              <div className="flex space-x-1.5">
                <input 
                  type="text"
                  placeholder="https://contoh-laman-berita.com/artikel-penuh"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  className="flex-1 bg-field border border-line text-xs rounded px-2.5 py-1 text-white focus:outline-none focus:border-orange-primary"
                />
                <button
                  type="button"
                  onClick={handleScrapeUrl}
                  disabled={isScraping || !scrapeUrl.trim()}
                  className={`px-3 py-1 rounded text-xs font-bold font-mono transition cursor-pointer select-none ${
                    isScraping 
                      ? "bg-muted-inactive text-text-muted cursor-not-allowed" 
                      : !scrapeUrl.trim()
                        ? "bg-field border border-line text-muted-inactive cursor-not-allowed hover:bg-field"
                        : "bg-orange-primary text-white hover:bg-orange-600"
                  }`}
                >
                  {isScraping ? "Mengekstrak..." : "Tarik Teks"}
                </button>
              </div>
              {scrapeSuccess && (
                <p className="text-[11px] text-green-500 font-medium">✓ Kandungan rencana berjaya disuntik masuk ke kotak Konteks di atas!</p>
              )}
              {scrapeError && (
                <p className="text-[11px] text-red-500 font-medium font-mono leading-tight">Ralat: {scrapeError}</p>
              )}
            </div>

            {/* Selected pricing presets models */}
            <div className="space-y-1.5">
              <span className="text-text-2 font-medium block">Pilihan Pelan Model & Simulasi Kos:</span>
              <div className="grid grid-cols-3 gap-2">
                
                <button 
                  onClick={() => setPricingModel("gemini_lite")}
                  className={`p-2 rounded border text-left cursor-pointer transition ${
                    pricingModel === "gemini_lite"
                      ? "bg-purple-primary/10 border-purple-primary text-white"
                      : "bg-field border-line text-muted-active hover:bg-panel-hover"
                  }`}
                >
                  <div className="text-xs font-bold font-mono text-purple-primary">GEMINI LITE</div>
                  <div className="text-[9px] text-muted-inactive mt-0.5">Gemini 3.1 Flash-Lite ($0.075 input)</div>
                </button>

                <button 
                  onClick={() => setPricingModel("gemini_standard")}
                  className={`p-2 rounded border text-left cursor-pointer transition ${
                    pricingModel === "gemini_standard"
                      ? "bg-orange-primary/10 border-orange-primary text-white"
                      : "bg-field border-line text-muted-active hover:bg-panel-hover"
                  }`}
                >
                  <div className="text-xs font-bold font-mono text-orange-primary">GEMINI STANDARD</div>
                  <div className="text-[9px] text-muted-inactive mt-0.5">Gemini 3.5 Flash ($0.075 / $0.30)</div>
                </button>

                <button 
                  onClick={() => setPricingModel("claude")}
                  className={`p-2 rounded border text-left cursor-pointer transition ${
                    pricingModel === "claude"
                      ? "bg-red-500/10 border-red-500 text-white"
                      : "bg-field border-line text-muted-active hover:bg-panel-hover"
                  }`}
                >
                  <div className="text-xs font-bold font-mono text-red-400">CLAUDE PRESING</div>
                  <div className="text-[9px] text-muted-inactive mt-0.5">Claude 3.5 Sonnet ($3.00 / $15.00)</div>
                </button>

              </div>
            </div>

            {/* Selected Format Asset modules checklist */}
            <div className="space-y-1.5">
              <span className="text-text-2 font-medium block">Pilihan Format Aset Untuk Dijana:</span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                
                <button 
                  onClick={() => handleToggleFormat("article")}
                  className={`px-3 py-1.5 rounded border flex items-center space-x-1.5 cursor-pointer ${
                    selectedFormats.includes("article") 
                      ? "bg-orange-primary/15 border-orange-primary text-orange-primary font-bold" 
                      : "bg-field border-line text-muted-inactive"
                  }`}
                >
                  {selectedFormats.includes("article") ? <Check size={12} /> : <Plus size={12} />}
                  <span>Artikel Berita .weh</span>
                </button>

                <button 
                  onClick={() => handleToggleFormat("wehKenapaPenting")}
                  className={`px-3 py-1.5 rounded border flex items-center space-x-1.5 cursor-pointer ${
                    selectedFormats.includes("wehKenapaPenting") 
                      ? "bg-orange-primary/15 border-orange-primary text-orange-primary font-bold" 
                      : "bg-field border-line text-muted-inactive"
                  }`}
                >
                  {selectedFormats.includes("wehKenapaPenting") ? <Check size={12} /> : <Plus size={12} />}
                  <span>WEH, Kenapa Penting?</span>
                </button>

                <button 
                  onClick={() => handleToggleFormat("wehCheck")}
                  className={`px-3 py-1.5 rounded border flex items-center space-x-1.5 cursor-pointer ${
                    selectedFormats.includes("wehCheck") 
                      ? "bg-orange-primary/15 border-orange-primary text-orange-primary font-bold" 
                      : "bg-field border-line text-muted-inactive"
                  }`}
                >
                  {selectedFormats.includes("wehCheck") ? <Check size={12} /> : <Plus size={12} />}
                  <span>WEH Check Fakta</span>
                </button>

                <button 
                  onClick={() => handleToggleFormat("wehData")}
                  className={`px-3 py-1.5 rounded border flex items-center space-x-1.5 cursor-pointer ${
                    selectedFormats.includes("wehData") 
                      ? "bg-orange-primary/15 border-orange-primary text-orange-primary font-bold" 
                      : "bg-field border-line text-muted-inactive"
                  }`}
                >
                  {selectedFormats.includes("wehData") ? <Check size={12} /> : <Plus size={12} />}
                  <span>WEH Data List</span>
                </button>

                <button 
                  onClick={() => handleToggleFormat("videoScript")}
                  className={`px-3 py-1.5 rounded border flex items-center space-x-1.5 cursor-pointer ${
                    selectedFormats.includes("videoScript") 
                      ? "bg-orange-primary/15 border-orange-primary text-orange-primary font-bold" 
                      : "bg-field border-line text-muted-inactive"
                  }`}
                >
                  {selectedFormats.includes("videoScript") ? <Check size={12} /> : <Plus size={12} />}
                  <span>Skrip Video Pendek</span>
                </button>

                <button 
                  onClick={() => handleToggleFormat("caption")}
                  className={`px-3 py-1.5 rounded border flex items-center space-x-1.5 cursor-pointer ${
                    selectedFormats.includes("caption") 
                      ? "bg-orange-primary/15 border-orange-primary text-orange-primary font-bold" 
                      : "bg-field border-line text-muted-inactive"
                  }`}
                >
                  {selectedFormats.includes("caption") ? <Check size={12} /> : <Plus size={12} />}
                  <span>Mini Caption & Hashtag</span>
                </button>

              </div>
            </div>

            {/* Spark generator trigger button */}
            <button 
              onClick={handleGenerateDraft}
              disabled={isGenerating || !draftTopic}
              className="w-full flex justify-center items-center space-x-2 py-3 bg-gradient-to-r from-orange-primary to-purple-primary text-white font-sans font-bold text-sm tracking-wide rounded hover:opacity-95 disabled:bg-none disabled:bg-field disabled:border-line disabled:text-muted-active hover:shadow-lg transition cursor-pointer"
            >
              {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
              <span>{isGenerating ? "SEDANG MENULIS DENGAN KOS PENDARATAN OPTIMUM..." : "JANA DRAF EDITORIAL (.WEH DIGITAL)"}</span>
            </button>

          </div>
        </div>

      </div>

      {/* Generating result display cards */}
      {isGenerating ? (
        <div className="p-8 bg-panel border border-line rounded-lg flex flex-col items-center justify-center text-center space-y-3">
          <RefreshCw className="animate-spin text-orange-primary" size={32} />
          <h4 className="font-display font-bold text-white text-base">Menjana Draf Mengikut Acuan .weh Editorial...</h4>
          <p className="text-xs text-muted-active font-mono max-w-md">
            Sistem sedang menyusun jawapan berformat JSON langsung daripada kecerdasan buatan, memastikan tiada token terbuang mengikut unjuran bajet anda.
          </p>
        </div>
      ) : generationResult ? (
        <div className="bg-panel border border-line rounded-lg p-5 space-y-4">
          
          {/* Output cost evaluation Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-line pb-4 gap-2 font-mono">
            <div>
              <span className="text-xs text-muted-active uppercase block">KERTAS EDITORIAL BERJAYA DIJANA</span>
              <h3 className="text-base font-display font-bold text-white">
                "{generationResult.output.title}"
              </h3>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <span className="text-xs bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 px-2.5 py-0.5 rounded font-bold">
                KOS PENJANAAN: RM {generationResult.metadata.costRM.toFixed(4)}
              </span>
              <span className="text-[10px] text-muted-inactive mt-1">
                ({generationResult.metadata.tokensIn} In | {generationResult.metadata.tokensOut} Out | {generationResult.metadata.durationMs}ms)
              </span>
            </div>
          </div>

          {/* Standfirst Intro card */}
          <div className="p-3 bg-field/60 border-l border-orange-primary rounded-r">
            <span className="text-[10px] font-mono text-muted-inactive block uppercase">INTRO / STANDFIRST</span>
            <p className="text-sm font-sans italic text-text p-1 leading-relaxed">
              {generationResult.output.standfirst}
            </p>
          </div>

          {/* Dynamic Grid Layout for the check assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Article content */}
            {generationResult.output.article && (
              <div className="bg-field/40 border border-line-soft rounded p-4 space-y-2 relative group">
                <div className="flex justify-between items-center border-b border-line-soft pb-1.5">
                  <span className="text-xs font-mono text-orange-primary font-bold">📚 ARTIKEL BERITA UTAMA</span>
                  <button 
                    onClick={() => triggerCopy(generationResult.output.article || "", "article")}
                    className="text-muted-active hover:text-white transition"
                    title="Salin perenggan"
                  >
                    {copiedSection === "article" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs font-sans text-text-2 leading-relaxed whitespace-pre-line">
                  {generationResult.output.article}
                </p>
              </div>
            )}

            {/* 2. Kenapa Penting summary */}
            {generationResult.output.wekKenapaPenting && (
              <div className="bg-field/40 border border-line-soft rounded p-4 space-y-2 relative group">
                <div className="flex justify-between items-center border-b border-line-soft pb-1.5">
                  <span className="text-xs font-mono text-purple-primary font-bold">🔥 WEH, KENAPA PENTING?</span>
                  <button 
                    onClick={() => triggerCopy(generationResult.output.wekKenapaPenting || "", "kenapa")}
                    className="text-muted-active hover:text-white transition"
                    title="Salin huraian"
                  >
                    {copiedSection === "kenapa" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs font-sans text-text-2 leading-relaxed">
                  {generationResult.output.wekKenapaPenting}
                </p>
              </div>
            )}

            {/* 3. Weh Check (fact check corner) */}
            {generationResult.output.wehCheck && (
              <div className="bg-red-950/10 border border-red-900/30 rounded p-4 space-y-2 relative group">
                <div className="flex justify-between items-center border-b border-red-900/20 pb-1.5">
                  <span className="text-xs font-mono text-red-400 font-bold">🔍 WEH CHECK CORNER</span>
                  <button 
                    onClick={() => triggerCopy(generationResult.output.wehCheck || "", "check")}
                    className="text-muted-active hover:text-white transition"
                    title="Salin semakan"
                  >
                    {copiedSection === "check" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs font-sans text-red-200/90 leading-relaxed whitespace-pre-line">
                  {generationResult.output.wehCheck}
                </p>
              </div>
            )}

            {/* 4. Weh Data pointers */}
            {generationResult.output.wehData && (
              <div className="bg-field/40 border border-line-soft rounded p-4 space-y-2 relative group">
                <div className="flex justify-between items-center border-b border-line-soft pb-1.5">
                  <span className="text-xs font-mono text-emerald-400 font-bold">📊 WEH STATS DATA POINTERS</span>
                  <button 
                    onClick={() => triggerCopy(generationResult.output.wehData || "", "data")}
                    className="text-muted-active hover:text-white transition"
                    title="Salin senarai data"
                  >
                    {copiedSection === "data" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs font-mono text-emerald-200/90 leading-relaxed whitespace-pre-line">
                  {generationResult.output.wehData}
                </p>
              </div>
            )}

            {/* 5. Video social script */}
            {generationResult.output.videoScript && (
              <div className="bg-field/40 border border-line-soft rounded p-4 space-y-2 relative group">
                <div className="flex justify-between items-center border-b border-line-soft pb-1.5">
                  <span className="text-xs font-mono text-blue-400 font-bold">🎬 30-SEC SOVIET VIDEO SCRIPT (TIKTOK/REELS)</span>
                  <button 
                    onClick={() => triggerCopy(generationResult.output.videoScript || "", "video")}
                    className="text-muted-active hover:text-white transition"
                    title="Salin skrip"
                  >
                    {copiedSection === "video" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs font-mono text-text-2 leading-relaxed whitespace-pre-line bg-field/80 p-2.5 rounded border border-line">
                  {generationResult.output.videoScript}
                </p>
              </div>
            )}

            {/* 6. Social copy caption */}
            {generationResult.output.caption && (
              <div className="bg-field/40 border border-line-soft rounded p-4 space-y-2 relative group">
                <div className="flex justify-between items-center border-b border-line-soft pb-1.5">
                  <span className="text-xs font-mono text-yellow-400 font-bold">💬 SOCIAL MED CAPTION (X / THREADS)</span>
                  <button 
                    onClick={() => triggerCopy(generationResult.output.caption || "", "caption")}
                    className="text-muted-active hover:text-white transition"
                    title="Salin kapsyen"
                  >
                    {copiedSection === "caption" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-xs font-sans text-text-2 leading-relaxed italic select-all">
                  {generationResult.output.caption}
                </p>
              </div>
            )}

          </div>

        </div>
      ) : null}

    </div>
  );
}
