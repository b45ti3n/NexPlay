# ADR-0006: Game isolation with a sandboxed iframe and the SDK

- **Status:** Accepted
- **Date:** 2026-11-13
- **Deciders:** project team

## Context

Games are packages with a manifest and must be added without modifying the platform. A game that crashes or freezes must be stopped, and players must return to the lobby without losing the room. The SDK is the only link between a game and the console; it is not a game engine.

## Options considered

1. **Load games as modules in the console page.** Simple, but one game bug can freeze or break the whole console and there is no isolation.
2. **Web Worker per game.** Good isolation, but no DOM access, which does not fit Phaser or DOM-based games.
3. **Sandboxed `<iframe>` per game, communicating through `postMessage`.** Own document and DOM, can be removed at any time, and enforces a clear API boundary.

## Decision

Each game is built as a standalone web page under `games/<id>/` with a `manifest.json` validated by the schema in `packages/protocol`. The console loads it in an `<iframe sandbox="allow-scripts">` (no `allow-same-origin`). The game talks to the console only through `packages/sdk-screen`, which wraps `postMessage`. The SDK sends a heartbeat; if it stops, the console removes the iframe and returns to the lobby.

The catalog is generated at build time by scanning `games/*/manifest.json`, so adding a game is adding a folder.

## Consequences

- A crashed or frozen game (including an infinite loop, which stops the heartbeat) is detected and killed without affecting the room.
- The game cannot access the console's DOM, storage or network credentials.
- Constraint to remember: without `allow-same-origin` the game runs with an opaque origin, so it cannot use `localStorage`, and loading assets with `fetch` needs CORS headers (or inlined assets). We must test this early with the first game.
- The SDK API must be explicit and small, since it is the only channel.
