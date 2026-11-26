import { z } from "zod";
import { CLIENT_ROLES, PROTOCOL_VERSION } from "../constants.js";

export const ClientRoleSchema = z.enum(CLIENT_ROLES);
export type ClientRole = z.infer<typeof ClientRoleSchema>;

export const HandshakeAuthSchema = z.object({
  v: z.literal(PROTOCOL_VERSION),
  role: ClientRoleSchema,
});
export type HandshakeAuth = z.infer<typeof HandshakeAuthSchema>;
