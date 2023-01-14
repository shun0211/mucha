import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import MuchaAuthProvider from "../providers/MuchaAuthProvider";
import Mucha from "../components/Mucha";
import { DefaultSeo } from "next-seo";
import { LIFF_ID, ENV } from "../config/constants";
import { Liff } from "@line/liff";
import LIFFInspectorPlugin from "@line/liff-inspector";

export default function App(props: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const { Component, pageProps, router } = props;

  console.log("LIFF Test!");
  console.log(props);

  const initLiff = (liff: Liff, liffId: string) => {
    liff
      .init({ liffId: liffId })
      .then(() => {
        setLiffObject(liff);
      })
      .catch((error: Error) => {
        setLiffError(error.toString());
      });
  };

  useEffect(() => {
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        if (ENV === "preview") {
          liff.use(new LIFFInspectorPlugin());
        }
        initLiff(liff, LIFF_ID);
        liff.login()
      });
  }, []);

  pageProps.liff = liffObject;
  pageProps.liffError = liffError;

  console.log(liffObject);
  console.log(liffObject?.id);
  console.log(liffObject?.getAccessToken());
  console.log(liffObject?.getProfile());
  console.log(liffObject?.getFriendship());
  console.log(liffError);

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
      <MuchaAuthProvider liff={pageProps.liff}>
        <Mucha Component={Component} pageProps={pageProps} router={router} />
      </MuchaAuthProvider>
    </>
  );
}
