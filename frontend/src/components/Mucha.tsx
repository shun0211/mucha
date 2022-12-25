import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";
import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../providers/AuthContext";
import Skeleton from "./ui-elements/Skeleton";

const Mucha = ({
  authChecking,
  Component,
  pageProps,
  router,
}: {
  authChecking: boolean;
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
  router: Router;
}) => {
  const { currentUser } = useContext(AuthContext);
  const component = (authChecking: boolean): React.ReactNode => {
    if (
      router.pathname === "/" ||
      router.pathname === "/signin" ||
      router.pathname === "/signup" ||
      router.pathname === "/line-account-linkage" ||
      router.pathname === "/help/group-talk-linkage"
    ) {
      return <Component {...pageProps} />;
    } else {
      // ログインしていないときは/signinにリダイレクト
      if (!authChecking && currentUser === null) {
        router.push("signin");
      }
      if (
        !authChecking &&
        currentUser?.isLineAccountLinkaged === false &&
        (router.pathname === "/notices" || router.pathname === "/notices/new")
      ) {
        router.push("/help/line-account-linkage");
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
