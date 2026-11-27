import { z } from "zod";
import { BUTTON_STATES, DPAD_DIRECTIONS, LIMITS } from "../constants.js";

const InputBaseSchema = z.object({
  lr: z.int().nonnegative(),
  seq: z.int().nonnegative(),
  t: z.number().nonnegative(),
  c: z.string().min(1).max(32),
});

export const ButtonInputSchema = InputBaseSchema.extend({
  type: z.literal("button"),
  state: z.enum(BUTTON_STATES),
});

export const DpadInputSchema = InputBaseSchema.extend({
  type: z.literal("dpad"),
  dir: z.enum(DPAD_DIRECTIONS),
});

export const JoystickInputSchema = InputBaseSchema.extend({
  type: z.literal("joystick"),
  x: z.number().min(-1).max(1),
  y: z.number().min(-1).max(1),
});

export const TextInputSchema = InputBaseSchema.extend({
  type: z.literal("text"),
  value: z.string().max(LIMITS.maxTextLength),
});

export const ChoiceInputSchema = InputBaseSchema.extend({
  type: z.literal("choice"),
  selected: z.array(z.string().min(1)).max(LIMITS.maxChoiceOptions),
});

export const InputPayloadSchema = z.discriminatedUnion("type", [
  ButtonInputSchema,
  DpadInputSchema,
  JoystickInputSchema,
  TextInputSchema,
  ChoiceInputSchema,
]);
export type InputPayload = z.infer<typeof InputPayloadSchema>;
