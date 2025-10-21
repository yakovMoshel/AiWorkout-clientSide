import { User } from "./IUser";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
  logout: () => void;
}
