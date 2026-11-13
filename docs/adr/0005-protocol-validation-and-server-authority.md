# ADR-0005: Shared protocol, Zod validation and server authority

- **Status:** Accepted
- **Date:** 2026-11-13
- **Deciders:** project team

## Context

The subject requires that the server validates player actions to prevent cheating by a modified client, limits message rates, uses hard-to-guess room codes, and lets a player recover their seat after a disconnection. Game logic runs in the game on the console, so we must define precisely what "server authority" covers.

## Options considered

1. **TypeScript types only.** Compile-time safety, but nothing checks messages coming from a modified client at runtime.
2. **Zod schemas shared between all components.** Runtime validation plus inferred TypeScript types from one source.
3. **Full server-side game simulation.** Strongest authority, but every game would have to run on the server, which conflicts with the SDK model (games are standalone packages loaded by the console).

## Decision

All messages, controller layouts and game manifests are defined as **Zod schemas in `packages/protocol`**. The server parses every incoming message and rejects anything invalid.

Server authority means the server guarantees platform-level rules:

- a player can only send inputs for components in their **currently active layout**, with values clamped to the component's range (e.g. joystick vector length ≤ 1);
- per-socket **rate limiting** (token bucket) and rate limiting of join attempts;
- only the host can start a game or kick a player; players cannot send messages as another player;
- player texts and nicknames are filtered before being forwarded.

Other decisions:

- **Room codes:** 5 characters from an alphabet without ambiguous letters, generated with `crypto.randomInt`.
- **Reconnection:** the server issues a random `playerId` token on join; the phone stores it and sends it back to reclaim its seat within a grace period.
- **Latency:** messages carry a client timestamp; `ping/pong` is used to measure and display latency in developer mode.

## Consequences

- The protocol is documented once, from the schemas, and cannot drift between components.
- A cheating client can send only valid inputs, at a limited rate; it cannot invent controls or impersonate players. Game state itself is computed by the game on the console, and we state this limit honestly in the documentation.
- Every new message type needs a schema and a test.
