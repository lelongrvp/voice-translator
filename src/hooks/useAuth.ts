import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/apiClient";
import { loginUser } from "../api/apis/auth.ts";
import type { AuthCredentials } from "../types/Auth.ts";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!auth?.token) return null;
      return auth.token;
    },
    enabled: !!auth?.token,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: AuthCredentials) => {
      const response = await loginUser({ username, password });
      return response;
    },
    onSuccess: (response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    },
    onSuccess: () => {
      auth?.logout();
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  return {
    token: localStorage.getItem("token"),
    user: userData,
    isAuthenticated: !!auth?.token,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  };
};
