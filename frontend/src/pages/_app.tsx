import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "../config/constants";
import Mucha from "../components/Mucha";

export default function App(props: AppProps) {
  const { Component, pageProps, router } = props;

  return (
    <>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        redirectUri="http://localhost:3100/notices"
        audience={AUTH0_AUDIENCE}
      >
        <Mucha Component={Component} pageProps={pageProps} router={router} />
      </Auth0Provider>
    </>
  );
}
