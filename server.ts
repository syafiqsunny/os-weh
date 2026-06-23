import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database for saved search queries / history to track costs
interface CostSession {
  totalUSD: number;
  totalRM: number;
  totalCalls: number;
  totalTokensIn: number;
  totalTokensOut: number;
  totalSearches: number;
  history: Array<{
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
  }>;
}

const currentSession: CostSession = {
  totalUSD: 0,
  totalRM: 0,
  totalCalls: 0,
  totalTokensIn: 0,
  totalTokensOut: 0,
  totalSearches: 0,
  history: []
};

// Google Sheets Integration State on the Server
let sheetsToken: string | null = null;
let sheetsUserEmail: string | null = null;
let connectedSpreadsheetId: string | null = null;
let isHourlyReportingEnabled = true;
let lastSyncedReportTime: string | null = null;
let nextReportingCountdown = 3600; // 3600 seconds = 1 hour
let sheetsSyncLogs: Array<{ timestamp: string; message: string; success: boolean }> = [];
let lastAction = "Memulakan newsroom";

function addSyncLog(message: string, success = true) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };
  const ts = new Intl.DateTimeFormat("en-GB", options).format(new Date());
  sheetsSyncLogs.push({ timestamp: ts, message, success });
  if (sheetsSyncLogs.length > 50) {
    sheetsSyncLogs.shift();
  }
}

