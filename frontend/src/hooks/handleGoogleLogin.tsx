import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import { auth } from "../config/firebase";

export const handleGoogleLogin = async (
  router: NextRouter,
  redirectUrl = "/notices"
) => {
  console.log(redirectUrl);

  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider).then(() => {
    router.push(redirectUrl);
    toast.success("ログインしました😊");
  });
};
