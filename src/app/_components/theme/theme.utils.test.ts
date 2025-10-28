import { beforeEach, describe, expect, test, vi } from "vitest";
import { applyTheme, toggleTheme } from "./theme.utils";

describe("Feature: Theme Utilities", () => {
  const mockToggle = vi.fn();
  const mockMatchMedia = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    Object.assign(document.documentElement.classList, {
      toggle: mockToggle,
    });

    Object.assign(window, {
      matchMedia: mockMatchMedia,
    });

    localStorage.clear();
  });

  describe("Given toggleTheme is called", () => {
    describe("When localStorage.theme is 'light'", () => {
      test("Then theme is set to 'dark'", () => {
        localStorage.theme = "light";

        toggleTheme();

        expect(localStorage.theme).toBe("dark");
        expect(mockToggle).toHaveBeenCalled();
      });
    });

    describe("When localStorage.theme is 'dark'", () => {
      test("Then theme is set to 'light'", () => {
        localStorage.theme = "dark";

        toggleTheme();

        expect(localStorage.theme).toBe("light");
        expect(mockToggle).toHaveBeenCalled();
      });
    });

    describe("When localStorage.theme is not set", () => {
      test("Then theme is set to 'dark'", () => {
        toggleTheme();

        expect(localStorage.theme).toBe("dark");
        expect(mockToggle).toHaveBeenCalled();
      });
    });
  });

  describe("Given applyTheme is called", () => {
    describe("When localStorage.theme is 'dark'", () => {
      test("Then classList.toggle is called with 'dark' and true", () => {
        localStorage.theme = "dark";
        mockMatchMedia.mockReturnValue({ matches: false });

        applyTheme();

        expect(mockToggle).toHaveBeenCalledWith("dark", true);
      });
    });

    describe("When localStorage.theme is 'light'", () => {
      test("Then classList.toggle is called with 'dark' and false", () => {
        localStorage.theme = "light";
        mockMatchMedia.mockReturnValue({ matches: false });

        applyTheme();

        expect(mockToggle).toHaveBeenCalledWith("dark", false);
      });
    });

    describe("When localStorage.theme is not set and system prefers dark", () => {
      test("Then classList.toggle is called with 'dark' and true", () => {
        mockMatchMedia.mockReturnValue({ matches: true });

        applyTheme();

        expect(mockToggle).toHaveBeenCalledWith("dark", true);
      });
    });

    describe("When localStorage.theme is not set and system prefers light", () => {
      test("Then classList.toggle is called with 'dark' and false", () => {
        mockMatchMedia.mockReturnValue({ matches: false });

        applyTheme();

        expect(mockToggle).toHaveBeenCalledWith("dark", false);
      });
    });
  });
});
