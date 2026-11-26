import { z } from "zod";
import { AVATAR_IDS, LIMITS, ROOM_PHASES } from "../constants.js";
import { PlayerIdSchema, RoomCodeSchema, SlotSchema } from "./identifiers.js";

export const RoomPhaseSchema = z.enum(ROOM_PHASES);
export type RoomPhase = z.infer<typeof RoomPhaseSchema>;

export const AvatarIdSchema = z.enum(AVATAR_IDS);
export type AvatarId = z.infer<typeof AvatarIdSchema>;

export const NicknameSchema = z
  .string()
  .trim()
  .min(LIMITS.nicknameMin)
  .max(LIMITS.nicknameMax)
  .regex(/^[a-zA-Z0-9 _-]+$/, "Nickname contains invalid characters");

export const A11yPrefsSchema = z.object({
  largeText: z.boolean(),
  reduceFlashing: z.boolean(),
  noVibration: z.boolean(),
});
export type A11yPrefs = z.infer<typeof A11yPrefsSchema>;

export const PlayerSchema = z.object({
  id: PlayerIdSchema,
  slot: SlotSchema,
  nickname: NicknameSchema,
  avatarId: AvatarIdSchema,
  connected: z.boolean(),
  isHost: z.boolean(),
  a11y: A11yPrefsSchema,
});
export type Player = z.infer<typeof PlayerSchema>;

export const GameResultSchema = z.object({
  playerId: PlayerIdSchema,
  score: z.number(),
  rank: z.int().min(1),
});
export type GameResult = z.infer<typeof GameResultSchema>;

export const RoomStateSchema = z.object({
  rev: z.int().nonnegative(),
  code: RoomCodeSchema,
  phase: RoomPhaseSchema,
  hostId: PlayerIdSchema,
  selectedGameId: z.string().nullable(),
  game: z
    .object({
      id: z.string(),
      startedAt: z.number(),
    })
    .nullable(),
  players: z.array(PlayerSchema),
  results: z.array(GameResultSchema).nullable(),
  notice: z.literal("GAME_CRASHED").nullable(),
});
export type RoomState = z.infer<typeof RoomStateSchema>;
