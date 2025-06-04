import type { PaginationParams } from "../../types/Api.ts";
import api from "../apiClient.ts";
import { userListEndpoint } from "../../const/endpoints/endpoints.ts";
import type { GetUsersResponse } from "../../types/User.ts";

export const getUsers = async (
  params: PaginationParams,
): Promise<GetUsersResponse> => {
  const res = await api.get(userListEndpoint, {
    params: {
      ...params,
    },
  });
  return res.data;
};
