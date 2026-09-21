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
    <section className="py-24 bg-void border-t border-line relative overflow-hidden" id="engineering-team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto mb-16">
            <p className="badge-label text-muted">
              R&D foundry
            </p>
            <h2 className="mt-4 font-display">
              Heuristic Engine Architects
            </h2>
            <p className="mt-4 text-ink-soft">
              Our algorithmic pipeline was designed, written, and validated by
              leading experts in Retrieval-Augmented Generation, web crawlers,
              and NLP.
            </p>
          </div>
        </ScrollReveal>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile, i) => (
            <ScrollReveal
              key={i}
              direction="up"
              delay={0.1 * (i + 1)}
              className="flex flex-col h-full"
            >
              <div className="bg-white border border-line rounded-2xl p-6 hover:border-geo/40 hover-lift transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-2xl bg-abyss border border-line flex items-center justify-center mb-5 font-mono text-sm font-bold text-geo">
                    {profile.initials}
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-ink mb-1">
                    {profile.name}
                  </h3>

                  {/* Role */}
                  <span className="text-[11px] font-semibold text-geo font-mono block mt-1">
                    {profile.role}
                  </span>

                  {/* Core Context description */}
                  <p className="text-[11px] text-ink-soft leading-relaxed mt-4 pt-4 border-t border-line">
                    {profile.contribution}
                  </p>
                </div>

                {/* Verified Badge */}
                <div className="mt-6 flex items-center gap-1.5 text-[10px] text-muted font-mono font-bold tracking-widest">
                  <Cpu className="w-3.5 h-3.5 text-geo/60" />
                  Verified Committer
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}