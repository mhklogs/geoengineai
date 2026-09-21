import React, { useState, useEffect, useRef } from "react";
import { 
  Globe, 
  Zap, 
  Sparkles, 
  Code, 
  Copy, 
  Check, 
  RotateCcw, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  Database,
  Building,
  Activity,
  ChevronRight,
  Sparkle,
  Cpu,
  Compass,
  Search,
  CheckCircle,
  TrendingDown,
  Lock,
  MessageSquare,
  Network
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";
import { AuditRequest, AuditResponse, TierType } from "../types";

interface AuditSandboxProps {
  activeTier: TierType;
  onTierChange: (tier: TierType) => void;
  presetUrl?: string;
  setPresetUrl?: (url: string) => void;
}

type EngineType = "chatgpt" | "gemini" | "claude" | "perplexity";

interface SOVData {
  yourBrand: number;
  compA: number;
  compB: number;
  compC: number;
  status: "critical" | "warning" | "optimal" | "deficient";
  blockersCount: number;
}

const engineSOV: Record<EngineType, SOVData> = {
  chatgpt: {
    yourBrand: 24,
    compA: 42,
    compB: 18,
    compC: 16,
    status: "critical",
    blockersCount: 4,
  },
  gemini: {
    yourBrand: 35,
    compA: 28,
    compB: 25,
    compC: 12,
    status: "warning",
    blockersCount: 2,
  },
  claude: {
    yourBrand: 18,
    compA: 49,
    compB: 20,
    compC: 13,
    status: "deficient",
    blockersCount: 5,
  },
  perplexity: {
    yourBrand: 12,
    compA: 55,
    compB: 21,
    compC: 12,
    status: "deficient",
    blockersCount: 6,
  }
};

export default function AuditSandbox({ activeTier, onTierChange, presetUrl = "", setPresetUrl }: AuditSandboxProps) {
  const [url, setUrl] = useState("https://apexlogistics-example.com/services/freight");
  const [rawText, setRawText] = useState("");
  const [samples, setSamples] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"visual" | "markdown">("visual");
  const [copiedText, setCopiedText] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SOV Dashboard States
  const [selectedEngine, setSelectedEngine] = useState<EngineType>("chatgpt");
  const sandboxRef = useRef<HTMLDivElement>(null);

  // Load samples on mount
  useEffect(() => {
    fetch("/api/samples")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch samples");
        return res.json();
      })
      .then((data) => {
        setSamples(data);
        if (data.length > 0) {
          setRawText(data[0].rawText);
          setUrl(data[0].url);
        }
      })
      .catch((err) => {
        console.error("Error loading samples:", err);
        setRawText(`<html>
  <body>
    <header>Welcome to Apex Global Logistics Solutions</header>
    <div>
      <p>We provide stellar logistics and supply chain services across the country. Our company aims to streamline your business shipping requirements through our customized approaches.</p>
    </div>
  </body>
END HTML`);
      });
  }, []);

  // Sync sample based on url/selected sample
  const handleSelectSample = (sample: any) => {
    setUrl(sample.url);
    setRawText(sample.rawText);
    setError(null);
  };

  // Auto-trigger audit if presetUrl is passed from Hero
  useEffect(() => {
    if (presetUrl) {
      setUrl(presetUrl);
      // Find matching sample or use default
      const matched = samples.find(s => s.url.includes(presetUrl) || presetUrl.includes(s.url));
      if (matched) {
        setRawText(matched.rawText);
      } else {
        setRawText(`<html>
  <body>
    <header>Welcome to ${presetUrl.replace("https://", "").replace("http://", "").split("/")[0]} Systems</header>
    <div>
      <p>We are a leading industry pioneer offering high-scale digital solutions. Our core systems are designed to maximize business alignment, operational agility, and corporate value.</p>
    </div>
  </body>
</html>`);
      }
      
      // Clear preset so it doesn't trigger repeatedly
      if (setPresetUrl) {
        setPresetUrl("");
      }

      // Smooth scroll and run audit
      setTimeout(() => {
        const el = document.getElementById("live-sandbox");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        handleRunAuditDirectly(presetUrl, matched ? matched.rawText : "");
      }, 100);
    }
  }, [presetUrl, samples]);

  const handleRunAuditDirectly = async (targetUrl: string, targetText: string) => {
    const currentText = targetText || rawText || "Default fallback content";
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl, tier: activeTier, rawText: currentText } as AuditRequest),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "An error occurred during content evaluation.");
      }
      setResult(data);
      setActiveTab("visual");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during GEO optimization.");
    } finally {
      setLoading(false);
    }
  };

  // Rotating loading messages
  useEffect(() => {
    if (!loading) return;
    const messages = [
      "Connecting to GEOEngine AI Parsing Pipeline...",
      "Analyzing Information Density ratio...",
      "Extracting semantic entities and Knowledge Graph triples...",
      "Evaluating formatted scannability algorithms...",
      "Assembling optimized citation formulation scripts...",
      "Pruning RAG search retrieval blockers..."
    ];
    let index = 0;
    setLoadingMessage(messages[0]);
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingMessage(messages[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, [loading]);

  // Execute actual audit via API from button
  const handleRunAudit = () => {
    if (!url.trim()) {
      setError("Please specify a valid Target URL.");
      return;
    }
    if (!rawText.trim()) {
      setError("Please paste raw HTML or textual data to evaluate.");
      return;
    }
    handleRunAuditDirectly(url, rawText);
  };

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const currentSOV = engineSOV[selectedEngine];

  return (
    <section className="py-24 bg-void relative overflow-hidden" id="live-sandbox" ref={sandboxRef}>
      <div className="absolute inset-0 pixis-grid-lines opacity-20"></div>
      
      {/* Absolute Decorative Glow Blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-geo/10 to-slate-200/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pixis-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-geo font-mono bg-white/[0.03] border border-geo/20 px-4 py-2 rounded-full">
            REAL-TIME INTELLIGENCE
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight sm:text-4xl mt-6">
            Generative Share of Voice (SOV)
          </h2>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Monitor, measure, and claim authority over your retrieval footprint. Toggle AI models to view specific brand visibility states, then audit your own page below.
          </p>
        </div>

        {/* =========================================
            PART 1: INTERACTIVE SOV DASHBOARD
            ========================================= */}
        <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 border-b border-white/[0.08] pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-geo animate-pulse" />
                <h3 className="text-base font-bold text-white tracking-tight font-mono">
                  Live Brand Visibility Index
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Auditing semantic weight and citation occurrence rate based on 25,000+ targeted B2B industry queries.
              </p>
            </div>

            {/* AI Platform Toggle Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-white/[0.02] p-1.5 rounded-xl border border-white/[0.08] w-full sm:w-auto">
              {(["chatgpt", "gemini", "claude", "perplexity"] as EngineType[]).map((eng) => (
                <button
                  key={eng}
                  onClick={() => setSelectedEngine(eng)}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-widest cursor-pointer ${
                    selectedEngine === eng
                      ? "bg-gradient-to-r from-slate-100 via-geo to-geo text-slate-950 shadow-lg shadow-geo/20"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {eng === "chatgpt" ? "ChatGPT" : eng === "gemini" ? "Gemini" : eng === "claude" ? "Claude" : "Perplexity"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Circular Progress Gauge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white/[0.01] rounded-2xl border border-white/[0.08] text-center relative overflow-hidden">
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest mb-4 block">
                OVERALL SHARE OF VOICE
              </span>
              
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Radial Meter */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/[0.06]"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-geo transition-all duration-1000 ease-out"
                    strokeDasharray={`${currentSOV.yourBrand}, 100`}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-extrabold text-white font-mono leading-none block">
                    {currentSOV.yourBrand}%
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-1 uppercase font-mono tracking-widest">
                    Visibility Score
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                  currentSOV.status === "optimal" 
                    ? "bg-geo/10 text-geo border border-geo/20"
                    : currentSOV.status === "warning"
                    ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                    : "bg-rose-400/10 text-rose-400 border border-rose-400/20"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    currentSOV.status === "optimal" ? "bg-geo" : currentSOV.status === "warning" ? "bg-amber-400" : "bg-rose-400"
                  } animate-pulse`}></span>
                  {currentSOV.status} Status
                </span>
              </div>
            </div>

            {/* Right Horizontal Bar Chart showing Competitor details */}
            <div className="md:col-span-8 flex flex-col gap-4">
              <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider mb-2">
                Comparative Brand Share mapping
              </h4>

              {/* Your Brand */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
                    <span className="w-2.5 h-2.5 rounded-md bg-geo" />
                    Your Brand (Apex / Reference)
                  </span>
                  <span className="font-mono font-bold text-geo">{currentSOV.yourBrand}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div 
                    className="bg-geo h-full rounded-md transition-all duration-500 shadow-lg shadow-geo/20"
                    style={{ width: `${currentSOV.yourBrand}%` }}
                  />
                </div>
              </div>

              {/* Competitor Alpha */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2 font-mono">
                    <span className="w-2.5 h-2.5 rounded-md bg-slate-300 dark:bg-slate-800" />
                    Competitor Alpha
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{currentSOV.compA}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div 
                    className="bg-slate-400 dark:bg-slate-700 h-full rounded-md transition-all duration-500"
                    style={{ width: `${currentSOV.compA}%` }}
                  />
                </div>
              </div>

              {/* Competitor Beta */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2 font-mono">
                    <span className="w-2.5 h-2.5 rounded-md bg-slate-300 dark:bg-slate-800" />
                    Competitor Beta
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{currentSOV.compB}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div 
                    className="bg-slate-400 dark:bg-slate-700 h-full rounded-md transition-all duration-500"
                    style={{ width: `${currentSOV.compB}%` }}
                  />
                </div>
              </div>

              {/* Competitor Gamma */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2 font-mono">
                    <span className="w-2.5 h-2.5 rounded-md bg-slate-300 dark:bg-slate-800" />
                    Competitor Gamma
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{currentSOV.compC}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div 
                    className="bg-slate-400 dark:bg-slate-700 h-full rounded-md transition-all duration-500"
                    style={{ width: `${currentSOV.compC}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-550 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                  Blockers Detected: <strong className="text-rose-600 dark:text-rose-400">{currentSOV.blockersCount} critical</strong>
                </span>
                <span>Last Updated: Real-time via Active Parity</span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            PART 2: LIVE AUDIT WORKSPACE (SANDBOX)
            ========================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight font-mono uppercase">
            Interactive RAG Ingestion Sandbox
          </h3>
          <p className="text-xs text-slate-555 dark:text-slate-400 mt-1.5">
            Evaluate any page's raw content, test optimizations, and generate deterministic outputs for the active subscription tier.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Test Samples */}
            <div className="bg-white dark:bg-[#0b0f19]/65 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
                <Building className="w-4 h-4 text-geo dark:text-geo" />
                Select Pre-Populated Audit Sample
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 font-sans">
                Load typical unoptimized B2B landing pages to evaluate standard crawlability errors:
              </p>
              
              <div className="flex flex-col gap-2">
                {samples.map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectSample(sample)}
                    className={`text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between group cursor-pointer ${
                      url === sample.url
                        ? "bg-slate-100 dark:bg-[#111827] border-geo text-slate-900 dark:text-white font-medium ring-1 ring-geo/30"
                        : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="block font-semibold text-slate-800 dark:text-slate-200 group-hover:text-geo dark:group-hover:text-white truncate">
                        {sample.name}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate mt-0.5 font-mono">
                        {sample.industry} • {sample.url.replace("https://", "")}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform group-hover:text-geo dark:group-hover:text-geo" />
                  </button>
                ))}
              </div>
            </div>

            {/* Ingestion Parameters */}
            <div className="bg-white dark:bg-[#0b0f19]/65 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Globe className="w-4 h-4 text-geo dark:text-geo" />
                Live Ingestion Parameters
              </h3>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 font-mono uppercase tracking-wider">
                  Target Domain Reference [URL]
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://apexlogistics-example.com/services"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-geo/40 focus:border-geo/50 transition-all font-mono text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                    Raw Document Text [RAW_TEXT]
                  </label>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {rawText.length} characters
                  </span>
                </div>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste raw unformatted HTML or text dumps..."
                  className="w-full h-52 p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-geo/40 focus:border-geo/50 transition-all text-slate-800 dark:text-slate-300 leading-relaxed"
                />
              </div>

              {/* Tier Selector */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 font-mono uppercase tracking-wider">
                  Active Subscription Tier [TIER]
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  {(["FREE", "STANDARD", "PRO"] as TierType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => onTierChange(t)}
                      className={`py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                        activeTier === t
                          ? "bg-geo text-white shadow-md shadow-geo/10"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-900"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl p-3 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleRunAudit}
                disabled={loading}
                className="w-full bg-geo hover:bg-geo disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-500 font-mono text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-geo/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>EXECUTING AUDIT PIPELINE...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-white fill-white animate-pulse" />
                    <span>RUN GEO EVALUATOR ({activeTier})</span>
                  </>
                )}
              </button>

            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              
              {/* Empty/Ready State */}
              {!loading && !result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-[#0b0f19]/45 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[520px] shadow-xl dark:shadow-2xl transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-geo dark:text-geo animate-pulse" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono uppercase tracking-wider">
                    Pipeline Standby Mode
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-2 leading-relaxed font-sans">
                    Select a sample industry or input custom HTML parameters, select your subscription tier, and initiate the audit to parse visual insights and citation recommendations.
                  </p>
                </motion.div>
              )}

              {/* Loading State */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-white rounded-2xl p-8 min-h-[520px] flex flex-col items-center justify-center text-center border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl transition-colors"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-geo animate-spin" />
                    <Sparkle className="w-6 h-6 text-geo dark:text-geo absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-pulse" />
                  </div>
                  <span className="font-mono text-[10px] text-geo dark:text-geo uppercase tracking-widest font-bold bg-geo/10 px-3 py-1 rounded-full border border-geo/20">
                    PARSING SEMANTIC ENTITIES
                  </span>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight mt-5 h-12 max-w-md font-mono">
                    {loadingMessage}
                  </h3>
                  <div className="w-48 bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden mt-6">
                    <div className="bg-geo dark:bg-geo h-full w-3/4 rounded-full animate-pulse" />
                  </div>
                </motion.div>
              )}

              {/* Results View */}
              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-5"
                >
                  {/* Tabs */}
                  <div className="bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-1 transition-colors">
                    <button
                      onClick={() => setActiveTab("visual")}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 uppercase cursor-pointer ${
                        activeTab === "visual"
                          ? "bg-geo text-white shadow-md shadow-geo/10"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      Visual Metrics
                    </button>
                    <button
                      onClick={() => setActiveTab("markdown")}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 uppercase cursor-pointer ${
                        activeTab === "markdown"
                          ? "bg-geo text-white shadow-md shadow-geo/10"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Raw Markdown
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="bg-white dark:bg-[#0b0f19]/80 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 min-h-[440px] shadow-xl dark:shadow-2xl">
                    
                    {activeTab === "markdown" ? (
                      /* Strict Markdown tab */
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-3">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                            STRICT LAYOUT MARKDOWN
                          </span>
                          <button
                            onClick={() => handleCopy(result.markdownOutput)}
                            className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border border-slate-200 dark:border-slate-850 transition-colors cursor-pointer"
                          >
                            {copiedText ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                                <span>Copy Markdown</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="markdown-body select-text text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans prose prose-invert max-h-[500px] overflow-y-auto pr-2">
                          <ReactMarkdown>{result.markdownOutput}</ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      /* Visual metrics tab */
                      <div className="flex flex-col gap-6">
                        
                        {/* FREE TIER DASHBOARD */}
                        {activeTier === "FREE" && result.parsedData.free && (
                          <div className="flex flex-col gap-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-200 dark:border-slate-800 pb-6">
                              <div className="md:col-span-4 flex flex-col items-center text-center p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono font-bold uppercase block tracking-wider mb-2">
                                  GEO READINESS
                                </span>
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                      className="text-slate-200 dark:text-slate-800"
                                      strokeWidth="3.2"
                                      stroke="currentColor"
                                      fill="none"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                      className="text-geo transition-all duration-1000 ease-out"
                                      strokeDasharray={`${result.parsedData.free.score * 10}, 100`}
                                      strokeWidth="3.2"
                                      strokeLinecap="round"
                                      stroke="currentColor"
                                      fill="none"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                  </svg>
                                  <div className="absolute text-center">
                                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono leading-none block">
                                      {result.parsedData.free.score}
                                    </span>
                                    <span className="text-[9px] text-slate-550 dark:text-slate-400 font-semibold block mt-0.5 font-mono">
                                      /10
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="md:col-span-8 flex flex-col gap-4">
                                <h4 className="text-[10px] font-bold text-slate-550 dark:text-slate-400 font-mono uppercase tracking-wider">
                                  CRAWLABILITY VECTOR STANDARDS
                                </h4>                                <div>
                                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    <span className="flex items-center gap-1.5 font-mono">
                                      <Database className="w-3.5 h-3.5 text-geo dark:text-geo" />
                                      Information Density Ratio
                                    </span>
                                    <span className="font-mono text-geo dark:text-geo">{result.parsedData.free.metrics.informationDensity}/10</span>
                                  </div>
                                  <div className="w-full bg-slate-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-850">
                                    <div 
                                      className="bg-geo dark:bg-geo h-full rounded-full transition-all"
                                      style={{ width: `${result.parsedData.free.metrics.informationDensity * 10}%` }}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    <span className="flex items-center gap-1.5 font-mono">
                                      <TrendingUp className="w-3.5 h-3.5 text-geo dark:text-geo" />
                                      Scannable Formatted Layout
                                    </span>
                                    <span className="font-mono text-geo dark:text-geo">{result.parsedData.free.metrics.formattedScannability}/10</span>
                                  </div>
                                  <div className="w-full bg-slate-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-850">
                                    <div 
                                      className="bg-geo dark:bg-geo h-full rounded-full transition-all"
                                      style={{ width: `${result.parsedData.free.metrics.formattedScannability * 10}%` }}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    <span className="flex items-center gap-1.5 font-mono">
                                      <Globe className="w-3.5 h-3.5 text-geo dark:text-geo" />
                                      Named Entity Co-Occurrence
                                    </span>
                                    <span className="font-mono text-geo dark:text-geo">{result.parsedData.free.metrics.entityMapping}/10</span>
                                  </div>
                                  <div className="w-full bg-slate-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-850">
                                    <div 
                                      className="bg-geo dark:bg-geo h-full rounded-full transition-all"
                                      style={{ width: `${result.parsedData.free.metrics.entityMapping * 10}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400 animate-pulse" />
                                Critical Crawler & Indexing Blockers
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {result.parsedData.free.blockers.map((blk, idx) => (
                                  <div key={idx} className="bg-rose-500/[0.04] dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xl p-4 transition-colors">
                                    <span className="text-[11px] font-bold text-rose-750 dark:text-rose-300 flex items-center gap-1 font-mono uppercase tracking-wide">
                                      {blk.title}
                                    </span>
                                    <p className="text-[11px] text-rose-600/90 dark:text-rose-400/90 leading-normal mt-1.5">
                                      {blk.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        )}

                        {/* STANDARD TIER DASHBOARD */}
                        {activeTier === "STANDARD" && result.parsedData.standard && (
                          <div className="flex flex-col gap-6">
                            
                            <div>
                              <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <Layers className="w-4 h-4 text-geo dark:text-geo" />
                                Narrative Contrast Audit
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-rose-500/[0.03] dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-xl p-5 flex flex-col justify-between transition-colors">
                                  <div>
                                    <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                      Unoptimized Element
                                    </span>
                                    <p className="text-xs text-rose-900 dark:text-rose-200 font-serif italic mt-3 leading-relaxed">
                                      "{result.parsedData.standard.unoptimizedSegment}"
                                    </p>
                                  </div>
                                  <span className="text-[9px] text-rose-600/80 dark:text-rose-400/80 font-mono mt-4 pt-3 border-t border-rose-100 dark:border-rose-900/30">
                                    ▲ Low informational volume triggers low retrieval probability.
                                  </span>
                                </div>

                                <div className="bg-emerald-500/[0.03] dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-xl p-5 flex flex-col justify-between transition-colors">
                                  <div>
                                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                      Engineered Alternative
                                    </span>
                                    <p className="text-xs text-emerald-900 dark:text-emerald-200 font-medium mt-3 leading-relaxed">
                                      {result.parsedData.standard.optimizedAlternative}
                                    </p>
                                  </div>
                                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono mt-4 pt-3 border-t border-emerald-100 dark:border-emerald-900/30 flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                    Frontloaded semantic properties & citation hooks.
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-bold text-slate-550 dark:text-slate-400 font-mono uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4 text-geo dark:text-geo" />
                                AI-Agent Q&A Formulation Models
                              </h4>
                              <div className="flex flex-col gap-3">
                                {result.parsedData.standard.qaBlocks.map((blk, idx) => (
                                  <div key={idx} className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors">
                                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2 mb-2">
                                      <span className="w-5 h-5 rounded-full bg-geo/10 text-geo dark:text-geo text-[10px] font-bold flex items-center justify-center border border-geo/20 font-mono">
                                        Q
                                      </span>
                                      {blk.query}
                                    </span>
                                    <div className="bg-white dark:bg-slate-950/55 border border-slate-200 dark:border-slate-850 rounded-lg p-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                      <strong className="text-slate-700 dark:text-slate-200 font-bold">Citation Target:</strong> {blk.formulation}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        )}

                        {/* PRO TIER DASHBOARD */}
                        {activeTier === "PRO" && result.parsedData.pro && (
                          <div className="flex flex-col gap-6">
                            
                            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col gap-4 transition-colors">
                              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                                <div>
                                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase block">
                                    PRIMARY ENTITY CLASSIFIER
                                  </span>
                                  <span className="text-xs font-bold text-geo dark:text-geo font-mono">
                                    @type: "{result.parsedData.pro.primaryType}"
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase block">
                                    RESOLVED REFERENCE DOMAIN
                                  </span>
                                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                                    {result.parsedData.pro.targetDomain}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase block mb-2 tracking-wider">
                                  Linked Knowledge Graph Association Nodes
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {result.parsedData.pro.childNodes.map((node, idx) => (
                                    <span key={idx} className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 font-mono font-medium flex items-center gap-1.5 shadow-sm transition-colors">
                                      <span className="w-1.5 h-1.5 rounded-full bg-geo dark:bg-geo animate-pulse" />
                                      {node}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                                  <Code className="w-4 h-4 text-geo dark:text-geo" />
                                  JSON-LD Web Integration Schema
                                </h4>
                                <button
                                  onClick={() => handleCopy(result.parsedData.pro!.jsonLd)}
                                  className="text-[10px] text-geo hover:text-geo dark:text-geo dark:hover:text-geo font-mono font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedText ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                  {copiedText ? "Copied" : "Copy Schema"}
                                </button>
                              </div>
                              <pre className="p-4 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 rounded-xl text-[10px] font-mono overflow-x-auto max-h-72 border border-slate-200 dark:border-slate-800 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-900 select-text transition-colors">
                                {result.parsedData.pro.jsonLd}
                              </pre>
                            </div>

                          </div>
                        )}

                        {/* Fallback: result was generated under a different tier */}
                        {(() => {
                          if (activeTier === "FREE" && !result.parsedData.free) return true;
                          if (activeTier === "STANDARD" && !result.parsedData.standard) return true;
                          if (activeTier === "PRO" && !result.parsedData.pro) return true;
                          return false;
                        })() && (
                          <div className="bg-amber-500/[0.04] dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-6 flex flex-col items-start gap-3 transition-colors">
                            <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4" />
                              Tier Mismatch Detected
                            </span>
                            <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                              This output was generated under the <strong className="font-mono">{result.tier}</strong> tier. Switch the tier selector to <strong className="font-mono">{activeTier}</strong> and re-run the audit to render its visualization.
                            </p>
                            <button
                              onClick={handleRunAudit}
                              className="mt-1 bg-amber-500 hover:bg-amber-600 text-white font-mono text-[10px] font-bold py-2.5 px-4 rounded-lg uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              Re-run as {activeTier}
                            </button>
                          </div>
                        )}

                      </div>
                    )}

                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
