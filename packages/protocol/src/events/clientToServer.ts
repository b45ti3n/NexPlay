import { z } from "zod";
import { HAPTIC_PRESETS, LIMITS } from "../constants.js";
import {
  PlayerIdSchema,
  RoomCodeSchema,
  SecretTokenSchema,
} from "../models/identifiers.js";
import { InputPayloadSchema } from "../models/input.js";
import { LayoutSchema } from "../models/layout.js";
import {
  A11yPrefsSchema,
  AvatarIdSchema,
  NicknameSchema,
} from "../models/room.js";

export const EmptyPayloadSchema = z.object({}).strict();

export const RoomResumePayloadSchema = z.object({
  code: RoomCodeSchema,
  consoleToken: SecretTokenSchema,
});
export type RoomResumePayload = z.infer<typeof RoomResumePayloadSchema>;

export const RoomJoinPayloadSchema = z.object({
  code: RoomCodeSchema,
  nickname: NicknameSchema,
  avatarId: AvatarIdSchema,
  a11y: A11yPrefsSchema,
  token: SecretTokenSchema.optional(),
});
export type RoomJoinPayload = z.infer<typeof RoomJoinPayloadSchema>;

export const PlayerUpdatePayloadSchema = z.object({
  nickname: NicknameSchema.optional(),
  avatarId: AvatarIdSchema.optional(),
  a11y: A11yPrefsSchema.partial().optional(),
});
export type PlayerUpdatePayload = z.infer<typeof PlayerUpdatePayloadSchema>;

export const HostCommandSchema = z.discriminatedUnion("cmd", [
  z.object({ cmd: z.literal("selectGame"), gameId: z.string().min(1) }),
  z.object({ cmd: z.literal("start") }),
  z.object({ cmd: z.literal("kick"), playerId: PlayerIdSchema }),
  z.object({ cmd: z.literal("pause") }),
  z.object({ cmd: z.literal("resume") }),
  z.object({ cmd: z.literal("replay") }),
  z.object({ cmd: z.literal("backToLobby") }),
]);
export type HostCommand = z.infer<typeof HostCommandSchema>;

export const PadLayoutSendPayloadSchema = z.object({
  target: z.union([z.literal("all"), z.array(PlayerIdSchema).min(1)]),
  layout: LayoutSchema,
});
export type PadLayoutSendPayload = z.infer<typeof PadLayoutSendPayloadSchema>;

export const PrivateSendPayloadSchema = z.object({
  to: PlayerIdSchema,
  title: z.string().max(64).optional(),
  text: z.string().min(1).max(LIMITS.maxPrivateMsgLength),
});
export type PrivateSendPayload = z.infer<typeof PrivateSendPayloadSchema>;

export const HapticPresetSchema = z.enum(HAPTIC_PRESETS);
export type HapticPreset = z.infer<typeof HapticPresetSchema>;

export const HapticPatternSchema = z
  .array(z.int().min(0).max(LIMITS.hapticMaxStepMs))
  .min(1)
  .max(LIMITS.hapticMaxEntries)
  .refine(
    (arr) => arr.reduce((sum, n) => sum + n, 0) <= LIMITS.hapticMaxTotalMs,
    `Total haptic duration cannot exceed ${LIMITS.hapticMaxTotalMs}ms`,
  );

export const HapticSendPayloadSchema = z.union([
  z.object({ to: PlayerIdSchema, pattern: HapticPatternSchema }),
  z.object({ to: PlayerIdSchema, preset: HapticPresetSchema }),
]);
export type HapticSendPayload = z.infer<typeof HapticSendPayloadSchema>;

export const GameEndPayloadSchema = z.object({
  scores: z.array(
    z.object({
      playerId: PlayerIdSchema,
      score: z.number(),
    }),
  ),
});
export type GameEndPayload = z.infer<typeof GameEndPayloadSchema>;

export const RttPingPayloadSchema = z.object({
  t: z.number().nonnegative(),
});
export type RttPingPayload = z.infer<typeof RttPingPayloadSchema>;

export const C2S_SCHEMAS = {
  "room:create": EmptyPayloadSchema,
  "room:resume": RoomResumePayloadSchema,
  "room:close": EmptyPayloadSchema,
  "room:join": RoomJoinPayloadSchema,
  "room:leave": EmptyPayloadSchema,
  "player:update": PlayerUpdatePayloadSchema,
  "host:command": HostCommandSchema,
  "pad:layout": PadLayoutSendPayloadSchema,
  "private:send": PrivateSendPayloadSchema,
  "haptic:send": HapticSendPayloadSchema,
  "game:end": GameEndPayloadSchema,
  "game:crashed": EmptyPayloadSchema,
  input: InputPayloadSchema,
  "rtt:ping": RttPingPayloadSchema,
} as const;

export type ClientToServerEventName = keyof typeof C2S_SCHEMAS;
