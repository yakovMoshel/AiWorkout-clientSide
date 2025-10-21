import { vi } from "vitest";

// Add testing-library matchers (toBeInTheDocument etc.)
import "@testing-library/jest-dom";

// Mock authClient globally before tests run.
// Use the project absolute path so module resolution is consistent across tests.
vi.mock("src/utils/authClient", () => ({
  getCurrentUser: vi.fn(),
  logoutUser: vi.fn(),
}));
