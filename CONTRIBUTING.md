# Contributing Guide

## Commit Messages

Format: `type(scope): short description`
Types: feat, fix, chore, docs, refactor, test, perf, build, ci, revert

## Pull Requests

- Keep PRs focused (scoped to one logical change)
- Include rationale & screenshots (if UI)
- Ensure: lint passes, typecheck passes, tests added/updated

## Branch Naming

`feat/<area>-<summary>` | `chore/<area>-<summary>` | `fix/<area>-<summary>`

## Adding Dependencies

Run `pnpm add <pkg> -w` for root dev tooling or `pnpm add <pkg> --filter <workspace>`.

## Tests

`pnpm test` runs all; add spec files beside implementation.

## Code Style

Enforced by ESLint + Prettier. No unused imports (auto-removed on commit).

## Architectural Changes

Propose via ADR draft in `docs/adr/` with incremental number.

## Security

Never commit secrets. Use `.env.example` for new variables and document purpose.
