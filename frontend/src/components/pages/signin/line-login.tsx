import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../../../config/constants";
import { auth } from "../../../config/firebase";
import { getCurrentUser } from "../../../hooks/getCurrentUser";
import { AuthContext } from "../../../providers/AuthContext";
import { User } from "../../../types";
import Skeleton from "../Skeleton";

const PagesLineLogin = () => {
  const router = useRouter();
  const { setCurrentUser, setToken } = useContext(AuthContext);

  const inner = async () => {
    const code = router.query.code as string;
    if (code && router) {
      const res = await axios.post(`${API_URL}/custom-token`, { code: code });
      const customToken = res.data.customToken;
      const userCredential = await signInWithCustomToken(auth, customToken);
      const firebaseToken = await userCredential.user.getIdToken(true);
      const user: User = await getCurrentUser(firebaseToken);
      setToken(firebaseToken);
      setCurrentUser(user);
      if (user.isFriend) {
        router.push("/notices");
      } else {
        router.push("/help/add-friend");
      }
      toast.success("ログインしました😊");
    }
  };
  inner();

  return <Skeleton />;
};

export default PagesLineLogin;
