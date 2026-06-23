import React, { useState, useEffect, useRef } from "react";
import { TrendSignal } from "../types";
import { mockTrendsData } from "../data/mockTrends";
import { safeStorage } from "../lib/safeStorage";
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
  Clock,
  TrendingUp,
  AlertTriangle,
  Globe,
  MapPin,
  Users,
  Radio,
  FileText,
  RefreshCw,
  Briefcase,
  Grid,
  Video,
  Layers,
  MessageSquare,
  CheckSquare,
  Plus,
  Twitter
} from "lucide-react";

interface WarRoomProps {
  onSelectTopicForGenerator: (topic: string, context: string, url: string) => void;
}

export default function WarRoom({ onSelectTopicForGenerator }: WarRoomProps) {
  // Database states
  const [trends, setTrends] = useState<TrendSignal[]>(mockTrendsData);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [timeStr, setTimeStr] = useState<string>("");
  const [systemLogs, setSystemLogs] = useState<string>("");
  
  // Tabs & Filters
  const [activeTab, setActiveTab] = useState<"console" | "trendroom" | "x_radar">("trendroom");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Twitter X states
  const [xSearchQuery, setXSearchQuery] = useState<string>("Malaysia");
  const [xTweets, setXTweets] = useState<any[]>([]);
  const [isSearchingX, setIsSearchingX] = useState<boolean>(false);
  const [xInfo, setXInfo] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  
  // Standalone Micropage state
  const [activeMicropageId, setActiveMicropageId] = useState<string | null>(null);
  
  // Custom interactive period on Micropage chart
  const [chartPeriod, setChartPeriod] = useState<"1h" | "6h" | "12h" | "24h" | "7d" | "30d">("24h");
  
  // Watchlist simulation
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Twitter/X v2 Real API Search + Fallback simulation
  const fetchXTweets = async (queryStr: string) => {
    setIsSearchingX(true);
    setXInfo("");
    try {
      const savedXKey = safeStorage.getItem("weh_x_api_key") || "";
      const response = await fetch("/api/x/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-x-key": savedXKey
        },
        body: JSON.stringify({ query: queryStr })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setXTweets(data.tweets || []);
        if (data.isSimulated) {
          setXInfo("Mod Simulasi Aktif (Tiada Kunci X/Twitter disetkan)");
        } else {
          setXInfo("");
        }
      } else {
        setXInfo("Ralat memuatkan Tweet: " + (data.error || "Sila masukkan Kunci API di Settings."));
      }
    } catch (err: any) {
      setXInfo("Error: " + err.message);
    } finally {
      setIsSearchingX(false);
    }
  };

  useEffect(() => {
    if (activeTab === "x_radar" && xTweets.length === 0) {
      fetchXTweets(xSearchQuery);
    }
  }, [activeTab]);

  // Malaysia Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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

  // Autoplay cycle for Console tab when active
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (isAutoplay && activeTab === "console" && trends.length > 0) {
      timerRef.current = setInterval(() => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % trends.length);
      }, 7000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, trends.length, activeTab]);

  // Keyboard navigation for Console tab
  useEffect(() => {
    if (trends.length === 0 || activeTab !== "console") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIsAutoplay(false);
        setSelectedIndex((prev) => (prev - 1 + trends.length) % trends.length);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsAutoplay(false);
        setSelectedIndex((prev) => (prev + 1) % trends.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [trends.length, activeTab]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentTrend = trends[selectedIndex] || trends[0];

  // Helper colors for categories
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Politik": return "text-red-400 bg-red-950/40 border-red-900";
      case "Ekonomi": return "text-amber-400 bg-amber-950/40 border-amber-900/50";
      case "Bencana": return "text-blue-400 bg-blue-950/40 border-blue-900/40";
      case "Budaya": return "text-purple-400 bg-purple-950/40 border-purple-900/40";
      case "Teknologi": return "text-cyan-400 bg-cyan-950/40 border-cyan-900/40";
      case "Sosial": return "text-pink-400 bg-pink-950/40 border-pink-900/40";
      default: return "text-emerald-400 bg-emerald-950/40 border-emerald-950";
    }
  };

  const getVerificationBadge = (status?: string) => {
    switch (status) {
      case "Disahkan":
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-1.5 py-0.5 rounded font-bold font-mono">DISAHKAN</span>;
      case "Sebahagian Disahkan":
        return <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[10px] px-1.5 py-0.5 rounded font-bold font-mono">SEBAHAGIAN DISAHKAN</span>;
      case "Belum Disahkan":
        return <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] px-1.5 py-0.5 rounded font-bold font-mono animate-pulse">BELUM DISAHKAN</span>;
      case "Dipertikaikan":
        return <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 text-[10px] px-1.5 py-0.5 rounded font-bold font-mono">DIPERTIKAIKAN</span>;
      case "Palsu":
        return <span className="bg-red-950/40 text-red-500 border border-red-900 text-[10px] px-1.5 py-0.5 rounded font-bold font-mono uppercase">DIKESAN PALSU</span>;
      default:
        return <span className="bg-gray-500/10 text-gray-400 border border-gray-500/30 text-[10px] px-1.5 py-0.5 rounded font-bold font-mono">MENUNGGU VERIFIKASI</span>;
    }
  };

  const getPlatformIcon = (plat?: string) => {
    // Return letters or indicators
    return <span className="font-mono text-[9px] bg-white/5 border border-white/10 text-white/80 px-1 rounded uppercase tracking-wider">{plat || "Web"}</span>;
  };

  // Export JSON Snapshot
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trends, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `weh-trendroom30-export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("Data snapshot berjaya dieksport!");
  };

  // State Map List (Section 11) - Clickable states that filter active trends
  const malaysiaStates = [
    { name: "Johor", trends: ["PRN Johor 2026", "Pencemaran Sungai Kim Kim Baru", "Geng Curi Kereta Sempadan"], keywords: ["Pasir Gudang", "Sempadan", "SPR"] },
    { name: "Kelantan & Terengganu", trends: ["Banjir Pantai Timur & Amaran Jingga"], keywords: ["Monsun", "NADMA", "PPS"] },
    { name: "Kuala Lumpur", trends: ["Isu Pemilikan Tanah Kampung Baru", "Subsidi Pas Bulanan LRT My50", "Kadar Dividen KWSP Terkini", "Keganasan Siber & Buli Netizen", "Kecerdasan Buatan (AI) Malaysia", "Subsidi Pas Bulanan LRT My50"], keywords: ["DBKL", "Prasarana", "MIMOS", "MCMC"] },
    { name: "Selangor", trends: ["Hospital Awam Selangor Sesak", "Keganasan Siber & Buli Netizen", "Subsidi Pas Bulanan LRT My50"], keywords: ["HTAR", "Klang", "Influenza"] },
    { name: "Melaka", trends: ["Ransomware Hospital Melaka"], keywords: ["Server Down", "IT", "Klinik"] },
    { name: "Kedah & Perlis", trends: ["Amaran Gelombang Haba El Nino", "Isu Pengaruh Doktrin Perlis"], keywords: ["Suhu Kuning", "MADA", "Kem"] },
    { name: "Pahang", trends: ["Pengeksportan Durian Musang King"], keywords: ["Raub", "MyGAP", "Shanghai"] },
    { name: "Sabah & Sarawak", trends: ["Status Autonomi Wilayah Labuan"], keywords: ["Borneo", "Autonomi", "Minyak"] }
  ];

  // 50 Keyword Panas Tag Cloud (Section 6)
  const hot50Keywords = [
    "RON95", "Subsidi", "PADU", "PRN Johor", "Undi18", "MySejahtera", "Siber", "Banjir", "MetMalaysia", "GISB", 
    "JAKIM", "Buli Siber", "MCMC", "KWSP", "Akaun 3", "AI", "NVIDIA", "MIMOS", "Kampung Baru", "Rizab Melayu", 
    "My50", "LRT", "Gaji Progresif", "KPDN", "Kim Kim", "Sisa Toksik", "RFID Sekolah", "KPM", "Kerja 4 Hari", "Work-Life", 
    "Rumah Pertama", "KPKT", "Scam Kripto", "PDRM", "El Nino", "Kemarau", "Musang King", "Eksport", "FAMA", "Inflasi", 
    "DOSM", "Ransomware", "Hospital", "Doktrin", "Perlis", "Curi Kereta", "Kastam", "PRU16", "Parlimen", "Mikroplastik", 
    "Labuan", "Autonomi", "COVID-19", "MCO", "Selangor", "HTAR", "Handphone", "Asrama", "Tol RFID"
  ];

  // System Logs Stream (Section 12)
  const recentActivities = [
    { time: "5:54 petang", log: "Sistem mengesan lonjakan sebutan 'MySejahtera' sebanyak +86% dalam radar Threads." },
    { time: "5:42 petang", log: "Kenyataan rasmi NADMA dimasukkan mengesahkan integriti empangan Pantai Timur." },
    { time: "5:21 petang", log: "Kategori 'Budaya' diisytiharkan risiko 3R tinggi berikutan siasatan isu GISB." },
    { time: "5:08 petang", log: "Laporan kesesakan hospital Selangor disahkan oleh Jabatan Kesihatan Negeri." },
    { time: "4:51 petang", log: "Runtuhan sensor RFID dikesan di 3 buah sekolah; status penarafan diubah ke 'Disahkan'." },
    { time: "4:30 petang", log: "Daf draf poster PRU Disember diklasifikasikan sebagai 'Dikesan Palsu' oleh MCMC." }
  ];

  // Filter trends based on Search keyword, category and locations
  const filteredTrends = trends.filter(t => {
    const matchesSearch = searchQuery === "" || 
      t.keyword.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.fullIntelBrief && t.fullIntelBrief.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.apaYangBerlaku && t.apaYangBerlaku.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;

    const matchesState = selectedState === "all" || (() => {
      const stateObj = malaysiaStates.find(s => s.name === selectedState);
      return stateObj ? stateObj.trends.includes(t.keyword) : true;
    })();

    return matchesSearch && matchesCategory && matchesState;
  });

  // Grouping 30 trends exactly as Section 1
  const top10HotNow = filteredTrends.filter(t => t.rank <= 10);
  const rising10 = filteredTrends.filter(t => t.rank > 10 && t.rank <= 20);
  const watchlistRadar = filteredTrends.filter(t => t.rank > 20);

  // Active trend metrics used for charts in Micropage
  const selectedTrendForMicropage = trends.find(t => t.id === activeMicropageId) || trends[0];

  // Cost matrix or Platform Intelligence percentages
  const pi = {
    google: Math.min(100, Math.round((currentTrend?.score || 50) * 1.05)),
    twitter: Math.min(100, Math.round((currentTrend?.score || 50) * 0.95)),
    threads: Math.min(100, Math.round((currentTrend?.score || 50) * 0.84)),
    tiktok: Math.min(100, Math.round((currentTrend?.score || 50) * 0.78)),
    news: Math.min(100, Math.round((currentTrend?.score || 50) * 0.9))
  };

  const toggleWatchlist = (id: string, keyword: string) => {
    if (watchlist.includes(id)) {
      setWatchlist(prev => prev.filter(item => item !== id));
      triggerToast(`'${keyword}' dibuang dari Watchlist.`);
    } else {
      setWatchlist(prev => [...prev, id]);
      triggerToast(`'${keyword}' ditambahkan ke Watchlist.`);
    }
  };

  // If a Micropage deep dive is being viewed
  if (activeMicropageId) {
    const mt = selectedTrendForMicropage;
    return (
      <div className="flex flex-col h-full bg-dark-bg text-text select-none overflow-y-auto p-4 space-y-6" id="micropage-layout">
        
        {/* Toast Notification element */}
        {toastMessage && (
          <div className="fixed bottom-4 right-4 z-50 bg-[#FF5A00] text-white px-4 py-2 rounded-lg font-sans font-medium shadow-2xl animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-line pb-4 gap-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveMicropageId(null)}
              className="px-4 py-1.5 bg-field hover:bg-panel border border-line rounded-lg text-xs font-mono font-bold text-muted-active hover:text-white transition cursor-pointer"
            >
              ← KEMBALI KE PAPAN PEMUKA
            </button>
            <span className="text-xs font-mono text-muted-inactive">/</span>
            <span className="text-xs font-mono text-muted-active">ZON DETEKSI MICRO-PAGE</span>
            <span className="text-xs font-mono text-muted-inactive">/</span>
            <span className="text-xs font-mono text-purple-primary font-bold">{mt.id.toUpperCase()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setXSearchQuery(mt.keyword);
                setActiveTab("x_radar");
                setActiveMicropageId(null);
                fetchXTweets(mt.keyword);
              }}
              className="px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Twitter size={14} />
              <span>🔍 PENCERAPAN X RADAR ({mt.keyword})</span>
            </button>
            <button
              onClick={() => toggleWatchlist(mt.id, mt.keyword)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition flex items-center space-x-1.5 ${
                watchlist.includes(mt.id)
                  ? "bg-orange-primary/20 text-orange-primary border-orange-primary/50"
                  : "bg-panel text-muted-active border-line hover:text-white"
              }`}
            >
              <Plus size={14} className={watchlist.includes(mt.id) ? "rotate-45 transition-transform" : ""} />
              <span>{watchlist.includes(mt.id) ? "DALAM WATCHLIST" : "PANTAU PREMIS (WATCHLIST)"}</span>
            </button>
            <span className="text-xs font-mono text-muted-active bg-field p-1.5 border border-line rounded-lg flex items-center">
              <Clock size={12} className="mr-1 text-purple-primary" /> Kemas kini: {mt.waktuKemasKini || "Baru sahaja"}
            </span>
          </div>
        </div>

        {/* BAHAGIAN 1 — RINGKASAN UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-panel border border-line rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-primary/5 rounded-full filter blur-3xl"></div>
          
          {/* Left Summary details */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-white bg-purple-primary/20 border border-purple-primary/30 px-2 py-0.5 rounded">
                RANKING #{mt.rank}
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border uppercase ${getCategoryColor(mt.category)}`}>
                {mt.category}
              </span>
              <span className="text-xs font-mono text-muted-active bg-field px-2 py-0.5 border border-line-soft rounded">
                Vertikal: {mt.vertical || "WEH Siasat"}
              </span>
              {getVerificationBadge(mt.statusPengesahan)}
            </div>
            
            <h1 className="text-3xl font-display font-bold text-white leading-tight tracking-tight">
              {mt.keyword}
            </h1>
            
            <p className="text-sm text-text-2 leading-relaxed bg-field/30 p-3 rounded-lg border border-line-soft font-mono italic">
              " {mt.fullIntelBrief} "
            </p>
          </div>

          {/* Right Signal Board Numbers */}
          <div className="md:col-span-4 grid grid-cols-2 gap-3 self-center">
            
            <div className="p-3 bg-field rounded-lg border border-line-soft text-center">
              <span className="block text-muted-inactive font-mono text-[10px]">TREND HEAT SCORE</span>
              <span className="block font-display font-bold text-3xl text-orange-primary mt-1">{mt.score}</span>
              <span className="block text-[10px] text-green-400 font-mono mt-1">{mt.growthRate || "+45% 1h"}</span>
            </div>

            <div className="p-3 bg-field rounded-lg border border-line-soft text-center">
              <span className="block text-muted-inactive font-mono text-[10px]">CONFIDENCE INDEX</span>
              <span className="block font-display font-bold text-3xl text-purple-primary mt-1">{mt.confidenceScore || 85}%</span>
              <span className="block text-[10px] text-muted-active font-mono mt-1">{mt.sourceDiversity} Domain</span>
            </div>

            <div className="p-3 bg-field rounded-lg border border-line-soft text-center">
              <span className="block text-muted-inactive font-mono text-[10px]">3R PUBLIC RISK</span>
              <span className={`block font-display font-bold text-lg mt-1.5 ${
                mt.risk3R === "Tinggi" ? 'text-red-400' : 'text-emerald-400'
              }`}>{mt.risk3R || "Sederhana"}</span>
              <span className="block text-[9px] text-muted-inactive font-mono mt-1 uppercase">Race/Rel/Roy</span>
            </div>

            <div className="p-3 bg-field rounded-lg border border-line-soft text-center">
              <span className="block text-muted-inactive font-mono text-[10px]">MUTABILITI BULANAN</span>
              <span className="block font-display font-bold text-lg text-cyan-400 mt-1.5">Stabil</span>
              <span className="block text-[9px] text-[#FF5A00] font-mono mt-1 font-bold">{mt.mentionCount || "Sederhana"}</span>
            </div>

          </div>
        </div>

        {/* BAHAGIAN 2 — APA YANG BERLAKU & BAHAGIAN 3 — FAKTA/DAKWAAN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* NarrativeBM */}
          <div className="lg:col-span-6 bg-panel border border-line rounded-xl p-5 space-y-4">
            <div className="flex items-center space-x-2 border-b border-line pb-2">
              <FileText size={16} className="text-purple-primary" />
              <h2 className="font-display font-bold text-white text-base">BAHAGIAN 2: ULASAN PERISTIWA (BM NARRATIVE)</h2>
            </div>
            
            <p className="text-text-2 text-sm leading-relaxed p-4 bg-field rounded-lg text-justify border border-line-soft">
              {mt.apaYangBerlaku || `Kehangatan dikesan berikutan perkongsian bertubi-tubi maklum balas masyarakat pelbagai platform berkenaan isu semasa '${mt.keyword}'. Sentimen dikuasai elemen pertikaian fakta, persoalan kesediaan pelbagai agensi kerajaan dalam mengawal selia proses fizikal di luar premis, serta khabar angin liar media sosial.`}
            </p>

            <div className="rounded-lg p-3.5 bg-orange-950/20 text-orange-400 text-xs border border-orange-900 leading-relaxed space-y-1">
              <strong>💡 STRATEGI EDITORIAL WEH:</strong> 
              <p>Artikel weh.news mestilah membongkar dakyah emosi siber, membandingkan fakta kos bersih, tidak berpihak, serta wajib menyediakan Kotak Twist (Sudut Jujur yang diabaikan rilis portal media arus perdana).</p>
            </div>
          </div>

          {/* Quadrant blocks Facts Check */}
          <div className="lg:col-span-6 bg-panel border border-line rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-emerald-400" />
                <h2 className="font-display font-bold text-white text-base">BAHAGIAN 3: VERACITY MATRIX (4 QUADRANTS)</h2>
              </div>
              <span className="text-xs bg-field px-2 py-0.5 rounded font-mono text-muted-active">SUMBER INTEGRITI</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              
              {/* Q1: Verified */}
              <div className="p-3 bg-emerald-950/25 border border-emerald-900/60 rounded-lg space-y-1.5">
                <span className="text-emerald-400 font-mono font-bold block">1. FAKTA SAHIH DISAHKAN</span>
                <ul className="list-disc pl-4 space-y-1 text-emerald-200 text-[11px]">
                  {mt.faktaDisahkan && mt.faktaDisahkan.map((f, idx) => <li key={idx}>{f}</li>) || (
                    <li>Telah disahkan secara rasmi dalam warta kementerian.</li>
                  )}
                </ul>
              </div>

              {/* Q2: Rumors */}
              <div className="p-3 bg-amber-950/20 border border-amber-900/50 rounded-lg space-y-1.5">
                <span className="text-amber-400 font-mono font-bold block">2. DAKWAAN BELUM SAHIH (VIRAL)</span>
                <ul className="list-disc pl-4 space-y-1 text-amber-200 text-[11px]">
                  {mt.dakwaanBelumDisahkan && mt.dakwaanBelumDisahkan.map((f, idx) => <li key={idx}>{f}</li>) || (
                    <li>Disebarkan kumpulan sembang tertutup secara siber.</li>
                  )}
                </ul>
              </div>

              {/* Q3: Response */}
              <div className="p-3 bg-blue-900/10 border border-blue-900/50 rounded-lg space-y-1.5">
                <span className="text-blue-400 font-mono font-bold block">3. RESPONS RASMI (PIHAK TERLIBAT)</span>
                <ul className="list-disc pl-4 space-y-1 text-blue-200 text-[11px]">
                  {mt.responsRasmi && mt.responsRasmi.map((f, idx) => <li key={idx}>{f}</li>) || (
                    <li>Pihak pengurusan mengeluarkan ulasan dasar bertulis.</li>
                  )}
                </ul>
              </div>

              {/* Q4: Unknown */}
              <div className="p-3 bg-purple-950/25 border border-purple-900/40 rounded-lg space-y-1.5">
                <span className="text-purple-400 font-mono font-bold block">4. YANG MASIH BELUM DIKETAHUI</span>
                <ul className="list-disc pl-4 space-y-1 text-purple-200 text-[11px]">
                  {mt.apaYangBelumDiketahui && mt.apaYangBelumDiketahui.map((f, idx) => <li key={idx}>{f}</li>) || (
                    <li>Mekanisma denda atau implikasi siling jangka panjang.</li>
                  )}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* BAHAGIAN 4 — PERGERAKAN TREND (Interactive period line chart) & BAHAGIAN 5 — PLATFORMS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Chart block */}
          <div className="lg:col-span-7 bg-panel border border-line rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-line pb-2 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} className="text-purple-primary" />
                <h3 className="font-display font-bold text-white text-base">BAHAGIAN 4: RADAR PERGERAKAN TREND</h3>
              </div>
              
              {/* Period selection */}
              <div className="flex gap-1 bg-field p-0.5 rounded border border-line-soft font-mono text-[10px]">
                {(["1h", "6h", "12h", "24h", "7d", "30d"] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      setChartPeriod(p);
                      triggerToast(`Julat tren dituntut: ${p.toUpperCase()}`);
                    }}
                    className={`px-1.5 py-0.5 rounded transition ${
                      chartPeriod === p ? "bg-purple-primary text-white" : "text-muted-active hover:text-white"
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Line Chart using native beautifully styled SVG */}
            <div className="bg-field p-4 rounded-lg border border-line-soft flex flex-col justify-between h-56 relative">
              <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900">
                Live Stream: OK
              </div>
              
              {/* Chart Grid Lines & curves */}
              <div className="flex-1 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 500 150">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#1d1b26" strokeDasharray="3,3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#1d1b26" strokeDasharray="3,3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1d1b26" strokeDasharray="3,3" />
                  
                  {/* Area fill */}
                  <path 
                    d="M 5,145 L 80,110 L 160,118 L 240,65 L 320,80 L 400,30 L 495,15 L 495,145 Z" 
                    fill="url(#purple-gradient)" 
                    opacity="0.15" 
                  />
                  
                  {/* Line path */}
                  <path 
                    d="M 5,145 L 80,110 L 160,118 L 240,65 L 320,80 L 400,30 L 495,15" 
                    fill="none" 
                    stroke="#8B5CF6" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                  />

                  {/* Marker bullets */}
                  <circle cx="240" cy="65" r="5" fill="#FF5A00" stroke="#100b1a" strokeWidth="2" />
                  <circle cx="400" cy="30" r="5" fill="#8B5CF6" stroke="#100b1a" strokeWidth="2" />
                  <circle cx="495" cy="15" r="6" fill="#10B981" stroke="#100b1a" strokeWidth="3" />
                  
                  {/* Interactive annotation tag */}
                  <foreignObject x="350" y="55" width="140" height="35">
                    <div className="bg-panel border border-line-soft text-[9px] p-1 rounded font-mono text-text shadow-xl">
                      🚀 +124% lonjakan harian
                    </div>
                  </foreignObject>

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="purple-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Chart X axis Labels */}
              <div className="flex justify-between font-mono text-[9px] text-muted-inactive pt-2 border-t border-line-soft">
                <span>08:00 PG</span>
                <span>10:00 PG</span>
                <span>12:00 TH</span>
                <span>02:00 PTG</span>
                <span>04:00 PTG</span>
                <span>Kembali Live ({chartPeriod.toUpperCase()})</span>
              </div>
            </div>
          </div>

          {/* BAHAGIAN 5 — Pecahan Platform */}
          <div className="lg:col-span-5 bg-panel border border-line rounded-xl p-5 space-y-4">
            <div className="flex items-center space-x-2 border-b border-line pb-2">
              <Radio size={16} className="text-[#FF5A00]" />
              <h3 className="font-display font-bold text-white text-base">BAHAGIAN 5: CHANNEL SHARE & METRIC STACK</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              
              {/* TikTok */}
              <div className="bg-field p-2.5 rounded border border-line-soft flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-purple-primary rounded-full"></span>
                  <span className="font-mono text-white font-bold">TikTok</span>
                  <span className="text-[10px] text-muted-inactive">Fokus belia</span>
                </div>
                <div className="flex items-center space-x-3 text-right font-mono">
                  <span>32% index</span>
                  <span className="text-green-400 font-bold">+85% velocity</span>
                </div>
              </div>

              {/* X */}
              <div className="bg-field p-2.5 rounded border border-line-soft flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                  <span className="font-mono text-white font-bold">Twitter/X</span>
                  <span className="text-[10px] text-muted-inactive">Fokus opini</span>
                </div>
                <div className="flex items-center space-x-3 text-right font-mono">
                  <span>28% index</span>
                  <span className="text-amber-400 font-bold">+42% velocity</span>
                </div>
              </div>

              {/* Threads */}
              <div className="bg-field p-2.5 rounded border border-line-soft flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-orange-primary rounded-full"></span>
                  <span className="font-mono text-white font-bold">Threads</span>
                  <span className="text-[10px] text-muted-inactive">Keharmonian</span>
                </div>
                <div className="flex items-center space-x-3 text-right font-mono">
                  <span>18% index</span>
                  <span className="text-green-500 font-bold">+110% velocity</span>
                </div>
              </div>

              {/* Portal Berita */}
              <div className="bg-field p-2.5 rounded border border-line-soft flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                  <span className="font-mono text-white font-bold">Media Portals</span>
                  <span className="text-[10px] text-muted-inactive">Rilis Rasmi</span>
                </div>
                <div className="flex items-center space-x-3 text-right font-mono">
                  <span>22% index</span>
                  <span className="text-muted-active">Kekal Stabil</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BAHAGIAN 6 — SUMBER UTAMA & BAHAGIAN 7 — SENTIMEN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Section 6 Sources */}
          <div className="lg:col-span-6 bg-panel border border-line rounded-xl p-5 space-y-4">
            <div className="flex items-center space-x-2 border-b border-line pb-2">
              <Sliders size={16} className="text-purple-primary" />
              <h3 className="font-display font-bold text-white text-base">BAHAGIAN 6: TIMELINE SUMBER UTAMA MALAYSIA</h3>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              
              {mt.newsLinks && mt.newsLinks.length > 0 ? (
                mt.newsLinks.map((lnk, lIdx) => (
                  <div key={lIdx} className="bg-field border border-line-soft p-2.5 rounded flex items-center justify-between text-xs hover:border-purple-primary transition">
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="font-sans font-bold text-white truncate">{lnk.label}</span>
                      <span className="font-mono text-[10px] text-[#FF5A00] mt-0.5 truncate">{lnk.url}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-mono bg-purple-primary/10 text-purple-primary border border-purple-primary/20 px-1 rounded">LEVEL A</span>
                      <a 
                        href={lnk.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1 px-1.5 bg-purple-primary text-white text-[10px] rounded hover:bg-purple-primary/80 transition"
                      >
                        Buka
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-muted-inactive italic">
                  Tiada sumber luar diklip langsung.
                </div>
              )}

            </div>
          </div>

          {/* Section 7 Sentiment */}
          <div className="lg:col-span-6 bg-panel border border-line rounded-xl p-5 space-y-4">
            <div className="flex items-center space-x-2 border-b border-line pb-2">
              <Users size={16} className="text-cyan-400" />
              <h3 className="font-display font-bold text-white text-base">BAHAGIAN 7: POLARITI & DIALOG SENTIMEN AWAM</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
              
              {/* Gauges */}
              <div className="md:col-span-5 space-y-3 bg-field p-3.5 rounded-lg border border-line-soft flex flex-col justify-center">
                <span className="font-mono text-muted-inactive block text-center text-[10px]">PAGAR SENTIMEN INDEKS</span>
                
                {mt.sentimenMetrics ? mt.sentimenMetrics.map((sm, sx) => (
                  <div key={sx} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span>{sm.name}</span>
                      <span className="text-white font-bold">{sm.value}%</span>
                    </div>
                    <div className="h-1 bg-panel rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400 rounded-full" 
                        style={{ width: `${sm.value}%` }}
                      ></div>
                    </div>
                  </div>
                )) : (
                  <div className="space-y-2">
                    <div className="flex justify-between"><span>Suka / Setuju</span><span>15%</span></div>
                    <div className="h-1 bg-panel rounded-full"><div className="h-full bg-emerald-400 w-[15%]"></div></div>
                    <div className="flex justify-between"><span>Bimbang / Was-was</span><span>60%</span></div>
                    <div className="h-1 bg-panel rounded-full"><div className="h-full bg-orange-400 w-[60%]"></div></div>
                    <div className="flex justify-between"><span>Berang / Menolak</span><span>25%</span></div>
                    <div className="h-1 bg-panel rounded-full"><div className="h-full bg-red-400 w-[25%]"></div></div>
                  </div>
                )}
              </div>

              {/* Sample Dialog discussion */}
              <div className="md:col-span-7 bg-field p-3.5 rounded-lg border border-line-soft space-y-2 max-h-48 overflow-y-auto">
                <span className="font-mono text-muted-inactive text-[10px] block">SAMPEL SUARA RAKYAT NETIZEN</span>
                
                {mt.sentimenKonteks ? mt.sentimenKonteks.map((sk, sidx) => (
                  <div key={sidx} className="p-2 bg-panel rounded border border-line-soft text-[11px] leading-relaxed italic text-emerald-100">
                    "{sk}"
                  </div>
                )) : (
                  <p className="text-[11px] text-muted-inactive italic">Tiada log audio dialog tular diarkibkan.</p>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* BAHAGIAN 8, 9, 10 — KEYWORDS & ENTITI & ISU BERKAITAN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-panel border border-line rounded-xl p-5">
          
          {/* Section 8: Related tags */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-purple-primary block border-b border-line-soft pb-1.5 uppercase">BAHAGIAN 8: KEYWORD PANAS PERKAITAN</span>
            <div className="flex flex-wrap gap-1.5">
              {mt.keywordsBerkaitan ? mt.keywordsBerkaitan.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(kw);
                    setActiveMicropageId(null);
                    triggerToast(`Menapis trend melalui: ${kw}`);
                  }}
                  className="px-2 py-1 bg-field hover:bg-purple-primary hover:text-white rounded text-[11px] font-mono border border-line-soft cursor-pointer transition"
                >
                  #{kw}
                </button>
              )) : (
                <span className="text-xs text-muted-inactive italic">Tiada keyword dipetakan.</span>
              )}
            </div>
          </div>

          {/* Section 9: Related entities */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-orange-primary block border-b border-line-soft pb-1.5 uppercase">BAHAGIAN 9: ENTITI PEMBABITAN (MALAYSIA)</span>
            <div className="flex flex-wrap gap-1.5">
              {mt.entitiBerkaitan ? mt.entitiBerkaitan.map((ent, idx) => (
                <span key={idx} className="px-2 py-1 bg-field border border-orange-500/20 text-orange-400 rounded text-[11px] font-mono flex items-center">
                  🏢 {ent}
                </span>
              )) : (
                <span className="text-xs text-muted-inactive italic">Tiada entiti dipetakan.</span>
              )}
            </div>
          </div>

          {/* Section 10: Related issues */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 block border-b border-line-soft pb-1.5 uppercase font-display">BAHAGIAN 10: ISU SINKRONI (BERKAITAN)</span>
            <div className="space-y-1.5 text-xs font-sans">
              {trends.filter(x => x.category === mt.category && x.id !== mt.id).slice(0, 3).map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMicropageId(item.id);
                    triggerToast(`Melompat ke Isu Berkaitan: ${item.keyword}`);
                  }}
                  className="w-full text-left p-1.5 bg-field hover:bg-purple-primary/10 rounded border border-line-soft transition truncate block text-[#FF5A00]"
                >
                  #0{item.rank} - {item.keyword} ({item.score} pts)
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* BAHAGIAN 11 — CADANGAN KANDUNGAN EDITOR WEH (CTAs & GENERATOR INTERACTION) */}
        <div className="bg-field border-2 border-dashed border-purple-primary/50 rounded-xl p-5 space-y-4">
          <div className="flex items-center space-x-2 border-b border-line-soft pb-2">
            <Sliders size={18} className="text-[#9F7AEA]" />
            <span className="font-display font-bold text-base text-white">BAHAGIAN 11: WEH NEWSROOM ACTION GRID (CADANGAN KANDUNGAN)</span>
          </div>

          <p className="text-xs text-text-2 leading-relaxed">
            Sistem pengumpulan bapa data model kecerdasan buatan telah mendedikasikan 4 format cadangan penulisan khas .weh berdasarkan isu ini. Pilih format di bawah untuk <strong>Memindahkan Topik dan Rujukan terus ke Generator Penulisan (.weh Draft)</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {mt.cadanganKandungan && mt.cadanganKandungan.map((cad, idx) => (
              <div key={idx} className="p-3.5 bg-panel border border-line-soft rounded-lg flex flex-col justify-between space-y-3 group hover:border-[#FF5A00] transition">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-orange-primary bg-orange-primary/10 px-2 py-0.5 rounded tracking-wide border border-orange-primary/20 block w-max uppercase">
                    {cad.format}
                  </span>
                  <p className="text-xs font-sans font-bold text-white group-hover:text-[#FF5A00] transition pt-1">
                    "{cad.title}"
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    const combinedContext = `Isu: ${mt.keyword}\nKategori: ${mt.category}\nFormat Artikel: ${cad.format}\nCadangan Tajuk: ${cad.title}\nRingkasan: ${mt.apaYangBerlaku}\n\nFAKTA DISAHKAN:\n${mt.faktaDisahkan?.map(f => `- ${f}`).join("\n")}\n\nSUMBER BERITA:\n${mt.newsLinks?.map(l => `- ${l.label}: ${l.url}`).join("\n")}`;
                    const url = mt.newsLinks && mt.newsLinks.length > 0 ? mt.newsLinks[0].url : "";
                    
                    onSelectTopicForGenerator(mt.keyword, combinedContext, url);
                  }}
                  className="w-full py-1.5 bg-purple-primary text-white hover:bg-orange-primary text-center rounded text-[11px] font-mono font-bold transition cursor-pointer"
                >
                  🚀 JANA DRAF SEKARANG
                </button>
              </div>
            )) || (
              <div className="p-3 bg-panel border rounded text-center text-xs text-muted-inactive">
                Format cadangan sedang dianalisis model...
              </div>
            )}

          </div>
        </div>

      </div>
    );
  }

  // ELSE : Main Dashboard view (Console Console or 12-section grid)
  return (
    <div className="flex flex-col h-full bg-dark-bg text-text select-none overflow-hidden" id="war-room-fullscreen">
      
      {/* Toast Notification element */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#FF5A00] text-white px-4 py-2 rounded-lg font-sans font-medium shadow-2xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Screen Header Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-center px-4 py-3 bg-panel border-b border-line gap-3 text-xs font-mono shrink-0">
        
        {/* Left indicators */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-purple-primary font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-sans tracking-tight">WEH TRENDROOM LIVE CONSOLE</span>
          </div>
          <span className="text-muted-active">|</span>
          <div className="flex gap-1.5 p-0.5 bg-field rounded border border-line-soft">
            <button
              onClick={() => {
                setActiveTab("trendroom");
                setIsAutoplay(false);
              }}
              className={`px-3 py-1 rounded transition flex items-center space-x-1 cursor-pointer ${
                activeTab === "trendroom" ? "bg-purple-primary text-white" : "text-muted-active hover:text-white"
              }`}
            >
              <Grid size={12} />
              <span>DASHBOARD GRID (12 ZON)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("console");
                setIsAutoplay(true);
              }}
              className={`px-3 py-1 rounded transition flex items-center space-x-1 cursor-pointer ${
                activeTab === "console" ? "bg-purple-primary text-white" : "text-muted-active hover:text-white"
              }`}
            >
              <Tv size={12} />
              <span>COMMAND RADAR CONSOLE</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("x_radar");
                setIsAutoplay(false);
              }}
              className={`px-3 py-1 rounded transition flex items-center space-x-1 cursor-pointer ${
                activeTab === "x_radar" ? "bg-[#FF5A00] text-white font-bold border-l border-orange-500/50" : "text-muted-active hover:text-[#FF5A00]"
              }`}
            >
              <Twitter size={12} />
              <span>X INTEL RADAR</span>
            </button>
          </div>
        </div>

        {/* Search controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <input 
              type="text" 
              placeholder="Cari tren/kategori..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-56 bg-field border border-line rounded px-8 py-1.5 text-xs font-sans text-white placeholder-muted-inactive focus:outline-none focus:border-purple-primary"
            />
            <Search size={12} className="absolute left-2.5 top-2.5 text-muted-inactive" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1 bg-white/5 hover:bg-white/10 px-1 rounded text-[9px] text-white"
              >
                Reset
              </button>
            )}
          </div>

          <button 
            onClick={handleExportJSON}
            className="flex items-center space-x-1 px-3 py-1.5 rounded border border-line bg-panel hover:bg-panel-hover text-muted-active transition"
            title="Eksport Papan Data JSON"
          >
            <Download size={12} />
            <span className="hidden sm:inline">EXPORT SNAPSHOT</span>
          </button>

          <div className="flex items-center space-x-1 text-white bg-purple-primary/10 border border-purple-primary/30 px-3 py-1.5 rounded font-mono text-sm leading-none">
            <Clock size={14} className="text-purple-primary animate-spin-slow mr-1" />
            <span>{timeStr || "00:00:00 MYT"}</span>
          </div>
        </div>
      </header>

      {/* RENDER VIEW TAB 1: RADAR COMMAND CONSOLE */}
      {activeTab === "console" && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 p-3 overflow-hidden">
          
          {/* ZON 1: Live Ranking Signals (Col-span 3) */}
          <div className="md:col-span-3 flex flex-col bg-panel border border-line rounded-lg overflow-hidden">
            <div className="p-3 bg-panel-hover border-b border-line flex justify-between items-center">
              <span className="font-display font-bold text-xs tracking-widest text-muted-active">ZON 1: RANKING SIGNALS</span>
              <span className="text-xs bg-purple-primary/20 text-purple-primary px-1.5 py-0.5 rounded font-mono font-bold">30 TOPICS</span>
            </div>

            {/* Signals List Container */}
            <div className="flex-1 overflow-y-auto divide-y divide-line-soft">
              {filteredTrends.map((item, index) => {
                const active = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsAutoplay(false);
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
                        <span className={`font-mono text-xs font-bold ${active ? 'text-purple-primary' : 'text-muted-active'}`}>
                          #0{item.rank}
                        </span>
                        <p className={`text-xs truncate font-medium ${active ? 'text-white font-bold' : 'text-text-2'}`}>
                          {item.keyword}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          item.score > 90 ? 'bg-red-500/10 text-red-100' : 'bg-orange-primary/10 text-orange-400'
                        }`}>
                          {item.score}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-1.5 text-[9px]">
                      <span className={`px-1 rounded border uppercase font-mono tracking-wide ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-muted-inactive font-mono">
                        {item.growthRate || "+45%"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left panel instructions hint footer */}
            <div className="p-3 bg-panel-hover border-t border-line text-[10px] text-muted-inactive flex justify-between items-center font-mono">
              <span>GERAKAN ⬆ ⬇ KEYBOARD</span>
              <span>[AUTOPLAY: {isAutoplay ? "ON" : "OFF"}]</span>
            </div>
          </div>

          {/* ZON 2: Command Tactical View (Col-span 5) */}
          <div className="md:col-span-5 flex flex-col bg-panel border border-line rounded-lg overflow-hidden">
            <div className="p-3 bg-panel-hover border-b border-line flex justify-between items-center">
              <span className="font-display font-bold text-xs tracking-widest text-[#FF5A00]">ZON 2: TACTICAL DESK COMMAND VIEW</span>
              <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded font-mono flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1"></span> ISU AKTIF
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              
              {/* Main Title Section */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-orange-primary/20 text-orange-primary border border-orange-950/40 px-2 py-0.4 rounded font-mono">
                    WEH SCORE: {currentTrend?.score} pts
                  </span>
                  <span className="text-xs bg-panel-hover border border-line px-2 py-0.4 rounded font-mono text-muted-active">
                    DIVERSITY: {currentTrend?.sourceDiversity} DOMAINS
                  </span>
                </div>
                <h2 className="text-2xl font-display font-bold tracking-tight text-white">
                  {currentTrend?.keyword}
                </h2>
                <div className="flex items-center gap-2 text-xs text-muted-active font-mono uppercase">
                  <span>Kategori: {currentTrend?.category}</span>
                  <span>|</span>
                  <span>Platform: <span className="text-red-400 font-bold">{currentTrend?.platformUtama || "TikTok"}</span></span>
                </div>
              </div>

              {/* Tactical Brief Container (Editorial Intelligence) */}
              <div className="p-4 bg-field rounded border border-line-soft space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-primary/5 rounded-full filter blur-xl"></div>
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-primary font-mono select-none">
                  <Activity size={12} className="animate-pulse" />
                  <span>INTELLIGENCE RADAR SUMMARY</span>
                </div>
                <p className="text-xs text-text-2 leading-relaxed">
                  {currentTrend?.apaYangBerlaku || currentTrend?.fullIntelBrief}
                </p>
              </div>

              {/* Mentions / Sources Feed list */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-active">
                  <span>BERITA TULAR (WAR ROOM STACK FEED)</span>
                  <span className="text-cyan-400">{currentTrend?.sources?.length || 4} MENTIONS REPORT</span>
                </div>
                <div className="space-y-1.5 max-h-52 overflow-y-auto">
                  {currentTrend?.sources?.map((src, sIdx) => (
                    <div key={sIdx} className="p-2.5 bg-panel-hover/40 rounded border border-line-soft flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-primary mt-1.5 shrink-0"></span>
                      <p className="text-xs text-text-2 leading-relaxed">{src}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Action Block */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setActiveMicropageId(currentTrend.id)}
                  className="w-full py-2 px-3 bg-panel border border-purple-primary text-[#9F7AEA] hover:bg-purple-primary hover:text-white rounded text-xs font-mono font-bold transition text-center cursor-pointer"
                >
                  Buka Micro-page Lengkap 🔎
                </button>
                <button 
                  onClick={() => {
                    const combinedContext = `Isu: ${currentTrend.keyword}\nKategori: ${currentTrend.category}\nRingkasan: ${currentTrend.fullIntelBrief}`;
                    const primaryUrl = currentTrend.newsLinks && currentTrend.newsLinks.length > 0 ? currentTrend.newsLinks[0].url : "";
                    onSelectTopicForGenerator(currentTrend.keyword, combinedContext, primaryUrl);
                  }}
                  className="w-full py-2 px-3 bg-purple-primary hover:bg-purple-primary/95 text-white rounded text-xs font-mono font-bold transition text-center shadow-lg cursor-pointer"
                >
                  Jana .weh Draf Penulisan ⚡
                </button>
              </div>

            </div>
          </div>

          {/* ZON 3: Platform Intelligence (Col-span 4) */}
          <div className="md:col-span-4 flex flex-col bg-panel border border-line rounded-lg overflow-hidden">
            <div className="p-3 bg-panel-hover border-b border-line flex justify-between items-center">
              <span className="font-display font-bold text-xs tracking-widest text-muted-active">ZON 3: CHANNEL FLOW INTEL</span>
              <span className="text-xs bg-orange-primary/20 text-orange-primary px-1.5 py-0.5 rounded font-mono animate-pulse font-bold">LIVE SCORING</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">

              {/* Signal Matrix & Bar gauges */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono text-muted-active tracking-wider uppercase">SIGNAL MATRIX FLOW</h4>
                <div className="space-y-2">
                  
                  {/* Google */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Google Search volume</span>
                      <span className="text-purple-primary font-bold">{pi.google}%</span>
                    </div>
                    <div className="h-1 bg-field rounded-full overflow-hidden">
                      <div className="h-full bg-purple-primary" style={{ width: `${pi.google}%` }}></div>
                    </div>
                  </div>

                  {/* Twitter */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Twitter/X Velocity</span>
                      <span className="text-white font-bold">{pi.twitter}%</span>
                    </div>
                    <div className="h-1 bg-field rounded-full overflow-hidden">
                      <div className="h-full bg-white" style={{ width: `${pi.twitter}%` }}></div>
                    </div>
                  </div>

                  {/* Threads */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Threads engagement</span>
                      <span className="text-orange-primary font-bold">{pi.threads}%</span>
                    </div>
                    <div className="h-1 bg-field rounded-full overflow-hidden">
                      <div className="h-full bg-orange-primary" style={{ width: `${pi.threads}%` }}></div>
                    </div>
                  </div>

                  {/* TikTok */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>TikTok weight viral</span>
                      <span className="text-emerald-400 font-bold">{pi.tiktok}%</span>
                    </div>
                    <div className="h-1 bg-field rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400" style={{ width: `${pi.tiktok}%` }}></div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Risk Factors Radar Indicators */}
              <div className="p-3 bg-field rounded border border-line-soft space-y-2">
                <div className="flex items-center space-x-1 border-b border-line pb-1 text-xs font-bold text-muted-active font-mono">
                  <ShieldAlert size={12} className="text-red-400 animate-pulse-glow" />
                  <span>3R SAFETY WATCH</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-1 px-2.5 bg-panel rounded border border-line-soft flex flex-col">
                    <span className="text-muted-inactive font-mono text-[9px]">3R RISK DEGREE</span>
                    <span className={`text-sm font-display font-bold mt-0.5 ${
                      currentTrend?.risk3R === "Tinggi" ? 'text-red-400' : 'text-emerald-400'
                    }`}>{currentTrend?.risk3R}</span>
                  </div>

                  <div className="p-1 px-2.5 bg-panel rounded border border-line-soft flex flex-col">
                    <span className="text-muted-inactive font-mono text-[9px]">EDITORIAL ASSESSMENT</span>
                    <span className="text-sm font-display font-bold mt-0.5 text-blue-400">{currentTrend?.newsValue}</span>
                  </div>
                </div>

                {currentTrend?.risk3R === "Tinggi" && (
                  <div className="p-2 bg-red-950/20 text-red-300 border border-red-900 rounded text-[10px] leading-normal font-sans">
                    🚨 **AMARAN 3R**: Sentimen mengandungi unsur sensitif.
                  </div>
                )}
              </div>

              {/* References Links */}
              <div className="p-3 bg-field rounded border border-line-soft space-y-2">
                <span className="text-xs font-mono font-bold text-orange-primary block border-b border-linepb-1 select-none">🔗 DIRECT REFERENCES</span>
                <div className="space-y-1 px-1 text-xs">
                  {currentTrend?.newsLinks?.slice(0, 2).map((x, idx) => (
                    <a 
                      key={idx} 
                      href={x.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="block truncate text-white hover:text-[#FF5A00] underline"
                    >
                      {x.label}
                    </a>
                  )) || <span className="text-muted-inactive italic">Tiada pautan rujukan langsung.</span>}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* RENDER VIEW TAB 2: PORTAL INTELLIGENCE TRENDROOM 30 (12 SECTIONS MASTER DASHBOARD) */}
      {activeTab === "trendroom" && (
        <div className="flex-1 overflow-y-auto p-4 space-y-5" id="master-dashboard-scrollable">
          
          {/* PETA 50 KEYWORD PANAS MALAYSIA (PETAK KECIL EMPAT SEGI DI BAHAGIAN ATAS SEKALI) */}
          <div className="bg-panel border border-line rounded-lg p-3.5 space-y-3 shadow-lg">
            <div className="flex justify-between items-center border-b border-line pb-2 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-primary animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  ⚠️ PETA 50 KEYWORD PANAS MALAYSIA (KLIK UNTUK MENAPIS ISU)
                </span>
              </div>
              <div className="flex items-center space-x-3 text-[10px] font-mono">
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      triggerToast("Kembali memaparkan semua isu.");
                    }}
                    className="px-2 py-0.5 bg-red-500/10 hover:bg-red-500/20 text-red-100 border border-red-500/30 rounded cursor-pointer transition shrink-0 uppercase"
                  >
                    RESET TAriS: #{searchQuery}
                  </button>
                )}
                <div className="flex items-center space-x-1.5 text-muted-inactive shrink-0 md:inline-flex hidden">
                  <span>Isyarat Saraf:</span>
                  <span className="inline-block w-2 h-2 bg-purple-primary/40 rounded"></span>
                  <span>Sensitif</span>
                  <span className="inline-block w-2 h-2 bg-white/5 rounded border border-line"></span>
                  <span>Am</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-10 gap-1.5 p-0.5">
              {hot50Keywords.map((kw, idx) => {
                const isActive = searchQuery.toLowerCase() === kw.toLowerCase();
                const hLevel = idx % 3; // artificial heat mapping
                
                let bgBorderText = "bg-field hover:bg-white/5 border-line-soft text-text-2";
                if (isActive) {
                  bgBorderText = "bg-[#FF5A00] border-[#FF5A00] text-white font-bold shadow-md shadow-[#FF5A00]/20 scale-102";
                } else if (hLevel === 0) {
                  bgBorderText = "bg-purple-primary/10 hover:bg-purple-primary/20 border-purple-primary/25 text-purple-200 font-medium";
                } else if (hLevel === 1) {
                  bgBorderText = "bg-field/70 hover:bg-white/10 border-line-soft/60 text-text-2";
                } else {
                  bgBorderText = "bg-panel-hover/30 hover:bg-panel-hover/65 border-line-soft/45 text-muted-active";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isActive) {
                        setSearchQuery("");
                        triggerToast("Kelegaan penapis: Kembali memaparkan semua isu.");
                      } else {
                        setSearchQuery(kw);
                        triggerToast(`Menapis mengikut kata kunci: #${kw}`);
                      }
                    }}
                    className={`aspect-[1.8/1] sm:aspect-[2.2/1] text-center flex flex-col justify-center items-center rounded border p-1 text-[11px] sm:text-xs font-mono transition-all duration-150 cursor-pointer select-none truncate ${bgBorderText}`}
                    title={`Klik untuk tapis Isu: #${kw}`}
                  >
                    <span className="truncate w-full font-mono font-bold">#{kw}</span>
                    <span className="text-[8.5px] opacity-75 font-mono">
                      {isActive ? "ACTIVE" : `${98 - idx % 12}%`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1. BIG NUMBERS METRICS & 2. TICKER KEYWORD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Section 1: Big Numbers widget */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
              
              <div className="p-3 bg-panel border border-line rounded-lg text-center shadow">
                <span className="text-[10px] font-mono text-muted-inactive block">30 ISU RADAR</span>
                <span className="font-display font-bold text-xl text-white block mt-0.5">30</span>
                <span className="text-[9px] font-mono text-emerald-400 block mt-0.5">100% Aktif</span>
              </div>

              <div className="p-3 bg-panel border border-line rounded-lg text-center shadow">
                <span className="text-[10px] font-mono text-muted-inactive block">KEYWORD HANGAT</span>
                <span className="font-display font-bold text-xl text-orange-primary block mt-0.5">50+</span>
                <span className="text-[9px] font-mono text-muted-active block mt-0.5">Berubah Pantas</span>
              </div>

              <div className="p-3 bg-panel border border-line rounded-lg text-center shadow">
                <span className="text-[10px] font-mono text-muted-inactive block">INTERAKSI SOSIAL</span>
                <span className="font-display font-bold text-xl text-cyan-400 block mt-0.5">1.2 Juta</span>
                <span className="text-[9px] font-mono text-green-400 block mt-0.5">Laju +42%</span>
              </div>

              <div className="p-3 bg-panel border border-line rounded-lg text-center shadow">
                <span className="text-[10px] font-mono text-muted-inactive block">SUMBER PORTAL</span>
                <span className="font-display font-bold text-xl text-purple-primary block mt-0.5">184 Domain</span>
                <span className="text-[9px] font-mono text-muted-active block mt-0.5">Pelbagaian</span>
              </div>

              <div className="p-3 bg-panel border border-line rounded-lg text-center col-span-2 sm:col-span-1 shadow-lg border-red-900/30 bg-red-950/10">
                <span className="text-[10px] font-mono text-red-400 block">RISIKO TINGGI (3R)</span>
                <span className="font-display font-bold text-xl text-red-500 block mt-0.5">4 ISU</span>
                <span className="text-[9px] font-mono text-red-400 block mt-0.5 animate-pulse">Perlu Siasatan</span>
              </div>

            </div>

            {/* Section 2: Moving Ticker Keyword */}
            <div className="lg:col-span-4 bg-panel border border-line rounded-lg p-3 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 right-0 py-0.5 px-1.5 bg-[#FF5A00] text-white text-[8px] font-mono font-bold tracking-widest rounded-bl select-none uppercase">
                Suku Jam Lalu
              </div>
              <span className="text-[10px] font-mono text-muted-inactive">🔥 TICKER MERENTASI NEGARA (.MY)</span>
              
              <div className="pt-2 overflow-hidden relative">
                <div className="animate-marquee whitespace-nowrap text-xs text-text-2 font-mono flex items-center space-x-4">
                  <span className="text-white font-bold bg-purple-primary/20 p-1 border border-purple-primary/30 rounded">RON95 +68%</span>
                  <span>•</span>
                  <span className="text-emerald-400">Sungai Kim Kim +95%</span>
                  <span>•</span>
                  <span className="text-red-400 font-bold">Ajaran GISB +110%</span>
                  <span>•</span>
                  <span>Gaji Progresif +124%</span>
                  <span>•</span>
                  <span className="text-cyan-400">MySejahtera +86%</span>
                  <span>•</span>
                  <span>PRN Johor +42%</span>
                </div>
              </div>
            </div>

          </div>

          {/* DASHBOARD SEARCH & STATE SELECTOR & CATEGORIES */}
          <div className="bg-panel border border-line p-3 rounded-lg flex flex-wrap gap-2.5 items-center justify-between text-xs font-mono">
            
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-muted-active font-sans font-bold">PENYARING:</span>
              
              {/* Category selector pills */}
              {["all", "Politik", "Ekonomi", "Bencana", "Budaya", "Teknologi", "Sosial"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded border transition cursor-pointer select-none ${
                    selectedCategory === cat
                      ? "bg-purple-primary text-white border-purple-primary"
                      : "bg-field border-line-soft text-muted-active hover:text-white"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Location selector filters */}
            <div className="flex items-center space-x-2">
              <span className="text-muted-active font-sans font-medium text-[11px]">LOKASI:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-field border border-line-soft text-white rounded px-2.5 py-1 text-xs font-mono pr-8 focus:outline-none focus:border-purple-primary"
              >
                <option value="all">Seluruh Malaysia (Semua)</option>
                {malaysiaStates.map(s => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

          </div>

          {/* RENDER THE 3 GROUPS OF 10 TRENDS (Sections 3, 4, 5 of Main dashboard) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4.5">
            
            {/* GROUP A: TOP 10 — PALING PANAS SEKARANG */}
            <div className="bg-panel/70 border border-line rounded-lg p-3.5 space-y-3.5 flex flex-col">
              <div className="flex justify-between items-center border-b border-line pb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  <h3 className="font-display font-bold text-white text-sm">A. PALING PANAS SEKARANG</h3>
                </div>
                <span className="text-[10px] font-mono text-[#FF5A00] bg-orange-primary/10 border border-orange-950 px-1.5 py-0.5 rounded">
                  Score 90-100
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                {top10HotNow.map(item => (
                  <div key={item.id} onClick={() => setActiveMicropageId(item.id)} className="p-3 bg-field/60 hover:bg-field border border-line-soft hover:border-purple-primary rounded-lg transition text-xs space-y-2 flex flex-col justify-between cursor-pointer group hover:shadow-md hover:scale-[1.01] duration-150">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[10px] font-mono text-[#FF5A00] font-bold">#0{item.rank}</span>
                        <span className="text-[10px] font-mono text-muted-inactive">{item.waktuKemasKini || "12:00 tengah hari"}</span>
                      </div>
                      <h4 className="font-sans font-bold text-white text-sm leading-tight pt-0.5">{item.keyword}</h4>
                      <div className="text-[10px] font-mono text-muted-active pt-0.5">
                        Vertikal: <span className="text-white">{item.vertical || "WEH Siasat"}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono border-t border-line-soft/40 pt-1.5 text-muted-active">
                      <div>Heat: <span className="text-amber-400 font-bold">{item.score}</span></div>
                      <div>Aliran: <span className="text-[#FF5A00] font-bold">{item.growthRate || "+45%"}</span></div>
                      <div className="truncate">Tular: <span className="text-cyan-400">{item.mentionCount || "Sederhana"}</span></div>
                      <div>Komuni: <span className="text-purple-primary font-bold">{item.platformUtama || "Threads"}</span></div>
                    </div>

                    <div className="pt-2 flex justify-between items-center gap-1.5">
                      {getVerificationBadge(item.statusPengesahan)}
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setXSearchQuery(item.keyword);
                            setActiveTab("x_radar");
                            fetchXTweets(item.keyword);
                          }}
                          className="px-2 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-[10px] font-mono font-bold rounded cursor-pointer transition select-none flex items-center gap-1"
                        >
                          <Twitter size={10} />
                          <span>X Radar</span>
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 bg-purple-primary group-hover:bg-[#FF5A00] text-white text-[10px] font-mono font-bold rounded cursor-pointer transition select-none"
                        >
                          Lihat Intel →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {top10HotNow.length === 0 && (
                  <p className="text-xs text-muted-inactive italic text-center py-8">Tiada trend sepadan.</p>
                )}
              </div>
            </div>

            {/* GROUP B: RISING 10 — SEDANG MENINGKAT */}
            <div className="bg-panel/70 border border-line rounded-lg p-3.5 space-y-3.5 flex flex-col">
              <div className="flex justify-between items-center border-b border-line pb-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} className="text-green-400 animate-pulse" />
                  <h3 className="font-display font-bold text-white text-sm">B. SEDANG MENINGKAT</h3>
                </div>
                <span className="text-[10px] font-mono text-green-400 bg-emerald-950/20 border border-emerald-950 px-1.5 py-0.5 rounded">
                  Laju +60%
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                {rising10.map(item => (
                  <div key={item.id} onClick={() => setActiveMicropageId(item.id)} className="p-3 bg-field/60 hover:bg-field border border-line-soft hover:border-purple-primary rounded-lg transition text-xs space-y-2 flex flex-col justify-between cursor-pointer group hover:shadow-md hover:scale-[1.01] duration-150">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[10px] font-mono text-green-400 font-bold">#{item.rank}</span>
                        <span className="text-[10px] font-mono text-muted-inactive">{item.waktuKemasKini || "11:00 pagi"}</span>
                      </div>
                      <h4 className="font-sans font-bold text-white text-sm leading-tight pt-0.5">{item.keyword}</h4>
                      <div className="text-[10px] font-mono text-muted-active pt-0.5">
                        Vertikal: <span className="text-white">{item.vertical || "WEH Money"}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono border-t border-line-soft/40 pt-1.5 text-muted-active">
                      <div>Heat: <span className="text-amber-400 font-bold">{item.score}</span></div>
                      <div>Aliran: <span className="text-green-400 font-bold">{item.growthRate || "+95%"}</span></div>
                      <div className="truncate">Tular: <span className="text-cyan-400">{item.mentionCount || "Sederhana"}</span></div>
                      <div>Komuni: <span className="text-purple-primary font-bold">{item.platformUtama || "LinkedIn"}</span></div>
                    </div>

                    <div className="pt-2 flex justify-between items-center gap-1.5">
                      {getVerificationBadge(item.statusPengesahan)}
                      <div className="flex gap-1.5 relative z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setXSearchQuery(item.keyword);
                            setActiveTab("x_radar");
                            fetchXTweets(item.keyword);
                          }}
                          className="px-2 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-[10px] font-mono font-bold rounded cursor-pointer transition select-none flex items-center gap-1"
                        >
                          <Twitter size={10} />
                          <span>X Radar</span>
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 bg-purple-primary group-hover:bg-[#FF5A00] text-white text-[10px] font-mono font-bold rounded cursor-pointer transition select-none"
                        >
                          Lihat Intel →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {rising10.length === 0 && (
                  <p className="text-xs text-muted-inactive italic text-center py-8">Tiada trend sepadan.</p>
                )}
              </div>
            </div>

            {/* GROUP C: WATCHLIST 10 — PERLU DIPANTAU (RADAR WEH) */}
            <div className="bg-panel/70 border border-line rounded-lg p-3.5 space-y-3.5 flex flex-col">
              <div className="flex justify-between items-center border-b border-line pb-2">
                <div className="flex items-center space-x-2">
                  <Compass size={16} className="text-cyan-400 animate-spin-slow" />
                  <h3 className="font-display font-bold text-white text-sm">C. PERLU DIPANTAU (RADAR)</h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-900/40 px-1.5 py-0.5 rounded">
                  Sensitif & Risiko
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                {watchlistRadar.map(item => (
                  <div key={item.id} onClick={() => setActiveMicropageId(item.id)} className="p-3 bg-field/60 hover:bg-field border border-line-soft hover:border-purple-primary rounded-lg transition text-xs space-y-2 flex flex-col justify-between cursor-pointer group hover:shadow-md hover:scale-[1.01] duration-150">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">#{item.rank}</span>
                        <span className="text-[10px] font-mono text-muted-inactive">{item.waktuKemasKini || "6:00 pagi"}</span>
                      </div>
                      <h4 className="font-sans font-bold text-white text-sm leading-tight pt-0.5">{item.keyword}</h4>
                      <div className="text-[10px] font-mono text-muted-active pt-0.5">
                        Vertikal: <span className="text-white">{item.vertical || "WEH Check"}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono border-t border-line-soft/40 pt-1.5 text-muted-active">
                      <div>Heat: <span className="text-amber-400 font-bold">{item.score}</span></div>
                      <div>3R Risk: <span className={`font-bold ${item.risk3R === "Tinggi" ? "text-red-400" : "text-emerald-400"}`}>{item.risk3R}</span></div>
                      <div className="truncate">Tular: <span className="text-cyan-400">{item.mentionCount || "Sederhana"}</span></div>
                      <div>Komuni: <span className="text-purple-primary font-bold">{item.platformUtama || "Facebook"}</span></div>
                    </div>

                    <div className="pt-2 flex justify-between items-center gap-1.5">
                      {getVerificationBadge(item.statusPengesahan)}
                      <div className="flex gap-1.5 relative z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setXSearchQuery(item.keyword);
                            setActiveTab("x_radar");
                            fetchXTweets(item.keyword);
                          }}
                          className="px-2 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-[10px] font-mono font-bold rounded cursor-pointer transition select-none flex items-center gap-1"
                        >
                          <Twitter size={10} />
                          <span>X Radar</span>
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 bg-purple-primary group-hover:bg-[#FF5A00] text-white text-[10px] font-mono font-bold rounded cursor-pointer transition select-none"
                        >
                          Lihat Intel →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {watchlistRadar.length === 0 && (
                  <p className="text-xs text-muted-inactive italic text-center py-8">Tiada trend sepadan.</p>
                )}
              </div>
            </div>

          </div>

          {/* LOWER SECTION GRID: KEYWORDS, NETWORKS, MAPS, RISK, LOGS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left bento: Maps (11) & Plattform (7) */}
            <div className="md:col-span-8 space-y-5">
              
              {/* Grid map (11) & platforms shares (7) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Section 11: SVGMaps Interactive representation of state listings */}
                <div className="bg-panel border border-line rounded-lg p-4 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-orange-primary block border-b border-line pb-2 uppercase">
                      11. PETA LOKASI PERSEMPADANAN AKTIF
                    </span>
                    <p className="text-[10px] text-muted-active leading-normal pt-1.5">
                      Pilih rantau geografi di bawah untuk menyaring isu siber/berita tular mengikut keutamaan kementerian negeri:
                    </p>
                  </div>

                  <div className="space-y-1.5 max-h-56 overflow-y-auto pt-2">
                    {malaysiaStates.map(st => (
                      <button
                        key={st.name}
                        onClick={() => {
                          setSelectedState(selectedState === st.name ? "all" : st.name);
                          triggerToast(`Papan diubah ke zon: ${st.name.toUpperCase()}`);
                        }}
                        className={`w-full text-left p-2 rounded text-xs font-mono flex items-center justify-between border transition ${
                          selectedState === st.name 
                            ? "bg-orange-primary/20 text-orange-primary border-orange-primary" 
                            : "bg-field border-line-soft text-text hover:border-orange-primary/50"
                        }`}
                      >
                        <span className="flex items-center">
                          <MapPin size={12} className="mr-1.5 text-orange-primary shrink-0" />
                          <span className="truncate">{st.name}</span>
                        </span>
                        <span className="text-[10px] text-muted-active shrink-0">
                          {st.trends.length} Isu ({st.keywords[0]})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 7: Platform share multi-stacked radar platform */}
                <div className="bg-panel border border-line rounded-lg p-4 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 block border-b border-line pb-2 uppercase">
                      7. LIVE PLATFORM ENGAGEMENT WEIGHT
                    </span>
                    <p className="text-[10px] text-muted-active leading-normal pt-1.5">
                      Garis sebutan komuniti terkumpul mengikut taksiran rujukan media:
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {/* Horizontal Bar stack graph */}
                    <div className="space-y-1.5">
                      <div className="flex h-5 bg-field rounded overflow-hidden">
                        <div className="h-full bg-purple-primary" style={{ width: "32%" }} title="TikTok 32%" />
                        <div className="h-full bg-white" style={{ width: "28%" }} title="Twitter/X 28%" />
                        <div className="h-full bg-orange-primary" style={{ width: "18%" }} title="Threads 18%" />
                        <div className="h-full bg-blue-500" style={{ width: "12%" }} title="Media Portals 12%" />
                        <div className="h-full bg-cyan-400" style={{ width: "10%" }} title="Reddit & Lain-lain 10%" />
                      </div>
                      <div className="grid grid-cols-5 text-[9px] font-mono text-muted-inactive text-center">
                        <div className="text-purple-primary font-bold">TikTok (32%)</div>
                        <div className="text-white font-bold">X (28%)</div>
                        <div className="text-orange-primary font-bold">Threads (18%)</div>
                        <div className="text-blue-500 font-bold">Media (12%)</div>
                        <div className="text-cyan-400 font-bold">Lain (10%)</div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-field rounded border border-line-soft text-[10px] leading-relaxed text-muted-active">
                      ⚠️ **ULASAN RADAR:** Aplikasi video menegak **TikTok** kekal mendominasi momentum penularan maklumat subsidi kearah viraliti, disusuli kempen penolakan tajam di Threads.
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right bento: Verification Queue (8) & 3R Risk (9) & Public safety (10) & Recent Activities (12) */}
            <div className="md:col-span-4 space-y-5">
              
              {/* Section 8 & 10: Verification & Alerts */}
              <div className="bg-panel border border-line rounded-lg p-4 space-y-3.5">
                <span className="text-xs font-mono font-bold text-red-400 block border-b border-line pb-2 uppercase">
                  8 & 10. PUBLIC SAFETY & VERIFICATION QUEUE
                </span>

                <div className="space-y-2 text-xs">
                  
                  {/* Alert 1 */}
                  <div className="bg-field p-2 rounded-lg border border-red-900/40 relative">
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                    <span className="block font-mono text-red-400 font-bold">⚠️ AMARAN BANJIR (METMALAYSIA)</span>
                    <p className="text-[11px] text-text-2 leading-relaxed mt-0.5">Pantai Timur menerima amaran cuaca jingga. PPS diisi aktif.</p>
                  </div>

                  {/* Alert 2 */}
                  <div className="bg-field p-2 rounded-lg border border-orange-950 relative">
                    <span className="block font-mono text-orange-400 font-bold">🔬 VERIFIKASI: DAKWAAN RANSOMWARE MELAKA</span>
                    <p className="text-[11px] text-text-2 leading-relaxed mt-0.5">Sistem kecemasan melaka terjejas. Siasatan hardware glitch disahkan.</p>
                  </div>

                  {/* Alert 3 */}
                  <div className="bg-field p-2 rounded-lg border border-amber-900/30 relative">
                    <span className="block font-mono text-amber-500 font-bold">🔍 REVIU 3R: GISB DOKTRINASI</span>
                    <p className="text-[11px] text-text-2 leading-relaxed mt-0.5">Keputusan fatwa keagamaan akan diselaraskan oleh parlimen.</p>
                  </div>

                </div>
              </div>

              {/* Section 12: Aktiviti Terkini (Real-time Change Log) */}
              <div className="bg-panel border border-line rounded-lg p-4 space-y-3">
                <span className="text-xs font-mono font-bold text-cyan-400 block border-b border-line pb-2 uppercase">
                  12. LOG AKTIVITI SISTEM MONITORING
                </span>

                <div className="space-y-2.5 max-h-52 overflow-y-auto">
                  {recentActivities.map((act, idx) => (
                    <div key={idx} className="text-[11px] font-mono leading-relaxed flex items-start space-x-2 border-l border-line-soft/60 pl-2">
                      <span className="text-[#FF5A00] font-bold shrink-0">{act.time}</span>
                      <p className="text-text-2">{act.log}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* RENDER VIEW TAB 3: TWITTER/X RADAR STREAM MONITOR */}
      {activeTab === "x_radar" && (
        <div className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden" id="x-radar-panel">
          
          {/* Header Panel */}
          <div className="bg-panel border border-line rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg shrink-0 animate-fade-in">
            <div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400 border border-sky-500/20">
                  <Twitter size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">X INTEL RADAR MONITOR</h3>
                  <p className="text-xs text-muted-active leading-normal mt-0.5">Saring hantaran hangat tular secara langsung daripada radar komuniti Twitter/X di Malaysia.</p>
                </div>
              </div>
            </div>

            {/* Simple Real-time Search Box */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                fetchXTweets(xSearchQuery);
              }}
              className="flex items-center space-x-2 w-full md:w-auto"
            >
              <input 
                type="text" 
                placeholder="Cari kata kunci X (cth: Subsidi RON95)..."
                value={xSearchQuery}
                onChange={(e) => setXSearchQuery(e.target.value)}
                className="flex-1 md:w-72 bg-field border border-line text-xs rounded-lg px-3.5 py-2 text-white focus:outline-none focus:border-sky-500 font-sans"
              />
              <button
                type="submit"
                disabled={isSearchingX || !xSearchQuery.trim()}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold font-sans rounded-lg transition disabled:opacity-50 select-none cursor-pointer flex items-center space-x-1"
              >
                {isSearchingX ? <RefreshCw className="animate-spin" size={12} /> : null}
                <span>{isSearchingX ? "Menyaring..." : "Saring X"}</span>
              </button>
            </form>
          </div>

          {/* Status info bar */}
          {xInfo && (
            <div className="px-3.5 py-2.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-lg text-xs font-sans flex items-center justify-between shadow shrink-0">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-sky-450 animate-pulse mr-2"></span>
                💡 {xInfo}
              </span>
              <button 
                onClick={() => fetchXTweets(xSearchQuery)}
                className="hover:underline font-mono text-[10px] uppercase font-bold text-sky-300"
              >
                Segarkan Radar
              </button>
            </div>
          )}

          {/* Twitter Feed Cards Grid */}
          <div className="flex-1 overflow-y-auto pr-1">
            {xTweets.length === 0 && !isSearchingX ? (
              <div className="p-12 text-center bg-panel border border-line rounded-lg flex flex-col justify-center items-center space-y-3">
                <Twitter size={40} className="text-muted-inactive animate-pulse" />
                <h4 className="font-display font-bold text-white text-base">Mula Menyaring Gelombang X</h4>
                <p className="text-xs text-muted-active font-sans max-w-sm">Masukkan kata kunci isu tular di Malaysia di ruangan carian di atas untuk memuatkan radar hantaran netizen.</p>
              </div>
            ) : isSearchingX ? (
              <div className="p-12 text-center bg-panel border border-line rounded-lg flex flex-col justify-center items-center space-y-3">
                <RefreshCw size={40} className="text-sky-400 animate-spin" />
                <h4 className="font-display font-medium text-white text-sm">Menghubungi Satelit X Radar...</h4>
                <p className="text-xs text-muted-active font-sans">Menjaring kata kunci dan metrik tular untuk unjuran kementerian.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {xTweets.map((tw) => (
                  <div key={tw.id} className="bg-panel border border-line rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-sky-500/50 transition shadow duration-150 animate-fade-in">
                    <div className="space-y-2.5">
                      
                      {/* Header account details */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={tw.profileImageUrl} 
                            alt={tw.username}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full border border-line object-cover" 
                          />
                          <div className="leading-tight">
                            <span className="font-sans font-bold text-white block text-sm flex items-center gap-1">
                              {tw.name}
                              {tw.verified && (
                                <span className="bg-sky-500 text-white rounded-full text-[8px] px-1 font-mono font-bold">✓</span>
                              )}
                            </span>
                            <span className="font-mono text-xs text-muted-inactive">@{tw.username}</span>
                          </div>
                        </div>
                        <Twitter className="text-sky-400 shrink-0" size={14} />
                      </div>

                      {/* Main Text Content */}
                      <p className="text-xs text-text leading-relaxed font-sans select-all whitespace-pre-wrap">{tw.text}</p>
                    </div>

                    {/* Metrics and Action triggers */}
                    <div className="border-t border-line-soft/40 pt-2.5 flex justify-between items-center text-[11px] font-mono text-muted-active">
                      <div className="flex items-center space-x-3.5">
                        <span title="Likes">❤️ <strong className="text-white">{tw.metrics.likeCount}</strong></span>
                        <span title="Retweets">🔁 <strong className="text-white">{tw.metrics.retweetCount}</strong></span>
                        <span title="Replies">💬 <strong className="text-white">{tw.metrics.replyCount}</strong></span>
                      </div>
                      <button
                        onClick={() => {
                          onSelectTopicForGenerator(
                            `Rujukan Tweet: @${tw.username}`,
                            `Hantaran Tweet oleh @${tw.username}: "${tw.text}" (Likes: ${tw.metrics.likeCount}, Retweets: ${tw.metrics.retweetCount})`,
                            `https://twitter.com/${tw.username}/status/${tw.id}`
                          );
                          triggerToast("Suntikan Tweet ke Generator Draf Berjaya!");
                        }}
                        className="px-2.5 py-1 bg-gradient-to-r from-orange-primary to-purple-primary text-white text-[10px] font-sans font-bold rounded hover:opacity-90 select-none cursor-pointer transition"
                      >
                        ⚡ Suntik Ke Draf
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Breaking Signal Ticker */}
      <footer className="bg-panel border-t border-line py-1.5 px-4 text-xs font-mono flex items-center justify-between text-muted-active shrink-0">
        <div className="flex items-center space-x-3 w-full overflow-hidden">
          <span className="text-red-500 font-bold whitespace-nowrap flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-1.5"></span>
            BREAKING:
          </span>
          <div className="overflow-hidden w-full relative">
            <span className="inline-block animate-marquee whitespace-nowrap text-text text-sm">
              [METMALAYSIA 22:45]: AMARAN RIBUT PETIR TAHAP BAHAYA DI PANTAI TIMUR SEMENANJUNG MALAYSIA... [PARLIMEN]: PEMBENTANGAN STRUKTUR SUBSIDI PETROL RON95 DIJADUALKAN KHAMIS INI, UNJURAN PENJIMATAN KAPASITI RM4.1 BILION... [GISB UPDATE]: KEMENTERIAN LUAR UMUM PEMBATALAN PASPORT 10 AHLI ATASAN TERLIBAT...
            </span>
          </div>
        </div>
      </footer>

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
