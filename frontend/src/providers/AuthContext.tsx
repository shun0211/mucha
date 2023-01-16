import React, { createContext } from "react";
import { User } from "../types";

type AuthContextProps = {
  currentUser: User | null | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  authChecking: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  setCurrentUser: () => {
    throw Error("No default value!");
  },
  token: "",
  setToken: () => {
    throw Error("No default value!");
  },
  authChecking: false,
});
