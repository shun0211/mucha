import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../providers/auth";
import { User } from "../types";
import { useRouter } from "next/router";
import Skeleton from "../components/ui-elements/Skeleton";
import { getCurrentUser } from "../hooks/getCurrentUser";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  useEffect(() => {
    const inner = async () => {
      try {
        const user: User = await getCurrentUser();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      }
      setAuthChecking(false);
    };
    inner();
  }, []);

  const component = (authChecking: boolean): React.ReactNode => {
    if (
      props.router.pathname === "/" ||
      props.router.pathname === "/line-account-linkage" ||
      props.router.pathname === "/notices/new" ||
      props.router.pathname === "/notices"
    ) {
      return <Component {...pageProps} />;
    } else {
      // ログインしていないときは/signinにリダイレクト
      if (!authChecking && currentUser === null) {
        router.push("signin");
      }
      return authChecking ? <Skeleton /> : <Component {...pageProps} />;
    }
  };

  return (
    <>
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
    </>
  );
}
