import { z } from "zod";
import { ROOM_CODE_ALPHABET, ROOM_CODE_LENGTH } from "../constants.js";

const roomCodeRegex = new RegExp(
  `^[${ROOM_CODE_ALPHABET}]{${ROOM_CODE_LENGTH}}$`,
);

export const RoomCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(
    roomCodeRegex,
    `Room code must be ${ROOM_CODE_LENGTH} valid characters`,
  );

export type RoomCode = z.infer<typeof RoomCodeSchema>;

export const PlayerIdSchema = z.string().regex(/^p_[a-z0-9]{2,16}$/);
export type PlayerId = z.infer<typeof PlayerIdSchema>;

export const SlotSchema = z.int().min(0).max(3);
export type Slot = z.infer<typeof SlotSchema>;

export const SecretTokenSchema = z.string().min(16).max(128);
export type SecretToken = z.infer<typeof SecretTokenSchema>;
