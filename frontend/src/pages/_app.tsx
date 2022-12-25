import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import MuchaAuthProvider from "../providers/MuchaAuthProvider";
import Mucha from "../components/Mucha";

export default function App(props: AppProps) {
  const { Component, pageProps, router } = props;

  return (
    <>
      <MuchaAuthProvider>
        <Mucha
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </MuchaAuthProvider>
    </>
  );
}