// Background Auto-sync hourly reporter
async function performBackgroundHourlyReport() {
  if (!sheetsToken || !connectedSpreadsheetId) {
    addSyncLog("Automatic hourly sync skipped: Sheet status is not fully connected.", false);
    return;
  }
  
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };
  const timestamp = new Intl.DateTimeFormat("en-GB", options).format(new Date());

  try {
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${connectedSpreadsheetId}/values/Hourly_Cost_Reports!A1:append?valueInputOption=USER_ENTERED`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sheetsToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values: [
          [
            timestamp,
            currentSession.totalCalls,
            currentSession.totalTokensIn,
            currentSession.totalTokensOut,
            currentSession.totalSearches,
            currentSession.totalUSD.toFixed(6),
            currentSession.totalRM.toFixed(6),
            lastAction,
            "Hourly Automated Sync"
          ]
        ]
      })
    });

    if (res.ok) {
      lastSyncedReportTime = timestamp;
      addSyncLog(`Automatic hourly report successfully updated to Google Sheets.`, true);
    } else {
      const errText = await res.text();
      addSyncLog(`Hourly sync failed: ${errText}`, false);
    }
  } catch (err: any) {
    addSyncLog(`Hourly sync exception: ${err.message}`, false);
  }
}

// Background ticker for hourly report countdown
setInterval(async () => {
  if (sheetsToken && connectedSpreadsheetId && isHourlyReportingEnabled) {
    nextReportingCountdown--;
    if (nextReportingCountdown <= 0) {
      nextReportingCountdown = 3600; // Reset 1 hour
      await performBackgroundHourlyReport();
    }
  }
}, 1000);

// Dynamic request-based construction for Gemini API
function getGeminiClient(req: express.Request): GoogleGenAI {
  const userKey = req.headers["x-gemini-key"] as string;
  const fallbackKey = process.env.GEMINI_API_KEY;
  const key = (userKey && userKey.trim() !== "") ? userKey : fallbackKey;

  if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
    throw new Error("GEMINI_API_KEY tidak dikonfigurasikan. Sila lawati tab 'SETTINGS' bagi memasukkan Kunci API Gemini anda.");
  }

  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Exchange rate constant (RM/MYR for June 2026)
const MYR_RATE = 4.1516;

app.get("/api/cost-session", (req, res) => {
  res.json({
    rate: MYR_RATE,
    session: currentSession
  });
});

app.post("/api/reset-cost-session", (req, res) => {
  currentSession.totalUSD = 0;
  currentSession.totalRM = 0;
  currentSession.totalCalls = 0;
  currentSession.totalTokensIn = 0;
  currentSession.totalTokensOut = 0;
  currentSession.totalSearches = 0;
  currentSession.history = [];
  lastAction = "Reset Cost Session";
  res.json({ success: true, session: currentSession });
});

// Google Sheets API routes
app.post("/api/sheets/register-token", (req, res) => {
  const { token, email } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Sila berikan token OAuth." });
  }
  sheetsToken = token;
  sheetsUserEmail = email || "Pengguna Berdaftar";
  addSyncLog(`OAuth Token didaftarkan untuk ${sheetsUserEmail}.`, true);
  res.json({ success: true });
});

app.post("/api/sheets/clear-token", (req, res) => {
  sheetsToken = null;
  sheetsUserEmail = null;
  connectedSpreadsheetId = null;
  sheetsSyncLogs = [];
  res.json({ success: true });
});

app.get("/api/sheets/status", (req, res) => {
  res.json({
    sheetsTokenActive: !!sheetsToken,
    sheetsUserEmail,
    connectedSpreadsheetId,
    isHourlyReportingEnabled,
    lastSyncedReportTime,
    nextReportingCountdown,
    sheetsSyncLogs
  });
});

app.post("/api/sheets/toggle-hourly-reporting", (req, res) => {
  isHourlyReportingEnabled = req.body.enabled !== undefined ? !!req.body.enabled : !isHourlyReportingEnabled;
  addSyncLog(`Pelaporan automatik sejam ditetapkan ke: ${isHourlyReportingEnabled ? 'AKTIF' : 'TIDAK AKTIF'}.`, true);
  res.json({ success: true, isHourlyReportingEnabled });
});

app.post("/api/sheets/set-countdown", (req, res) => {
  const { countdown } = req.body;
  if (typeof countdown === "number") {
    nextReportingCountdown = countdown;
    addSyncLog(`Masa hadapan pelaporan diset ke: ${nextReportingCountdown} saat.`, true);
  }
  res.json({ success: true, nextReportingCountdown });
});

app.post("/api/sheets/create", async (req, res) => {
  if (!sheetsToken) {
    return res.status(401).json({ error: "Sila log masuk dengan Google Workspace terlebih dahulu." });
  }

  try {
    const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sheetsToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        properties: {
          title: ".weh Newsroom API Billing & Cost Reports"
        },
        sheets: [
          {
            properties: {
              title: "Hourly_Cost_Reports"
            }
          }
        ]
      })
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(`Ralat penyediaan Google Sheet: ${errText}`);
    }

    const sheetData = await createRes.json();
    connectedSpreadsheetId = sheetData.spreadsheetId;

    // Tambah Header lajur
    const headerRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${connectedSpreadsheetId}/values/Hourly_Cost_Reports!A1:append?valueInputOption=USER_ENTERED`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sheetsToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values: [
          ["Tarikh & Masa (Kuala Lumpur)", "Jumlah Sesi Panggilan", "Input Tokens", "Output Tokens", "Carian Grounding", "Kos Terkumpul (USD)", "Kos Terkumpul (RM)", "Tindakan Terakhir", "Mod Laporan"]
        ]
      })
    });

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kuala_Lumpur",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    const timestamp = new Intl.DateTimeFormat("en-GB", options).format(new Date());

    // Rekod baris pelancaran pertama
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${connectedSpreadsheetId}/values/Hourly_Cost_Reports!A1:append?valueInputOption=USER_ENTERED`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sheetsToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values: [
          [timestamp, 0, 0, 0, 0, "0.000000", "0.000000", "Inisialisasi Integrasi Google Sheets", "Integrated Successfully"]
        ]
      })
    });

    addSyncLog(`Spreadsheet berjaya dicipta: .weh Newsroom API Billing & Cost Reports. ID: ${connectedSpreadsheetId}`, true);
    lastSyncedReportTime = timestamp;
    res.json({ success: true, spreadsheetId: connectedSpreadsheetId });
  } catch (err: any) {
    addSyncLog(`Gagal membina template Google Sheet: ${err.message}`, false);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/sheets/select", (req, res) => {
  const { spreadsheetId } = req.body;
  if (!spreadsheetId || spreadsheetId.trim() === "") {
    return res.status(400).json({ error: "Sila masukkan ID Google Spreadsheet yang sah." });
  }
  connectedSpreadsheetId = spreadsheetId;
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };
  const timestamp = new Intl.DateTimeFormat("en-GB", options).format(new Date());
  lastSyncedReportTime = timestamp;
  addSyncLog(`Spreadsheet Sedia Ada disambungkan: ${connectedSpreadsheetId}`, true);
  res.json({ success: true, spreadsheetId: connectedSpreadsheetId });
});

app.post("/api/sheets/sync-now", async (req, res) => {
  if (!sheetsToken) {
    return res.status(401).json({ error: "Sila log masuk dengan akaun Google terlebih dahulu." });
  }
  if (!connectedSpreadsheetId) {
    return res.status(400).json({ error: "Tiada Google Sheet disambungkan." });
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };
  const timestamp = new Intl.DateTimeFormat("en-GB", options).format(new Date());

  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${connectedSpreadsheetId}/values/Hourly_Cost_Reports!A1:append?valueInputOption=USER_ENTERED`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sheetsToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        values: [
          [
            timestamp,
            currentSession.totalCalls,
            currentSession.totalTokensIn,
            currentSession.totalTokensOut,
            currentSession.totalSearches,
            currentSession.totalUSD.toFixed(6),
            currentSession.totalRM.toFixed(6),
            lastAction,
            "Manual Sync Triggered"
          ]
        ]
      })
    });

    if (response.ok) {
      lastSyncedReportTime = timestamp;
      addSyncLog(`Berjaya menyelaraskan rekod kewangan semasa ke Google Sheets.`, true);
      res.json({ success: true });
    } else {
      const errText = await response.text();
      addSyncLog(`Penghantaran rekod manual gagal: ${errText}`, false);
      res.status(500).json({ error: errText });
    }
  } catch (err: any) {
    addSyncLog(`Penyelarasan rekod manual ralat: ${err.message}`, false);
    res.status(500).json({ error: err.message });
  }
});

