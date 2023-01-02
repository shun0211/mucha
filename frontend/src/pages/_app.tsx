import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import MuchaAuthProvider from "../providers/MuchaAuthProvider";
import Mucha from "../components/Mucha";
import { DefaultSeo } from "next-seo";

export default function App(props: AppProps) {
  const { Component, pageProps, router } = props;

  return (
    <>
      <DefaultSeo
        defaultTitle="Mucha"
        description="家族や恋人同士で使える便利なリマインドチャットツール"
        canonical="https://muchualchat.com/"
        openGraph={{
          type: "website",
          title: "Mucha",
          description: "家族や恋人同士で使える便利なリマインドチャットツール",
          site_name: "Mucha",
          url: "https://muchualchat.com/",
          images: [
            {
              url: "https://mucha.s3.ap-northeast-1.amazonaws.com/logo-only-image.png",
              width: 600,
              height: 600,
              alt: "Muchaのロゴ",
            },
          ],
        }}
      />
      <MuchaAuthProvider>
        <Mucha Component={Component} pageProps={pageProps} router={router} />
      </MuchaAuthProvider>
    </>
  );
}
