import React, { useState } from "react";
import WarRoom from "./components/WarRoom";
import CostCalculator from "./components/CostCalculator";
import DraftGenerator from "./components/DraftGenerator";
import ActiveSessionCostStats from "./components/ActiveSessionCostStats";
import Settings from "./components/Settings";
import { Compass, Sliders, Sparkles, Terminal, Shield, BookOpen, ExternalLink, Settings as SettingsIcon } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"warroom" | "generator" | "cost" | "settings">("warroom");
  const [generatorTopic, setGeneratorTopic] = useState<string>("");

  // Handler for transfer signal to draft generator from WarRoom click
  const handleSelectTopicForGenerator = (topic: string) => {
    setGeneratorTopic(topic);
    setActiveTab("generator");
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text flex flex-col font-sans selection:bg-purple-primary/30 selection:text-white">
      
      {/* Top Header Navigation Panel */}
      <header className="bg-panel border-b border-line shadow-lg shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-primary to-orange-primary flex items-center justify-center font-display font-bold text-white text-lg tracking-tighter shadow-lg">
              w.
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5 leading-none">
                <span className="font-display font-bold text-white text-base tracking-tight">.weh</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF5A00] bg-orange-primary/10 border border-orange-950 px-1 py-0.2 rounded leading-none">
                  NEWSROOM v2.1
                </span>
              </div>
              <p className="text-[10px] text-muted-active font-mono mt-0.5">Alat Editorial & Kaji Kos API Bersepadu</p>
            </div>
          </div>

          {/* Tab Selection Navigation */}
          <nav className="flex space-x-1 bg-field p-1 rounded-lg border border-line">
            
            <button
               onClick={() => setActiveTab("warroom")}
               className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-xs font-mono font-bold transition cursor-pointer select-none ${
                 activeTab === "warroom" 
                   ? "bg-purple-primary text-white shadow-md" 
                   : "text-muted-active hover:bg-panel-hover"
               }`}
            >
              <Compass size={14} />
              <span>🗺️ WAR ROOM</span>
            </button>

            <button
               onClick={() => setActiveTab("generator")}
               className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-xs font-mono font-bold transition cursor-pointer select-none ${
                 activeTab === "generator" 
                   ? "bg-orange-primary text-white shadow-md border-orange-900/40" 
                   : "text-muted-active hover:bg-panel-hover"
               }`}
            >
              <Sparkles size={14} />
              <span>⚡ GENERATOR</span>
            </button>

            <button
               onClick={() => setActiveTab("cost")}
               className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-xs font-mono font-bold transition cursor-pointer select-none ${
                 activeTab === "cost" 
                   ? "bg-purple-primary text-white shadow-md border-purple-950" 
                   : "text-muted-active hover:bg-panel-hover"
               }`}
            >
              <Sliders size={14} />
              <span>📊 COST ANALYZER</span>
            </button>

            <button
               onClick={() => setActiveTab("settings")}
               className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-xs font-mono font-bold transition cursor-pointer select-none ${
                 activeTab === "settings" 
                   ? "bg-orange-primary text-white shadow-md" 
                   : "text-muted-active hover:bg-panel-hover"
               }`}
            >
              <SettingsIcon size={14} />
              <span>⚙️ SETTINGS</span>
            </button>

          </nav>

          {/* Floating Instructions/Privacy guidelines Badge */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-muted-active bg-field px-3 py-1.5 border border-line rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>API SERVER: ONLINE</span>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 flex flex-col space-y-5 overflow-y-auto">
        
        {/* Render Active View tab */}
        <div className="flex-1">
          {activeTab === "warroom" && (
            <div className="h-[calc(100vh-140px)] min-h-[580px]">
              <WarRoom onSelectTopicForGenerator={handleSelectTopicForGenerator} />
            </div>
          )}

          {activeTab === "generator" && (
            <div className="space-y-6">
              
              {/* Context prefilled alert banner */}
              {generatorTopic && (
                <div className="p-3.5 bg-purple-primary/10 border border-purple-primary/30 text-purple-primary text-xs rounded-lg flex items-center justify-between font-mono animate-pulse-glow">
                  <span>🚀 TOPIK DIPINDAHKAN DARIPADA WAR ROOM: "<strong>{generatorTopic}</strong>"</span>
                  <button 
                    onClick={() => setGeneratorTopic("")} 
                    className="hover:text-white transition uppercase text-[10px] underline cursor-pointer"
                  >
                    OS-RESET
                  </button>
                </div>
              )}

              <DraftGenerator prefilledTopic={generatorTopic} />
              
              {/* Show live Cost tracker right below editor to keep cost study relevant */}
              <ActiveSessionCostStats />

            </div>
          )}

          {activeTab === "cost" && (
            <div className="space-y-6">
              <CostCalculator />
              <ActiveSessionCostStats />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <Settings />
            </div>
          )}
        </div>

        {/* Footer Editorial Principles banner */}
        <footer className="shrink-0 text-center py-4 text-[11px] text-muted-inactive font-mono border-t border-line/40 space-y-1.5 select-none">
          <p>© 2026 .weh Editorial Network. Alat khas kegunaan dalaman newsroom sahaja.</p>
          <div className="flex justify-center space-x-4">
            <span className="flex items-center"><Shield size={11} className="mr-1" /> Noindex & Nofollow</span>
            <span>•</span>
            <span className="flex items-center"><BookOpen size={11} className="mr-1" /> Panduan Pembelian Token</span>
            <span>•</span>
            <a href="https://newsroom.weh.my" className="hover:text-purple-primary transition flex items-center">
              newsroom.weh.my <ExternalLink size={10} className="ml-0.5" />
            </a>
          </div>
        </footer>

      </main>

    </div>
  );
}
