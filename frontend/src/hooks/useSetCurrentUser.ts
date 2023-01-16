import { Liff } from "@line/liff/dist/lib";
import { signInWithCustomToken } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { User } from "../types";
import { getLiffCostomToken } from "./getCostomToken";
import { getCurrentUser } from "./getCurrentUser";

export const useSetCurrentUser = (
  setAuthChecking: React.Dispatch<React.SetStateAction<boolean>>,
  liff: Liff | null
) => {
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("useSetCurrentUser Liff Start!");
    auth.onAuthStateChanged((firebaseUser) => {
      if (liff && liff.isInClient()) {
        const liffLogin = async () => {
          const liffAccessToken = liff.getAccessToken();
          const customToken = await getLiffCostomToken(liffAccessToken);
          console.log(`custom token: ${customToken}`);
          const userCredential = await signInWithCustomToken(auth, customToken);
          const firebaseToken = await userCredential.user.getIdToken(true);
          const user: User = await getCurrentUser(firebaseToken);
          setToken(firebaseToken);
          setCurrentUser(user);
          setAuthChecking(false);
        };
        liffLogin();
      } else if (liff && firebaseUser) {
        const login = async () => {
          const firebaseToken = await firebaseUser.getIdToken(true);
          const user: User = await getCurrentUser(firebaseToken);
          setToken(firebaseToken);
          setCurrentUser(user);
          setAuthChecking(false);
        };
        login();
      } else if (liff) {
        setCurrentUser(null);
        setAuthChecking(false);
      }
    });
  }, [liff]);

  return {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    token: token,
  };
};
