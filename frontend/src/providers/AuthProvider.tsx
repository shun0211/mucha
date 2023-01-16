import { Liff } from "@line/liff/dist/lib";
import React, { ReactElement } from "react";
import { useSetCurrentUser } from "../hooks/useSetCurrentUser";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({
  children,
  setAuthChecking,
  authChecking,
  liff,
}: {
  children: ReactElement;
  setAuthChecking: React.Dispatch<React.SetStateAction<boolean>>;
  authChecking: boolean;
  liff: Liff | null;
}) => {
  const { currentUser, setCurrentUser, token } =
    useSetCurrentUser(setAuthChecking, liff);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, token, authChecking }}
    >
      {children}
    </AuthContext.Provider>
  );
};
