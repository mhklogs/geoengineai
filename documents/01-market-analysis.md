# geoengineai — Market Analysis

> **Evidence base.** This document was researched on 2026-09-29 from vendor pricing pages,
> published analyst figures and the owner's market-review work (2026-09-26). No number
> here is invented. Where a figure could not be independently verified it is marked
> **[TO BE VALIDATED]**; verify it before the document is used in an investor or
> grant setting. Sources are listed in §8.

## 1. Product in one sentence

> GEOEngine AI — a GEO (AI-search visibility) service page with a stateless audit demo.

## 2. Problem statement

- **Who feels the problem:** Sites that want to be cited by ChatGPT, Claude, Perplexity and Gemini.
- **What they do today instead:** manual processes, spreadsheets, rented SaaS — see §4.
- **Cost of the status quo:** measurable in lost revenue / manual labor overhead
  **[TO BE VALIDATED for this specific segment]**.

## 3. Market definition

| Field | Value |
| --- | --- |
| Category | GEO — Generative Engine Optimization (AI-search visibility) |
| Geographic scope | Global |
| Target segment / persona | Sites that want to be cited by ChatGPT, Claude, Perplexity and Gemini |
| Estimated total addressable market | AI-search optimization is a new, fast-growing category with a $29/mo self-serve floor **[TO BE VALIDATED — cite a specific figure]** |
| Serviceable addressable market | Depends on distribution reach; **[TO BE VALIDATED]** |
| Beachhead segment | Sites that want to be cited by ChatGPT, Claude, Perplexity and Gemini |

## 4. Demand signals

> Six funded entrants with published pricing; consolidating measurement layer

| Signal | Evidence | Status |
| --- | --- | --- |
| Category demand | Mature/validated category with well-funded entrants | Confirmed |
| Competitive floor | Incumbent pricing and free tiers are public and low | Confirmed (see §5) |
| Own sales/usage data | Not instrumented in this repo | **[TO BE MEASURED]** |

## 5. Competitive landscape

| Competitor | Entry price (2026) | Positioning | Weakness we can exploit |
| --- | --- | --- | --- |
| **Otterly.ai** | $29–$489/mo | 4 core engines; paid add-ons | Measurement only |
| **Peec AI** | $95–$495/mo | 3 engines; $29M raised | Measurement only |
| **Profound** | $99–$399/mo | 1–3 engines; $1B valuation | Sales-gated at entry |
| **Scrunch AI** | $250–$500/mo | All 9 engines; acquired by Sitecore 2026 | Agency tier |
| **SolCrys** | $0–$499/mo | 3–5 engines; agency $1,499+ | Measurement only |
| **Ahrefs Brand Radar** | ~$699/mo | 6 engines | Bundled; measurement only |

## 6. Differentiation

Grounded in what this build actually does (see `06-architecture.md`):

- **Distinctive capability in code:** Every incumbent measures citations. None remediates the deterministic causes (per-bot robots.txt rules, SSR, schema, content ergonomics). This build's wedge is mechanical-gate remediation, and it must actually fetch the URL server-side.
- **Capability a competitor would need to replicate:** proxy of the build's core path.
- **Why defensible:** depth of vertical fit and delivery ownership, not a generic dashboard.

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Category commoditized / incumbent floor falling | Medium–High | Medium | Position on differentiation above, not price |
| Unverified market figures | High | High | Keep `[TO BE VALIDATED]` markers until sourced |
| Claims ahead of code (demo vs. shipped) | Medium | High | Keep README/copy aligned with the source tree |

## 8. Sources

Accessed 2026-09-29; vendor pricing changes — re-verify before any pricing decision.

- https://otterly.ai/pricing
- https://peec.ai/pricing
- https://tryprofound.com/pricing
- https://scrunch.com/pricing
- https://solcrys.com/pricing
- https://ahrefs.com/brand-radar
