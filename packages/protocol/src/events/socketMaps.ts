import type { Ack, ProtocolError } from "../errors.js";
import type {
  PlayerId,
  RoomCode,
  SecretToken,
  Slot,
} from "../models/identifiers.js";
import type { InputPayload } from "../models/input.js";
import type { Layout } from "../models/layout.js";
import type { RoomState } from "../models/room.js";
import type {
  GameEndPayload,
  HapticSendPayload,
  HostCommand,
  PadLayoutSendPayload,
  PlayerUpdatePayload,
  PrivateSendPayload,
  RoomJoinPayload,
  RoomResumePayload,
  RttPingPayload,
} from "./clientToServer.js";
import type {
  HapticReceivePayload,
  InputEvent,
  KickedPayload,
  PadLayoutReceivePayload,
  PrivateMessagePayload,
  RoomClosedPayload,
} from "./serverToClient.js";

export type RoomCreateAckData = {
  code: RoomCode;
  consoleToken: SecretToken;
  state: RoomState;
};

export type RoomResumeAckData = {
  state: RoomState;
};

export type RoomJoinAckData = {
  playerId: PlayerId;
  token: SecretToken;
  slot: Slot;
  state: RoomState;
  layout: Layout | null;
  layoutRev: number;
};

export type PlayerUpdateAckData = {
  state: RoomState;
};

export type PadLayoutAckData = {
  delivered: PlayerId[];
};

export type RttPingAckData = {
  st: number;
};

export interface ClientToServerEvents {
  "room:create": (
    payload: Record<string, never>,
    ack: (res: Ack<RoomCreateAckData>) => void,
  ) => void;
  "room:resume": (
    payload: RoomResumePayload,
    ack: (res: Ack<RoomResumeAckData>) => void,
  ) => void;
  "room:close": (
    payload: Record<string, never>,
    ack: (res: Ack<Record<string, never>>) => void,
  ) => void;
  "room:join": (
    payload: RoomJoinPayload,
    ack: (res: Ack<RoomJoinAckData>) => void,
  ) => void;
  "room:leave": (
    payload: Record<string, never>,
    ack: (res: Ack<Record<string, never>>) => void,
  ) => void;
  "player:update": (
    payload: PlayerUpdatePayload,
    ack: (res: Ack<PlayerUpdateAckData>) => void,
  ) => void;
  "host:command": (
    payload: HostCommand,
    ack: (res: Ack<Record<string, never>>) => void,
  ) => void;
  "pad:layout": (
    payload: PadLayoutSendPayload,
    ack: (res: Ack<PadLayoutAckData>) => void,
  ) => void;
  "private:send": (payload: PrivateSendPayload) => void;
  "haptic:send": (payload: HapticSendPayload) => void;
  "game:end": (
    payload: GameEndPayload,
    ack: (res: Ack<Record<string, never>>) => void,
  ) => void;
  "game:crashed": (payload: Record<string, never>) => void;
  input: (payload: InputPayload) => void;
  "rtt:ping": (
    payload: RttPingPayload,
    ack: (res: Ack<RttPingAckData>) => void,
  ) => void;
}

export interface ServerToClientEvents {
  "room:state": (state: RoomState) => void;
  "room:closed": (payload: RoomClosedPayload) => void;
  "pad:layout": (payload: PadLayoutReceivePayload) => void;
  "private:message": (payload: PrivateMessagePayload) => void;
  haptic: (payload: HapticReceivePayload) => void;
  "input:event": (event: InputEvent) => void;
  kicked: (payload: KickedPayload) => void;
  error: (error: ProtocolError) => void;
}
