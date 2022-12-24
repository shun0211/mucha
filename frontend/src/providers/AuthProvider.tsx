import React, { ReactElement } from "react";
import { useSetCurrentUser } from "../hooks/useSetCurrentUser";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children, setAuthChecking }: { children: ReactElement; setAuthChecking: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { currentUser, setCurrentUser, token } =
    useSetCurrentUser(setAuthChecking);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};
