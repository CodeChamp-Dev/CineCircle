# Product Overview

## Problem

People forget or lose personal movie recommendations across chats and apps.

## Solution

CineCircle creates a trusted layer for direct or thematic (Cineboard) recommendations between friends.

## Core Value Proposition

Higher follow-through and engagement vs passive algorithmic feeds.

## Target Users

- Movie-curious casual viewers
- Enthusiast sharers / curators
- Small friend circles planning what to watch

## Differentiators

- Personal trust graph
- Multi-movie curated “Cineboards” with a message/context
- Watchlist auto-populates from received recommendations

---

## Monorepo Structure

apps/api - Nest.js (Fastify) backend (REST `/api` prefix)
apps/web - Next.js frontend (App Router)
packages/config - Tailwind preset & design tokens
packages/types - Shared domain types
packages/ui - Shared React components

## Roadmap (Condensed)

Phase 1: Auth, Friend Graph, Recommendations, Cineboards, Watchlist
Phase 2: Taste Profiles, Favorites, Groups, Availability, Ratings, Diary
Phase 3: Gamification, Chat, Advanced Notifications, Real-time

## Documentation

`LEARN.md` quick onboarding
`CONTRIBUTING.md` workflow & conventions
`docs/architecture.md` high-level design
`docs/adr/` decision records

## License

MIT