// Search & Grounding API
app.post("/api/search", async (req, res) => {
  const { query, deepCheck = false } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Sila masukkan kata kunci carian." });
  }

  // Model definition & costs:
  // Claude 3.5 Sonnet: Input $3/M, Output $15/M. Web Search $10/1k ($0.01 per search).
  // Gemini 3.5 Flash: Input $0.075/M (low rate), Output $0.30/M. Web Search $0.014 per queries.
  // Gemini 3.1 Flash-Lite: Input $0.075/M, Output $0.30/M.
  // For cost reporting, we simulate the specific model choices:
  // - Rutin/Gemini Option: Use real server-side Gemini 3.5 Flash + real Grounding. Very low cost!
  // - High-Precision Claude Option: Users see simulated Claude costs for comparative study, executed on Gemini for live results.
  const isClaudeSelection = req.body.pricingModel === "claude";

  try {
    const ai = getGeminiClient(req);

    const textPrompt = `Sediakan ringkasan eksekutif berita terkini bersumberkan fakta kukuh untuk topik ini: "${query}". 
    Formatkan jawapan anda dengan terperinci dalam Bahasa Melayu. Rukun Penulisan WEH:
    1. Nyatakan fakta utama yang disahkan.
    2. Rasionalkan "WEH, Kenapa Penting?".
    3. Ringkaskan sumber-sumber rujukan utama di bawah dalam bentuk senarai.`;

    const startTime = Date.now();
    
    // Call Gemini with real search grounding
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: textPrompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.3
      },
    });

    const finishTime = Date.now();

    // Extract grounding info safely
    const sources: Array<{ title: string; url: string }> = [];
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    if (groundingMetadata && groundingMetadata.groundingChunks) {
      for (const chunk of groundingMetadata.groundingChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || "Rujukan Berita",
            url: chunk.web.uri
          });
        }
      }
    }

    // Token counting
    const tokensIn = response.usageMetadata?.promptTokenCount || 1000;
    const tokensOut = response.usageMetadata?.candidatesTokenCount || 800;
    const searchQueriesCount = groundingMetadata?.webSearchQueries?.length || 2;

    // Estimate cost based on chosen pricing configuration (Claude pricing vs Gemini pricing)
    let costInUSD = 0;
    if (isClaudeSelection) {
      // Claude rates: Input: $3/M, Output: $15/M. Per carian Perplexity/Search: $0.01
      costInUSD = (tokensIn / 1000000) * 3.0 + (tokensOut / 1000000) * 15.0 + (searchQueriesCount * 0.01);
    } else {
      // Gemini 3.5 Flash rates: Input: $0.075/M, Output: $0.30/M. Grounding carian: $0.014 per query.
      costInUSD = (tokensIn / 1000000) * 0.075 + (tokensOut / 1000000) * 0.30 + (searchQueriesCount * 0.014);
    }

    const costInRM = costInUSD * MYR_RATE;

    // Update global cost monitor
    currentSession.totalUSD += costInUSD;
    currentSession.totalRM += costInRM;
    currentSession.totalCalls += 1;
    currentSession.totalTokensIn += tokensIn;
    currentSession.totalTokensOut += tokensOut;
    currentSession.totalSearches += searchQueriesCount;
    lastAction = `Cari Fakta: "${query.substring(0, 35)}${query.length > 35 ? '...' : ''}"`;

    currentSession.history.push({
      timestamp: new Date().toLocaleTimeString("us-MY", { hour12: false }),
      type: isClaudeSelection ? "Cari Fakta (Claude Pricing Preset)" : "Cari Fakta (Gemini Grounding Preset)",
      queryPrompt: query,
      modelUsed: isClaudeSelection ? "Claude 3.5 Sonnet (Simulated via Gemini)" : "Gemini 3.5 Flash (Live Grounding)",
      tokensIn,
      tokensOut,
      searchesRun: searchQueriesCount,
      costUSD: costInUSD,
      costRM: costInRM,
      success: true
    });

    res.json({
      summary: response.text,
      sources: sources.slice(0, 5),
      metadata: {
        tokensIn,
        tokensOut,
        searchesRun: searchQueriesCount,
        costUSD: costInUSD,
        costRM: costInRM,
        isClaude: isClaudeSelection,
        durationMs: finishTime - startTime
      }
    });

  } catch (error: any) {
    console.error("Grounding Search error:", error);
    
    // Simulate query if key not present, explaining to user but demonstrating design
    const fallbackIn = 1200;
    const fallbackOut = 650;
    const fakeSearches = 3;
    let fallbackUSD = 0;
    
    if (isClaudeSelection) {
      fallbackUSD = (fallbackIn / 1000000) * 3 + (fallbackOut / 1000000) * 15 + (fakeSearches * 0.01);
    } else {
      fallbackUSD = (fallbackIn / 1000000) * 0.075 + (fallbackOut / 1000000) * 0.30 + (fakeSearches * 0.014);
    }
    const fallbackRM = fallbackUSD * MYR_RATE;

    currentSession.totalUSD += fallbackUSD;
    currentSession.totalRM += fallbackRM;
    currentSession.totalCalls += 1;
    currentSession.totalTokensIn += fallbackIn;
    currentSession.totalTokensOut += fallbackOut;
    currentSession.totalSearches += fakeSearches;
    lastAction = `Simulasi Carian: "${query.substring(0, 35)}${query.length > 35 ? '...' : ''}"`;
    
    currentSession.history.push({
      timestamp: new Date().toLocaleTimeString("us-MY", { hour12: false }),
      type: `${isClaudeSelection ? "Claude" : "Gemini"} Carian Sandbox (Fallback)`,
      queryPrompt: query,
      modelUsed: isClaudeSelection ? "Claude 3.5 Sonnet (Local Simulation)" : "Gemini 3.5 Flash (Local Simulation)",
      tokensIn: fallbackIn,
      tokensOut: fallbackOut,
      searchesRun: fakeSearches,
      costUSD: fallbackUSD,
      costRM: fallbackRM,
      success: false
    });

    res.json({
      summary: `### [AMARAN SANDBOX: API KEY TIADA / TERLIMITA]\n\nBerikut adalah draf simulasi berita untuk topik: **"${query}"**.\n\nSila letakkan API Key sebenar dalam Settings > Secrets untuk integrasi carian web langsung Google Search!\n\n#### Fakta Utama (Simulasi)\n1. Isu hangat mendedahkan peningkatan sebutan meluas sebanyak 140% di platform digital sejak 12 jam yang lalu.\n2. Editor newsroom menasihatkan semakan menyeluruh bagi mengelakkan kandungan tular bercanggah.\n\n#### WEH Kenapa Penting?\nIsu ini secara langsung membentuk persepsi sosial berikutan dasar baharu yang sedang dibincangkan di Parlimen.`,
      sources: [
        { title: "Portal Berita Utama (Simulasi)", url: "https://news.google.com" },
        { title: "Kenyataan Rasmi Kementerian (Simulasi)", url: "https://www.malaysia.gov.my" }
      ],
      metadata: {
        tokensIn: fallbackIn,
        tokensOut: fallbackOut,
        searchesRun: fakeSearches,
        costUSD: fallbackUSD,
        costRM: fallbackRM,
        isClaude: isClaudeSelection,
        fallbackActive: true,
        errorMessage: error.message
      }
    });
  }
});

