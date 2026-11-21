export * from "./errors.js";
export * from "./room.js";

import type { Ack } from "./errors.js";
import type { A11yPrefs } from "./room.js";

export type PlayerId = string;
export type SlotIndex = 0 | 1 | 2 | 3;
export type RoomPhase = "lobby" | "playing" | "paused" | "ended";

export type Player = {
  id: PlayerId;
  slot: SlotIndex;
  nickname: string;
  avatarId: string;
  connected: boolean;
  isHost: boolean;
  a11y: A11yPrefs;
};

export type RoomState = {
  rev: number;
  code: string;
  phase: RoomPhase;
  hostId: PlayerId | null;
  selectedGameId: string | null;
  game: { id: string; startedAt: number } | null;
  players: Player[];
  results: { playerId: PlayerId; score: number; rank: number }[] | null;
  notice: "GAME_CRASHED" | null;
};

export interface ClientToServerEvents {
  "room:create": (
    payload: unknown,
    cb: (
      res: Ack<{ code: string; consoleToken: string; state: RoomState }>,
    ) => void,
  ) => void;

  "room:resume": (
    payload: unknown,
    cb: (res: Ack<{ state: RoomState }>) => void,
  ) => void;

  "room:join": (
    payload: unknown,
    cb: (
      res: Ack<{
        playerId: PlayerId;
        token: string;
        slot: SlotIndex;
        state: RoomState;
        layout: unknown | null;
        layoutRev: number;
      }>,
    ) => void,
  ) => void;

  "room:leave": (payload: unknown, cb: (res: Ack) => void) => void;

  "room:close": (payload: unknown, cb: (res: Ack) => void) => void;
}

export interface ServerToClientEvents {
  "room:state": (state: RoomState) => void;
  "room:closed": (reason: { reason: string }) => void;
  error: (err: { code: string; message: string; details?: unknown }) => void;
}
