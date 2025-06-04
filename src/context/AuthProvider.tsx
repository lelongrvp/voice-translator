import { useEffect, useState, type ReactNode } from "react";
import type { AuthCredentials } from "../types/Auth";
import { AuthContext } from "./AuthContext";
import api from "../api/apiClient";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (
    username: AuthCredentials["username"],
    password: AuthCredentials["password"]
  ) => {
    try {
      const response = await api.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
      return newToken;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
