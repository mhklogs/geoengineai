import React from "react";
import { Search, Brain, PenTool, RefreshCw, ArrowRight, Zap } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: Step[] = [
  {
    id: "ingestion",
    number: "01",
    title: "Continuous Ingestion",
    description: "Deep crawling and parsing of your digital corpus, documentation, and product registries to index key entity structures.",
    icon: Search,
  },
  {
    id: "simulation",
    number: "02",
    title: "Model Bias Simulation",
    description: "Multi-agent prompt simulations across ChatGPT, Claude, and Gemini to map retrieval gaps and citation omissions.",
    icon: Brain,
  },
  {
    id: "tuning",
    number: "03",
    title: "Algorithmic GEO Tuning",
    description: "Dynamic injection of high-density semantic markers and context-rich schema models into your domain layout.",
    icon: PenTool,
  },
  {
    id: "monitoring",
    number: "04",
    title: "Citation Defense Loop",
    description: "Continuous monitoring against LLM vector shifts, weight recalibrations, and competitive share of voice drift.",
    icon: RefreshCw,
  },
];

export default function CoreSequence() {
  return (
    <section className="py-24 bg-void border-y border-white/[0.08] relative overflow-hidden" id="core-pipeline">
      <div className="absolute inset-0 pixis-grid-lines opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-bold tracking-[0.25em]  text-geo font-mono bg-white/[0.03] border border-geo/20 px-4 py-2 rounded-full">
              OPTIMIZATION CYCLE
            </span>
            <h2 className="font-display text-3xl font-extrabold text-ink leading-tight mt-6 sm:text-4xl">
              The GEO Core Pipeline
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              A real-time four-stage programmatic cycle engineered to maximize index density and guarantee retrieval authority across GenAI search models.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Sequence Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            // Map corresponding details for custom cursor follow effect
            const hoverTitles = [
              "01 Ingestion",
              "02 Bias Simulation",
              "03 GEO Tuning",
              "04 Defense Loop"
            ];
            const hoverDescs = [
              "Deep crawling parses and structures raw data, replacing vague pronouns with core triples.",
              "Simulates 100+ conversational agent queries to uncover index citation blind spots.",
              "Injects semantic markup and JSON-LD structured context into your public schemas.",
              "Monitors vector space modifications to shield your brand authority continuously."
            ];
            
            return (
              <ScrollReveal 
                key={step.id} 
                direction="up" 
                delay={0.1 * (index + 1)}
                className="relative group"
              >
                
                {/* Connector Line (Desktop Only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[85%] right-[-15%] h-[1px] bg-gradient-to-r from-geo/30 to-transparent z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-geo/60">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Card Block */}
                <div 
                  className="bg-white/[0.02] border border-white/[0.08] hover:border-geo/40 hover:bg-white/[0.04] rounded-2xl p-6 relative z-10 shadow-2xl transition-all duration-300 flex flex-col h-full group backdrop-blur-xl cursor-crosshair"
                  data-cursor-title={hoverTitles[index]}
                  data-cursor-desc={hoverDescs[index]}
                  data-cursor-action="PIPELINE STAGE"
                >
                  
                  {/* Step Top */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:bg-gradient-to-tr group-hover:from-geo/15 group-hover:to-slate-200/10 group-hover:border-geo/30 group-hover:text-geo transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-geo transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-ink leading-tight mb-3 group-hover:text-geo transition-colors font-display">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Integration Callout */}
        <ScrollReveal direction="up" delay={0.5}>
          <div 
            className="mt-14 bg-white/[0.01] rounded-2xl border border-white/[0.08] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md cursor-help"
            data-cursor-title="Continuous Active Daemon"
            data-cursor-desc="Listens on webhook channels for immediate repository changes."
            data-cursor-action="DAEMON SYSTEM"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-geo animate-pulse shrink-0" />
              <p className="text-xs text-slate-400 font-mono">
                <strong className="text-ink">Real-Time Synchronization:</strong> The ingestion parser automatically triggers upon updates across Cloud Storage or API hooks.
              </p>
            </div>
            <span className="text-[10px] font-bold font-mono text-geo bg-geo/10 px-3 py-1.5 rounded-lg border border-geo/20  tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-geo animate-pulse"></span>
              System Status: Connected
            </span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
