# ADR-0002: TypeScript everywhere in a pnpm monorepo

- **Status:** Accepted
- **Date:** 2026-11-13
- **Deciders:** project team

## Context

The platform has four parts that must agree on one protocol: the realtime server, the console, the phone controller and the SDK (screen and controller sides). We are two developers working one or two days a week until the end of February, so setup time and integration bugs are the main risks. The stack is free but must be justified.

## Options considered

1. **TypeScript for everything, one monorepo (pnpm workspaces).** One language, shared types and schemas, one lockfile, one CI.
2. **C++ server + TypeScript front end.** Fits our curriculum background, but the protocol would be duplicated in two languages, WebSocket and room logic take longer, and the build and deploy pipeline is heavier.
3. **Several repositories (one per component).** Cleaner separation, but versioning the shared protocol across repos is painful for a short project.

## Decision

TypeScript (strict mode) for all code, in a single repository managed with **pnpm workspaces** and **Node.js 22 LTS**. No additional monorepo tool (Turborepo, Nx) at this stage.

Layout:

```
apps/server  apps/web  packages/protocol  packages/sdk-screen
packages/sdk-controller  games/  tools/  docs/
```

## Consequences

- Message types and layouts are defined once in `packages/protocol` and used by every component.
- One `pnpm install` and one lockfile give the "installation documented step by step" requirement an easy path.
- pnpm must be installed (`corepack enable` is enough); documented in the README.
- If build times become a problem, we can add a task runner later without changing the structure.
