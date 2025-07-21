import { Navigate, useLocation } from 'react-router-dom';
import { JSX } from 'react';
import { useAuth } from '../store/auth-context';

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
