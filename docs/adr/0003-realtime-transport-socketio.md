# ADR-0003: Realtime transport: Socket.IO over WebSocket

- **Status:** Accepted
- **Date:** 2026-11-13
- **Deciders:** project team

## Context

Console and phones must exchange messages continuously, with a target under 100 ms between a button press and the on-screen reaction on a local network. We need rooms, up to 4 players per room, several rooms in parallel, reconnection after phone sleep or network loss, and automatic cleanup of idle rooms.

## Options considered

1. **Raw WebSocket (`ws`).** Smallest overhead and full control, but we must implement heartbeats, reconnection and rooms ourselves.
2. **Socket.IO.** Rooms, acknowledgements, heartbeats and client auto-reconnect included. Larger client, and a thin protocol layer on top of WebSocket.
3. **Colyseus.** Complete room framework with reconnection, but opinionated (state synchronization model) and it would hide part of the protocol the subject asks us to design and document.
4. **WebRTC data channels.** Possibly lower latency, but needs signaling, STUN/TURN and NAT handling. Too much work for no needed gain on a local network.

## Decision

Use **Socket.IO**, restricted to the **WebSocket transport** (no HTTP long-polling fallback). Rooms are our own concept stored server-side; Socket.IO rooms are used only for broadcasting inside them. Seat recovery uses our own `playerId` token (see ADR-0005), not Socket.IO's connection state recovery.

## Consequences

- Rooms, heartbeats and reconnect attempts come almost for free, so we spend time on the platform instead of the plumbing.
- Disabling long-polling avoids sticky-session issues on hosting, but a network that blocks WebSocket will not work (acceptable for the demo).
- Latency is measured by our own ping/pong messages and displayed in developer mode.
- We depend on Socket.IO's wire format; leaving it later would mean rewriting the transport layer only, as the message schemas stay in `packages/protocol`.
