import { useEffect, useState, type ReactNode } from "react";
import type { AuthCredentials } from "../types/Auth";
import { AuthContext } from "./AuthContext";
import { mockAPI } from "../services/mockApi";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    if (token) {
      // Mock API doesn't need authorization headers, but we keep this for consistency
      console.log("User authenticated with token:", token);
    }
  }, [token]);

  const login = async (
    username: AuthCredentials["username"],
    password: AuthCredentials["password"]
  ) => {
    try {
      const response = await mockAPI.login({
        username,
        password,
      });
      const newToken = response.data.token;
      const userRole = response.data.role || "user";
      localStorage.setItem("token", newToken);
      localStorage.setItem("role", userRole);
      setToken(newToken);
      setRole(userRole);
      return newToken;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
