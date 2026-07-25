import React from 'react';
import { Database, ArrowRight, Bot, Cpu } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function CitationDiagram() {
  return (
    <ScrollReveal direction="up" delay={0.2}>
      <div 
        className="bg-white/[0.01] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-2xl relative overflow-hidden cursor-crosshair"
        data-cursor-title="RAG Data Ingestion Architecture"
        data-cursor-desc="The 3-step pipeline converting unstructured pages into cited knowledge vectors."
        data-cursor-action="ARCHITECTURE"
      >
        <div className="absolute inset-0 pixis-grid-lines opacity-[0.12] pointer-events-none"></div>
        
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 relative z-10 font-mono tracking-wide">
          <Cpu className="w-4 h-4 text-sky-400" />
          Generative Engine Optimization (GEO) & RAG Pipeline Architecture
        </h3>
        
        <p className="text-xs text-slate-400 mb-6 leading-relaxed relative z-10">
          Modern Search Generative Experiences (SGE) and LLMs like Gemini, ChatGPT, and Perplexity use Retrieval-Augmented Generation (RAG). 
          Unstructured text fails to index. High-density, entity-mapped nodes ensure citations in responses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {/* Step 1 */}
          <div 
            className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 flex flex-col items-center text-center shadow-md backdrop-blur-lg"
            data-cursor-title="Phase 01: Raw Ingestion"
            data-cursor-desc="Automated crawlers strip boilerplate HTML, parsing clean markdown textual streams."
            data-cursor-action="RAW PARSER"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center text-slate-300 font-mono text-xs font-bold mb-3 border border-white/[0.08]">
              01
            </div>
            <span className="text-xs font-semibold text-white mb-1">Raw Content Ingestion</span>
            <p className="text-[11px] text-slate-400 leading-normal">
              Web crawler extracts HTML textual dump. Evaluates scannability and structural metadata.
            </p>
          </div>

          {/* Connection Arrow 1 */}
          <div className="hidden md:flex absolute top-1/2 left-[30%] -translate-y-1/2 z-0 text-sky-400/60">
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>

          {/* Step 2 */}
          <div 
            className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 flex flex-col items-center text-center shadow-md backdrop-blur-lg"
            data-cursor-title="Phase 02: Triple Generation"
            data-cursor-desc="Replacing ambiguous pronouns with structured entity references establishes hard relational indexes."
            data-cursor-action="GRAPH COMPILE"
          >
            <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 font-mono text-xs font-bold mb-3 border border-sky-500/20">
              02
            </div>
            <span className="text-xs font-semibold text-white mb-1">Knowledge Graph Mapping</span>
            <p className="text-[11px] text-slate-400 leading-normal">
              Entity extraction establishes hard data boundaries, replacing vague pronouns with structured parameters.
            </p>
          </div>

          {/* Connection Arrow 2 */}
          <div className="hidden md:flex absolute top-1/2 left-[64%] -translate-y-1/2 z-0 text-sky-400/60">
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>

          {/* Step 3 */}
          <div 
            className="bg-white/[0.02] border border-sky-400/30 rounded-xl p-4 flex flex-col items-center text-center shadow-md backdrop-blur-lg ring-1 ring-sky-400/20"
            data-cursor-title="Phase 03: Cited Inference"
            data-cursor-desc="The dense index block yields exceptionally high semantic scores, forcing direct citation references."
            data-cursor-action="LLM DEPLOY"
          >
            <div className="w-10 h-10 rounded-full bg-sky-400/10 flex items-center justify-center text-sky-400 font-mono text-xs font-bold mb-3 border border-sky-400/20">
              03
            </div>
            <span className="text-xs font-semibold text-white mb-1">LLM Response Generation</span>
            <p className="text-[11px] text-slate-400 leading-normal">
              High density text is matched in vector index and cited directly as source links in user queries.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] text-slate-400 relative z-10">
          <div className="flex items-start gap-2">
            <Database className="w-4 h-4 text-sky-400/80 shrink-0 mt-0.5" />
            <span><strong>Why Information Density Matters:</strong> RAG architectures pick documents based on semantic scores. Pages packed with actual metrics rank higher than narrative prose.</span>
          </div>
          <div className="flex items-start gap-2">
            <Bot className="w-4 h-4 text-sky-400/80 shrink-0 mt-0.5" />
            <span><strong>Entity Footprint Optimization:</strong> Replacing "our clinic group" with "MediHealth Urgent Care Austin Central" injects exact triples into the LLM Knowledge Graph.</span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
