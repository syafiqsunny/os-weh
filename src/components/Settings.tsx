import React, { useState, useEffect } from "react";
import { Key, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, HelpCircle, Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const [geminiKey, setGeminiKey] = useState<string>("");
  const [scrapingBeeKey, setScrapingBeeKey] = useState<string>("");
  const [showGemini, setShowGemini] = useState<boolean>(false);
  const [showScrapingBee, setShowScrapingBee] = useState<boolean>(false);
  
  // Status states
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isTestingGemini, setIsTestingGemini] = useState<boolean>(false);
  const [isTestingScrape, setIsTestingScrape] = useState<boolean>(false);
  
  const [geminiTestStatus, setGeminiTestStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [scrapeTestStatus, setScrapeTestStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const DEFAULT_SYSTEM_PROMPT = `Anda adalah Editor Kanan Berita untuk portal berita .weh.\nGaya bahasa .weh adalah hibrid: kasual tetapi berfokuskan data penting, informatif, tajam, dan mesra generasi muda Malaysia. Menggunakan Bahasa Melayu kontemporari (bebas daripada slanga jalanan melampau tetapi tidak kaku).`;

  const [systemPrompt, setSystemPrompt] = useState<string>("");

  // Load from localStorage on mount
  useEffect(() => {
    const savedGemini = localStorage.getItem("weh_gemini_api_key") || "";
    const savedScrape = localStorage.getItem("weh_scrapingbee_api_key") || "";
    const savedPrompt = localStorage.getItem("weh_system_prompt") || DEFAULT_SYSTEM_PROMPT;
    setGeminiKey(savedGemini);
    setScrapingBeeKey(savedScrape);
    setSystemPrompt(savedPrompt);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem("weh_gemini_api_key", geminiKey.trim());
    localStorage.setItem("weh_scrapingbee_api_key", scrapingBeeKey.trim());
    localStorage.setItem("weh_system_prompt", systemPrompt.trim());
    
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  const handleClear = () => {
    if (confirm("Adakah anda pasti untuk memadam semua Kunci API tempatan?")) {
      setGeminiKey("");
      setScrapingBeeKey("");
      localStorage.removeItem("weh_gemini_api_key");
      localStorage.removeItem("weh_scrapingbee_api_key");
      setGeminiTestStatus(null);
      setScrapeTestStatus(null);
    }
  };

  const handleResetPrompt = () => {
    if (confirm("Adakah anda pasti untuk menetapkan semula prompt kepada rukun asal .weh?")) {
      setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    }
  };

  // Test Gemini Key by calling the server with custom headers
  const testGeminiKey = async () => {
    setIsTestingGemini(true);
    setGeminiTestStatus(null);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-gemini-key": geminiKey.trim(),
          "x-scrapingbee-key": scrapingBeeKey.trim()
        },
        body: JSON.stringify({ query: "uji sambungan" })
      });
      const data = await response.json();
      
      if (response.ok) {
        setGeminiTestStatus({ success: true });
      } else {
        setGeminiTestStatus({ error: data.error || "Ralat tidak diketahui ketika menguji Gemini." });
      }
    } catch (err: any) {
      setGeminiTestStatus({ error: err.message || "Gagal menghubungi sambungan pelayan." });
    } finally {
      setIsTestingGemini(false);
    }
  };

  // Test ScrapingBee Key by calling the scrape system with a known URL
  const testScrapingBeeKey = async () => {
    setIsTestingScrape(true);
    setScrapeTestStatus(null);
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-gemini-key": geminiKey.trim(),
          "x-scrapingbee-key": scrapingBeeKey.trim()
        },
        body: JSON.stringify({ url: "https://httpbin.org/ip" })
      });
      const data = await response.json();
      
      if (response.ok) {
        setScrapeTestStatus({ success: true });
      } else {
        setScrapeTestStatus({ error: data.error || "Ralat tidak diketahui ketika menguji ScrapingBee." });
      }
    } catch (err: any) {
      setScrapeTestStatus({ error: err.message || "Gagal menghubungi sambungan pelayan." });
    } finally {
      setIsTestingScrape(false);
    }
  };

  return (
    <div id="settings-container" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      
      {/* Settings Form Column */}
      <div id="settings-form-block" className="lg:col-span-2 bg-panel border border-line rounded-xl p-5 space-y-6">
        <div className="flex items-center space-x-3 border-b border-line pb-4">
          <div className="p-2.5 bg-orange-primary/10 border border-orange-primary/30 rounded-lg text-orange-primary">
            <Key size={20} />
          </div>
          <div>
            <h2 className="text-sm font-display font-bold text-white tracking-tight uppercase">PENGURUSAN KUNCI API KLIEN</h2>
            <p className="text-[11px] text-muted-inactive/60 font-mono mt-0.5">Sediakan kunci peribadi anda untuk mengaktifkan fungsi penuh tanpa gangguan kuota.</p>
          </div>
        </div>

        {/* Gemini Form Control */}
        <div id="gemini-form-group" className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-mono font-bold text-purple-primary flex items-center">
              ♊ GEMINI_API_KEY (Google Gen AI)
            </label>
            <span className="text-[10px] text-muted-inactive/50 font-mono">Diperlukan untuk draft generator & carian</span>
          </div>
          <div className="relative">
            <input 
              type={showGemini ? "text" : "password"}
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="Sila masukkan AI Studio API Key (AIzaSy...)"
              className="w-full bg-field border border-line text-xs rounded-lg px-3.5 py-2.5 text-white pr-10 focus:outline-none focus:border-purple-primary font-mono tracking-wider"
            />
            <button 
              type="button"
              onClick={() => setShowGemini(!showGemini)}
              className="absolute right-3 top-3 text-muted-inactive/60 hover:text-white transition"
            >
              {showGemini ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-[11px] text-muted-inactive/65 leading-relaxed">
            API Key ini digunakan terus dari pelayar anda ke proksi server bagi menjalankan model termaju <span className="text-white font-mono">gemini-3.5-flash</span>. Anda boleh menjana kunci percuma di portal Google AI Studio.
          </p>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={testGeminiKey}
              disabled={isTestingGemini || !geminiKey.trim()}
              className="px-3 py-1 bg-purple-primary/10 hover:bg-purple-primary/20 border border-purple-primary/30 text-purple-primary text-xs rounded font-mono font-bold transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTestingGemini ? <RefreshCw className="animate-spin" size={12} /> : null}
              <span>🔍 Uji Sambungan Gemini</span>
            </button>
            {geminiTestStatus?.success && (
              <span className="text-xs text-green-500 font-mono font-medium flex items-center">
                <CheckCircle2 size={13} className="mr-1 inline" /> Kunci Sah!
              </span>
            )}
            {geminiTestStatus?.error && (
              <span className="text-[10px] text-red-500 font-mono font-medium leading-tight block max-w-md">
                ✗ Ralat: {geminiTestStatus.error}
              </span>
            )}
          </div>
        </div>

        {/* ScrapingBee Form Control */}
        <div id="scrapingbee-form-group" className="space-y-2.5 border-t border-line/40 pt-5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-mono font-bold text-orange-primary flex items-center">
              🐝 SCRAPINGBEE_API_KEY (Portal Extractor)
            </label>
            <span className="text-[10px] text-muted-inactive/50 font-mono">Diperlukan untuk mengekstrak kandungan laman web</span>
          </div>
          <div className="relative">
            <input 
              type={showScrapingBee ? "text" : "password"}
              value={scrapingBeeKey}
              onChange={(e) => setScrapingBeeKey(e.target.value)}
              placeholder="Masukkan ScrapingBee API Key anda"
              className="w-full bg-field border border-line text-xs rounded-lg px-3.5 py-2.5 text-white pr-10 focus:outline-none focus:border-orange-primary font-mono tracking-wider"
            />
            <button 
              type="button"
              onClick={() => setShowScrapingBee(!showScrapingBee)}
              className="absolute right-3 top-3 text-muted-inactive/60 hover:text-white transition"
            >
              {showScrapingBee ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-[11px] text-muted-inactive/65 leading-relaxed">
            API Key dari ScrapingBee diperlukan bagi memintas sekatan bot (Cloudflare, captcha dll) di portal berita Malaysia supaya kandungan penuh boleh diekstrak ke dalam dashboard.
          </p>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={testScrapingBeeKey}
              disabled={isTestingScrape || !scrapingBeeKey.trim()}
              className="px-3 py-1 bg-orange-primary/10 hover:bg-orange-primary/20 border border-orange-primary/30 text-orange-primary text-xs rounded font-mono font-bold transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTestingScrape ? <RefreshCw className="animate-spin" size={12} /> : null}
              <span>🔍 Uji Sambungan ScrapingBee</span>
            </button>
            {scrapeTestStatus?.success && (
              <span className="text-xs text-green-500 font-mono font-medium flex items-center">
                <CheckCircle2 size={13} className="mr-1 inline" /> Kunci Sah!
              </span>
            )}
            {scrapeTestStatus?.error && (
              <span className="text-[10px] text-red-500 font-mono font-medium leading-tight block max-w-md">
                ✗ Ralat: {scrapeTestStatus.error}
              </span>
            )}
          </div>
        </div>

        {/* System Instructions / Prompt Editor */}
        <div id="prompt-form-group" className="space-y-2.5 border-t border-line/40 pt-5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-mono font-bold text-emerald-400 flex items-center">
              ✍️ ARAHAN SYSTEM / PROMPT EDITOR (AI STYLE)
            </label>
            <button
              type="button"
              onClick={handleResetPrompt}
              className="text-[10px] text-orange-primary hover:underline font-mono"
            >
              Set Semula Asal ⟲
            </button>
          </div>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Masukkan arahan atau gaya bahasa khusus untuk AI..."
            rows={5}
            className="w-full bg-field border border-line text-xs rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-400 font-mono leading-relaxed"
          />
          <p className="text-[11px] text-muted-inactive/65 leading-relaxed">
            Suaikan persona, nada suara, kosa kata peribadi, atau rukun editorial untuk penjanaan draf disini. Gunakan Bahasa Melayu, Bahasa Inggeris, atau campur untuk memandu AI mengikut cita rasa unik portal anda.
          </p>
        </div>

        {/* Global Save Controls */}
        <div id="settings-save-actions" className="border-t border-line pt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 border border-red-500/30 hover:bg-red-500/10 text-red-500 text-xs rounded-lg font-mono font-bold transition cursor-pointer"
          >
            ❌ Padam Kunci
          </button>
          <div className="flex items-center space-x-3.5">
            {saveSuccess && (
              <span className="text-xs text-green-400 font-mono font-medium animate-pulse">✓ Kunci berjaya disimpan!</span>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 bg-orange-primary text-white hover:bg-orange-600 text-xs rounded-lg font-mono font-bold transition flex items-center space-x-1.5 shadow-lg shadow-orange-primary/20 cursor-pointer"
            >
              {isSaving ? <RefreshCw size={13} className="animate-spin" /> : <ShieldCheck size={14} />}
              <span>SIMPAN CONFIGURATION</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guide Card Column */}
      <div id="settings-tutorial-block" className="space-y-5">
        
        {/* Help Widget */}
        <div className="bg-panel border border-line rounded-xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-white font-display font-medium text-xs uppercase tracking-tight">
            <HelpCircle size={15} className="text-orange-primary" />
            <span>Bagaimana Mendapatkan API Key?</span>
          </div>
          <div className="text-[11px] text-muted-inactive/75 leading-relaxed space-y-3.5 font-mono">
            <div>
              <p className="text-purple-primary font-bold">1. Google Gemini Key:</p>
              <p className="mt-0.5">Dapatkan di Google AI Studio secara percuma.</p>
              <a 
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline text-[10px] inline-flex items-center mt-1 text-orange-primary"
              >
                Buka AI Studio ↗
              </a>
            </div>
            
            <div className="border-t border-line/40 pt-3">
              <p className="text-orange-primary font-bold">2. ScrapingBee API Key:</p>
              <p className="mt-0.5">Dapatkan 1,000 kredit panggilan percuma sebaik sahaja mendaftar di ScrapingBee.</p>
              <a 
                href="https://www.scrapingbee.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline text-[10px] inline-flex items-center mt-1 text-purple-primary"
              >
                Daftar ScrapingBee ↗
              </a>
            </div>
          </div>
        </div>

        {/* Security / Decrypt Badge */}
        <div className="bg-panel border border-line-soft rounded-xl p-4.5 flex items-start space-x-3">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">Keselamatan Data Tempatan</h4>
            <p className="text-[10px] text-muted-inactive/60 font-mono leading-relaxed">
              Kunci API anda disimpan secara selamat di dalam storan tempatan (localStorage) peranti anda sahaja. Data sulit ini dihantar secara langsung ke API gateway tanpa perantara.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
