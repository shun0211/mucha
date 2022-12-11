import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../providers/auth";
import { useRouter } from "next/router";
import Skeleton from "../components/ui-elements/Skeleton";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "../config/constants";
import { useSetCurrentUser } from "../hooks/setCurrentUser";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const { authChecking, currentUser, setCurrentUser } = useSetCurrentUser()

  const component = (authChecking: boolean): React.ReactNode => {
    if (
      props.router.pathname === "/" ||
      props.router.pathname === "/signin" ||
      props.router.pathname === "/signup" ||
      props.router.pathname === "/line-account-linkage"
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
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        redirectUri="http://localhost:3100/notices"
      >
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
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
      </Auth0Provider>
    </>
  );
}
