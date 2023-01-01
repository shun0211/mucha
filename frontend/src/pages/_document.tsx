import { createGetInitialProps } from "@mantine/next";
import { DefaultSeo } from "next-seo";
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          {/* iPhoneのsafariでフォーム入力の時に自動的に画面拡大するのを防ぐ */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <title>Mucha</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <DefaultSeo
            defaultTitle="Mucha"
            description="家族や恋人同士で使える便利なリマインドチャットツール"
            canonical="https://muchualchat.com/"
            openGraph={{
              type: "website",
              title: "Mucha",
              description:
                "家族や恋人同士で使える便利なリマインドチャットツール",
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
        </Head>
        <body className="bg-bg-color">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
