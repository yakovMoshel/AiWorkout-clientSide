import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCurrentUser, logoutUser } from "../utils/authClient";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  refetchUser: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const fetchUser = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await getCurrentUser();
    setUser(data.user);
  } catch (err) {
    setUser(null);
    setError("User not authenticated");
  } finally {
    setLoading(false);
  }
}, []);

const logout = useCallback(async () => {
  try {
    await logoutUser();  
  } catch (err) {
    console.error('Logout failed', err);
  } finally {
    setUser(null);      
    localStorage.removeItem("token");
    window.location.href = "/"; 
  }
}, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        error,
        refetchUser: fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};