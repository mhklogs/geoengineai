import React from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Continuous Ingestion",
    description:
      "Deep crawling and parsing of your digital corpus, documentation, and product registries to index key entity structures. The parser runs continuously and triggers automatically on updates across your cloud storage or API hooks.",
  },
  {
    number: "02",
    title: "Model Bias Simulation",
    description:
      "Multi-agent prompt simulations across ChatGPT, Claude, and Gemini map retrieval gaps and citation omissions before they cost you visibility. Every query the answer engines would ask gets asked against your content.",
  },
  {
    number: "03",
    title: "Algorithmic GEO Tuning",
    description:
      "Dynamic injection of high-density semantic markers and context-rich schema models into your domain layout, converting paragraphs into structure the retrieval pipelines actually quote.",
  },
  {
    number: "04",
    title: "Citation Defense Loop",
    description:
      "Continuous monitoring against LLM vector shifts, weight recalibrations, and competitive share-of-voice drift. When the models move, you hear first and respond.",
  },
];

export default function CoreSequence() {
  return (
    <section className="py-24 bg-void border-t border-line relative overflow-hidden" id="core-pipeline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto mb-16">
            <p className="badge-label text-muted">
              optimization cycle
            </p>
            <h2 className="mt-4 font-display">
              The GEO Core Pipeline
            </h2>
            <p className="mt-4 text-ink-soft">
              A real-time four-stage programmatic cycle engineered to maximize
              index density and guarantee retrieval authority across GenAI
              search models.
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Steps */}
        <div className="space-y-14">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              direction="up"
              delay={0.08 * (index + 1)}
            >
              <div className={`grid md:grid-cols-12 gap-6 items-start ${index % 2 ? "md:flex-row-reverse" : ""}`}>
                <div className={`md:col-span-4 ${index % 2 ? "md:order-2" : ""}`}>
                  <p className="font-display text-2xl text-geo">
                    {step.number}
                  </p>
                </div>
                <div className={`md:col-span-8 ${index % 2 ? "md:order-1" : ""}`}>
                  <h3 className="font-display text-ink mb-2">{step.title}</h3>
                  <p className="text-ink-soft">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Integration Callout */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="mt-16 bg-white border border-line rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover-lift">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-4 h-4 text-geo shrink-0" />
              <p className="text-sm text-ink-soft font-mono">
                <strong className="text-ink">Real-Time Synchronization:</strong>{" "}
                the ingestion parser triggers upon updates across Cloud Storage or API hooks.
              </p>
            </div>
            <span className="text-[10px] font-bold font-mono text-geo bg-geo/10 px-3 py-1.5 rounded-full border border-geo/20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-geo" />
              System Status: Connected
            </span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}