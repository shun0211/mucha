import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";

export const handleEmailAndPasswordSignin = async (
  email: string,
  password: string,
  setIsWaitng: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter
) => {
  await signInWithEmailAndPassword(auth, email, password).catch((e) => {
    if (e instanceof FirebaseError && e.code === "auth/user-not-found") {
      toast.error("ユーザが見つかりませんでした😱");
    } else if (e instanceof FirebaseError && e.code === "auth/invalid-email") {
      toast.error("不正なメールアドレスです");
    } else if (e instanceof FirebaseError && e.code === "auth/wrong-password") {
      toast.error("パスワードが正しくありません");
    }
    setIsWaitng(false);
    throw e;
  });
  router.push("/notices");
  toast.success("ログインしました😊");
};
