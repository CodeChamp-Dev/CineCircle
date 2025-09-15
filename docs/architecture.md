# Architecture Overview (Early Draft)

## Goals
1. Personal trust-based recommendation network (human, not algorithmic black box)
2. Rapid iteration on social + curation primitives
3. Clear domain boundaries to evolve into services later

## High-Level Components
Web (Next.js) -> API (Nest.js) -> Persistence (future: Postgres + DynamoDB/Cassandra). External APIs: TMDB (Phase 1), JustWatch + ratings (Phase 2).

## Request Flow (Example: Health Check)
Browser -> Next.js fetch(`/api/health`) -> Fastify adapter -> Nest HealthModule -> Response (status, uptime, version).

## Module Strategy (Planned)
AuthModule, UsersModule, RecommendationsModule, CineboardsModule, WatchlistModule.
Each module: controller (DTO validation), service (business logic), repository (data access abstraction for future DB split).

## Shared Libraries
config: Tailwind tokens unify brand & theming.
types: Domain contracts, future validators (e.g., Zod) may co-reside.
ui: Headless/primitive React components (e.g., Container, Button later).

## Evolution Path
Phase 1: Monolith with clear module seams.
Phase 2: Add analytics pipeline (async queues) + enrich taste identity.
Phase 3: Real-time channels (WebSocket/SSE) + gamification & notifications.

## Non-Goals (Now)
- Microservices
- Full CQRS/Event Sourcing complexity
- GraphQL (REST first; revisit if consumer complexity rises)

## Cross-Cutting Concerns (Planned)
Observability: structured logging, request IDs, basic metrics (uptime, latency) — to add ahead of first beta.
Security: input validation (class-validator), rate limiting at Fastify layer, auth via Cognito/OAuth.
Caching: TMDB responses persisted with TTL; watchlist hydration eventually backgrounded.
