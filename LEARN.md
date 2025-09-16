# LEARN: CineCircle Developer Onboarding

Welcome! This guide gets you productive fast.

## 1. Mental Model

Core loop: A user recommends a movie (with context) -> recipient’s watchlist auto-populates -> feedback & social discovery reinforce trust graph.

## 2. Repository Layout

apps/api - Nest.js backend (Fastify) exposing REST under /api
apps/web - Next.js App Router frontend
packages/config - Tailwind preset & design tokens
packages/types - Domain interfaces (Recommendation, Cineboard, UserProfile)
packages/ui - Shared React components

## 3. First Run

1. Install pnpm: `corepack enable` (Node 18+). Or `npm i -g pnpm`.
2. Install deps: `pnpm install`.
3. Start dev: `pnpm dev` (runs api + web concurrently).
4. Visit web: http://localhost:3000 | API health: http://localhost:3001/api/health (default expected ports once configured).

## 4. Scripts Cheat Sheet

`pnpm dev` - run api + web
`pnpm lint` - ESLint (no warnings allowed)
`pnpm typecheck` - Types only
`pnpm build` - Build all workspaces
`pnpm test` - Jest (node + jsdom projects)

## 5. Tech Stack Highlights

Frontend: Next.js (app dir), Tailwind (shared preset), dark mode via class toggle.
Backend: Nest.js (Fastify), modular architecture (domain modules upcoming).
Design System: Central preset -> stable tokens early to avoid drift.
Testing: Jest + Testing Library + ts-jest.
Quality Gates: Husky pre-commit (lint-staged), commitlint conventional format.

## 6. Domain Primitives (Early)

Recommendation: who recommended what, to whom, why (note), when.
Cineboard: curated themed list with context.
UserProfile: taste identity scaffolding (genres, favorites) — future fields.

## 7. Adding a Package

1. Create folder under packages/
2. Add package.json with name @cinecircle/<pkg>
3. Export from index.ts
4. Reference via path alias in tsconfig.base.json if needed
5. Run `pnpm install` to refresh lock graph

## 8. Coding Conventions

TypeScript strictness: enforced centrally.
Imports: Use path aliases for internal boundaries.
Styling: Only Tailwind utility + tokens; avoid ad-hoc colors.
Commits: `type(scope): message` (e.g., `feat(api): add recommendation POST`).

## 9. Future Data Stores

PostgreSQL (relational core), DynamoDB/Cassandra (graph & analytics) — not yet implemented.

## 10. Gotchas

Missing deps? Run `pnpm install` first — scaffolds add references before packages exist.
Jest failures on first run? Ensure Node version matches `.nvmrc`.

## 11. Need Help?

Add questions to DISCUSSIONS or open a docs improvement PR.
