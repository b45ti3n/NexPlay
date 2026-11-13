# ADR-0004: Web front end: one Vite + React app

- **Status:** Accepted
- **Date:** 2026-11-13
- **Deciders:** project team

## Context

We need a console (TV browser), a phone controller (Safari iOS and Chrome Android, no install) and a developer simulator. All three need accessible, semantic HTML (WCAG 2.2 AA) and must be quick to build and test.

## Options considered

1. **React + Vite.** Most familiar, large ecosystem, good tooling for tests and accessibility checks.
2. **Preact + Vite.** Much smaller bundle, nearly the same API, but fewer resources and some compatibility edge cases. The size gain is small for this app.
3. **Svelte + Vite.** Light and pleasant, but less familiar to the team.
4. **Vanilla TypeScript.** No framework cost, but dynamic controller rendering and accessible forms would take longer to build.

## Decision

One **Vite + React 18** application with three routes: `/console`, `/pad` (controller) and `/dev` (simulator). Joystick and button input is handled with Pointer Events and refs, outside the React render cycle, to protect latency. Switching to Preact stays possible later through `preact/compat` if bundle size becomes a measured problem.

## Consequences

- A single build and a single deployment for console, controller and simulator.
- The simulator can embed the real controller route, so it tests what phones actually run.
- Games are **not** part of this app (see ADR-0006); they have their own builds.
- Bundle size is larger than with Preact; accepted until Lighthouse says otherwise.
