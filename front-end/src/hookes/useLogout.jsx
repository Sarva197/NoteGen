import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

export function useLogout() {
  const { setUser } = useAuth();

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { logout };
}
