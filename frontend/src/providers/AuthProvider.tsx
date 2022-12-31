import React, { ReactElement } from "react";
import { useSetCurrentUser } from "../hooks/useSetCurrentUser";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({
  children,
  setAuthChecking,
  authChecking,
}: {
  children: ReactElement;
  setAuthChecking: React.Dispatch<React.SetStateAction<boolean>>;
  authChecking: boolean;
}) => {
  const { currentUser, setCurrentUser, token } =
    useSetCurrentUser(setAuthChecking);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, token, authChecking }}>
      {children}
    </AuthContext.Provider>
  );
};
