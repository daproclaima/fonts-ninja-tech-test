import {cleanup, render} from "@testing-library/react";
import {beforeEach, describe, expect, test} from "vitest";
import Layout from "../app/layout";

describe("Feature: Layout", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("Given the Layout component is rendered", () => {
    const renderLayout = () => render(<Layout>children</Layout>);

    describe("When is on server", () => {
      test("Then the content is present", () => {
        const { container } = renderLayout()

        expect(container).toMatchSnapshot()
      });
    });
  });
});
