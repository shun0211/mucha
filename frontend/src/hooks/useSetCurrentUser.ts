import { Liff } from "@line/liff/dist/lib";
import { signInWithCustomToken } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { User } from "../types";
import { getLiffCostomToken } from "./getCostomToken";
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
    console.log("useSetCurrentUser Start! 1/2");
    auth.onAuthStateChanged((firebaseUser) => {
      console.log("useSetCurrentUser Start! 2/2");
      liff.ready.then(() => {
        const liffLogin = async () => {
          const accessToken = liff.getAccessToken();
          const customToken = await getLiffCostomToken(accessToken);
          console.log(customToken);
          await signInWithCustomToken(auth, customToken);
        };
        liffLogin();
      })

      console.log("liff Finish");

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
