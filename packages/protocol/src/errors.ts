import { z } from "zod";

export const ErrorCodeSchema = z.enum([
  "INVALID_MESSAGE",
  "VERSION_MISMATCH",
  "ROOM_NOT_FOUND",
  "ROOM_FULL",
  "NICKNAME_INVALID",
  "NICKNAME_TAKEN",
  "UNKNOWN_TOKEN",
  "NOT_HOST",
  "NOT_ALLOWED",
  "GAME_NOT_FOUND",
  "NOT_ENOUGH_PLAYERS",
  "TOO_MANY_PLAYERS",
  "RATE_LIMITED",
  "REPLACED",
]);

export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

export const ProtocolErrorSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string(),
  details: z.unknown().optional(),
});

export type ProtocolError = z.infer<typeof ProtocolErrorSchema>;

export type Ack<T> =
  | { ok: true; data: T }
  | { ok: false; error: ProtocolError };

// export function createAckSchema<T extends z.ZodType>(dataSchema: T) {
//   return z.discriminatedUnion("ok", [
//     z.object({ ok: z.literal(true), data: dataSchema }),
//     z.object({ ok: z.literal(false), error: ProtocolErrorSchema }),
//   ]);
// }
