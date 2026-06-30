import React from "react";
import { Check, Sparkles } from "lucide-react";
import { TierType } from "../types";
import ScrollReveal from "./ScrollReveal";

interface OptimizationPlansProps {
  onSelectPlan: (tier: TierType) => void;
  activeTier: TierType;
}

export default function OptimizationPlans({ onSelectPlan, activeTier }: OptimizationPlansProps) {
  return (
    <section className="py-24 bg-[#04060a] border-t border-white/[0.06] relative overflow-hidden" id="pricing-matrix">
      <div className="absolute inset-0 pixis-grid-lines opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-400 font-mono bg-white/[0.02] border border-white/[0.08] px-4 py-2 rounded-full">
              COMMERCIAL OPTIMIZATION MATRIX
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white tracking-tight mt-6 sm:text-4xl">
              Surgical Alignment Plans
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Select the precise tier of semantic content engineering your organization requires. Use our live simulation suite to evaluate each tier's outputs.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Core Visibility (Starter) */}
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col h-full">
            <div 
              className={`bg-white/[0.02] border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl h-full cursor-pointer ${
                activeTier === "FREE" 
                  ? "border-emerald-500/55 ring-1 ring-emerald-500/30 shadow-2xl" 
                  : "border-white/[0.06] hover:border-white/[0.15]"
              }`}
              data-cursor-title="Core Visibility Tier ($499)"
              data-cursor-desc="Fundamental audit checks and citation index readiness scoring."
              data-cursor-action="SELECT STARTER"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest">
                    Core Visibility
                  </span>
                  <span className="text-[10px] bg-white/[0.04] text-slate-300 font-mono px-3 py-1 rounded-md border border-white/[0.08] font-bold">
                    Starter
                  </span>
                </div>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">$499</span>
                  <span className="text-xs text-slate-400 font-mono ml-1.5">/month</span>
                </div>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  Fundamental semantic checks to identify search generative blockers and index-killing narrative anomalies.
                </p>

                {/* Bullet points */}
                <ul className="mt-8 space-y-4 text-xs text-slate-300 border-t border-white/[0.06] pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Manual heuristic content recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Single-engine citation tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Standard REST API pipeline access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Monthly crawlability readiness scores</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("FREE")}
                className={`mt-8 w-full py-3.5 px-4 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                  activeTier === "FREE"
                    ? "bg-white text-black border-white"
                    : "bg-transparent hover:bg-white/[0.04] text-white border-white/[0.12]"
                }`}
              >
                Select Core Visibility
              </button>
            </div>
          </ScrollReveal>

          {/* Card 2: Autonomous GEO Agent (Professional - Highlighted) */}
          <ScrollReveal direction="up" delay={0.2} className="flex flex-col h-full">
            <div 
              className={`border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl relative transform md:-translate-y-2 backdrop-blur-xl h-full cursor-pointer ${
                activeTier === "STANDARD"
                  ? "bg-white/[0.03] border-cyan-500/80 ring-2 ring-cyan-500/20"
                  : "bg-white/[0.01] border-white/[0.08]"
              }`}
              data-cursor-title="Autonomous GEO Agent ($1,899)"
              data-cursor-desc="Programmatic semantic injection across all model updates. Highly recommended."
              data-cursor-action="SELECT PRO"
            >
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-mono text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
                Engine Choice
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-widest">
                    Autonomous GEO Agent
                  </span>
                  <span className="text-[10px] bg-cyan-400/10 text-cyan-400 font-mono px-3 py-1 rounded-md border border-cyan-400/20 font-bold">
                    Professional
                  </span>
                </div>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">$1,899</span>
                  <span className="text-xs text-slate-400 font-mono ml-1.5">/month</span>
                </div>
                <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                  Automated context reconstruction engine running continuously to defend brand visibility against model updates.
                </p>

                {/* Bullet points */}
                <ul className="mt-8 space-y-4 text-xs text-slate-350 border-t border-white/[0.06] pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Automated real-time semantic injection</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Multi-LLM (ChatGPT, Gemini, Claude) tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Priority programmatic integration hooks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Automated schema graph compilation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Weekly parity audits & drift prevention</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("STANDARD")}
                className={`mt-8 w-full py-3.5 px-4 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                  activeTier === "STANDARD"
                    ? "bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 text-white border-transparent"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/[0.12]"
                }`}
              >
                Select Autonomous Agent
              </button>
            </div>
          </ScrollReveal>

          {/* Card 3: Enterprise Cognitive Defense (Custom/Scale) */}
          <ScrollReveal direction="up" delay={0.3} className="flex flex-col h-full">
            <div 
              className={`bg-white/[0.02] border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl h-full cursor-pointer ${
                activeTier === "PRO" 
                  ? "border-purple-500/55 ring-1 ring-purple-500/30 shadow-2xl" 
                  : "border-white/[0.06] hover:border-white/[0.15]"
              }`}
              data-cursor-title="Cognitive Defense (Custom)"
              data-cursor-desc="Bespoke pipeline sandboxes, custom LLM fine-tuning, and direct API clusters."
              data-cursor-action="CONTACT SALES"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest">
                    Cognitive Defense
                  </span>
                  <span className="text-[10px] bg-white/[0.04] text-slate-300 font-mono px-3 py-1 rounded-md border border-white/[0.08] font-bold">
                    Enterprise
                  </span>
                </div>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">Custom</span>
                  <span className="text-xs text-slate-400 font-mono ml-1.5">/bespoke</span>
                </div>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  Dedicated pipeline infrastructure to shape high-volume organizational data and shield proprietary IP.
                </p>

                {/* Bullet points */}
                <ul className="mt-8 space-y-4 text-xs text-slate-300 border-t border-white/[0.06] pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>Custom LLM fine-tuning protection</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Dedicated, sandboxed API pipelines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>High-volume structured data-shaping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>24/7 incident response for citation drops</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("PRO")}
                className={`mt-8 w-full py-3.5 px-4 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                  activeTier === "PRO"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-transparent hover:bg-white/[0.04] text-white border-white/[0.12]"
                }`}
              >
                Select Corporate Defense
              </button>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
