# ADR-0007: In-memory state, no database

- **Status:** Accepted
- **Date:** 2026-11-13
- **Deciders:** project team

## Context

The subject asks for play without accounts, minimal data, several rooms in parallel on one server, and automatic closing of inactive rooms. Persistent history and accounts are optional bonuses only.

## Options considered

1. **In-memory structures in the Node process.** Fastest, no infrastructure, matches the "minimal data" rule.
2. **Redis or a database.** Allows several server instances and persistence, but adds infrastructure, cost and setup for a need we do not have.

## Decision

Rooms, players and scores live in memory in a single server process (a `Map` of rooms with a lifecycle: created, open, in game, closing). Idle rooms are closed by a timer. No database for now.

## Consequences

- Nothing personal is stored; a server restart ends all rooms (acceptable for this project).
- The server runs as a single instance; horizontal scaling would need a shared store and is out of scope. Load tests will document how far one instance goes.
- If we later implement optional accounts and history (bonus), we will add a database with a new ADR.
