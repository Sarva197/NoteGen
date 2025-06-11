// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLayoutEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   Fetch user on app load
  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/user/notes", {
  //         withCredentials: true,
  //       });
  //       // setNotes(res.data.notes); // Adjust depending on your API response
  //       // console.log("Fetched notes:", res.data.notes);
  //     } catch (err) {
  //       console.error("Failed to fetch notes:", err);
  //     }
  //   };

  //   if (user && isLoggedIn && !authLoading) {
  //     fetchNotes();
  //   }
  // }, [user, isLoggedIn, authLoading]);
  const checkUser = async () => {
    setAuthLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/me", {
        withCredentials: true, // send cookies
      });
      if (res.data.resUser) {
        setUser(res.data.resUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setAuthLoading(false);
    }
  }; // Run once on mount


useEffect(() => {
    if (!user && !isLoggedIn) {
      checkUser();
    }
  }, []);


  const signup = async ({ username, email, password }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        { username, email, password },
        { withCredentials: true }
      );
      setUser(res.data.user); // ⬅️ Store user in global state
      console.log("User signed up:", res.data.user);
      setIsLoggedIn(true); // Update login status
  
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
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.resUser);
      console.log("User logged in:", res);
      setIsLoggedIn(true); // Update login status 
      return {
        success: res.data.success,
        message: res.data.message,
        user: res.data.resUser,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("Token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update login status
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, authLoading, isLoggedIn }}
    >
      {!authLoading && children}
    </AuthContext.Provider>
  );
};

// 🔁 Custom hook for easy use
export function useAuth() {
  return useContext(AuthContext);
}
