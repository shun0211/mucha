import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { User } from "../types";
import { getCurrentUser } from "./getCurrentUser";

export const useSetCurrentUser = (setAuthChecking: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    const inner = async () => {
      try {
        const retValToken = await getAccessTokenSilently()
        const user: User = await getCurrentUser(retValToken);
        setToken(retValToken)
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      }
      setAuthChecking(false);
    };
    inner();
  }, []);

  return {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    token: token,
  };
};
