import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home page", () => {
  test("Renders Welcome to Certify", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "Welcome to Certify",
    });

    expect(heading).toBeInTheDocument();
  });

  test("Renders a sign in button", () => {
    render(<Home />);

    const button = screen.getByRole("button", {
      name: "Sign In",
    });

    expect(button).toBeInTheDocument();
  });
});
