<div align="center">
  <img width="1200" height="475" alt="GEOEngine AI Banner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# GEOEngine AI

**High-performance Generative Engine Optimization (GEO) auditing pipeline** — audit your brand's crawlability across ChatGPT, Gemini, Claude, and Perplexity, and produce entity-rich, citation-ready content optimized for RAG retrieval.

## Features

- **Share-of-Voice (SOV) Dashboard** — interactive real-time visibility gauge across four AI engines (ChatGPT, Gemini, Claude, Perplexity).
- **Three-Tier Audit Engine**
  - **FREE** — GEO Readiness Scorecard with crawlability scores and blocker analysis.
  - **STANDARD** — Semantic content engineering: raw vs. optimized contrast audit and AI-agent citation Q&A blocks.
  - **PRO** — Technical semantic graph generation with schema.org-compliant JSON-LD output.
- **Interactive Sandbox** — paste any page's raw HTML, select a tier, and instantly see structured audit outputs.
- **Sample Library** — pre-populated B2B sample pages (logistics, real estate, healthcare) for immediate testing.
- **Graceful Degradation** — works in full demo mode without a Gemini API key; falls back to a heuristic audit on Gemini errors.
- **Custom Cursor** — holographic tooltip system for context-aware UI exploration.

## Tech Stack

| Layer | Tool |
|-------|------|
| UI | React 19 + TypeScript + Tailwind CSS v4 + Vite 6 |
| Animation | motion (framer-motion) |
| Server | Express 4 + Vite dev middleware |
| AI | Google Gemini 2.5 Flash via `@google/genai` |
| Icons | lucide-react |
| Build | Vite (client) + esbuild (server) |

## Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/mhklogs/geoengineai.git
cd geoengineai

# 2. Install dependencies
npm install

# 3. Create a .env file (copy from example)
cp .env.example .env
# Edit .env and set your GEMINI_API_KEY

# 4. Start the dev server
npm run dev
# Open http://localhost:3030
```

> **No API key?** The app still works — it serves a deterministic heuristic demo audit so you can explore the full UI immediately.

## Build & Deploy

```bash
# Build client + server bundle
npm run build

# Start the production server
npm start

# Type-check only
npm run lint
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Recommended | Google Gemini API key. When absent, the app serves a deterministic heuristic demo audit. |
| `APP_URL` | Optional | The public URL where the app is hosted. Used for self-referential links and API endpoints. |
| `PORT` | Optional | Server port. Defaults to `3030`. |

## Project Structure

```
geoengineai/
├── index.html              # SPA entry point
├── server.ts               # Express server + Gemini API + demo fallback
├── vite.config.ts          # Vite + Tailwind plugin config
├── tsconfig.json           # TypeScript configuration
├── src/
│   ├── main.tsx            # React entry
│   ├── App.tsx             # Root layout + hero + sections
│   ├── index.css           # Tailwind + theme + markdown styles
│   ├── types.ts            # AuditRequest / AuditResponse types
│   └── components/
│       ├── AuditSandbox.tsx      # SOV dashboard + audit workspace
│       ├── OptimizationPlans.tsx  # Pricing matrix
│       ├── CoreSequence.tsx       # 4-stage pipeline diagram
│       ├── EngineeringTeam.tsx    # Team profiles
│       ├── CitationDiagram.tsx    # RAG pipeline diagram
│       ├── ScrollReveal.tsx       # Intersection-based scroll animation
│       └── CustomCursor.tsx       # Custom holographic cursor
├── public/
│   └── hero-bg.jpeg        # Hero background image
└── dist/                   # Build output (git-ignored)
```

## License

MIT © [mhklogs](https://github.com/mhklogs)
