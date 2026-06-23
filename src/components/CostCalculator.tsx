import React, { useState } from "react";
import { Sliders, HelpCircle, AlertTriangle, TrendingDown, Info } from "lucide-react";

export default function CostCalculator() {
  // Input parameters controlled by user
  const [dailySearches, setDailySearches] = useState<number>(30);
  const [dailyGenerations, setDailyGenerations] = useState<number>(50);
  const [selectedFormatComplexity, setSelectedFormatComplexity] = useState<"semua" | "artikel_sahaja" | "we_check" | "kapsyen_sahaja">("semua");
  
  // Custom ratios
  const [exchangeRate, setExchangeRate] = useState<number>(4.1516); // RM per USD (June 2026 constant)

  // 1. Token weight calculation based on selected formats
  const getOutputTokenCostWeight = () => {
    switch (selectedFormatComplexity) {
      case "artikel_sahaja": return 1200; // Average tokens
      case "we_check": return 1800;
      case "kapsyen_sahaja": return 400;
      case "semua":
      default:
        return 3800; // Long full format requested
    }
  };

  const getInputTokenCostWeight = () => {
    switch (selectedFormatComplexity) {
      case "artikel_sahaja": return 1500;
      case "we_check": return 2000;
      case "kapsyen_sahaja": return 1000;
      case "semua":
      default:
        return 3000; // More complex instructions
    }
  };

  const tokensIn = getInputTokenCostWeight();
  const tokensOut = getOutputTokenCostWeight();

  // Price models per Million tokens (USD)
  const claudeInRate = 3.00;
  const claudeOutRate = 15.00;
  const claudeSearchRate = 0.01; // $10 per 1000 searches

  const geminiInRate = 0.075;
  const geminiOutRate = 0.30;
  const geminiSearchRate = 0.005; // Perplexity-like or optimized route

  // Calculate Claude-only Stack (All Sonnet 3.5 + high capacity search)
  // Per search uses 5000 context (reading html) as inputs directly in Claude!
  const claudeSearchInputTokensPerSearch = 4000; 
  
  const calculateClaudeMonthlyCost = () => {
    const dailySearchInCost = dailySearches * (claudeSearchInputTokensPerSearch / 1000000) * claudeInRate;
    const dailySearchApiCost = dailySearches * claudeSearchRate;
    
    const dailyGenInCost = dailyGenerations * (tokensIn / 1000000) * claudeInRate;
    const dailyGenOutCost = dailyGenerations * (tokensOut / 1000000) * claudeOutRate;
    
    const dailyTotal = dailySearchInCost + dailySearchApiCost + dailyGenInCost + dailyGenOutCost;
    const monthlyTotalUSD = dailyTotal * 30;
    return {
      searchUSD: (dailySearchInCost + dailySearchApiCost) * 30,
      genUSD: (dailyGenInCost + dailyGenOutCost) * 30,
      totalUSD: monthlyTotalUSD,
      totalRM: monthlyTotalUSD * exchangeRate
    };
  };

  // Calculate Syor Campuran Stack (Flash-Lite + Perplexity Routine, Claude 10% deep check)
  const calculateCampuranMonthlyCost = () => {
    // 90% and 10% split
    const dailySearchesPerplexity = dailySearches; // Perplexity search USD 5 / 1000 queries Flat
    const perpetuityDailySearchCostUSD = dailySearchesPerplexity * geminiSearchRate;

    // Generations allocation: 90% Gemini Flash-Lite, 10% Premium Claude Sonnet
    const geminiDailyGens = dailyGenerations * 0.9;
    const claudeDailyGens = dailyGenerations * 0.1;

    // Gemini cost:
    const geminiGenInCost = geminiDailyGens * (tokensIn / 1000000) * geminiInRate;
    const geminiGenOutCost = geminiDailyGens * (tokensOut / 1000000) * geminiOutRate;

    // Claude cost:
    const claudeGenInCost = claudeDailyGens * (tokensIn / 1000000) * claudeInRate;
    const claudeGenOutCost = claudeDailyGens * (tokensOut / 1000000) * claudeOutRate;

    const dailyTotal = perpetuityDailySearchCostUSD + geminiGenInCost + geminiGenOutCost + claudeGenInCost + claudeGenOutCost;
    const monthlyTotalUSD = dailyTotal * 30;

    return {
      searchUSD: perpetuityDailySearchCostUSD * 30,
      genUSD: (geminiGenInCost + geminiGenOutCost + claudeGenInCost + claudeGenOutCost) * 30,
      totalUSD: monthlyTotalUSD,
      totalRM: monthlyTotalUSD * exchangeRate
    };
  };

  const claudeResult = calculateClaudeMonthlyCost();
  const campuranResult = calculateCampuranMonthlyCost();

  const monthlySavingsUSD = claudeResult.totalUSD - campuranResult.totalUSD;
  const monthlySavingsRM = claudeResult.totalRM - campuranResult.totalRM;
  const savingsPct = Math.round((monthlySavingsUSD / claudeResult.totalUSD) * 100);

  return (
    <div className="bg-panel border border-line rounded-lg p-5 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-line pb-4 gap-2">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center space-x-2">
            <Sliders className="text-purple-primary" size={20} />
            <span>Kajian & Simulasi Kos API Editorial .weh</span>
          </h2>
          <p className="text-xs text-muted-active font-mono mt-1">
            Gunakan kalkulator interaktif ini untuk memanipulasi pembolehubah volum dan menilai impak kewangan sebulan (Kadar Rujukan: USD1 = RM{exchangeRate}).
          </p>
        </div>
        <div className="bg-purple-primary/10 border border-purple-primary/30 text-purple-primary text-[11px] font-mono rounded px-3 py-1 flex items-center h-fit w-fit">
          <Info size={12} className="mr-1" />
          <span>Syor WEH Campuran Menjimatkan Ratusan Ringgit</span>
        </div>
      </div>

      {/* Main Grid: Parameters on Left, Outputs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sliders */}
        <div className="lg:col-span-6 space-y-6">
          
          <h3 className="text-xs font-mono text-muted-active tracking-wider uppercase border-b border-line-soft pb-1">
            KAWALAN VOLUM PENGGUNAAN HARIAN (SEBULAN = 30 HARI)
          </h3>

          {/* Daily Searches Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-text-2 font-medium flex items-center">
                Carian Berita Harian (Cari Fakta)
                <span className="text-[10px] text-muted-inactive ml-1">(Rujukan, semakan isu)</span>
              </label>
              <span className="font-mono font-bold bg-field border border-line px-2.5 py-0.5 rounded text-purple-primary">
                {dailySearches} Carian / Hari
              </span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="200" 
              step="5"
              value={dailySearches} 
              onChange={(e) => setDailySearches(Number(e.target.value))}
              className="w-full accent-purple-primary bg-field cursor-pointer h-1.5 rounded"
            />
            <div className="flex justify-between text-[11px] text-muted-inactive font-mono">
              <span>Min: 5</span>
              <span>Sederhana: 50</span>
              <span>Maks: 200</span>
            </div>
          </div>

          {/* Daily Generations Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="text-text-2 font-medium flex items-center">
                Jumlah Penjanaan Draf Berita (Generator)
                <span className="text-[10px] text-muted-inactive ml-1">(Artikel, carousel, kapsyen)</span>
              </label>
              <span className="font-mono font-bold bg-field border border-line px-2.5 py-0.5 rounded text-orange-primary">
                {dailyGenerations} Draf / Hari
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="300" 
              step="10"
              value={dailyGenerations} 
              onChange={(e) => setDailyGenerations(Number(e.target.value))}
              className="w-full accent-orange-primary bg-field cursor-pointer h-1.5 rounded"
            />
            <div className="flex justify-between text-[11px] text-muted-inactive font-mono">
              <span>Min: 10</span>
              <span>Sederhana: 100</span>
              <span>Maks: 300</span>
            </div>
          </div>

          {/* Output Format Select Complexity */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono text-muted-active">PILIHAN KOMPLEKSITI FORMAT KELUARAN</span>
            <div className="grid grid-cols-2 gap-2">
              
              <button 
                onClick={() => setSelectedFormatComplexity("semua")}
                className={`p-3 text-left rounded border transition cursor-pointer ${
                  selectedFormatComplexity === "semua" 
                    ? "bg-purple-primary/10 border-purple-primary text-white" 
                    : "bg-field border-line text-muted-active hover:bg-panel-hover"
                }`}
              >
                <div className="text-xs font-bold font-mono">SEDIARKAN SEMUA ASSET</div>
                <div className="text-[10px] text-muted-inactive mt-1">Artikel + WEH Check + Carousel + Kapsyen (~3.8k output tokens)</div>
              </button>

              <button 
                onClick={() => setSelectedFormatComplexity("artikel_sahaja")}
                className={`p-3 text-left rounded border transition cursor-pointer ${
                  selectedFormatComplexity === "artikel_sahaja" 
                    ? "bg-purple-primary/10 border-purple-primary text-white" 
                    : "bg-field border-line text-muted-active hover:bg-panel-hover"
                }`}
              >
                <div className="text-xs font-bold font-mono">ARTIKEL SAHAJA</div>
                <div className="text-[10px] text-muted-inactive mt-1">Hanya artikel padat 3 perenggan (~1.2k output tokens)</div>
              </button>

              <button 
                onClick={() => setSelectedFormatComplexity("we_check")}
                className={`p-3 text-left rounded border transition cursor-pointer ${
                  selectedFormatComplexity === "we_check" 
                    ? "bg-purple-primary/10 border-purple-primary text-white" 
                    : "bg-field border-line text-muted-active hover:bg-panel-hover"
                }`}
              >
                <div className="text-xs font-bold font-mono">WEH CHECK & PEMBONGKARAN</div>
                <div className="text-[10px] text-muted-inactive mt-1">Fokus membongkar spekulasi / fakta sahaja (~1.8k output tokens)</div>
              </button>

              <button 
                onClick={() => setSelectedFormatComplexity("kapsyen_sahaja")}
                className={`p-3 text-left rounded border transition cursor-pointer ${
                  selectedFormatComplexity === "kapsyen_sahaja" 
                    ? "bg-purple-primary/10 border-purple-primary text-white" 
                    : "bg-field border-line text-muted-active hover:bg-panel-hover"
                }`}
              >
                <div className="text-xs font-bold font-mono">KAPSYEN SOSIAL MINI</div>
                <div className="text-[10px] text-muted-inactive mt-1">Hanya ringkasan 280-aksara tular (~400 output tokens)</div>
              </button>

            </div>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="bg-field p-3 rounded border border-line-soft space-y-2">
            <span className="text-xs font-mono text-muted-active block">MUAT PRESET CEPAT UNTUK KAWALAN:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              
              <button 
                onClick={() => {
                  setDailySearches(10);
                  setDailyGenerations(15);
                  setSelectedFormatComplexity("artikel_sahaja");
                }}
                className="px-3 py-1.5 bg-panel hover:bg-panel-hover border border-line rounded text-text-2 transition cursor-pointer"
              >
                Fasa Pilot / Ringan
              </button>

              <button 
                onClick={() => {
                  setDailySearches(30);
                  setDailyGenerations(50);
                  setSelectedFormatComplexity("semua");
                }}
                className="px-3 py-1.5 bg-panel hover:bg-panel-hover border border-line rounded text-purple-primary transition cursor-pointer"
              >
                Volum Purata Khas WEH
              </button>

              <button 
                onClick={() => {
                  setDailySearches(90);
                  setDailyGenerations(120);
                  setSelectedFormatComplexity("semua");
                }}
                className="px-3 py-1.5 bg-panel hover:bg-panel-hover border border-line rounded text-red-400 transition cursor-pointer"
              >
                Agresif / Skala Penuh
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Calculations Outputs */}
        <div className="lg:col-span-6 space-y-5">
          
          <h3 className="text-xs font-mono text-muted-active tracking-wider uppercase border-b border-line-soft pb-1">
            PERBANDINGAN ANGGARAN KOS BULANAN (ESTIMATED INDEX)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Claude Standard Stack */}
            <div className="p-4 bg-field rounded border border-line-soft space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/5 rounded-full filter blur-md"></div>
              <span className="text-xs font-mono text-red-400 uppercase tracking-wider block">CLAUDE-ONLY STACK</span>
              <div className="space-y-0.5">
                <span className="text-2xl font-display font-bold text-white block">
                  RM {claudeResult.totalRM.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-muted-active font-mono">
                  USD {claudeResult.totalUSD.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / Bulan
                </span>
              </div>
              <div className="text-[10px] text-muted-inactive leading-relaxed border-t border-line/50 pt-2 font-mono">
                • Carian: USD {claudeResult.searchUSD.toFixed(1)}<br />
                • Draf Penulisan: USD {claudeResult.genUSD.toFixed(1)}
              </div>
            </div>

            {/* Campaign Optimized Stack */}
            <div className="p-4 bg-purple-primary/5 rounded border border-purple-primary/30 space-y-2 relative overflow-hidden glow-purple/10">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-primary/10 rounded-full filter blur-lg"></div>
              <span className="text-xs font-mono text-purple-primary font-bold uppercase tracking-wider block">SYOR STACK CAMPURAN</span>
              <div className="space-y-0.5">
                <span className="text-2xl font-display font-bold text-white block">
                  RM {campuranResult.totalRM.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-purple-primary font-mono block">
                  USD {campuranResult.totalUSD.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / Bulan
                </span>
              </div>
              <div className="text-[10px] text-muted-active leading-relaxed border-t border-purple-primary/25 pt-2 font-mono">
                • Carian: USD {campuranResult.searchUSD.toFixed(1)} (Perplexity)<br />
                • Draf Penulisan: USD {campuranResult.genUSD.toFixed(1)} (Gemini 90%)
              </div>
            </div>

          </div>

          {/* Large Savings metrics banner highlight */}
          <div className="p-4 bg-emerald-950/20 text-emerald-300 border border-emerald-900/40 rounded-lg flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
                <TrendingDown size={14} className="mr-1" />
                JUMLAH PENJIMATAN EDITORIAL SEBULAN
              </span>
              <p className="text-lg font-display font-medium">
                Pindah ke pelan campuran menjimatkan kira-kira{" "}
                <span className="text-white font-bold block sm:inline">
                  RM {monthlySavingsRM.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </p>
            </div>
            
            {/* Big savings percentage badge */}
            <div className="flex flex-col items-center justify-center p-3 bg-emerald-900/40 text-emerald-200 rounded border border-emerald-800 shrink-0 select-none">
              <span className="text-2xl font-display font-bold tracking-tight">{savingsPct}%</span>
              <span className="text-[9px] font-mono whitespace-nowrap">JIMAT KOS</span>
            </div>
          </div>

          {/* Detailed explanations */}
          <div className="text-xs text-muted-active leading-relaxed space-y-2 font-sans bg-field p-3.5 rounded border border-line-soft">
            <h4 className="font-bold text-text-2 font-mono flex items-center space-x-1">
              <AlertTriangle size={12} className="text-orange-primary mr-1" />
              <span>Mengapa Terjatuh Penjimatan Begitu Besar?</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-muted-active font-mono text-[11px]">
              <li>**Token Caching & Pengecilan format**: Menyeleksi format tersuai mengurangkan draf input sebanyak <span className="text-white">40%-75%</span>.</li>
              <li>**Syor Model Pintar**: Claude Sonnet adalah "Editor Kanan" mahal ($15/M). Pindahkan berita rutin kepada Gemini Flash-Lite ($0.30/M) memberikan kelancaran penulisan 10x lebih jimat.</li>
              <li>**Sistem Penapisan Carian**: Carian Perplexity mengarkibkan hasil carian mentah tanpa mengejutkan bil input Claude Sonnet yang mahal.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
