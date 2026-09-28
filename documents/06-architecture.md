# geoengineai — Architecture Summary

> Generated from static analysis on 2026-09-28.

## Components

| Layer | Present | Evidence |
| --- | --- | --- |
| Presentation / UI | yes | 0 route module(s), 8 component file(s) |
| API / server | yes | 0 handler(s), entrypoints: server.ts |
| Domain / business logic | unclear | no dedicated layer detected |
| Persistence | no | no database client |
| Authentication | no | none detected |

## Detected frameworks and libraries

| Package | Purpose (inferred) |
| --- | --- |
| `@google/genai` | dependency |
| `@tailwindcss/vite` | dependency |
| `@types/express` | dependency |
| `@types/node` | dependency |
| `@vitejs/plugin-react` | dependency |
| `autoprefixer` | dependency |
| `dotenv` | dependency |
| `esbuild` | esbuild |
| `express` | Express |
| `framer-motion` | dependency |
| `lucide-react` | dependency |
| `motion` | dependency |
| `react` | React |
| `react-dom` | React |
| `react-markdown` | dependency |
| `tailwindcss` | Tailwind CSS |
| `tsx` | dependency |
| `typescript` | dependency |
| `vite` | Vite |

## Runtime and delivery

| Concern | Finding |
| --- | --- |
| Language mix | TypeScript, HTML, CSS |
| Package manager | npm |
| Container | none |
| Serverless / PaaS | not configured for Vercel |
| CI | none detected |
| Tests | **none detected** |
| Type safety | TypeScript |

## Environment variables referenced

- `DISABLE_HMR`
- `GEMINI_API_KEY`
- `NODE_ENV`
- `PORT`
