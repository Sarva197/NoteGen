// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

//   Fetch user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/data", { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signup = async ({ username, email, password }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        { username, email, password },
        { withCredentials: true }
      );
      setUser(res.data.user); // ⬅️ Store user in global state
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔁 Custom hook for easy use
export const useAuth = () => useContext(AuthContext);
