import { expect, test } from "vitest";
import { Envelope } from "./index";

test("rejects a bad envelope", () => {
  expect(Envelope.safeParse({ v: 2 }).success).toBe(false);
});

test("accepts a valid envelope", () => {
  expect(
    Envelope.safeParse({ v: 1, t: "ping", ts: Date.now(), p: {} }).success,
  ).toBe(true);
});
