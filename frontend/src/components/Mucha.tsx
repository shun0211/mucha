import { MantineProvider } from "@mantine/core";
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useSetCurrentUser } from "../hooks/setCurrentUser";
import { AuthContext } from "../providers/auth";
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
  const { authChecking, currentUser, setCurrentUser, token } =
    useSetCurrentUser();
  const component = (authChecking: boolean): React.ReactNode => {
    if (
      router.pathname === "/" ||
      router.pathname === "/signin" ||
      router.pathname === "/signup" ||
      router.pathname === "/line-account-linkage"
    ) {
      return <Component {...pageProps} />;
    } else {
      // ログインしていないときは/signinにリダイレクト
      // if (!authChecking && currentUser === null) {
      //   router.push("signin");
      // }
      return authChecking ? <Skeleton /> : <Component {...pageProps} />;
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ currentUser, setCurrentUser, token }}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
            colors: {
              yellow: [
                "#FFDC00",
                "#FFDC00",
                "#FFDC00",
                "#FFDC00",
                "#FFDC00",
                "#FFDC00",
                "#FFDC00",
                "#FFDC00",
                "#FFDC00",
                "#FFDC00",
              ],
            },
          }}
        >
          {component(authChecking)}
        </MantineProvider>
        <Toaster />
      </AuthContext.Provider>
    </>
  );
};

export default Mucha;
