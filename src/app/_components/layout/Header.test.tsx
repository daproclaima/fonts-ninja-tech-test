import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Header } from "./Header";

const { toggleTheme } = vi.hoisted(() => ({
  toggleTheme: vi.fn(),
}));

vi.mock("@/app/_components/theme/theme.utils", () => ({
  toggleTheme,
}));

describe("Feature: Layout Header", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
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
      test("Then the color theme changes from light to dark", async () => {
        const user = userEvent.setup();
        renderHeader();

        const switchThemeButton = screen.getByRole("button", {
          name: "switch theme",
        });

        await act(async () => {
          await user.click(switchThemeButton);
        });

        expect(toggleTheme).toHaveBeenCalledOnce();
      });

      test.todo("Then the color theme changes from dark to light");
    });
  });
});
