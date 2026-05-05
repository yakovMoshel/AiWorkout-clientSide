import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("./utils/authClient", () => ({
  getCurrentUser: vi.fn().mockResolvedValue({
    user: {
      name: "Test",
      id: "1",
      email: "test@test.com",
      age: 30,
      weight: 80,
      goal: "muscle_gain",
      profileComplete: true,
    },
  }),
  logoutUser: vi.fn(),
}));

test("renders the header logo", async () => {
  render(<App />);
  const logo = await screen.findByAltText(/Ai Workout Logo/i);
  expect(logo).toBeInTheDocument();
});