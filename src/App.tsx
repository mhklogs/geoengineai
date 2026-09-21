import React, { useState } from "react";
import { ArrowRight, Globe, Menu, X, Search } from "lucide-react";
import GeoLogo from "./components/GeoLogo";
import CoreSequence from "./components/CoreSequence";
import AuditSandbox from "./components/AuditSandbox";
import OptimizationPlans from "./components/OptimizationPlans";
import EngineeringTeam from "./components/EngineeringTeam";
import ScrollReveal from "./components/ScrollReveal";
import { TierType } from "./types";

const NAV = [
  { href: "#core-pipeline", label: "Pipeline" },
  { href: "#live-sandbox", label: "Audit" },
  { href: "#pricing-matrix", label: "Plans" },
  { href: "#engineering-team", label: "Team" },
];

const PRAISE = [
  {
    q: "We ran the audit on the pricing page before a launch. It flagged the exact fragments an LLM would never quote, and the suggested rewrites were ready to paste.",
    n: "Growth Lead",
    c: "B2B SaaS, 45-person team",
  },
  {
    q: "The readiness score told us instantly why our help docs never got cited by support LLMs. Two weeks after the fixes, our content started surfacing in verified answers.",
    n: "Head of SEO",
    c: "Fintech scale-up",
  },
  {
    q: "I handed the engineers the prioritized fix list instead of a vague 'improve the copy'. That one report changed how our whole marketing team writes for AI visibility.",
    n: "Digital Marketing Director",
    c: "E-commerce marketplace",
  },
];

const FAQS = [
  {
    q: "Does the trial work on my real page?",
    a: "Yes. Paste the live URL of any page you control and GEO Engine audits the actual content. You keep the scored report and fix list — no credit card, no commitment.",
  },
  {
    q: "Which answer engines does it check against?",
    a: "The audit scores your text and HTML against how ChatGPT, Gemini, Claude and Perplexity retrieve, rank and cite sources in RAG pipelines — not against a single keyword list.",
  },
  {
    q: "What do I get back?",
    a: "A readiness score out of 10, a prioritized fix plan ranked by citation impact, the specific blocks that hurt retrieval, and ready-to-paste rewrites you can deploy directly.",
  },
  {
    q: "Do I need technical staff to use the fixes?",
    a: "No. The plan explains each fix in plain language with a rewritten version. Most improvements are copy and structure changes a marketer can ship in a day.",
  },
  {
    q: "How is pricing structured?",
    a: "Run audits free, then upgrade when you want continuous monitoring, deeper rewrites and broader page coverage. The trial shows enough signal to make that call.",
  },
];

