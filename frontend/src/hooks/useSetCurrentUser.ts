import { Liff } from "@line/liff/dist/lib";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { User } from "../types";
import { getCurrentUser } from "./getCurrentUser";

export const useSetCurrentUser = (
  setAuthChecking: React.Dispatch<React.SetStateAction<boolean>>,
  liff: Liff
) => {
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const inner = async () => {
          const token = await firebaseUser.getIdToken(true);
          const user: User = await getCurrentUser(token);
          setToken(token);
          setCurrentUser(user);
        };
        inner();
      } else {
        setCurrentUser(null);
      }
    });
    setAuthChecking(false);
  }, []);

  return {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    token: token,
  };
};
