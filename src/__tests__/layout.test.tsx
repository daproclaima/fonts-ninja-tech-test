import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Layout from "../app/layout";

describe("Feature: Layout", () => {
  const renderLayout = () => render(<Layout>children</Layout>)

  describe("Given the Layout component is rendered", () => {
    describe.todo("When the page loads", () => {
      test.todo("Then its content is present");
    });

    describe("When user clicks on the Ninja logo", () => {
      test("Then user is redirected to the home page `/`", async () => {
        renderLayout()
        expect(screen.getByRole('link', { name: 'fonts ninja logo - return to home page' })).toHaveAttribute("href", "/");
      });
    });

    describe("When user clicks on the Switch Theme button", () => {
      test.todo("Then the color theme changes from light to dark");
      test.todo("Then the color theme changes from dark to light");
    });
  });
});