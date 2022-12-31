import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";
import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../providers/AuthContext";
import Skeleton from "./ui-elements/Skeleton";

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
      router.pathname === "/signup" ||
      router.pathname === "/line-account-linkage" ||
      router.pathname === "/help/group-talk-linkage" ||
      router.pathname === "/signup/temporary-complete"
    ) {
      return <Component {...pageProps} />;
    } else {
      // ログインしていないときは/signinにリダイレクト
      if (!authChecking && currentUser === null) {
        router.push("/");
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
