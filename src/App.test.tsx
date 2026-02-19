import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the header logo", () => {
  render(<App />);
  const logo = screen.getByAltText(/Ai Workout Logo/i);
  expect(logo).toBeInTheDocument();
});
