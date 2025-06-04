export type AuthCredentials = {
  username: string;
  password: string;
};

export type AuthContextType = {
  token: string | null;
  role: string | null;
  login: (
    username: AuthCredentials["username"],
    password: AuthCredentials["password"]
  ) => Promise<string>;
  logout: () => void;
};
