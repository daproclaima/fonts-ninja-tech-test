import { render, screen, within, cleanup } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { Header } from "./Header";

describe("Feature: Layout Header", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("Given the Header renders", () => {
    const renderHeader = () => render(<Header />);

    describe("When the page renders on server", () => {
      test("Then the content is present", () => {
        const { container } = renderHeader();

        expect(container).toMatchSnapshot();
      });
    });

    describe("When user clicks on the Ninja logo", () => {
      test("Then user is redirected to the home page `/`", async () => {
        renderHeader();

        const homeLink = screen.getByRole("link", {
          name: "return to home page",
        });
        expect(homeLink).toHaveAttribute("href", "/");
        expect(
          within(homeLink).getByRole("img", { name: "fonts ninja logo" }),
        ).toBeInTheDocument();
      });
    });

    describe("When user clicks on the Switch Theme button", () => {
      test("Then the color theme changes from light to dark", () => {
        renderHeader();

        expect(
          screen.getByRole("button", {
            name: "switch theme",
          }),
        ).toBeInTheDocument();
      });

      test.todo("Then the color theme changes from dark to light");
    });
  });
});
