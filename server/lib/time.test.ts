import { formatDurationMS } from "@/lib/time";

describe("formatDurationMS", () => {
  test("formats 0ms", () => {
    expect(formatDurationMS(0)).toBe("00:00");
  });

  test("formats 1ms", () => {
    expect(formatDurationMS(1)).toBe("00:00");
  });

  test("formats 999ms", () => {
    expect(formatDurationMS(999)).toBe("00:00");
  });

  test("formats 1000ms", () => {
    expect(formatDurationMS(1000)).toBe("00:01");
  });

  test("formats 59999ms", () => {
    expect(formatDurationMS(59999)).toBe("00:59");
  });

  test("formats 60000ms", () => {
    expect(formatDurationMS(60000)).toBe("01:00");
  });
});
