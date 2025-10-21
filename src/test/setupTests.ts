import { vi } from 'vitest';

// Mock authClient globally before tests run.
// Use the project absolute path so module resolution is consistent across tests.
vi.mock('src/utils/authClient', () => ({
  getCurrentUser: vi.fn(),
  logoutUser: vi.fn(),
}));

// Add testing-library matchers (toBeInTheDocument etc.)
import '@testing-library/jest-dom';
