import { vi } from "vitest";
import { tmpdir } from "node:os";

vi.mock("electron", () => ({
  app: {
    getPath: vi.fn(() => tmpdir()),
    on: vi.fn(),
  },
}));
