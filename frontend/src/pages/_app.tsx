import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import MuchaAuthProvider from "../providers/MuchaAuthProvider";
import Mucha from "../components/Mucha";
import { DefaultSeo } from "next-seo";
import LIFFInspectorPlugin from "@line/liff-inspector";
import { LIFF_ID } from "../config/constants";
import { Liff } from "@line/liff";

export default function App(props: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const { Component, pageProps, router } = props;

  useEffect(() => {
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        liff.use(new LIFFInspectorPlugin());
        console.log("LIFF init...");
        liff
          .init({ liffId: LIFF_ID })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  });

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
