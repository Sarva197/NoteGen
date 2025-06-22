import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, authLoading, isLoggedIn } = useAuth();

  if (authLoading) return <p>Loading...</p>; 

  if (!isLoggedIn || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
