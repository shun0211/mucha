import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { API_URL } from "../../../config/constants";
import { auth } from "../../../config/firebase";
import Skeleton from "../Skeleton";

const PagesLineLogin = () => {
  const router = useRouter();

  const inner = async () => {
    const code = router.query.code as string;
    if (code && router) {
      const res = await axios.post(`${API_URL}/custom-token`, { code: code });
      const customToken = res.data.customToken;
      await signInWithCustomToken(auth, customToken);
      router.push("/notices")
      toast.success("ログインしました😊");
    }
  };
  inner();

  return <Skeleton />;
};

export default PagesLineLogin;
