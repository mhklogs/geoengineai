import React, { useState } from "react";
import { 
  Sparkle, 
  Cpu, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Activity, 
  HelpCircle,
  AlertCircle,
  Search,
  Zap,
  Globe,
  Compass,
  CheckCircle2,
  Lock
} from "lucide-react";
import CoreSequence from "./components/CoreSequence";
import AuditSandbox from "./components/AuditSandbox";
import OptimizationPlans from "./components/OptimizationPlans";
import EngineeringTeam from "./components/EngineeringTeam";
import CustomCursor from "./components/CustomCursor";
import ScrollReveal from "./components/ScrollReveal";
import { TierType } from "./types";
import heroBg from "./assets/hero-bg.jpeg";

export default function App() {
  const [activeTier, setActiveTier] = useState<TierType>("FREE");
  const [presetUrl, setPresetUrl] = useState<string>("");
  const [heroInput, setHeroInput] = useState<string>("");

  // Plan selection action (switches active tier and scrolls user smoothly to the live sandbox)
  const handleSelectPlan = (tier: TierType) => {
    setActiveTier(tier);
    const element = document.getElementById("live-sandbox");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hero custom search action (populates sandbox URL and auto triggers audit)
  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroInput.trim()) return;

    let targetUrl = heroInput.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }

    setPresetUrl(targetUrl);
  };

  return (
    <div className="min-h-screen bg-[#02040a] font-sans text-slate-200 flex flex-col antialiased selection:bg-sky-500 selection:text-white">
      <CustomCursor />
      
      {/* 1. Upper Enterprise Navigation Bar */}
      <header className="bg-[#02040a]/90 backdrop-blur-xl border-b border-white/[0.08] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <svg className="w-9 h-9 animate-pixis-spin" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="50" r="22" stroke="url(#logoGrad1)" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
                <circle cx="65" cy="50" r="22" stroke="url(#logoGrad2)" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
                <defs>
                  <linearGradient id="logoGrad1" x1="13" y1="50" x2="57" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="logoGrad2" x1="43" y1="50" x2="87" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute w-2 h-2 bg-sky-300 rounded-full shadow-lg shadow-sky-400/50" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-tight font-display text-lg">
                  GEO<span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-300 to-sky-500">Engine</span>
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono font-medium tracking-wider">GENERATIVE ENGINE OPTIMIZATION</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#core-pipeline" 
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors font-mono uppercase tracking-widest"
              data-cursor-title="GEO Pipeline"
              data-cursor-desc="Review the 4-stage optimization cycle."
              data-cursor-action="EXPLORE"
            >
              Pipeline
            </a>
            <a 
              href="#live-sandbox" 
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors font-mono uppercase tracking-widest"
              data-cursor-title="Engine Sandbox"
              data-cursor-desc="Test real-time brand visibility and entity density."
              data-cursor-action="AUDIT"
            >
              Sandbox
            </a>
            <a 
              href="#pricing-matrix" 
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors font-mono uppercase tracking-widest"
              data-cursor-title="Bespoke Tiers"
              data-cursor-desc="Select surgical optimization plans."
              data-cursor-action="COMMERCIAL"
            >
              Plans Matrix
            </a>
            <a 
              href="#engineering-team" 
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors font-mono uppercase tracking-widest"
              data-cursor-title="The Architects"
              data-cursor-desc="The engineers behind our NLP pipeline."
              data-cursor-action="R&D FOUNDRY"
            >
              Architects
            </a>
          </nav>

          {/* Secondary Action CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#live-sandbox"
              className="hidden sm:inline-flex bg-gradient-to-r from-slate-100 via-sky-400 to-sky-600 hover:opacity-95 text-slate-950 font-mono text-[10px] font-bold py-3 px-5 rounded-xl shadow-lg shadow-sky-500/20 transition-all uppercase tracking-widest cursor-pointer"
              data-cursor-title="Interactive Audit"
              data-cursor-desc="Evaluate crawl citation and AI SOV instantly."
              data-cursor-action="LAUNCH"
            >
              Start Live Audit
            </a>
          </div>

        </div>
      </header>

      {/* 2. Hero Section & Performance Strip */}
      <section className="relative overflow-hidden bg-[#02040a] pt-32 pb-24 border-b border-white/[0.08]">
        
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src={heroBg} 
            alt="Generative Engine Optimization Visual" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter brightness-110 contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/90 via-[#02040a]/75 to-[#02040a]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-transparent to-[#02040a]/90"></div>
        </div>

        {/* Futuristic Grid & Ambient Glows */}
        <div className="absolute inset-0 pixis-grid-lines opacity-25 z-0"></div>
        <div className="absolute inset-0 pixis-grid-dots opacity-20 z-0"></div>
        
        {/* Floating Pixis Glowing Orbs */}
        <div className="absolute right-0 top-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-sky-500/15 to-slate-300/10 rounded-full blur-[120px] pointer-events-none -mr-32 animate-pixis-pulse z-0"></div>
        <div className="absolute left-10 bottom-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-sky-400/10 to-slate-400/5 rounded-full blur-[120px] pointer-events-none -ml-16 animate-pixis-pulse z-0" style={{ animationDelay: "2s" }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Hero Grid */}
          <div className="max-w-4xl text-left">
            
            {/* Real-time Parity Badge */}
            <ScrollReveal direction="down" delay={0.1}>
              <div 
                className="inline-flex items-center gap-2 bg-white/[0.03] border border-sky-500/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md cursor-help"
                data-cursor-title="Continuous Sync Engine"
                data-cursor-desc="The system scans and adapts to ChatGPT, Gemini, and Claude updates dynamically."
                data-cursor-action="ENGINE STATUS"
              >
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                <span className="text-[9px] font-bold text-slate-300 font-mono uppercase tracking-[0.2em]">
                  Continuous LLM Real-Time Parity Engine
                </span>
              </div>
            </ScrollReveal>

            {/* H1 Title Stack */}
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-8">
                Command Your Brand Presence Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 via-sky-300 to-sky-500 font-extrabold">Generative Engines</span>.
              </h1>
            </ScrollReveal>

            {/* Supporting Paragraph */}
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-12">
                ChatGPT, Gemini, and Perplexity are answering queries about your products right now. We optimize your digital corpus for LLM RAG engines and conversational agents. Don't just rank—become the primary context retrieved by cognitive pipelines.
              </p>
            </ScrollReveal>

            {/* Instant Brand Search Bar */}
            <ScrollReveal direction="up" delay={0.4}>
              <form 
                onSubmit={handleHeroSearch} 
                className="max-w-xl bg-white/[0.03] border border-sky-500/20 focus-within:border-sky-400/50 rounded-2xl p-2 flex items-center gap-2 mb-16 shadow-2xl relative backdrop-blur-xl transition-all duration-300"
                data-cursor-title="Real-Time Domain Search"
                data-cursor-desc="Enter your business domain to start a programmatic search engine visibility crawl."
                data-cursor-action="AUDIT TOOL"
              >
                <div className="absolute left-4 text-sky-400">
                  <Globe className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  placeholder="Enter your brand domain (e.g. ApexLogistics.com)"
                  className="w-full pl-12 pr-4 py-3 bg-transparent text-white text-xs font-mono placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-slate-100 via-sky-400 to-sky-600 hover:opacity-95 text-slate-950 font-mono text-[10px] font-bold py-3.5 px-6 rounded-xl shrink-0 uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer transition-all duration-300"
                  data-cursor-title="Execute Simulation"
                  data-cursor-desc="Trigger real-time brand citation audit."
                  data-cursor-action="RUN SIMULATE"
                >
                  <Search className="w-4 h-4" />
                  Analyze AI SOV
                </button>
              </form>
            </ScrollReveal>

          </div>

          {/* Social Proof Metric & Token Index Strip */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative backdrop-blur-xl">
              <div 
                className="flex items-center gap-4 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.08] pb-4 md:pb-0 md:pr-8 cursor-help"
                data-cursor-title="99.4% Citation Parity"
                data-cursor-desc="Our algorithm guarantees near-perfect mapping between core documents and LLM output."
                data-cursor-action="ACCURACY INDEX"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/15 to-slate-200/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-white font-mono tracking-tight block">
                    99.4%
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-widest block">
                    Crawl Citation Accuracy
                  </span>
                </div>
              </div>

              {/* Satisfied Client Context Index with soft monochrome tech logos */}
              <div className="flex-1 flex flex-col gap-2 w-full md:pl-4">
                <span className="text-[9px] text-slate-400 font-mono uppercase tracking-[0.25em] font-bold block text-center md:text-left">
                  Active Global Index Connections
                </span>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-3 opacity-90 text-slate-300">
                  <div 
                    className="flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-widest hover:text-emerald-400 transition-colors cursor-pointer"
                    data-cursor-title="Vertex Systems Integration"
                    data-cursor-desc="Connected via direct real-time API sync."
                    data-cursor-action="CONNECTED"
                  >
                    <Cpu className="w-4 h-4 text-emerald-500" />
                    VERTEX SYSTEMS
                  </div>
                  <div 
                    className="flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-widest hover:text-cyan-400 transition-colors cursor-pointer"
                    data-cursor-title="Apex Corp Node"
                    data-cursor-desc="Managing high-volume knowledge indexing."
                    data-cursor-action="ACTIVE"
                  >
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    APEX CORP
                  </div>
                  <div 
                    className="flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-widest hover:text-purple-400 transition-colors cursor-pointer"
                    data-cursor-title="Kronos Core Protection"
                    data-cursor-desc="Shielding critical intellectual property logs."
                    data-cursor-action="SHIELDED"
                  >
                    <Award className="w-4 h-4 text-purple-400" />
                    KRONOS CORE
                  </div>
                  <div 
                    className="flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-widest hover:text-pink-400 transition-colors cursor-pointer"
                    data-cursor-title="Zephyr Ingestion Sync"
                    data-cursor-desc="Parser synchronizing at 0.8s crawl intervals."
                    data-cursor-action="SYNCED"
                  >
                    ZEPHYR CO
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 3. The GEO Core Sequence Component */}
      <CoreSequence />

      {/* 4. Live Interactive Parser Sandbox Component */}
      <AuditSandbox activeTier={activeTier} onTierChange={setActiveTier} presetUrl={presetUrl} setPresetUrl={setPresetUrl} />

      {/* 5. Pricing Plans Matrix Component */}
      <OptimizationPlans onSelectPlan={handleSelectPlan} activeTier={activeTier} />

      {/* 6. Engineering Team Profiles Component */}
      <EngineeringTeam />

      {/* 7. Bottom High-Trust CTA Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="bg-[#02040a] text-white py-24 border-t border-white/[0.08] relative overflow-hidden">
          <div className="absolute inset-0 pixis-grid-lines opacity-20"></div>
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#02040a] to-transparent pointer-events-none"></div>
          
          {/* Ambient Gradient behind CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-sky-500/15 via-slate-200/10 to-sky-400/15 rounded-full blur-[100px] pointer-events-none animate-pixis-pulse"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            
            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-[0.25em] font-bold bg-white/[0.03] border border-sky-500/20 px-4 py-2 rounded-full backdrop-blur-md">
              Engine Optimization Access Point
            </span>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-8 max-w-3xl leading-tight">
              Ready to Audit Your Brand's Engine Visibility & Citation Status?
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-400 mt-4 max-w-lg leading-relaxed">
              Deploy high-fidelity, entity-aligned semantic structures across our standardized LLM citation pathways today. Zero manual configurations required.
            </p>

            <a
              href="#live-sandbox"
              className="mt-10 bg-gradient-to-r from-slate-100 via-sky-400 to-sky-600 hover:opacity-95 text-slate-950 font-mono text-xs font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2 group uppercase tracking-widest cursor-pointer animate-pulse"
              data-cursor-title="Start Interactive Audit"
              data-cursor-desc="Navigate directly to the real-time share of voice tool below."
              data-cursor-action="AUDIT DECK"
            >
              Audit Your Engine Visibility
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>
        </section>
      </ScrollReveal>

      {/* 8. Compliance & Technical Data Parity Statement Footer */}
      <footer className="bg-[#020408] text-slate-400 py-16 border-t border-white/[0.08] text-[11px] font-mono relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/[0.08] pb-12">
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                  <svg className="w-7 h-7 animate-pixis-spin" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="35" cy="50" r="22" stroke="url(#footerLogoGrad1)" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
                    <circle cx="65" cy="50" r="22" stroke="url(#footerLogoGrad2)" strokeWidth="12" strokeLinecap="round" opacity="0.9" />
                    <defs>
                      <linearGradient id="footerLogoGrad1" x1="13" y1="50" x2="57" y2="50" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                      <linearGradient id="footerLogoGrad2" x1="43" y1="50" x2="87" y2="50" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#0284c7" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="font-extrabold text-white tracking-tight text-base font-display">GEO<span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-300 to-sky-500">Engine</span></span>
              </div>
              <p className="text-slate-400 max-w-xs leading-relaxed">
                Corporate Generative Engine Optimization auditing suite. Fully integrated, simulated, and validated against Gemini, ChatGPT, and Perplexity RAG pipelines.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2.5">
                <span className="text-xs text-white font-bold uppercase tracking-widest mb-1.5 font-display">
                  Compliance Node
                </span>
                <span className="hover:text-white transition-colors cursor-pointer">ISO 27001 Certified</span>
                <span className="hover:text-white transition-colors cursor-pointer">SOC 2 Type II Audited</span>
                <span className="hover:text-white transition-colors cursor-pointer">GDPR Data Protection</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-xs text-white font-bold uppercase tracking-widest mb-1.5 font-display">
                  Integrations
                </span>
                <span className="hover:text-white transition-colors cursor-pointer">AWS S3 Connectors</span>
                <span className="hover:text-white transition-colors cursor-pointer">GCP Cloud Storage</span>
                <span className="hover:text-white transition-colors cursor-pointer">Drizzle & Prisma APIs</span>
              </div>
              <div className="flex flex-col gap-2.5 col-span-2 sm:col-span-1">
                <span className="text-xs text-white font-bold uppercase tracking-widest mb-1.5 font-display">
                  Engine Status
                </span>
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
                  Active & Operational
                </span>
                <span>API Ping: 12ms</span>
                <span>Citation Parity: 99.4%</span>
              </div>
            </div>
          </div>

          {/* Compliance & Citation Transparency Notice bottom footer */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span>© 2026 GEOEngine. All Rights Reserved.</span>
              <span>•</span>
              <a href="#live-sandbox" className="hover:text-white transition-colors">Citation Transparency Statement</a>
              <span>•</span>
              <a href="#live-sandbox" className="hover:text-white transition-colors">Privacy Principles</a>
            </div>
            <div className="text-[10px] text-slate-400">
              Pipeline Ref: GEO-CORE-V2.4.0 • Models Active: gemini-2.5-flash
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
