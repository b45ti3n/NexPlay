export const PROTOCOL_VERSION = 1 as const;
// export const GAME_CHANNEL_NS = "nexplay" as const;

export const ROOM_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const ROOM_CODE_LENGTH = 5;

export const LIMITS = {
  maxPlayers: 4,
  maxPayloadBytes: 65_536, // 64 KB
  maxLayoutBytes: 8_192, // 8 KB
  maxLayoutComponents: 12,
  maxChoiceOptions: 12,
  maxTextLength: 60,
  maxPrivateMsgLength: 500,
  nicknameMin: 1,
  nicknameMax: 16,
  hapticMaxEntries: 10,
  hapticMaxStepMs: 500,
  hapticMaxTotalMs: 1_500,
} as const;

export const TIMEOUTS = {
  playerGraceMs: 60_000,
  consoleGraceMs: 120_000,
  idleTimeoutMs: 1_800_000,
  heartbeatIntervalMs: 1_000,
  watchdogTimeoutMs: 5_000,
  rttPingIntervalMs: 2_000,
} as const;

export const CLIENT_ROLES = ["console", "pad"] as const;

export const ROOM_PHASES = ["lobby", "playing", "paused", "ended"] as const;

export const LAYOUT_ORIENTATIONS = ["portrait", "landscape", "any"] as const;

export const HAPTIC_PRESETS = [
  "light",
  "medium",
  "heavy",
  "success",
  "error",
] as const;

export const BUTTON_STATES = ["down", "up"] as const;

export const DPAD_DIRECTIONS = [
  "none",
  "up",
  "down",
  "left",
  "right",
  "up-left",
  "up-right",
  "down-left",
  "down-right",
];

export const AVATAR_IDS = [
  "avatar-01",
  "avatar-02",
  "avatar-03",
  "avatar-04",
  "avatar-05",
  "avatar-06",
  "avatar-07",
  "avatar-08",
  "avatar-09",
  "avatar-10",
  "avatar-11",
  "avatar-12",
] as const;
