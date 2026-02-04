import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { useWhoami } from "../hooks/whoami";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  useWhoami();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
