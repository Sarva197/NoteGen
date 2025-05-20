import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useAuth();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/login", { email, password });
      setUser(res.data.user); // Save user globally
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
