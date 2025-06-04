import type { AuthCredentials } from "../../types/Auth";
import api from "../apiClient";
import { loginEndpoint } from "../../const/endpoints/endpoints.ts";

export const loginUser = async (
  credentials: AuthCredentials
): Promise<{ token: string; role: string }> => {
  const response = await api.post<{ token: string; role: string }>(
    loginEndpoint,
    credentials
  );
  return response.data;
};
