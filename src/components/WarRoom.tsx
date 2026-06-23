import React, { useState, useEffect, useRef } from "react";
import { TrendSignal } from "../types";
import { mockTrendsData } from "../data/mockTrends";
import { 
  ArrowUp, 
  ArrowDown, 
  Search, 
  ShieldAlert, 
  Tv, 
  Play, 
  Pause, 
  Maximize2, 
  Download, 
  Activity, 
  Compass, 
  Sliders, 
  CheckCircle,
  HelpCircle,
  Share2,
  Clock
} from "lucide-react";

interface WarRoomProps {
  onSelectTopicForGenerator: (topic: string) => void;
}

export default function WarRoom({ onSelectTopicForGenerator }: WarRoomProps) {
  const [trends, setTrends] = useState<TrendSignal[]>(mockTrendsData);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [timeStr, setTimeStr] = useState<string>("");
  const [systemLogs, setSystemLogs] = useState<string>("");
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedTrend = trends[selectedIndex];

  // Set up Malaysia UTC+8 Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Adjust timezone to Kuala Lumpur/Malaysia
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kuala_Lumpur",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(now);
      setTimeStr(`${formatted} MYT`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Autoplay cycle every 8 seconds
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (isAutoplay) {
      timerRef.current = setInterval(() => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % trends.length);
      }, 8000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, trends.length]);

  // Arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIsAutoplay(false); // Pause auto on manual click/navigation
        setSelectedIndex((prev) => (prev - 1 + trends.length) % trends.length);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsAutoplay(false);
        setSelectedIndex((prev) => (prev + 1) % trends.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [trends.length]);

  // Handle Export Snapshot JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trends, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `weh-warroom-trends-snapshot.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    setSystemLogs("Snapshot JSON Berjaya dieksport!");
    setTimeout(() => setSystemLogs(""), 3000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Politik": return "text-red-500 bg-red-950/40 border-red-900";
      case "Ekonomi": return "text-orange-primary bg-orange-950/40 border-orange-900/50";
      case "Bencana": return "text-blue-400 bg-blue-950/40 border-blue-900";
      case "Budaya": return "text-purple-primary bg-purple-950/40 border-purple-900/50";
      default: return "text-emerald-400 bg-emerald-950/40 border-emerald-950";
    }
  };

  const currentPlatformIntelligence = () => {
    // Generate realistic relative numbers for comparison
    const base = selectedTrend.score;
    return {
      google: Math.min(100, Math.round(base * 1.05)),
      twitter: Math.min(100, Math.round(base * 0.95)),
      threads: Math.min(100, Math.round(base * 0.84)),
      tiktok: Math.min(100, Math.round(base * 0.78)),
      news: Math.min(100, Math.round(base * 0.9))
    };
  };

  const pi = currentPlatformIntelligence();

  return (
    <div className="flex flex-col h-full bg-dark-bg text-text select-none overflow-hidden" id="war-room-fullscreen">
      
      {/* Upper Status Ticker & Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-panel border-b border-line text-xs font-mono">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-purple-primary font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-sans tracking-tight">WAR ROOM : LIVE MONITOR</span>
          </div>
          <div className="hidden lg:flex items-center space-x-3 text-muted-active">
            <span>PLATFORM: EXPRESS + VITE nginx</span>
            <span>|</span>
            <span>PORT.3000 STATE: OK</span>
            <span>|</span>
            <span className="text-orange-primary">{systemLogs || "AUTOPLAY CYCLE ACTIVE (8s)"}</span>
          </div>
        </div>

        {/* Real-Time Malaysia Clock */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded border font-sans text-xs transition ${
              isAutoplay 
                ? "bg-purple-primary/20 text-purple-primary border-purple-primary/50" 
                : "bg-panel text-muted-active border-line"
            }`}
            title="Kiosk Auto Playback Modes"
          >
            {isAutoplay ? <Pause size={12} /> : <Play size={12} />}
            <span>{isAutoplay ? "PAUSE AUTO" : "AUTO PLAY"}</span>
          </button>

          <button 
            onClick={handleExportJSON}
            className="flex items-center space-x-1 px-2.5 py-1 rounded border border-line bg-panel hover:bg-panel-hover text-muted-active transition"
            title="Eksport Papan Data JSON"
          >
            <Download size={12} />
            <span className="hidden sm:inline">EXPORT</span>
          </button>

          <div className="flex items-center space-x-1 text-white bg-purple-primary/10 border border-purple-primary/30 px-3 py-1 rounded font-mono text-sm leading-none">
            <Clock size={14} className="text-purple-primary animate-spin-slow mr-1" />
            <span>{timeStr || "00:00:00 MYT"}</span>
          </div>
        </div>
      </header>

      {/* Main Multi-Panel Grid layout (Exact Three Zon Constraints) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 p-3 overflow-hidden">
        
        {/* ZON 1: Live Ranking Signals (Col-span 3) */}
        <div className="md:col-span-3 flex flex-col bg-panel border border-line rounded-lg overflow-hidden">
          <div className="p-3 bg-panel-hover border-b border-line flex justify-between items-center">
            <span className="font-display font-bold text-sm tracking-widest text-muted-active">ZON 1: RANKING SIGNAL</span>
            <span className="text-xs bg-purple-primary/20 text-purple-primary px-1.5 py-0.5 rounded font-mono">10 TRENDS</span>
          </div>

          {/* Signals List Container */}
          <div className="flex-1 overflow-y-auto divide-y divide-line-soft">
            {trends.map((item, index) => {
              const active = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsAutoplay(false); // Stop auto cycling
                    setSelectedIndex(index);
                  }}
                  className={`p-3 cursor-pointer transition relative ${
                    active 
                      ? "bg-purple-primary/10 border-l-2 border-purple-primary" 
                      : "hover:bg-panel-hover/50"
                  }`}
                >
                  <div className="flex justify-between items-start space-x-2">
                    <div className="flex items-baseline space-x-2 min-w-0">
                      <span className={`font-mono text-sm font-bold ${active ? 'text-purple-primary' : 'text-muted-active'}`}>
                        #{item.rank}
                      </span>
                      <p className={`text-sm truncate font-medium ${active ? 'text-white font-bold' : 'text-text-2'}`}>
                        {item.keyword}
                      </p>
                    </div>
                    {/* Score Badge */}
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                        item.score > 90 ? 'bg-red-500/10 text-red-400' : 'bg-orange-primary/10 text-orange-primary'
                      }`}>
                        {item.score}
                      </span>
                    </div>
                  </div>

                  {/* Badges row */}
                  <div className="flex justify-between items-center mt-2 text-[10px]">
                    <span className={`px-1.5 py-0.2 rounded border uppercase font-mono ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-muted-inactive font-mono">
                      Vel: <span className={item.velocity === "Meningkat Tegak" ? "text-red-400" : "text-muted-active"}>{item.velocity}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left panel instructions hint footer */}
          <div className="p-3 bg-panel-hover border-t border-line text-[11px] text-muted-inactive flex justify-between items-center font-mono">
            <span>ANAK PANAH ⬆ ⬇ UNTUK INTERAKSI</span>
            <span>[AUTOPLAY: {isAutoplay ? "AKTIF" : "OFF"}]</span>
          </div>
        </div>

        {/* ZON 2: Command Tactical View (Col-span 5) */}
        <div className="md:col-span-5 flex flex-col bg-panel border border-line rounded-lg overflow-hidden">
          <div className="p-3 bg-panel-hover border-b border-line flex justify-between items-center">
            <span className="font-display font-bold text-sm tracking-widest text-muted-active">ZON 2: COMMAND VIEW</span>
            <div className="flex items-center space-x-2 text-xs font-mono bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span>ISU UTAMA</span>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            
            {/* Main Title Section */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-orange-primary/20 text-orange-primary border border-orange-900/50 px-2 py-0.4 rounded font-mono">
                  WEH TREND SCORE: {selectedTrend.score}
                </span>
                <span className="text-xs bg-panel-hover border border-line px-2 py-0.4 rounded font-mono text-muted-active">
                  DIVERSITY: {selectedTrend.sourceDiversity} DOMAINS
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold tracking-tight text-white glow-purple/10">
                {selectedTrend.keyword}
              </h2>
              <p className="text-xs text-muted-active font-mono uppercase">
                Kategori: {selectedTrend.category} | Velocity: <span className="text-red-400 font-bold">{selectedTrend.velocity}</span>
              </p>
            </div>

            {/* Tactical Brief Container (Editorial Intelligence) */}
            <div className="p-4 bg-field rounded border border-line-soft space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-primary/5 rounded-full filter blur-xl"></div>
              <div className="flex items-center space-x-2 text-xs font-bold text-purple-primary font-mono select-none">
                <Activity size={12} className="animate-pulse" />
                <span>HOURLY INTELLIGENCE BRIEF</span>
              </div>
              <p className="text-sm text-text-2 leading-relaxed">
                {selectedTrend.fullIntelBrief}
              </p>
            </div>

            {/* Mentions / Sources Feed list */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-muted-active">
                <span>WAR ROOM FEED (MENTIONS SUMMARY)</span>
                <span>4 SOURCE EXCERPTS MAP</span>
              </div>
              <div className="space-y-2">
                {selectedTrend.sources.map((src, sIdx) => (
                  <div key={sIdx} className="p-2.5 bg-panel-hover/40 rounded border border-line-soft hover:border-line transition flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-primary mt-1.5 shrink-0"></span>
                    <p className="text-xs text-text-2 leading-relaxed">{src}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Block */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button 
                onClick={() => onSelectTopicForGenerator(selectedTrend.keyword)}
                className="w-full flex justify-center items-center space-x-2 py-2.5 px-4 bg-purple-primary hover:bg-purple-primary/90 text-white rounded text-sm font-sans font-bold transition text-center shadow-lg hover:glow-purple cursor-pointer"
              >
                <span>HANTAR KE GENERATOR PENULISAN (.WEH DRAFT)</span>
              </button>
            </div>

          </div>
        </div>

        {/* ZON 3: Platform Intelligence (Col-span 4) */}
        <div className="md:col-span-4 flex flex-col bg-panel border border-line rounded-lg overflow-hidden">
          <div className="p-3 bg-panel-hover border-b border-line flex justify-between items-center">
            <span className="font-display font-bold text-sm tracking-widest text-muted-active">ZON 3: PLATFORM INTEL</span>
            <span className="text-xs bg-orange-primary/20 text-orange-primary px-1.5 py-0.5 rounded font-mono animate-pulse">LIVE SCORING</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">

            {/* Signal Matrix & Bar gauges */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-muted-active tracking-wider uppercase">SIGNAL MATRIX STACK</h4>
              <div className="space-y-3">
                
                {/* Google Search */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-2">Google Trends Index</span>
                    <span className="text-purple-primary font-bold">{pi.google}%</span>
                  </div>
                  <div className="h-1.5 bg-field rounded-full overflow-hidden">
                    <div className="h-full bg-purple-primary rounded-full" style={{ width: `${pi.google}%` }}></div>
                  </div>
                </div>

                {/* Twitter / X */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-2">Twitter/X Velocity</span>
                    <span className="text-white font-bold">{pi.twitter}%</span>
                  </div>
                  <div className="h-1.5 bg-field rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${pi.twitter}%` }}></div>
                  </div>
                </div>

                {/* Threads */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-2">Threads Engagement</span>
                    <span className="text-orange-primary font-bold">{pi.threads}%</span>
                  </div>
                  <div className="h-1.5 bg-field rounded-full overflow-hidden">
                    <div className="h-full bg-orange-primary rounded-full" style={{ width: `${pi.threads}%` }}></div>
                  </div>
                </div>

                {/* TikTok views */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-2">TikTok Viral Weight</span>
                    <span className="text-emerald-400 font-bold">{pi.tiktok}%</span>
                  </div>
                  <div className="h-1.5 bg-field rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pi.tiktok}%` }}></div>
                  </div>
                </div>

                {/* Editorial News portals */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-text-2">News portals (Rilis Media)</span>
                    <span className="text-blue-400 font-bold">{pi.news}%</span>
                  </div>
                  <div className="h-1.5 bg-field rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${pi.news}%` }}></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Risk Factors Radar Indicators */}
            <div className="p-3 bg-field rounded border border-line-soft space-y-3">
              <div className="flex items-center space-x-1 border-b border-line pb-1 text-xs font-bold text-muted-active font-mono">
                <ShieldAlert size={12} className="text-red-400 animate-pulse-glow" />
                <span>RISK MATRIX RADAR</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-panel rounded border border-line-soft flex flex-col justify-center">
                  <span className="text-muted-inactive font-mono text-[10px]">3R RISK LEVEL</span>
                  <span className={`text-sm font-display font-bold mt-0.5 ${
                    selectedTrend.risk3R === "Tinggi" ? 'text-red-400' : (selectedTrend.risk3R === "Sederhana" ? 'text-orange-primary' : 'text-emerald-400')
                  }`}>
                    {selectedTrend.risk3R}
                  </span>
                </div>

                <div className="p-2 bg-panel rounded border border-line-soft flex flex-col justify-center">
                  <span className="text-muted-inactive font-mono text-[10px]">VALUASI EDITORIAL</span>
                  <span className="text-sm font-display font-bold mt-0.5 text-blue-400">
                    {selectedTrend.newsValue}
                  </span>
                </div>
              </div>

              {/* Warnings based on high risks */}
              {selectedTrend.risk3R === "Tinggi" && (
                <div className="p-2.5 bg-red-950/30 text-red-300 border border-red-900 rounded text-[11px] leading-relaxed">
                  ⚠️ **[AMARAN EDITOR]**: Kandungan mengandungi risiko 3R tinggi (Politik/Sensasi Kaum). Penulisan WEH draf wajib mengekalkan neutraliti dan fokus semakan fakta (WEH CHECK).
                </div>
              )}
            </div>

            {/* Category Heat Distribution (Virtual simulation for entire dataset) */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-muted-active uppercase">CATEGORY DISTRIBUTION HEATMAP</h4>
              <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono">
                <div className="p-2 bg-orange-950/20 text-orange-primary border border-orange-900/30 rounded">
                  <div>EKONOMI</div>
                  <div className="font-bold text-sm mt-0.5">4 Topik</div>
                </div>
                <div className="p-2 bg-red-950/20 text-red-400 border border-red-900/30 rounded">
                  <div>POLITIK</div>
                  <div className="font-bold text-sm mt-0.5">2 Topik</div>
                </div>
                <div className="p-2 bg-blue-950/20 text-blue-400 border border-blue-900/30 rounded">
                  <div>BENCANA</div>
                  <div className="font-bold text-sm mt-0.5">1 Topik</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Breaking Signal Ticker */}
      <footer className="bg-panel border-t border-line py-1.5 px-4 text-xs font-mono flex items-center justify-between text-muted-active">
        <div className="flex items-center space-x-3 w-full overflow-hidden">
          <span className="text-red-500 font-bold whitespace-nowrap flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-1.5"></span>
            BREAKING SIGNAL:
          </span>
          {/* Animated Marquee text */}
          <div className="overflow-hidden w-full relative">
            <span className="inline-block animate-marquee whitespace-nowrap text-text text-sm">
              [METMALAYSIA 22:45]: AMARAN RIBUT PETIR TAHAP BAHAYA DI PANTAI TIMUR SEMENANJUNG MALAYSIA... [PARLIMEN]: PEMBENTANGAN STRUKTUR SUBSIDI PETROL RON95 DIJADUALKAN KHAMIS INI, UNJURAN PENJIMATAN KAPASITI RM4.1 BILION... [GISB UPDATE]: KEMENTERIAN LUAR UMUM PEMBATALAN PASPORT 10 AHLI ATASAN TERLIBAT...
            </span>
          </div>
        </div>
      </footer>

      {/* Styled inline animation for marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(20%, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}
