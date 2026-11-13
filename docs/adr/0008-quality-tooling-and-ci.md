# ADR-0008: Quality tooling and CI

- **Status:** Accepted
- **Date:** 2026-11-13
- **Deciders:** project team

## Context
Quality requirements are mandatory: linter and formatter applied automatically, common commit convention, tests runnable with one command, end-to-end test with emulated mobile browsers, accessibility audit, and a CI pipeline that blocks merges when it fails.

## Options considered
- **Lint and format:** ESLint + Prettier (standard, two tools and more config) or **Biome** (one fast tool, little config).
- **Unit tests:** Jest or **Vitest** (native to Vite and TypeScript, fast).
- **End-to-end:** Cypress or **Playwright** (multiple browser contexts in one test and built-in mobile device emulation, which fits one console plus several phones).
- **CI:** **GitHub Actions** (repository is on GitHub, required checks on the protected branch).
- **Commits:** Conventional Commits enforced with commitlint, run by a lightweight hook manager (lefthook) or in CI.

## Decision
- Biome for lint and format.
- Vitest for unit and integration tests; Playwright for end-to-end tests, with `@axe-core/playwright` for automatic accessibility checks.
- GitHub Actions workflow on every pull request: install (frozen lockfile), lint, typecheck, unit tests, end-to-end tests, build. These checks are required on the protected main branch.
- Conventional Commits, checked by commitlint; pull requests linked to an issue and reviewed before merge.
- `pnpm test` runs the complete test suite with one command.

## Consequences
- Few tools to learn and configure, which keeps Suivi 1 achievable.
- Biome's accessibility lint coverage is narrower than dedicated ESLint plugins; automated axe checks and manual screen-reader tests compensate and are required anyway.
- Continuous deployment and load tests will be added in later steps (hosting choice to be recorded in a future ADR).
