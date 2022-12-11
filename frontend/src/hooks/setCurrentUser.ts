import { useEffect, useState } from "react";
import { User } from "../types";
import { getCurrentUser } from "./getCurrentUser";

export const useSetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  useEffect(() => {
    const inner = async () => {
      try {
        const user: User = await getCurrentUser();
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
  };
};
