import React from "react";
import { Cpu } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Profile {
  name: string;
  role: string;
  contribution: string;
  initials: string;
}

const profiles: Profile[] = [
  {
    name: "Dr. Elena Vance",
    role: "Principal RAG Architect",
    contribution: "Designed the multi-model vector-space alignment models that map conversational dialog context directly to source citation links.",
    initials: "EV",
  },
  {
    name: "Marcus Sterling",
    role: "Heuristic Validation Engineer",
    contribution: "Led the development of adversarial prompt simulation and stress-testing models to protect brand visibility during model drift.",
    initials: "MS",
  },
  {
    name: "Naomi Chen",
    role: "NLP Performance Lead",
    contribution: "Crafted the semantic normalization engine mapping natural language statements to high-density schema.org schemas.",
    initials: "NC",
  },
  {
    name: "Alan Devereaux",
    role: "Distributed Engine Lead",
    contribution: "Optimized the real-time parsing pipeline to evaluate and restructure crawled page documentation within 1.2 seconds.",
    initials: "AD",
  },
];

export default function EngineeringTeam() {
  return (
    <section className="py-24 bg-void border-t border-white/[0.08] relative overflow-hidden" id="engineering-team">
      <div className="absolute inset-0 pixis-grid-lines opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-bold tracking-[0.25em]  text-geo font-mono bg-white/[0.03] border border-geo/20 px-4 py-2 rounded-full">
              R&D FOUNDRY
            </span>
            <h2 className="font-display text-3xl font-extrabold text-ink leading-tight mt-6 sm:text-4xl">
              Heuristic Engine Architects
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Our algorithmic pipeline was designed, written, and validated by leading experts in Retrieval-Augmented Generation, web crawlers, and NLP.
            </p>
          </div>
        </ScrollReveal>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile, i) => {
            const hoverTitles = [
              "Dr. Elena Vance (RAG)",
              "Marcus Sterling (Validation)",
              "Naomi Chen (NLP)",
              "Alan Devereaux (Pipeline)"
            ];
            const hoverDescs = [
              "Designed alignment layers mapping agent query contexts directly to citation links.",
              "Engineered prompt stress-testing to protect share of voice from model updates.",
              "Created semantic normalization parsing to convert paragraphs into dense triples.",
              "Optimized continuous parser pipelines to analyze crawled docs under 1.2s."
            ];

            return (
              <ScrollReveal 
                key={i} 
                direction="up" 
                delay={0.1 * (i + 1)}
                className="flex flex-col h-full"
              >
                <div 
                  className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 hover:border-geo/40 hover:shadow-2xl hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group backdrop-blur-xl h-full cursor-pointer"
                  data-cursor-title={hoverTitles[i]}
                  data-cursor-desc={hoverDescs[i]}
                  data-cursor-action="ARCHITECT COMMIT"
                >
                  <div>
                    {/* Tech Symbol Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-5 font-mono text-sm font-bold text-slate-300 group-hover:bg-gradient-to-tr group-hover:from-geo/15 group-hover:to-slate-200/10 group-hover:border-geo/30 group-hover:text-geo transition-all">
                      {profile.initials}
                    </div>

                    {/* Name */}
                    <h3 className="text-sm font-bold text-ink leading-tight group-hover:text-geo transition-colors font-display">
                      {profile.name}
                    </h3>
                    
                    {/* Role */}
                    <span className="text-[11px] font-semibold text-geo font-mono block mt-1">
                      {profile.role}
                    </span>

                    {/* Core Context description */}
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-4 pt-4 border-t border-white/[0.08]">
                      {profile.contribution}
                    </p>
                  </div>

                  {/* Verified Badge */}
                  <div className="mt-6 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono font-bold  tracking-widest">
                    <Cpu className="w-3.5 h-3.5 text-geo/60" />
                    Verified Committer
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
