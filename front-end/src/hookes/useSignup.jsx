import { useState } from "react";
import axios from "../utils/axiosInstance";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/signup", { name, email, password });

      return res.data; // user data or success message
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}
