import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { AuthProvider, useAuth } from './auth-context';
import { getCurrentUser, logoutUser } from 'src/utils/authClient';

vi.mock('src/utils/authClient', () => ({
  getCurrentUser: vi.fn(),
  logoutUser: vi.fn(),
}));

const mockedGetCurrentUser = vi.mocked(getCurrentUser);
const mockedLogoutUser = vi.mocked(logoutUser);

function TestComponent() {
  const { user, isAuthenticated, loading, error, refetchUser, logout } = useAuth();
  return (
    <div>
      <span data-testid="user">{user ? user.name : 'no-user'}</span>
      <span data-testid="auth">{isAuthenticated ? 'yes' : 'no'}</span>
      <span data-testid="loading">{loading ? 'loading' : 'done'}</span>
      <span data-testid="error">{error || 'no-error'}</span>
      <button onClick={refetchUser}>refetch</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads user on mount', async () => {
    mockedGetCurrentUser.mockResolvedValue({
      user: { name: 'John', id: '1', email: 'a@a.com', age: 30, weight: 80, goal: 'muscle_gain' },
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(getByTestId('user').textContent).toBe('John'));
    expect(getByTestId('auth').textContent).toBe('yes');
  });

  it('handles logout', async () => {
    mockedGetCurrentUser.mockResolvedValue({
      user: { name: 'John', id: '1', email: 'a@a.com', age: 30, weight: 80, goal: 'muscle_gain' },
    });
    mockedLogoutUser.mockResolvedValue({ data: {} } as any);

    const { getByTestId, getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(getByTestId('user').textContent).toBe('John'));

    act(() => {
      getByText('logout').click();
    });

    await waitFor(() => expect(getByTestId('user').textContent).toBe('no-user'));
    expect(getByTestId('auth').textContent).toBe('no');
  });

  it('handles refetchUser', async () => {
    mockedGetCurrentUser.mockResolvedValueOnce({
      user: { name: 'John', id: '1', email: 'a@a.com', age: 30, weight: 80, goal: 'muscle_gain' },
    });
    mockedGetCurrentUser.mockResolvedValueOnce({
      user: { name: 'Jane', id: '2', email: 'b@b.com', age: 25, weight: 60, goal: 'fat_loss' },
    });

    const { getByTestId, getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => expect(getByTestId('user').textContent).toBe('John'));

    act(() => {
      getByText('refetch').click();
    });

    await waitFor(() => expect(getByTestId('user').textContent).toBe('Jane'));
  });
});
