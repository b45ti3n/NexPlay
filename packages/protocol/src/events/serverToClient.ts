import { z } from "zod";
import { ProtocolErrorSchema } from "../errors.js";
import { PlayerIdSchema } from "../models/identifiers.js";
import { InputPayloadSchema } from "../models/input.js";
import { LayoutSchema } from "../models/layout.js";
import { RoomStateSchema } from "../models/room.js";
import { HapticPatternSchema, HapticPresetSchema } from "./clientToServer.js";

export const RoomClosedPayloadSchema = z.object({
  reason: z.string().optional(),
});
export type RoomClosedPayload = z.infer<typeof RoomClosedPayloadSchema>;

export const PadLayoutReceivePayloadSchema = z.object({
  layout: LayoutSchema,
  layoutRev: z.number().int().nonnegative(),
});
export type PadLayoutReceivePayload = z.infer<
  typeof PadLayoutReceivePayloadSchema
>;

export const PrivateMessagePayloadSchema = z.object({
  title: z.string().optional(),
  text: z.string(),
});
export type PrivateMessagePayload = z.infer<typeof PrivateMessagePayloadSchema>;

export const HapticReceivePayloadSchema = z.union([
  z.object({ pattern: HapticPatternSchema }),
  z.object({ preset: HapticPresetSchema }),
]);
export type HapticReceivePayload = z.infer<typeof HapticReceivePayloadSchema>;

export const InputEventSchema = InputPayloadSchema.and(
  z.object({
    playerId: PlayerIdSchema,
    st: z.number().nonnegative(),
    filtered: z.boolean().optional(),
  }),
);
export type InputEvent = z.infer<typeof InputEventSchema>;

export const KickedPayloadSchema = z.object({
  reason: z.string().optional(),
});
export type KickedPayload = z.infer<typeof KickedPayloadSchema>;

export const S2C_SCHEMAS = {
  "room:state": RoomStateSchema,
  "room:closed": RoomClosedPayloadSchema,
  "pad:layout": PadLayoutReceivePayloadSchema,
  "private:message": PrivateMessagePayloadSchema,
  haptic: HapticReceivePayloadSchema,
  "input:event": InputEventSchema,
  kicked: KickedPayloadSchema,
  error: ProtocolErrorSchema,
} as const;

export type ServerToClientEventName = keyof typeof S2C_SCHEMAS;
