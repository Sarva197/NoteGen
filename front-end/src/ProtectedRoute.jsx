import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext"; // Adjust the path as necessary

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Loading...</p>; // Or show spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