export default function App() {
  const [activeTier, setActiveTier] = useState<TierType>("FREE");
  const [presetUrl, setPresetUrl] = useState<string>("");
  const [heroInput, setHeroInput] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectPlan = (tier: TierType) => {
    setActiveTier(tier);
    const element = document.getElementById("live-sandbox");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroInput.trim()) return;

    let targetUrl = heroInput.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }

    setPresetUrl(targetUrl);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-void font-sans text-ink flex flex-col antialiased selection:bg-geo selection:text-ink">
      {/* ================= HEADER ================= */}
      <header className="bg-void/85 backdrop-blur-xl border-b border-line sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 min-w-0 shrink-0">
            <span className="logo-tile flex h-11 w-11 items-center justify-center shrink-0">
              <GeoLogo size={30} />
            </span>
            <span className="leading-tight">
              <span className="font-display font-bold tracking-wide text-ink text-base block">
                GEO<span className="text-geo">Engine</span>
              </span>
              <span className="text-[9px] text-muted font-mono font-medium tracking-wider block ">
                Generative Engine Optimization
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-bold text-ink-soft hover:text-ink transition-colors font-mono  tracking-widest"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#live-sandbox"
              className="hidden sm:inline-flex btn items-center gap-2 rounded-full bg-ink px-6 py-3 font-head text-sm font-semibold text-cream hover:bg-black"
            >
              Try it free
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden border-t border-line bg-void/95 backdrop-blur-xl px-4 sm:px-6 pb-6 pt-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-bold text-ink-soft hover:text-ink hover:bg-white font-mono  tracking-widest"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#live-sandbox"
              onClick={() => setMenuOpen(false)}
              className="mt-3 btn items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 font-head text-sm font-semibold text-cream"
            >
              Try it free — audit your real page
              <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section id="top" className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <ScrollReveal direction="down" delay={0.05}>
              <p className="badge-label text-muted">
                GEO Engine · runs on your real pages
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="mt-7 font-display">
                When AI answers,{" "}
                <span className="text-geo">cite your brand.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <p className="mt-6 max-w-2xl text-ink-soft">
                ChatGPT, Gemini, Claude and Perplexity answer questions about your
                market every minute. GEO Engine audits your live pages against how
                these engines retrieve and cite sources — then hands you a scored,
                prioritized fix plan with rewrites you can ship today.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.26}>
              <form
                onSubmit={handleHeroSearch}
                className="mt-9 max-w-xl bg-white border border-line rounded-2xl p-2 flex items-center gap-2 focus-within:border-geo/40 transition-colors"
              >
                <div className="pl-3 text-geo shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  placeholder="Paste your live page URL — yourbrand.com/services"
                  className="w-full bg-transparent text-sm font-mono text-ink placeholder-muted focus:outline-none py-3"
                />
                <button
                  type="submit"
                  className="btn shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 font-head text-sm font-semibold text-cream hover:bg-black"
                >
                  <Search className="w-4 h-4" />
                  Get my audit
                </button>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={0.34}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-muted">
                <span>/// Free trial on one real page</span>
                <span>/// No credit card</span>
                <span>/// You keep the report</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.42}>
            <div className="mt-16 grid grid-cols-2 gap-6 border-t border-line/60 pt-8 sm:grid-cols-4">
              {[
                { v: "4", l: "answer engines audited" },
                { v: "/10", l: "citation-readiness score" },
                { v: "40+", l: "checks per page" },
                { v: "1", l: "free trial, no card" },
              ].map((s) => (
                <div key={s.l} className="text-left sm:text-center">
                  <p className="font-display text-3xl text-ink md:text-4xl">
                    {s.v}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= CORE PIPELINE ================= */}
      <CoreSequence />

{/* ================= LIVE AUDIT SURFACE ================= */}
      <section className="border-t border-line bg-abyss/40 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="badge-label text-muted">
              run it on your work
            </p>
            <h2 className="mt-2 font-display">
              Audit a real page, free
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">
              Pick a sample or paste your own URL and HTML below. The audit runs
              live, returns a scored plan, and keeps the rewrite suggestions —
              yours to keep either way.
            </p>
          </ScrollReveal>
        </div>
      </section>
      <AuditSandbox
        activeTier={activeTier}
        onTierChange={setActiveTier}
        presetUrl={presetUrl}
        setPresetUrl={setPresetUrl}
      />

      {/* ================= PLANS ================= */}
      <OptimizationPlans onSelectPlan={handleSelectPlan} activeTier={activeTier} />

      {/* ================= TEAM ================= */}
      <EngineeringTeam />

      {/* ================= PRAISE ================= */}
      <section className="border-y border-line/60 bg-abyss py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center badge-label text-muted">
              team reports
            </p>
            <h2 className="mx-auto mt-2 max-w-2xl text-center font-display">
              What marketing teams do with one audit
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRAISE.map((t, i) => (
              <ScrollReveal key={t.n} delay={i * 0.1}>
                <figure className="panel flex h-full flex-col p-7">
                  <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
                    &quot;{t.q}&quot;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line/60 pt-4">
                    <p className="font-head text-sm font-semibold">{t.n}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">{t.c}</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-6">
        <ScrollReveal>
          <p className="text-center badge-label text-muted">
            straight answers
          </p>
          <h2 className="mt-2 text-center font-display">
            Before you ask
          </h2>
        </ScrollReveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 0.06}>
              <details className="panel group overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-head font-semibold">
                  {f.q}
                  <span className="text-xl leading-none text-geo transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="relative overflow-hidden pb-24">
        <ScrollReveal>
          <div className="panel mx-auto max-w-4xl p-8 text-center md:p-12">
            <p className="badge-label text-muted">
              free trial on real work
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display">
              Find out who the AI answer engines cite — you or your competitor
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              One free audit on any page you own. Get the readiness score, the
              blockers, and the rewrites — no credit card, keep everything.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#live-sandbox"
                className="btn bg-ink px-8 py-4 font-head font-semibold text-cream hover:bg-black rounded-full"
              >
                Audit your page free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#core-pipeline"
                className="btn btn-ghost px-8 py-4 font-head font-semibold rounded-full"
              >
                See how it works
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-paper text-muted py-16 border-t border-line text-[11px] font-mono relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-line/60 pb-12">
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="logo-tile flex h-9 w-9 items-center justify-center">
                  <GeoLogo size={24} />
                </span>
                <span className="font-display font-bold tracking-wide text-ink text-sm">
                  GEO<span className="text-geo">Engine</span>
                </span>
              </div>
              <p className="max-w-xs leading-relaxed">
                Generative Engine Optimization audit agent. Scores your live pages
                against LLM & RAG citation best practices and turns the findings
                into a fix plan you can ship.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2.5">
                <span className="text-xs text-ink font-bold  tracking-widest mb-1.5 font-head">
                  Product
                </span>
                <a href="#core-pipeline" className="hover:text-ink transition-colors">
                  Pipeline
                </a>
                <a href="#live-sandbox" className="hover:text-ink transition-colors">
                  Live audit
                </a>
                <a href="#pricing-matrix" className="hover:text-ink transition-colors">
                  Plans
                </a>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="text-xs text-ink font-bold  tracking-widest mb-1.5 font-head">
                  For teams
                </span>
                <span className="hover:text-ink transition-colors cursor-pointer">
                  Growth marketing
                </span>
                <span className="hover:text-ink transition-colors cursor-pointer">
                  SEO & content
                </span>
                <span className="hover:text-ink transition-colors cursor-pointer">
                  Developer docs
                </span>
              </div>
              <div className="flex flex-col gap-2.5 col-span-2 sm:col-span-1">
                <span className="text-xs text-ink font-bold  tracking-widest mb-1.5 font-head">
                  Status
                </span>
                <span className="flex items-center gap-1.5 text-geo font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-geo" />
                  Audit service live
                </span>
                <span>Free trial open</span>
                <span>Gemini-powered</span>
              </div>
            </div>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span>© 2026 GEO Engine. All rights reserved.</span>
              <span>·</span>
              <a href="#live-sandbox" className="hover:text-ink transition-colors">
                Free trial
              </a>
              <span>·</span>
              <a href="#live-sandbox" className="hover:text-ink transition-colors">
                Privacy
              </a>
            </div>
            <div className="text-[10px]">
              Audit core :: LLM + RAG citation best practices
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}