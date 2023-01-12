import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { User } from "../types";
import { getCurrentUser } from "./getCurrentUser";
import type { Liff } from "@line/liff";
import { LIFF_ID } from "../config/constants";
import LIFFInspectorPlugin from "@line/liff-inspector";

export const useSetCurrentUser = (
  setAuthChecking: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [token, setToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  useEffect(() => {
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        liff.use(new LIFFInspectorPlugin())
        console.log("LIFF init...");
        liff
          .init({ liffId: LIFF_ID})
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });

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
