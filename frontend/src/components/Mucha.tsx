/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";
import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../providers/AuthContext";
import Skeleton from "./pages/Skeleton";

const Mucha = ({
  Component,
  pageProps,
  router,
}: {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
  router: Router;
}) => {
  const { currentUser, authChecking } = useContext(AuthContext);
  const component = (authChecking: boolean): React.ReactNode => {
    if (
      router.pathname === "/" ||
      router.pathname === "/signin" ||
      router.pathname === "/signin/line-login" ||
      router.pathname === "/signup" ||
      router.pathname === "/line-account-linkage" ||
      router.pathname === "/help/group-talk-linkage" ||
      router.pathname === "/help/google-login-error" ||
      router.pathname === "/help/google-calendar-linkage" ||
      router.pathname === "/terms" ||
      router.pathname === "/privacy" ||
      // LIFF から開かれるページはログインなしで表示する (バックグラウンドでログインする)
      router.pathname === "/notices/new"
    ) {
      return <Component {...pageProps} />;
    } else {
      // ログインしていないときは/signinにリダイレクト
      if (!authChecking && currentUser === null) {
        router.push("/signin");
      }
      return authChecking ? <Skeleton /> : <Component {...pageProps} />;
    }
  };

  return (
    <>
      {component(authChecking)}
      <Toaster />
    </>
  );
};

export default Mucha;
