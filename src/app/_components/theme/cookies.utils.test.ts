import { beforeEach, describe, expect, test } from "vitest";
import { getThemeCookie, setThemeCookie } from "./cookies.utils";

describe("Feature: Cookies Utilities", () => {
  beforeEach(() => {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
    });
  });

  describe("Given setThemeCookie is called", () => {
    describe("When theme is 'dark'", () => {
      test("Then cookie 'theme' is set to 'dark' with Secure and SameSite attributes", () => {
        setThemeCookie("dark");

        expect(document.cookie).toContain("theme=dark");
      });
    });

    describe("When theme is 'light'", () => {
      test("Then cookie 'theme' is set to 'light' with Secure and SameSite attributes", () => {
        setThemeCookie("light");

        expect(document.cookie).toContain("theme=light");
      });
    });
  });

  describe("Given getThemeCookie is called", () => {
    describe("When cookie 'theme' exists with value 'dark'", () => {
      test("Then it returns 'dark'", () => {
        document.cookie = "theme=dark; path=/; Secure; SameSite=Strict";

        const result = getThemeCookie();

        expect(result).toBe("dark");
      });
    });

    describe("When cookie 'theme' exists with value 'light'", () => {
      test("Then it returns 'light'", () => {
        document.cookie = "theme=light; path=/; Secure; SameSite=Strict";

        const result = getThemeCookie();

        expect(result).toBe("light");
      });
    });

    describe("When cookie 'theme' does not exist", () => {
      test("Then it returns undefined", () => {
        const result = getThemeCookie();

        expect(result).toBeUndefined();
      });
    });
  });
});
