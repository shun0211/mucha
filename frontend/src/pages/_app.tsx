/* eslint-disable @typescript-eslint/ban-ts-comment */
import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import MuchaAuthProvider from "../providers/MuchaAuthProvider";
import Mucha from "../components/Mucha";
import { DefaultSeo } from "next-seo";
import { LIFF_ID, ENV } from "../config/constants";
import { Liff } from "@line/liff";
import LIFFInspectorPlugin from "@line/liff-inspector";
import Script from "next/script";
import Head from "next/head";

export default function App(props: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const { Component, pageProps, router } = props;

  const initLiff = (liff: Liff, liffId: string) => {
    liff
      .init({ liffId: liffId })
      .then(() => {
        console.log("Liff init success!");
        setLiffObject(liff);
      })
      .catch((error: Error) => {
        setLiffError(error.toString());
        console.log("Liff init Failure!");
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
      });
  }, []);

  pageProps.liff = liffObject;
  pageProps.liffError = liffError;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo
        defaultTitle="Mucha (ミューチャ) | LINE リマインドツール"
        description="家族や恋人同士で使える便利なリマインドチャットツール"
        canonical="https://muchualchat.com/"
        openGraph={{
          type: "website",
          title: "Mucha (ミューチャ) | LINE リマインドツール",
          description: "家族や恋人同士で使える便利なリマインドチャットツール",
          site_name: "Mucha (ミューチャ) | LINE リマインドツール",
          url: "https://muchualchat.com/",
          images: [
            {
              url: "https://mucha.s3.ap-northeast-1.amazonaws.com/logo.png",
              width: 600,
              height: 600,
              alt: "Muchaのロゴ",
            },
          ],
        }}
      />
      {/* Preview 環境ではコンソールを出す */}
      {ENV === "preview" ?? (
        <Script
          src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
          onLoad={() => {
            {/* @ts-ignore */}
            new window.VConsole();
          }}
        />
      )}
      <MuchaAuthProvider liff={liffObject}>
        <Mucha Component={Component} pageProps={pageProps} router={router} />
      </MuchaAuthProvider>
    </>
  );
}
