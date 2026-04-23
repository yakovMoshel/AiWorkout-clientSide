import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth-context";
import { ProtectedRouteProps } from "../domain/models/interfaces/IProtectedRouteProps";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!(user as { profileComplete?: boolean })?.profileComplete && location.pathname !== "/setup") {
    return <Navigate to="/setup" replace />;
  }

  return children;
}
