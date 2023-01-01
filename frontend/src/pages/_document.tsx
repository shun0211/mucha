import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
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
        </Head>
        <body className="bg-bg-color">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
