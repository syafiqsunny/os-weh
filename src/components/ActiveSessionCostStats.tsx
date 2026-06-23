import React, { useEffect, useState } from "react";
import { Terminal, RefreshCw, Trash2, HelpCircle } from "lucide-react";

interface HistoryItem {
  timestamp: string;
  type: string;
  queryPrompt: string;
  modelUsed: string;
  tokensIn: number;
  tokensOut: number;
  searchesRun: number;
  costUSD: number;
  costRM: number;
  success: boolean;
}

interface CostSessionData {
  totalUSD: number;
  totalRM: number;
  totalCalls: number;
  totalTokensIn: number;
  totalTokensOut: number;
  totalSearches: number;
  history: HistoryItem[];
}

export default function ActiveSessionCostStats() {
  const [sessionData, setSessionData] = useState<CostSessionData | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(4.1516);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const fetchSessionData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cost-session");
      const data = await response.json();
      setSessionData(data.session);
      setExchangeRate(data.rate);
    } catch (e) {
      console.error("Error fetching session cost state:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reset-cost-session", { method: "POST" });
      const data = await response.json();
      setSessionData(data.session);
      setShowResetConfirm(false);
    } catch (e) {
      console.error("Error resetting session cost state:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionData();
    // Poll updates every 6 seconds to capture updates after generations
    const interval = setInterval(fetchSessionData, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-panel border border-line rounded-lg p-5 space-y-4">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-line pb-3">
        <div className="flex items-center space-x-2">
          <Terminal size={18} className="text-purple-primary" />
          <h2 className="text-sm font-display font-bold text-white tracking-wider uppercase">
            REKOD PENERIMAAN BIL API SEBENAR (SESI AKTIF)
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={fetchSessionData}
            disabled={isLoading}
            className="p-1 px-2.5 bg-field hover:bg-panel-hover border border-line rounded text-xs text-muted-active transition cursor-pointer flex items-center space-x-1"
          >
            <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">KEMASKINI</span>
          </button>
          
          {showResetConfirm ? (
            <div className="flex items-center space-x-1.5 animation-fade-in bg-red-950/20 px-2 py-1 rounded border border-red-900/40">
              <span className="text-[10px] text-red-400 font-mono">Pasti?</span>
              <button
                onClick={handleResetSession}
                className="px-2 py-0.5 bg-red-650 hover:bg-red-700 text-white rounded text-[10px] font-mono cursor-pointer uppercase font-bold"
              >
                Ya
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-2 py-0.5 bg-field hover:bg-panel-hover text-muted-active rounded text-[10px] font-mono cursor-pointer uppercase"
              >
                Batal
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowResetConfirm(true)}
              disabled={isLoading || !sessionData || sessionData.history.length === 0}
              className="p-1 px-2.5 bg-red-950/20 hover:bg-red-900/20 border border-red-900/30 rounded text-xs text-red-400 transition cursor-pointer flex items-center space-x-1"
            >
              <Trash2 size={12} />
              <span className="hidden sm:inline font-mono">RE-SET</span>
            </button>
          )}
        </div>
      </div>

      {sessionData ? (
        <div className="space-y-4 font-mono text-xs">
          
          {/* Bento-style aggregated data metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            
            {/* 1. Total Bill RM */}
            <div className="p-3 bg-field/80 rounded border border-line-soft">
              <span className="text-muted-inactive block uppercase text-[9px]">DIKUMPUL (RM)</span>
              <span className="text-lg font-display font-bold text-white block mt-0.5">
                RM {sessionData.totalRM.toLocaleString("en-MY", { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
              </span>
              <span className="text-[10px] text-muted-active">
                USD {sessionData.totalUSD.toLocaleString("en-MY", { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
              </span>
            </div>

            {/* 2. Total API Calls */}
            <div className="p-3 bg-field/80 rounded border border-line-soft">
              <span className="text-muted-inactive block uppercase text-[9px]">TOTAL SERVED CALLS</span>
              <span className="text-lg font-display font-bold text-purple-primary block mt-0.5">
                {sessionData.totalCalls} Calls
              </span>
              <span className="text-[10px] text-muted-active">
                Grounding Searches: {sessionData.totalSearches}
              </span>
            </div>

            {/* 3. Input Tokens */}
            <div className="p-3 bg-field/80 rounded border border-line-soft">
              <span className="text-muted-inactive block uppercase text-[9px]">INPUT TOKENS BILLED</span>
              <span className="text-lg font-display font-bold text-orange-primary block mt-0.5">
                {sessionData.totalTokensIn.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-active">
                Max Instruction Weight
              </span>
            </div>

            {/* 4. Output Tokens */}
            <div className="p-3 bg-field/80 rounded border border-line-soft">
              <span className="text-muted-inactive block uppercase text-[9px]">OUTPUT TOKENS BILLED</span>
              <span className="text-lg font-display font-bold text-emerald-400 block mt-0.5">
                {sessionData.totalTokensOut.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-active">
                Average Compression
              </span>
            </div>

          </div>

          {/* Ledger History List */}
          <div className="space-y-2">
            <h3 className="text-[10px] text-muted-active uppercase tracking-wider block">BIL REGISTER (MOST RECENT CALLS FORWARD)</h3>
            
            {sessionData.history.length === 0 ? (
              <div className="p-6 bg-field/40 rounded border border-line-soft text-center text-muted-inactive italic">
                Tiada panggilan API dikesan untuk sesi ini. Hasilkan carian berita atau draf di tab generator sekarang!
              </div>
            ) : (
              <div className="border border-line rounded overflow-hidden max-h-[220px] overflow-y-auto divide-y divide-line-soft">
                {[...sessionData.history].reverse().map((item, index) => (
                  <div key={index} className="p-3 bg-field/60 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 hover:bg-field transition">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-muted-inactive">[{item.timestamp}]</span>
                        <span className={`text-xs font-bold ${item.success ? "text-purple-primary" : "text-yellow-500"}`}>
                          {item.type}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-panel border border-line text-[9px] text-muted-active font-normal">
                          {item.modelUsed}
                        </span>
                      </div>
                      <p className="text-xs text-text-2 truncate max-w-sm font-sans">
                        Query: <span className="font-semibold text-white">"{item.queryPrompt}"</span>
                      </p>
                    </div>

                    <div className="text-right whitespace-nowrap">
                      <span className="text-xs font-bold text-emerald-400 block">
                        + RM {item.costRM.toFixed(5)}
                      </span>
                      <span className="text-[9px] text-muted-active block">
                        ({item.tokensIn} In | {item.tokensOut} Out {item.searchesRun > 0 ? `| ${item.searchesRun} S` : ""})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      ) : (
        <div className="h-20 flex items-center justify-center text-xs text-muted-active font-mono">
          Memuatkan rekod pangkalan data baji kos...
        </div>
      )}

    </div>
  );
}
