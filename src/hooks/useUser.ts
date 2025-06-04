import { getUsers } from "../api/apis/user.ts";
import { useQuery } from "@tanstack/react-query";
import type { PaginationParams } from "../types/Api.ts";

export const useUser = (params: PaginationParams) => {
  const {
    data: userList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userList", params],
    queryFn: async () => {
      return getUsers(params);
    },
  });

  return { userList, isLoading, error };
};
