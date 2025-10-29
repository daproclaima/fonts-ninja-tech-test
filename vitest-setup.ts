import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({
    className: "inter-font",
  }),
}));
