import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";

export const handleEmailAndPasswordSignup = async (
  email: string,
  password: string,
  setIsWaitng: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter
) => {
  await createUserWithEmailAndPassword(auth, email, password).catch((e) => {
    if (e instanceof FirebaseError && e.code === "auth/email-already-in-use") {
      toast.error("すでにメールアドレスは使われています😱");
    } else if (e instanceof FirebaseError && e.code === "auth/invalid-email") {
      toast.error("メールアドレスの形式がまちがっています");
    }
    setIsWaitng(false);
    throw e;
  });
  router.push("signup/temporary-complete");
};
