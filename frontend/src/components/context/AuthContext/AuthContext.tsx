// AuthContext.jsx
// Handles authentication state and actions

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MatchUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login
  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${MatchUrl}/api/user/login`, { email, password });

      if (response.data.success) {
        const { token, user: loggedInUser, isAdmin } = response.data.data;
        const userData = {
          ...loggedInUser,
          role: isAdmin ? "admin" : "user",
          avatar: `https://ui-avatars.com/api/?name=${loggedInUser.name}&background=f97316&color=fff`
        };

        localStorage.setItem("token", token);
        localStorage.setItem("authUser", JSON.stringify(userData));
        setUser(userData);
        console.log("Login successful:", userData);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error.response ? error.response.data : error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup
  const signup = async (name, email, password, role = "user") => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${MatchUrl}/api/user/register`, { name, email, password });

      if (response.data.success) {
        const { token, user: newUser } = response.data.data;
        const userData = {
          ...newUser,
          role: role,
          avatar: `https://ui-avatars.com/api/?name=${newUser.name}&background=f97316&color=fff`
        };

        localStorage.setItem("token", token);
        localStorage.setItem("authUser", JSON.stringify(userData));
        setUser(userData);
        console.log("Signup successful:", userData);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error.response ? error.response.data : error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    redirectPath,
    setRedirectPath,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
