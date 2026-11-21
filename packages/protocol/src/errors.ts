export const ErrorCode = {
  INVALID_MESSAGE: "INVALID_MESSAGE",
  VERSION_MISMATCH: "VERSION_MISMATCH",
  ROOM_NOT_FOUND: "ROOM_NOT_FOUND",
  ROOM_FULL: "ROOM_FULL",
  NICKNAME_INVALID: "NICKNAME_INVALID",
  NICKNAME_TAKEN: "NICKNAME_TAKEN",
  UNKNOWN_TOKEN: "UNKNOWN_TOKEN",
  NOT_HOST: "NOT_HOST",
  NOT_ALLOWED: "NOT_ALLOWED",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type AckError = {
  code: ErrorCode;
  message: string;
  details?: unknown;
};

export type Ack<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: AckError };
