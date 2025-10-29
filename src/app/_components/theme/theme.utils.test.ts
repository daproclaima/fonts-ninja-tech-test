import { beforeEach, describe, expect, test, vi } from "vitest";
import { applyTheme, toggleTheme } from "./theme.utils";

const { getThemeCookie, setThemeCookie } = vi.hoisted(() => ({
  getThemeCookie: vi.fn(),
  setThemeCookie: vi.fn(),
}));

vi.mock("./cookies.utils", () => ({
  getThemeCookie,
  setThemeCookie,
}));

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
  });

  describe("Given toggleTheme is called", () => {
    describe("When cookie theme is 'light'", () => {
      test("Then theme cookie is set to 'dark'", () => {
        getThemeCookie.mockReturnValue("light");
        mockMatchMedia.mockReturnValue({ matches: false });

        toggleTheme();

        expect(setThemeCookie).toHaveBeenCalledWith("dark");
        expect(mockToggle).toHaveBeenCalled();
      });
    });

    describe("When cookie theme is 'dark'", () => {
      test("Then theme cookie is set to 'light'", () => {
        getThemeCookie.mockReturnValue("dark");
        mockMatchMedia.mockReturnValue({ matches: false });

        toggleTheme();

        expect(setThemeCookie).toHaveBeenCalledWith("light");
        expect(mockToggle).toHaveBeenCalled();
      });
    });

    describe("When cookie theme is not set", () => {
      test("Then theme cookie is set to 'dark'", () => {
        getThemeCookie.mockReturnValue(undefined);
        mockMatchMedia.mockReturnValue({ matches: false });

        toggleTheme();

        expect(setThemeCookie).toHaveBeenCalledWith("dark");
        expect(mockToggle).toHaveBeenCalled();
      });
    });
  });

  describe("Given applyTheme is called", () => {
    describe("When cookie theme is 'dark'", () => {
      test("Then classList.toggle is called with 'dark' and true", () => {
        getThemeCookie.mockReturnValue("dark");
        mockMatchMedia.mockReturnValue({ matches: false });

        applyTheme();

        expect(mockToggle).toHaveBeenCalledWith("dark", true);
      });
    });

    describe("When cookie theme is 'light'", () => {
      test("Then classList.toggle is called with 'dark' and false", () => {
        getThemeCookie.mockReturnValue("light");
        mockMatchMedia.mockReturnValue({ matches: false });

        applyTheme();

        expect(mockToggle).toHaveBeenCalledWith("dark", false);
      });
    });

    describe("When cookie theme is not set and system prefers dark", () => {
      test("Then classList.toggle is called with 'dark' and true", () => {
        getThemeCookie.mockReturnValue(undefined);
        mockMatchMedia.mockReturnValue({ matches: true });

        applyTheme();

        expect(mockToggle).toHaveBeenCalledWith("dark", true);
      });
    });

    describe("When cookie theme is not set and system prefers light", () => {
      test("Then classList.toggle is called with 'dark' and false", () => {
        getThemeCookie.mockReturnValue(undefined);
        mockMatchMedia.mockReturnValue({ matches: false });

        applyTheme();

        expect(mockToggle).toHaveBeenCalledWith("dark", false);
      });
    });
  });
});
