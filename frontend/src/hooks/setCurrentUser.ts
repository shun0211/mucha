import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { AUTH0_DOMAIN } from "../config/constants";
import { User } from "../types";
import { getCurrentUser } from "./getCurrentUser";

export const useSetCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [authChecking, setAuthChecking] = useState<boolean>(true);

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
    authChecking: authChecking,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    token: token,
  };
};
