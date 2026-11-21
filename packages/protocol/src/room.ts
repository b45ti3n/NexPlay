import { z } from "zod";

export const RoomCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{5}$/, "Invalid room code format");

export const HandshakeAuthSchema = z.object({
  v: z.literal(1),
  role: z.enum(["console", "pad"]),
});

export const A11yPrefsSchema = z.object({
  largeText: z.boolean().default(false),
  reduceFlashing: z.boolean().default(false),
  noVibration: z.boolean().default(false),
});
export type A11yPrefs = z.infer<typeof A11yPrefsSchema>;

export const RoomCreatePayloadSchema = z.object({}).strict();

export const RoomResumePayloadSchema = z.object({
  code: RoomCodeSchema,
  consoleToken: z.string().min(1),
});

export const RoomJoinNewSchema = z.object({
  code: RoomCodeSchema,
  nickname: z
    .string()
    .trim()
    .min(1)
    .max(16)
    .regex(/^[a-zA-Z0-9 _-]+$/, "Nickname contains invalid characters"),
  avatarId: z.string().regex(/^avatar-(0[1-9]|1[0-2])$/),
  a11y: A11yPrefsSchema.default({
    largeText: false,
    reduceFlashing: false,
    noVibration: false,
  }),
});

export const RoomJoinReconnectSchema = z.object({
  code: RoomCodeSchema,
  token: z.string().min(1),
});

export const RoomJoinPayloadSchema = z.union([
  RoomJoinReconnectSchema,
  RoomJoinNewSchema,
]);

export const RoomLeavePayloadSchema = z.object({}).strict();
export const RoomClosePayloadSchema = z.object({}).strict();

export type RoomResumePayload = z.infer<typeof RoomResumePayloadSchema>;
export type RoomJoinPayload = z.infer<typeof RoomJoinPayloadSchema>;
