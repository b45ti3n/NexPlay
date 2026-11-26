import { z } from "zod";
import { LAYOUT_ORIENTATIONS, LIMITS } from "../constants.js";

const ComponentBaseSchema = z.object({
  id: z.string().min(1).max(32),
  label: z.string().min(1).max(64),
});

export const ButtonComponentSchema = ComponentBaseSchema.extend({
  type: z.literal("button"),
  icon: z.string().max(64).optional(),
});

export const DpadComponentSchema = ComponentBaseSchema.extend({
  type: z.literal("dpad"),
  directions: z.union([z.literal(4), z.literal(8)]),
});

export const JoystickComponentSchema = ComponentBaseSchema.extend({
  type: z.literal("joystick"),
  deadzone: z.number().min(0).max(0.5).optional(),
});

export const TextComponentSchema = ComponentBaseSchema.extend({
  type: z.literal("text"),
  maxLength: z.int().min(1).max(LIMITS.maxTextLength),
  submitLabel: z.string().min(1).max(32),
  placeholder: z.string().max(64).optional(),
});

export const ChoiceOptionSchema = z.object({
  id: z.string().min(1).max(32),
  label: z.string().min(1).max(64),
});

export const ChoiceComponentSchema = ComponentBaseSchema.extend({
  type: z.literal("choice"),
  options: z.array(ChoiceOptionSchema).min(1).max(LIMITS.maxChoiceOptions),
  min: z.int().min(0),
  max: z.int().min(1),
  submitLabel: z.string().min(1).max(32),
});

export const ComponentSchema = z.discriminatedUnion("type", [
  ButtonComponentSchema,
  DpadComponentSchema,
  JoystickComponentSchema,
  TextComponentSchema,
  ChoiceComponentSchema,
]);
export type Component = z.infer<typeof ComponentSchema>;

export const LayoutSchema = z
  .object({
    title: z.string().min(1).max(64),
    orientation: z.enum(LAYOUT_ORIENTATIONS),
    components: z.array(ComponentSchema).min(1).max(LIMITS.maxLayoutComponents),
  })
  .superRefine((layout, ctx) => {
    const seen = new Set<string>();
    for (const comp of layout.components) {
      if (seen.has(comp.id)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate component id: ${comp.id}`,
        });
      }
      seen.add(comp.id);
    }
    const byteLength = new TextEncoder().encode(
      JSON.stringify(layout),
    ).byteLength;
    if (byteLength > LIMITS.maxLayoutBytes) {
      ctx.addIssue({
        code: "custom",
        message: `Serialized layout exceeds ${LIMITS.maxLayoutBytes} bytes`,
      });
    }
  });

export type Layout = z.infer<typeof LayoutSchema>;
