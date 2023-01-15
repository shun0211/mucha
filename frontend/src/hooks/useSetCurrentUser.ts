import { Liff } from "@line/liff/dist/lib";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config/constants";
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
    console.log("useSetCurrentUser Start! 1/2");
    auth.onAuthStateChanged((firebaseUser) => {
      console.log("useSetCurrentUser Start! 2/2");
      console.log(liff);

      if (liff) {
        console.log(`ready 中の liff ${liff}`);
        console.log(`ready 中の liff ${liff.getAccessToken()}`);
        const liffLogin = async () => {
          const accessToken = liff.getAccessToken();
          console.log(accessToken);
          const customToken = await axios.get(`${API_URL}/custom-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(customToken);
          // await signInWithCustomToken(auth, customToken);
        };
        liffLogin();
      }

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
  }, [liff]);

  return {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    token: token,
  };
};