// ScrapingBee Proxy API Route
app.post("/api/scrape", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Sila masukkan URL rencana berita." });
  }

  const userScrapeKey = req.headers["x-scrapingbee-key"] as string;
  const fallbackScrapeKey = process.env.SCRAPINGBEE_API_KEY;
  const apiKey = (userScrapeKey && userScrapeKey.trim() !== "") ? userScrapeKey : fallbackScrapeKey;

  if (!apiKey || apiKey === "MY_SCRAPINGBEE_API_KEY" || apiKey.trim() === "") {
    return res.status(400).json({
      error: "Sila masukkan SCRAPINGBEE_API_KEY anda di tab 'SETTINGS' di atas bagi mengaktifkan penggalian kandungan web."
    });
  }

  try {
    const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(url)}&render_js=false&block_resources=true`;
    
    const response = await fetch(scrapingBeeUrl, {
      method: "GET",
      headers: {
        'User-Agent': 'aistudio-build'
      }
    });

    if (!response.ok) {
      throw new Error(`Ralat ScrapingBee API: Status ${response.status} (${response.statusText})`);
    }

    const html = await response.text();

    // Custom sanitization and innertext extraction to keep content readable and clean
    let cleanText = html;
    // Remove scripts
    cleanText = cleanText.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
    // Remove style
    cleanText = cleanText.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    // Remove common non-meaningful content structures
    cleanText = cleanText.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "");
    cleanText = cleanText.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");
    cleanText = cleanText.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "");
    // Strip all HTML tags
    cleanText = cleanText.replace(/<[^>]*>/g, " ");
    // Unescape HTML entities
    cleanText = cleanText
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'");

    // Clean whitespace
    cleanText = cleanText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join("\n");

    // Clip to maximum characters to avoid blowing token usage budgets of LLMs
    if (cleanText.length > 10000) {
      cleanText = cleanText.substring(0, 10000) + "\n\n[... Kandungan dipotong oleh sistem demi kebersihan data ...]";
    }

    // Capture simulated costs for ScrapingBee
    // ScrapingBee default rate is 1 API credit per simple call ($0.009 approx depending on tier).
    const costInUSD = 0.009;
    const costInRM = costInUSD * MYR_RATE;
    currentSession.totalUSD += costInUSD;
    currentSession.totalRM += costInRM;
    currentSession.totalCalls += 1;
    lastAction = `Scrape URL via ScrapingBee: "${url.substring(0, 35)}${url.length > 35 ? '...' : ''}"`;

    currentSession.history.push({
      timestamp: new Date().toLocaleTimeString("us-MY", { hour12: false }),
      type: "Gali Laman Berita (ScrapingBee)",
      queryPrompt: url,
      modelUsed: "ScrapingBee REST API",
      tokensIn: 0,
      tokensOut: 0,
      searchesRun: 0,
      costUSD: costInUSD,
      costRM: costInRM,
      success: true
    });

    res.json({ text: cleanText });
  } catch (error: any) {
    console.error("ScrapingBee Proxy error:", error);
    res.status(500).json({ error: error.message || "Gagal menghubungi ScrapingBee API." });
  }
});

// Generator API
// Generates modular draf berita gaya WEH
app.post("/api/generate", async (req, res) => {
  const { topic, context, formats = ["article", "caption"], model = "gemini-3.5-flash", customSystemPrompt } = req.body;
  if (!topic) {
    return res.status(400).json({ error: "Sila berikan tajuk atau topik berita." });
  }

  // Model cost definitions (Input / Output cost per Million in USD)
  // Claude 3.5 Sonnet (Simulated / or targeted): Input $3.00, Output $15.00
  // Gemini 3.5 Flash: Input $0.075, Output $0.30
  // Gemini 3.1 Flash-Lite: Input $0.075, Output $0.30
  const isClaude = req.body.pricingModel === "claude";

  try {
    const ai = getGeminiClient(req);

    // Constructing system instructions for strict .weh format or custom prompt
    let instructions = (customSystemPrompt && customSystemPrompt.trim() !== "")
      ? customSystemPrompt.trim() + "\n\n"
      : `Anda adalah Editor Kanan Berita untuk portal berita .weh.\nGaya bahasa .weh adalah hibrid: kasual tetapi berfokuskan data penting, informatif, tajam, dan mesra generasi muda Malaysia. Menggunakan Bahasa Melayu kontemporari (bebas daripada slanga jalanan melampau tetapi tidak kaku).\n\n`;
    
    instructions += `FORMAT KELUARAN WAJIB (keluarkan format JSON yang sah dengan struktur berikut):\n`;
    
    // Schema definition dynamically based on checked formats to save output tokens!
    const schemaProps: any = {
      title: { type: Type.STRING, description: "Tajuk utama yang memikat, maksimum 10 perkataan." },
      standfirst: { type: Type.STRING, description: "Sub-tajuk ringkas pengantar berita." }
    };
    const requiredFields = ["title", "standfirst"];

    if (formats.includes("article")) {
      schemaProps.article = { type: Type.STRING, description: "Artikel berita penuh berstail WEH, mengandungi 3-4 perenggan padat berserta poin." };
      requiredFields.push("article");
    }
    if (formats.includes("wehKenapaPenting")) {
      schemaProps.wekKenapaPenting = { type: Type.STRING, description: "Huraian pendek: Kenapa pembaca perlu ambil kisah tentang isu ini." };
      requiredFields.push("wekKenapaPenting");
    }
    if (formats.includes("wehCheck")) {
      schemaProps.wehCheck = { type: Type.STRING, description: "Semakan fakta atau sudut kontroversi 3R / mitos yang dibongkar." };
      requiredFields.push("wehCheck");
    }
    if (formats.includes("wehData")) {
      schemaProps.wehData = { type: Type.STRING, description: "Statistik, peratusan, atau data penting berita (dalam format bullet points)." };
      requiredFields.push("wehData");
    }
    if (formats.includes("videoScript")) {
      schemaProps.videoScript = { type: Type.STRING, description: "Skrip pendek 30-saat untuk video TikTok/Reels lengkap dengan arahan visual." };
      requiredFields.push("videoScript");
    }
    if (formats.includes("caption")) {
      schemaProps.caption = { type: Type.STRING, description: "Kapsyen media sosial (X/Threads/Insta) berstail tular dengan ikon tersendiri." };
      requiredFields.push("caption");
    }

    const responseSchema = {
      type: Type.OBJECT,
      properties: schemaProps,
      required: requiredFields
    };

    const userPrompt = `Tajuk/Subjek: "${topic}"\nKonteks Maklumat Tambahan:\n"${context || "Tiada konteks tambahan disediakan."}"\n\nJana kandungan mengikut struktur format JSON sahaja.`;

    const startTime = Date.now();
    const response = await ai.models.generateContent({
      model: model, // e.g. "gemini-3.5-flash" or "gemini-3.1-flash-lite"
      contents: userPrompt,
      config: {
        systemInstruction: instructions,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7
      }
    });
    const finishTime = Date.now();

    // Parse JSON response Safely
    const rawText = response.text || "{}";
    let outputObj = {};
    try {
      outputObj = JSON.parse(rawText.trim());
    } catch (e) {
      console.warn("JSON parsing failed, returning raw string inside structured format", rawText);
      outputObj = {
        title: topic,
        standfirst: "Ralat format JSON diatasi.",
        article: rawText
      };
    }

    const tokensIn = response.usageMetadata?.promptTokenCount || 2000;
    const tokensOut = response.usageMetadata?.candidatesTokenCount || 1500;

    // Calculate simulated cost
    let costInUSD = 0;
    if (isClaude) {
      costInUSD = (tokensIn / 1000000) * 3.0 + (tokensOut / 1000000) * 15.0;
    } else {
      // Gemini prices: $0.075 input, $0.30 output
      costInUSD = (tokensIn / 1000000) * 0.075 + (tokensOut / 1000000) * 0.30;
    }
    const costInRM = costInUSD * MYR_RATE;

    // Update global sessions
    currentSession.totalUSD += costInUSD;
    currentSession.totalRM += costInRM;
    currentSession.totalCalls += 1;
    currentSession.totalTokensIn += tokensIn;
    currentSession.totalTokensOut += tokensOut;
    lastAction = `Jana Draf: "${topic.substring(0, 35)}${topic.length > 35 ? '...' : ''}"`;

    currentSession.history.push({
      timestamp: new Date().toLocaleTimeString("us-MY", { hour12: false }),
      type: isClaude ? "Draft Generation (Claude Rates)" : `Draft Generation (${model === 'gemini-3.1-flash-lite' ? 'Lite Model' : 'Standard Model'})`,
      queryPrompt: topic,
      modelUsed: isClaude ? "Claude 3.5 Sonnet (Simulated)" : (model === "gemini-3.1-flash-lite" ? "Gemini 3.1 Flash-Lite (Lite)" : "Gemini 3.5 Flash (Default)"),
      tokensIn,
      tokensOut,
      searchesRun: 0,
      costUSD: costInUSD,
      costRM: costInRM,
      success: true
    });

    res.json({
      output: outputObj,
      metadata: {
        tokensIn,
        tokensOut,
        costUSD: costInUSD,
        costRM: costInRM,
        model,
        durationMs: finishTime - startTime
      }
    });

  } catch (error: any) {
    console.error("Content generation error:", error);

    // Fallback simulation to keep UX elegant and cost analyzer functional
    const fallbackIn = 1500;
    const fallbackOut = 1200;
    let fallbackUSD = 0;
    if (isClaude) {
      fallbackUSD = (fallbackIn / 1000000) * 3.0 + (fallbackOut / 1000000) * 15.0;
    } else {
      fallbackUSD = (fallbackIn / 1000000) * 0.075 + (fallbackOut / 1000000) * 0.30;
    }
    const fallbackRM = fallbackUSD * MYR_RATE;

    const fakeOutput: any = {
      title: `Krisis Air & Subsidi: Apa Sebenarnya Berlaku?`,
      standfirst: `Sila isi API Key luaran dalam menu Secrets bagi menjana draf pintar berstail kami. Bermula proses perancangan rapi secara percuma.`,
    };

    if (formats.includes("article")) {
      fakeOutput.article = `Ini adalah draf simulasi berstail .weh untuk membantu anda menilai struktur output. Untuk makluman draf penuh memerlukan kunci API. Isu dasar subsidi ini terus memacu bualan kritikal di kalangan usahawan tempatan berikutan potensi kos operasi meningkat.\n\nDalam kaji selidik rambang, sebilangan besar rakyat bersetuju penjimatan jangka panjang adalah perlu demi mengekalkan kestabilan fiskal negara, namun menggesa mekanisme bantuan bersasar dipermudahkan sekerat-keratnya.`;
    }
    if (formats.includes("wehKenapaPenting")) {
      fakeOutput.wekKenapaPenting = `Mengapa penting? Ia melibatkan dompet bulanan setiap isi rumah kelas pertengahan Malaysia (M40).`;
    }
    if (formats.includes("wehCheck")) {
      fakeOutput.wehCheck = `**[WEH CHECK]** Adakah harga barangan ruji akan melonjak? Pihak berkuasa menyatakan pemantauan bersepadu sedang dijalankan tapi peniaga kecil-sederhana tetap bimbang kesan rantaian pembekalan.`;
    }
    if (formats.includes("wehData")) {
      fakeOutput.wehData = `• Had siling baharu: RM2.15/liter\n• Peningkatan 14% sentimen negatif media sosial\n• Menjejaskan anggaran 3.2 juta pengguna harian`;
    }
    if (formats.includes("videoScript")) {
      fakeOutput.videoScript = `[Arahan Visual: Tunjuk graf harga melambung tinggi]\nSpreaker: "Korang perasan tak sembang pasal Ron95 ni makin bising kat Twitter? Sebab ini apa korang kena tahu..." [Arahan Visual: Tunjuk label WEH CHECK]`;
    }
    if (formats.includes("caption")) {
      fakeOutput.caption = `💸 Subsidi bersasar atau kenaikan harga tersembunyi? Jom bincang kat Threads. WEH letak poin penting korang kena faham pasal sistem petrol baharu ni! 👇 #WEHNewsroom #SubsidiBersasar`;
    }

    currentSession.totalUSD += fallbackUSD;
    currentSession.totalRM += fallbackRM;
    currentSession.totalCalls += 1;
    currentSession.totalTokensIn += fallbackIn;
    currentSession.totalTokensOut += fallbackOut;
    lastAction = `Simulasi Draf: "${topic.substring(0, 35)}${topic.length > 35 ? '...' : ''}"`;

    currentSession.history.push({
      timestamp: new Date().toLocaleTimeString("us-MY", { hour12: false }),
      type: `${isClaude ? 'Claude' : 'Gemini'} Simulasi Penulisan (Fallback)`,
      queryPrompt: topic,
      modelUsed: isClaude ? "Claude 3.5 Sonnet (Draft Sandbox)" : `Gemini (${model}) (Draft Sandbox)`,
      tokensIn: fallbackIn,
      tokensOut: fallbackOut,
      searchesRun: 0,
      costUSD: fallbackUSD,
      costRM: fallbackRM,
      success: false
    });

    res.json({
      output: fakeOutput,
      metadata: {
        tokensIn: fallbackIn,
        tokensOut: fallbackOut,
        costUSD: fallbackUSD,
        costRM: fallbackRM,
        model,
        fallbackActive: true,
        errorMessage: error.message
      }
    });
  }
});

// Serve frontend code
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Development Server running on http://localhost:${PORT}`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Production Server running on port ${PORT}`);
  });
}
