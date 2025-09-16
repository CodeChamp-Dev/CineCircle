# ADR-0001: Monorepo Structure

Date: 2025-09-15
Status: Accepted

## Context

CineCircle is an early-stage platform emphasizing a trust-based movie recommendation graph. We need rapid iteration across frontend (Next.js) and backend (Nest.js) while sharing design tokens, types, and UI primitives. A monorepo improves velocity, consistency, and refactor safety in this phase.

## Decision

Adopt a pnpm-based TypeScript monorepo containing:

- apps/api (Nest.js with Fastify)
- apps/web (Next.js App Router)
- packages/config (design system + Tailwind preset)
- packages/types (domain model contracts)
- packages/ui (shared React components)

Tooling: pnpm workspaces, ts-jest, ESLint + Prettier, Tailwind CSS, Husky + commitlint + lint-staged.

## Alternatives Considered

1. Multiple repositories: Higher coordination overhead, premature optimization.
2. Nx/Turborepo: Adds caching/graph features but unnecessary until build times or orchestration become pain points.
3. Yarn/Bun: pnpm chosen for disk efficiency and speed; ecosystem maturity adequate.

## Consequences

Positive:

- Atomic refactors across layers.
- Single source of truth for domain types/design tokens.
- Simplifies onboarding (one clone).

Negative / Risks:

- CI needs pruning to avoid running unrelated tasks later.
- Potential future need for build caching (can layer Turborepo/Nx later without structural rewrite).

## Follow-Up

- Revisit build caching once test suite durations > 2m or build > 60s.
- Evaluate extraction of data/processing services if domain boundaries firm up.
