import "../styles/globals.css";
import React, { useState } from "react";
import type { AppProps } from "next/app";
import MuchaAuthProvider from "../providers/MuchaAuthProvider";
import Mucha from "../components/Mucha";

export default function App(props: AppProps) {
  const { Component, pageProps, router } = props;
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  return (
    <>
      <MuchaAuthProvider setAuthChecking={setAuthChecking}>
        <Mucha
          authChecking={authChecking}
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </MuchaAuthProvider>
    </>
  );
}
