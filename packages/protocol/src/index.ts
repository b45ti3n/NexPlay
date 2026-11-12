import { z } from "zod";

export const PROTOCOL_VERSION = 1;

export const Envelope = z.object({
  v: z.literal(PROTOCOL_VERSION),
  t: z.string().min(1).max(64),
  ts: z.number(),
  seq: z.number().int().nonnegative().optional(),
  p: z.unknown(),
});

export type Envelope = z.infer<typeof Envelope>;
