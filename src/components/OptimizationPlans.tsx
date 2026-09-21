import React from "react";
import { Check } from "lucide-react";
import { TierType } from "../types";
import ScrollReveal from "./ScrollReveal";

interface OptimizationPlansProps {
  onSelectPlan: (tier: TierType) => void;
  activeTier: TierType;
}

export default function OptimizationPlans({ onSelectPlan, activeTier }: OptimizationPlansProps) {
  return (
    <section className="py-24 bg-void border-t border-line relative overflow-hidden" id="pricing-matrix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto mb-16">
            <p className="badge-label text-muted">
              commercial optimization matrix
            </p>
            <h2 className="mt-4 font-display">
              Surgical Alignment Plans
            </h2>
            <p className="mt-4 text-ink-soft">
              Select the precise tier of semantic content engineering your
              organization requires. Use the live simulation suite to evaluate
              each tier&apos;s outputs.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

          {/* Card 1: Core Visibility (Starter) */}
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col h-full">
            <div
              className={`bg-white border p-8 flex flex-col justify-between transition-all duration-300 hover-lift h-full rounded-2xl ${
                activeTier === "FREE"
                  ? "border-geo ring-1 ring-geo/30"
                  : "border-line hover:border-geo/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-soft font-mono tracking-widest">
                    Core Visibility
                  </span>
                  <span className="text-[10px] bg-abyss text-ink-soft font-mono px-3 py-1 rounded-full border border-line font-bold">
                    Starter
                  </span>
                </div>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-ink font-mono leading-tight">$499</span>
                  <span className="text-xs text-muted font-mono ml-1.5">/month</span>
                </div>
                <p className="text-xs text-ink-soft mt-4 leading-relaxed">
                  Fundamental semantic checks to identify generative-search
                  blockers and index-killing narrative anomalies.
                </p>

                {/* Bullet points */}
                <ul className="mt-8 space-y-4 text-xs text-ink-soft border-t border-line pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Manual heuristic content recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Single-engine citation tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Standard REST API pipeline access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Monthly crawlability readiness scores</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("FREE")}
                className={`mt-8 w-full py-3.5 px-4 rounded-full text-sm font-bold transition-all border cursor-pointer ${
                  activeTier === "FREE"
                    ? "bg-ink text-cream border-ink"
                    : "bg-white text-ink border-line hover:border-geo"
                }`}
              >
                Select Core Visibility
              </button>
            </div>
          </ScrollReveal>

          {/* Card 2: Autonomous GEO Agent (Professional) */}
          <ScrollReveal direction="up" delay={0.2} className="flex flex-col h-full">
            <div
              className={`border p-8 flex flex-col justify-between transition-all duration-300 hover-lift rounded-2xl relative h-full ${
                activeTier === "STANDARD"
                  ? "bg-white border-geo ring-1 ring-geo/30"
                  : "bg-white border-line hover:border-geo/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-geo font-mono tracking-widest">
                    Autonomous GEO Agent
                  </span>
                  <span className="text-[10px] bg-geo/10 text-geo font-mono px-3 py-1 rounded-full border border-geo/20 font-bold">
                    Professional
                  </span>
                </div>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-ink font-mono leading-tight">$1,899</span>
                  <span className="text-xs text-muted font-mono ml-1.5">/month</span>
                </div>
                <p className="text-xs text-ink-soft mt-4 leading-relaxed">
                  Automated context reconstruction engine running continuously to
                  defend brand visibility against model updates.
                </p>

                {/* Bullet points */}
                <ul className="mt-8 space-y-4 text-xs text-ink-soft border-t border-line pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span><strong>Automated real-time semantic injection</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Multi-LLM (ChatGPT, Gemini, Claude) tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Priority programmatic integration hooks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Automated schema graph compilation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Weekly parity audits &amp; drift prevention</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("STANDARD")}
                className={`mt-8 w-full py-3.5 px-4 rounded-full text-sm font-bold transition-all border cursor-pointer ${
                  activeTier === "STANDARD"
                    ? "bg-ink text-cream border-ink"
                    : "bg-white text-ink border-line hover:border-geo"
                }`}
              >
                Select Autonomous Agent
              </button>
            </div>
          </ScrollReveal>

          {/* Card 3: Enterprise Cognitive Defense (Custom) */}
          <ScrollReveal direction="up" delay={0.3} className="flex flex-col h-full">
            <div
              className={`bg-white border p-8 flex flex-col justify-between transition-all duration-300 hover-lift rounded-2xl h-full ${
                activeTier === "PRO"
                  ? "border-geo ring-1 ring-geo/30"
                  : "border-line hover:border-geo/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-soft font-mono tracking-widest">
                    Cognitive Defense
                  </span>
                  <span className="text-[10px] bg-abyss text-ink-soft font-mono px-3 py-1 rounded-full border border-line font-bold">
                    Enterprise
                  </span>
                </div>
                <div className="mt-5 flex items-baseline">
                  <span className="text-4xl font-extrabold text-ink font-mono leading-tight">Custom</span>
                  <span className="text-xs text-muted font-mono ml-1.5">/bespoke</span>
                </div>
                <p className="text-xs text-ink-soft mt-4 leading-relaxed">
                  Dedicated pipeline infrastructure to shape high-volume
                  organizational data and shield proprietary IP.
                </p>

                {/* Bullet points */}
                <ul className="mt-8 space-y-4 text-xs text-ink-soft border-t border-line pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span><strong>Custom LLM fine-tuning protection</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>Dedicated, sandboxed API pipelines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>High-volume structured data-shaping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-geo shrink-0 mt-0.5" />
                    <span>24/7 incident response for citation drops</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("PRO")}
                className={`mt-8 w-full py-3.5 px-4 rounded-full text-sm font-bold transition-all border cursor-pointer ${
                  activeTier === "PRO"
                    ? "bg-ink text-cream border-ink"
                    : "bg-white text-ink border-line hover:border-geo"
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