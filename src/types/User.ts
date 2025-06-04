import type { PaginatedResponse } from "./Api.ts";

export interface User {
  id: string;
  name: string;
  appAccount: string;
}

export type GetUsersResponse = PaginatedResponse<User>;
